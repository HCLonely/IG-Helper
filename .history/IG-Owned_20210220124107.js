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
// @updateURL          https://raw.githubusercontent.com/HCLonely/IG-Helper/master/IG-Owned.user.js
// @downloadURL        https://raw.githubusercontent.com/HCLonely/IG-Helper/master/IG-Owned.user.js

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
  if (!GM_getValue('IG-Owned')) {
    Swal.fire({
      title: '首次使用IG游戏库检测请先同步！',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '同步',
      cancelButtonText: '关闭'
    }).then(({ value }) => {
      if (value) {
        syncLib(true, true)
      }
    })
  }
  check()
  const observer = new MutationObserver(check)
  observer.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
  })
  function check () {
    const allGames = GM_getValue('IG-Owned')?.games || []
    for (const el of $('a[href*=".indiegala.com/"]:not(".ig-checked")')) {
      const $this = $(el).addClass('ig-checked')
      const href = $this.attr('href')
      if (/^https?:\/\/[\w\d]+?\.indiegala\.com\/.+$/.test(href) && allGames.includes(new URL(href).pathname.replace('/', ''))) {
        $this.addClass('ig-owned')
      }
    }
  }
  async function syncLib (notice = false, update = false) {
    let allGames = GM_getValue('IG-Owned')?.games || []
    const [pages, games] = await getGames(1, notice)
    allGames = [...allGames, ...games]
    if (pages > 1 && update) {
      for (let i = 2; i <= pages; i++) {
        const [, games] = await getGames(i, notice)
        allGames = [...allGames, ...games]
      }
    }
    allGames = [...new Set(allGames)]
    GM_setValue('IG-Owned', { time: new Date().getTime(), games: allGames })
    if (notice) {
      Swal.fire({
        title: '同步完成！',
        icon: 'success'
      })
    }
    return allGames
  }
  function getGames (page, notice) {
    if (notice) {
      Swal.fire({
        title: '正在同步第' + page + '页...',
        icon: 'info'
      })
    }
    return TM_request({
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
          return [pages, games]
        }
      })
      .catch(error => {
        console.error(error)
        return [1, []]
      })
  }
  GM_registerMenuCommand('同步游戏库', () => { syncLib(true, true) })
  GM_addStyle('.ig-owned{color:#ffffff !important;background:#5c8a00 !important;}')
  syncLib(false, false)
})()
