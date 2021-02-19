"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// ==UserScript==
// @name               IG-Add2Lib
// @namespace          IG-Add2Lib
// @version            1.0.1
// @description        indiegala 快速领取免费游戏
// @author             HCLonely
// @license            MIT
// @iconURL            https://auto-task-test.hclonely.com/img/favicon.ico
// @homepage           https://github.com/HCLonely/IG-Add2Lib/
// @supportURL         https://github.com/HCLonely/IG-Add2Lib/issues/
// @updateURL          https://raw.githubusercontent.com/HCLonely/IG-Add2Lib/master/IG-Add2Lib.user.js
// @downloadURL        https://raw.githubusercontent.com/HCLonely/IG-Add2Lib/master/IG-Add2Lib.user.js
// @include            *://keylol.com/*
// @grant              GM_addStyle
// @grant              GM_xmlhttpRequest
// @grant              unsafeWindow
// @require            https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.slim.min.js
// @require            https://cdn.jsdelivr.net/npm/sweetalert2@9
// @require            https://cdn.jsdelivr.net/npm/promise-polyfill@8.1.3/dist/polyfill.min.js
// @require            https://greasyfork.org/scripts/418102-tm-request/code/TM_request.js?version=902218
// @connect            *.indiegala.com
// @run-at             document-end
// ==/UserScript==
(function () {
  addButton();
  var observer = new MutationObserver(addButton);
  observer.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
  });

  function addButton() {
    var _iterator = _createForOfIteratorHelper($('a[href*=".indiegala.com/"]:not(".id-add2lib")')),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var el = _step.value;
        var $this = $(el);
        $this.after("<a class=\"add-to-library\" href=\"javascript:void(0)\" onclick=\"addToIndiegalaLibrary(this)\" data-href=\"".concat($this.attr('href'), "\" target=\"_self\">\u5165\u5E93</a>")).addClass('id-add2lib');
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  unsafeWindow.addToIndiegalaLibrary = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(el) {
      var href, url;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              href = $(el).attr('data-href');
              Swal.fire({
                title: '正在获取入库链接...',
                icon: 'info'
              });
              _context.next = 4;
              return TM_request({
                url: href,
                method: 'GET',
                timeout: 30000,
                retry: 3,
                cookie: 'incap_ses_896_255598='
              }).then(function (response) {
                var _response$responseTex;

                if (!response.responseText) {
                  console.error(response);
                  return null;
                }

                var pageId = (_response$responseTex = response.responseText.match(/dataToSend\.gala_page_id[\s]*?=[\s]*?'(.*?)';/)) === null || _response$responseTex === void 0 ? void 0 : _response$responseTex[1];

                if (!pageId) {
                  console.error(response);
                  return null;
                }

                return new URL("/ajax/add-to-library/".concat(pageId, "/").concat(new URL(href).pathname.replace('/', ''), "/").concat(new URL(href).hostname.replace('.indiegala.com', '')), href).href;
              })["catch"](function (error) {
                console.error(error);
                return null;
              });

            case 4:
              url = _context.sent;

              if (url) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", Swal.update({
                title: '获取入库链接失败！',
                icon: 'error'
              }));

            case 7:
              Swal.update({
                title: '正在入库...',
                icon: 'info'
              });
              TM_request({
                url: url,
                method: 'POST',
                responseType: 'json',
                nocache: true,
                headers: {
                  'content-type': 'application/json'
                },
                timeout: 30000,
                retry: 3
              }).then(function (response) {
                var _response$response, _response$response2, _response$response3;

                if (((_response$response = response.response) === null || _response$response === void 0 ? void 0 : _response$response.status) === 'ok') {
                  Swal.update({
                    title: '入库成功！',
                    icon: 'success'
                  });
                } else if (((_response$response2 = response.response) === null || _response$response2 === void 0 ? void 0 : _response$response2.status) === 'added') {
                  Swal.update({
                    title: '已在库中！',
                    icon: 'warning'
                  });
                } else if (((_response$response3 = response.response) === null || _response$response3 === void 0 ? void 0 : _response$response3.status) === 'login') {
                  Swal.fire({
                    title: '请先登录！',
                    icon: 'error',
                    html: '<a href="https://www.indiegala.com/login" target="_blank">登录</a>'
                  });
                } else {
                  console.error(response);
                  Swal.update({
                    title: '入库失败！',
                    icon: 'error'
                  });
                }
              });

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  GM_addStyle('.add-to-library{margin-left:10px;}');
})();
