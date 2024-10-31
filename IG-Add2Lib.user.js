"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// ==UserScript==
// @name               IG-Add2Lib
// @namespace          IG-Add2Lib
// @version            1.1.0
// @description        indiegala 快速领取免费游戏
// @author             HCLonely
// @license            MIT
// @iconURL            https://auto-task-test.hclonely.com/img/favicon.ico
// @homepage           https://github.com/HCLonely/IG-Helper/
// @supportURL         https://github.com/HCLonely/IG-Helper/issues/
// @updateURL          https://raw.githubusercontent.com/HCLonely/IG-Helper/master/IG-Add2Lib.user.js
// @downloadURL        https://raw.githubusercontent.com/HCLonely/IG-Helper/master/IG-Add2Lib.user.js

// @include            *://keylol.com/*
// @include            *://www.indiegala.com/*

// @grant              GM_addStyle
// @grant              GM_xmlhttpRequest
// @grant              GM_registerMenuCommand
// @grant              GM_cookie
// @grant              unsafeWindow

// @require            https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.slim.min.js
// @require            https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.7/runtime.min.js
// @require            https://cdn.jsdelivr.net/npm/sweetalert2@9
// @require            https://cdn.jsdelivr.net/npm/promise-polyfill@8.1.3/dist/polyfill.min.js
// @require            https://greasyfork.org/scripts/418102-tm-request/code/TM_request.js?version=902218
// @connect            indiegala.com
// @run-at             document-end
// @noframes
// ==/UserScript==

