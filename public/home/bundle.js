/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
<<<<<<< HEAD
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
=======
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		__webpack_require__("./src/client/home/js/main.js");
/******/ 		return __webpack_require__("./src/client/home/scss/home.scss");
/******/ 	};
/******/ 	// initialize runtime
/******/ 	runtime(__webpack_require__);
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
>>>>>>> parent of bf4e978... npm update
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {
/*!************************************!*\
  !*** ./src/client/home/js/main.js ***!
  \************************************/
/*! unknown exports (runtime-defined) */
/*! exports [maybe provided (runtime-defined)] [unused] */
/*! runtime requirements:  */
eval("\n\nwindow.onload = init;\n\nfunction init() {\n    window.socket = io({ transports: ['websocket'], upgrade: false });\n\n    socket.on('home', function (data) {\n        if (data.members.length === 0) {\n            $('#' + data.id).remove();\n        } else if (!$('#' + data.id)[0]) {\n            $('.row').prepend('<div class=\"box\" id=\"' + data.id + '\">\\n                <h4>' + data.id + '</h4>\\n                <p>\\n                    <span class=\"players\">0 player</span><br>\\n                    <span class=\"bots small\">0 bot</span>\\n                </p>\\n\\n                <label for=\"name\">Nickname</label>\\n                <input type=\"text\" id=\"name\" placeholder=\"Enter a nickname\\u2026\" required>\\n\\n                <button name=\"play\">Play</button>\\n            </div>');\n        }\n\n        var botsCount = data.members.filter(function (m) {\n            return m.isBot;\n        }).length;\n        var playersCount = data.members.length - botsCount;\n\n        $('#' + data.id + ' .players').html(playersCount + ' player' + (playersCount > 1 ? 's' : ''));\n        $('#' + data.id + ' .bots').html(botsCount + ' bot' + (botsCount > 1 ? 's' : ''));\n    });\n}\n\n$(document).on('click', 'button[name=\"play\"]', function (e) {\n    e.preventDefault();\n    var room = $(e.target).parents('.box').attr('id');\n    var name = $('#name').val();\n\n    if (!room || !name) return;\n\n    sessionStorage.setItem('room', room);\n    sessionStorage.setItem('name', name);\n    window.location.href = '/play';\n});\n\n$(document).on('click', 'button[name=\"create\"]', function (e) {\n    e.preventDefault();\n    var room = $('#room').val();\n    var name = $('#name').val();\n\n    if (!room || !name) return;\n\n    sessionStorage.setItem('room', room);\n    sessionStorage.setItem('name', name);\n    window.location.href = '/play';\n});\n\n$(document).on('click', '.box.new-game', function () {\n    $('.box.new-game').replaceWith('\\n    <div class=\"box\">\\n        <label for=\"room\">Room name</label>\\n        <input type=\"text\" id=\"room\" placeholder=\"Name your room\\u2026\" required>\\n        \\n        <label for=\"name\">Nickname</label>\\n        <input type=\"text\" id=\"name\" placeholder=\"Enter a nickname\\u2026\" required>\\n\\n        <button name=\"create\">Create room</button>\\n    </div>\\n    ');\n});\n\n//# sourceURL=webpack://magic-maze/./src/client/home/js/main.js?");
})();

<<<<<<< HEAD
(() => {
/*!****************************************!*\
  !*** ./src/client/home/scss/home.scss ***!
  \****************************************/
/*! namespace exports */
/*! export default [provided] [unused] [could be renamed] */
/*! other exports [not provided] [unused] */
/*! runtime requirements: __webpack_require__.p, __webpack_require__.* */
eval("/* unused harmony default export */ var _unused_webpack_default_export = (__webpack_require__.p + \"home/main.min.css\");\n\n//# sourceURL=webpack://magic-maze/./src/client/home/scss/home.scss?");
})();

/******/ })()
;
=======
/***/ }),

/***/ "./src/client/home/scss/home.scss":
/*!****************************************!*\
  !*** ./src/client/home/scss/home.scss ***!
  \****************************************/
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.p, __webpack_require__ */
/***/ (function(__unusedmodule, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"home/main.min.css\");\n\n//# sourceURL=webpack:///./src/client/home/scss/home.scss?");

/***/ }),

/***/ "./src/client/home/scss/home.scss":
/*!****************************************!*\
  !*** ./src/client/home/scss/home.scss ***!
  \****************************************/
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.p, __webpack_require__ */
/***/ (function(__unusedmodule, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"home/main.min.css\");\n\n//# sourceURL=webpack:///./src/client/home/scss/home.scss?");

/***/ })

/******/ },
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/******/ }
<<<<<<< HEAD
);
>>>>>>> parent of bf4e978... npm update
=======
);
>>>>>>> parent of bf4e978... npm update
