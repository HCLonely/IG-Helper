// ==UserScript==
// @name               IG-Owned
// @namespace          IG-Owned
// @version            1.0.0
// @description        indiegala 检测游戏是否已拥有
// @author             HCLonely
// @license            MIT
// @iconURL            https://auto-task-test.hclonely.com/img/favicon.ico
// @homepage           https://github.com/HCLonely/IG-Helper/
// @supportURL         https://github.com/HCLonely/IG-Helper/issues/
// @updateURL          https://raw.githubusercontent.com/HCLonely/IG-Helper/master/IG-Add2Lib.user.js
// @downloadURL        https://raw.githubusercontent.com/HCLonely/IG-Helper/master/IG-Add2Lib.user.js

// @include            *://keylol.com/*

// @grant              GM_setValue
// @grant              GM_getValue
// @grant              GM_addStyle
// @grant              GM_xmlhttpRequest
// @grant              GM_registerMenuCommand
// @grant              unsafeWindow

// @require            https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.slim.min.js
// @require            https://cdn.jsdelivr.net/npm/sweetalert2@9
// @require            https://cdn.jsdelivr.net/npm/promise-polyfill@8.1.3/dist/polyfill.min.js
// @require            https://greasyfork.org/scripts/418102-tm-request/code/TM_request.js?version=902218
// @connect            indiegala.com
// @run-at             document-end
// ==/UserScript==

(function () {
  /*
  check()
  const observer = new MutationObserver(check)
  observer.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
  })
  function check () {
    for (const el of $('a[href*=".indiegala.com/"]:not(".id-checked")')) {
      const $this = $(el).addClass('id-checked')
      const href = $this.attr('href')
      if (/^https?:\/\/[\w\d]+?\.indiegala\.com\/.+$/.test(href)) {
        $this.after(`<a class="add-to-library" href="javascript:void(0)" onclick="addToIndiegalaLibrary(this)" data-href="${href}" target="_self">入库</a>`)
      }
    }
  }
  */
  function syncLib (page = 1) {
    TM_request({
      url: 'https://www.indiegala.com/library/showcase/' + page,
      method: 'GET',
      timeout: 30000,
      retry: 3
    })
      .then(response => {
        if (response.status === 200) {
          let pages = 1
          if (page === 1) {
            const lastPageNum = parseInt($(response.responseText).find('a.profile-private-page-library-pagination-item[href*="library/showcase"]:has(.fa-angle-double-right)').attr('href').match(/[\d]+/)?.[0])
            if (!isNaN(lastPageNum)) {
              pages = lastPageNum
            }
          }
          const games = [...response.responseText.matchAll(/<a class="library-showcase-title" href="https:\/\/.*?\.indiegala\.com\/(.*?)" target="_blank">/g)].map(e => e[1]).filter(e => e)
          GM_setValue('IG-Owned', { time: new Date().getTime(), games })
        }
      })
  }
  GM_registerMenuCommand('test', syncLib)
})()
