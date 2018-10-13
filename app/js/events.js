import ai from './ai';
import board from './board';
import camera from './camera';
import clock from './clock';
import config from './config';
import game from './game';
import Hero from './hero';
import heroes from './heroes'
import Tile from './tile';
import tiles from './tiles';

export default {

    action: '',

    init() {
        /**
        * General key press actions
        * @param {Object} e event
        */
        document.addEventListener('keydown', e => {
            if (e.which === 67) { // C: engage tile placing
                this.newTile();
            } else if (e.which === 82) { // R: rotate tile counterclockwise
                this.rotateTile(-1);
            } else if (e.which === 84) { // T: rotate tile clockwise
                this.rotateTile(1);
            } else if (e.which === 27) { // Esc: cancel current action
                this.cancel();
            } else if (e.which === 66) { // B: run bots
                ai.run();
            }
        });

        document.addEventListener('mousedown', () => {
            this.mouseDown();
        });

        document.addEventListener('mouseup', () => {
            this.mouseUp();
        });

        document.addEventListener('mousemove', () => {
            this.mouseMove();
        });

        document.getElementById('canvas-wrap').addEventListener('mouseleave', () => {
            camera.mouseIn = false;
        });

        document.getElementById('canvas-wrap').addEventListener('mouseenter', () => {
            camera.mouseIn = true;
        });

        window.oncontextmenu = () => {
            this.rotateTile(1);
            return false;
        }
    },

    mouseDown() {
        const cell = this.getHoveredCell();

        if (this.action === 'placing') {
            this.setTile(cell);
        }

        const isHero = this.checkForHero(cell);
        if (isHero) {
            this.toggleHero(isHero);
            this.oldHeroCell = cell;
        }
    },

    oldHeroCell: {},

    mouseUp() {
        const cell = this.getHoveredCell();
        const hero = this.hero;

        if (!hero) return;

        if (!(cell.x === this.oldHeroCell.x && cell.y === this.oldHeroCell.y)) {
            if (this.action === 'hero' && hero.canGoTo(cell)) {
                // FIXME: hero will sometimes go to a cell it shouldn't if spammed/timed correctly
                hero.set(cell.x, cell.y);
                socket.emit('hero', {
                    id: hero.id,
                    cell: cell
                });
            } else {
                // Released hero (illegal move), tell admin to rerun AI
                socket.emit('ai');
            }
        } else {
            // Released hero (same cell), tell admin to rerun AI
            socket.emit('ai');
        }

        this.action = '';
        hero.path = [];
        this.toggleHero(hero);
        this.hero = false;
    },

    oldMouseCell: {},

    /**
    * Mouse movements events
    */
    mouseMove() {
        const cell = this.getHoveredCell();

        if (this.action === 'hero') {
            const hero = this.hero;
            if (cell.x !== this.oldMouseCell.x || cell.y !== this.oldMouseCell.y) {
                this.oldMouseCell = cell;
                hero.checkPath(cell);
            }
        }
    },

    /**
    * Get hovered cell coordinates
    * @return {Object} position {'x': ,'y': }
    */
    getHoveredCell() {
        const x = p5.floor((p5.mouseX - p5.width/2 - (camera.x * camera.zoomValue)) / (config.size * camera.zoomValue));
        const y = p5.floor((p5.mouseY - p5.height/2 - (camera.y * camera.zoomValue)) / (config.size * camera.zoomValue));

        const cell = {
            'x': x,
            'y': y
        }

        return cell;
    },

    /**
    * Cancel current action
    */
    cancel() {
        if (this.action === 'placing') {
            tiles.putBackInStock();
        }
        this.action = '';
    },

    /**
    * Set picked tile
    * @param {Object} cell cell to set tile onto
    */
    setTile(cell) {
        // Select picked tile
        const tile = tiles.getPickedTile();
        const o = tile.getOrientation();

        if (tile.canBeSet && tile.status === 'picked') {
            this.action = '';

            // Set tile at origin
            const origin = tile.getOrigin(cell.x, cell.y, o);
            tile.set(origin.x, origin.y);
            socket.emit('tile', {
                x: origin.x,
                y: origin.y,
                tile: tile
            });

            // Mark cell as explored
            this.bridgeCell.setExplored();

            // Run AI
            ai.run();
        }
    },

    bridgeCell: {},

    /**
    * Get next tile from stock
    */
    newTile() {
        if (role.indexOf('explore') === -1) return;
        if (tiles.getStockSize() === 0) return;
        let canAddTile = false;

        for (let hero of heroes.all) {
            const cell = board.get(hero.cell.x, hero.cell.y);
            if (cell.item && cell.item.type === 'bridge' && cell.item.color === hero.color) {
                this.bridgeCell = cell;
                if (!cell.isExplored()) {
                    canAddTile = true;
                    break;
                }
            }
        }


        if (canAddTile) {
            this.action = 'placing';

            // Make sure last tile is fixed to prevent multiple tiles picking
            const lastTile = tiles.getLastTile();

            if (lastTile.status === 'set') {
                tiles.getFromStock();
            }
        }
    },

    /**
    * Rotate picked tile
    * @param  {int} dir direction (1 for clockwise, -1 for counterclockwise)
    */
    rotateTile(dir) {
        const pickedTile = tiles.getPickedTile();
        if (pickedTile) pickedTile.rotate(dir);
    },

    /**
    * Check if there's a hero in this cell
    * @param  {Object} cell cell to check
    * @return {Object|bool}
    */
    checkForHero(cell) {
        for (let hero of heroes.all) {
            if (hero.cell.x === cell.x && hero.cell.y === cell.y) return hero;
        }
        return false;
    },

    /**
    * Select or deselect hero
    * @param  {Object} hero hero to select
    */
    toggleHero(hero) {
        for (let h of heroes.all) {
            // Prevent selection of multiple heroes
            if (h.status === 'selected' && h.id !== hero.id) return;
        }

        // Prevent selection of exited hero
        if (hero.exited) return;

        if (hero.status === 'selected') {
            hero.status = 'set';
        } else {
            hero.status = 'selected';
            this.action = 'hero';
            this.hero = hero;
            hero.checkPath();
        }
    },

    checkForEvents(cell, hero) {
        const item = board.get(cell.x, cell.y).item;

        if (!item) return;

        if (item.type === 'time' && !item.used) {
            // Time cell, invert clock
            clock.invert();
            socket.emit('invertClock');

            // Time cell is now used
            board.setUsed(cell.x, cell.y);
            socket.emit('used', {
                x: cell.x,
                y: cell.y
            });
        } else if (item.type === 'article' && item.color === hero.color) {
            // Same color article
            hero.steal();

            // Article is now stolen
            board.get(cell.x, cell.y).setStolen();
        } else if (item.type === 'exit' && hero.hasStolen() && (item.color === hero.color || game.scenario === 1)) {
            // Same color exit or scenario 1 (only has purple exit)
            hero.exit();
            if (ai.checkForWin()) {
                game.win();
            }
        }
    }
}
