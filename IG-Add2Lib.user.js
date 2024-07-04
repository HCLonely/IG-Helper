"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// ==UserScript==
// @name               IG-Add2Lib
// @namespace          IG-Add2Lib
// @version            1.0.9
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
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(el) {
      var href, url;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
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
                anonymous: true,
                timeout: 30000,
                retry: 3
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

                return new URL("/ajax/add-to-library/".concat(pageId, "/").concat(new URL(href).pathname.replace(/\//g, ''), "/").concat(new URL(href).hostname.replace('.indiegala.com', '')), href).href;
              })["catch"](function (error) {
                console.error(error);
                return null;
              });

            case 4:
              url = _context.sent;

              if (url) {
                _context.next = 8;
                break;
              }

              Swal.update({
                title: '获取入库链接失败！',
                text: href,
                icon: 'error'
              });
              return _context.abrupt("return", null);

            case 8:
              Swal.update({
                title: '正在入库...',
                text: href,
                icon: 'info'
              });
              _context.t0 = TM_request;
              _context.t1 = url;
              _context.next = 13;
              return getCookies();

            case 13:
              _context.t2 = _context.sent;
              _context.t3 = {
                'content-type': 'application/json',
                cookie: _context.t2
              };
              _context.t4 = {
                url: _context.t1,
                method: 'POST',
                responseType: 'json',
                nocache: true,
                headers: _context.t3,
                timeout: 30000,
                retry: 3
              };
              return _context.abrupt("return", (0, _context.t0)(_context.t4).then(function (response) {
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

            case 17:
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

  GM_registerMenuCommand('入库所有', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var links, newLinks, failedLinks, _iterator3, _step3, link, result;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
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
