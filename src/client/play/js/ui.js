export default {
    getById(id) {
        return document.getElementById(id);
    },
    getByClass(className) {
        return document.getElementsByClassName(className);
    },

    setHTML(id, html) {
        const elem = this.getById(id);
        elem.innerHTML = html;
    },

    addHTML(id, html) {
        const elem = this.getById(id);
        elem.innerHTML += html;
    },

    addEvent(id, ev, f) {
        const elem = this.getById(id);
        elem.addEventListener(ev, f);
    },

    addEventForClass(className, ev, f) {
        const elem = this.getByClass(className);
        Array.from(elem).forEach(el => el.addEventListener(ev, f));
    },

    getProperty(id, prop) {
        const elem = this.getById(id);
        return elem[prop];
    },

    getAttribute(id, attr) {
        const elem = this.getById(id);
        return elem.getAttribute(attr);
    },

    setAttribute(id, attr, value) {
        const elem = this.getById(id);
        elem.setAttribute(attr, value);
    },

    remove(id) {
        const elem = this.getById(id);
        elem.remove();
    },

    addClass(id, cl) {
        const elem = this.getById(id);
        elem.classList.add(cl);
    },

    removeClass(id, classes) {
        const elem = this.getById(id);
        classes.split(' ').forEach(cl => elem.classList.remove(cl));
    },

    toggleClass(id, cl) {
        if (this.hasClass(id, cl)) this.removeClass(id, cl);
        else this.addClass(id, cl);
    },

    hasClass(elOrID, cl) {
        const elem = typeof elOrID === 'string' ? this.getById(elOrID) : elOrID;
        return elem.classList && elem.classList.contains(cl) ? true : false;
    },

    moveToEnd(elOrID) {
        const elem = typeof elOrID === 'string' ? this.getById(elOrID) : elOrID;
        if (elem) elem.parentElement.innerHTML = elem.parentElement.innerHTML.replace(elem.outerHTML, '') + elem.outerHTML;
    },

    getTransitionDurationForElement(element) {
        const transitionDurationString = window.getComputedStyle(element).transitionDuration;
        return transitionDurationString.substring(0, transitionDurationString.length - 1) * 1000;
    }
}