/* global addToIndiegalaLibrary, syncIgLib */
(function () {
  if (window.location.host === 'www.indiegala.com') {
    return;
  }
  function addButton() {
    var _iterator = _createForOfIteratorHelper($('a[href*=".indiegala.com/"]:not(".ig-add2lib")')),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var el = _step.value;
        var $this = $(el).addClass('ig-add2lib');
        var href = $this.attr('href');
        if (/^https?:\/\/.+?\.indiegala\.com\/.+$/.test(href) && !['/login', '/library'].includes(new URL(href).pathname)) {
          $this.after("<a class=\"add-to-library\" href=\"javascript:void(0)\" onclick=\"addToIndiegalaLibrary(this)\" data-href=\"".concat(href, "\" target=\"_self\">\u5165\u5E93</a>"));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  unsafeWindow.addToIndiegalaLibrary = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(el) {
      var href, _yield$TM_request$the, _yield$TM_request$the2, url, csrf_token;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            href = typeof el === 'string' ? el : $(el).attr('data-href');
            Swal.fire({
              title: '正在获取入库链接...',
              text: href,
              icon: 'info'
            });
            _context.next = 4;
            return TM_request({
              url: href,
              method: 'GET',
              anonymous: false,
              timeout: 30000,
              retry: 3
            }).then(function (response) {
              var _response$responseTex, _response$responseTex2;
              if (!response.responseText) {
                console.error(response);
                return null;
              }
              var pageId = (_response$responseTex = response.responseText.match(/dataToSend\.(gala_page_)?id[\s]*?=[\s]*?'(.*?)';/)) === null || _response$responseTex === void 0 ? void 0 : _response$responseTex[2];
              if (!pageId) {
                console.error(response);
                return null;
              }
              var csrf_token = (_response$responseTex2 = response.responseText.match(/<input name="csrfmiddlewaretoken".+?value="(.+?)"/)) === null || _response$responseTex2 === void 0 ? void 0 : _response$responseTex2[1];
              return [new URL("/developers/ajax/add-to-library/".concat(pageId, "/").concat(new URL(href).pathname.replace(/\//g, ''), "/").concat(new URL(href).hostname.replace('.indiegala.com', '')), href).href, csrf_token];
            })["catch"](function (error) {
              console.error(error);
              return null;
            });
          case 4:
            _yield$TM_request$the = _context.sent;
            _yield$TM_request$the2 = _slicedToArray(_yield$TM_request$the, 2);
            url = _yield$TM_request$the2[0];
            csrf_token = _yield$TM_request$the2[1];
            if (!(!url || !csrf_token)) {
              _context.next = 11;
              break;
            }
            Swal.update({
              title: '获取入库链接失败！',
              text: href,
              icon: 'error'
            });
            return _context.abrupt("return", null);
          case 11:
            Swal.update({
              title: '正在入库...',
              text: href,
              icon: 'info'
            });
            return _context.abrupt("return", TM_request({
              url: url,
              method: 'POST',
              responseType: 'json',
              nocache: true,
              headers: {
                'content-type': 'application/json',
                "X-CSRF-Token": csrf_token
              },
              timeout: 30000,
              retry: 3
            }).then(function (response) {
              var _response$response, _response$response2, _response$response3, _response$response4;
              if (((_response$response = response.response) === null || _response$response === void 0 ? void 0 : _response$response.status) === 'ok') {
                Swal.update({
                  title: '入库成功！',
                  text: href,
                  icon: 'success'
                });
                if (syncIgLib) {
                  syncIgLib(false, false).then(function (allGames) {
                    var _iterator2 = _createForOfIteratorHelper($('a[href*=".indiegala.com/"]')),
                      _step2;
                    try {
                      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        var _el = _step2.value;
                        var $this = $(_el).addClass('ig-checked');
                        var _href = $this.attr('href');
                        if (/^https?:\/\/[\w\d]+?\.indiegala\.com\/.+$/.test(_href) && allGames.includes(new URL(_href).pathname.replace(/\//g, ''))) {
                          $this.addClass('ig-owned');
                        }
                      }
                    } catch (err) {
                      _iterator2.e(err);
                    } finally {
                      _iterator2.f();
                    }
                  });
                }
                return true;
              } else if (((_response$response2 = response.response) === null || _response$response2 === void 0 ? void 0 : _response$response2.status) === 'added') {
                Swal.update({
                  title: '已在库中！',
                  text: href,
                  icon: 'warning'
                });
                return true;
              } else if (((_response$response3 = response.response) === null || _response$response3 === void 0 ? void 0 : _response$response3.status) === 'login' || ((_response$response4 = response.response) === null || _response$response4 === void 0 ? void 0 : _response$response4.status) === 'auth') {
                Swal.fire({
                  title: '请先登录！',
                  icon: 'error',
                  showCancelButton: true,
                  confirmButtonText: '登录',
                  cancelButtonText: '关闭'
                }).then(function (_ref2) {
                  var value = _ref2.value;
                  if (value) {
                    window.open('https://www.indiegala.com/login', '_blank');
                  }
                });
                return false;
              } else {
                console.error(response);
                Swal.update({
                  title: '入库失败！',
                  text: href,
                  icon: 'error'
                });
                return null;
              }
            }));
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
  GM_registerMenuCommand('入库所有', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var links, newLinks, failedLinks, _iterator3, _step3, link, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          links = $.makeArray($('a.add-to-library')).map(function (e, i) {
            return $(e).prev().hasClass('ig-owned') ? null : $(e).attr('data-href');
          }).filter(function (e) {
            return e;
          });
          newLinks = _toConsumableArray(new Set(links));
          failedLinks = [];
          _iterator3 = _createForOfIteratorHelper(newLinks);
          _context2.prev = 4;
          _iterator3.s();
        case 6:
          if ((_step3 = _iterator3.n()).done) {
            _context2.next = 18;
            break;
          }
          link = _step3.value;
          _context2.next = 10;
          return addToIndiegalaLibrary(link);
        case 10:
          result = _context2.sent;
          if (!(result === false)) {
            _context2.next = 15;
            break;
          }
          return _context2.abrupt("break", 18);
        case 15:
          if (!result) {
            failedLinks.push("<a href=\"".concat(link, "\" target=_blank\">").concat(link, "</a>"));
          }
        case 16:
          _context2.next = 6;
          break;
        case 18:
          _context2.next = 23;
          break;
        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](4);
          _iterator3.e(_context2.t0);
        case 23:
          _context2.prev = 23;
          _iterator3.f();
          return _context2.finish(23);
        case 26:
          if (failedLinks.length === 0) {
            Swal.fire({
              title: '全部任务完成！',
              icon: 'success'
            });
          } else {
            Swal.fire({
              title: '以下任务未完成！',
              icon: 'warning',
              html: failedLinks.join('<br/>')
            });
          }
        case 27:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 20, 23, 26]]);
  })));
  function getCookies() {
    return new Promise(function (resolve, reject) {
      GM_cookie.list({
        url: 'https://www.indiegala.com/library/showcase/1'
      }, function (cookies, error) {
        if (!error) {
          resolve(cookies.map(function (c) {
            return "".concat(c.name, "=").concat(c.value);
          }).join(';'));
        } else {
          reject(error);
        }
      });
    });
  }
  GM_addStyle('.add-to-library{margin-left:10px;}');
  addButton();
  var observer = new MutationObserver(addButton);
  observer.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
  });
})();
