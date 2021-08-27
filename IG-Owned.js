// ==UserScript==
// @name               IG-Owned
// @namespace          IG-Owned
// @version            1.0.9
// @description        indiegala 检测游戏是否已拥有
// @author             HCLonely
// @license            MIT
// @iconURL            https://auto-task-test.hclonely.com/img/favicon.ico
// @homepage           https://github.com/HCLonely/IG-Helper/
// @supportURL         https://github.com/HCLonely/IG-Helper/issues/
// @updateURL          https://raw.githubusercontent.com/HCLonely/IG-Helper/master/IG-Owned.user.js
// @downloadURL        https://raw.githubusercontent.com/HCLonely/IG-Helper/master/IG-Owned.user.js

// @include            *://keylol.com/*
// @include            *://*.indiegala.com/*

// @grant              GM_setValue
// @grant              GM_getValue
// @grant              GM_addStyle
// @grant              GM_listValues
// @grant              GM_xmlhttpRequest
// @grant              GM_registerMenuCommand
// @grant              unsafeWindow
// @grant              window.open

// @require            https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.slim.min.js
// @require            https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.7/runtime.min.js
// @require            https://cdn.jsdelivr.net/npm/sweetalert2@9
// @require            https://cdn.jsdelivr.net/npm/promise-polyfill@8.1.3/dist/polyfill.min.js
// @require            https://greasyfork.org/scripts/418102-tm-request/code/TM_request.js?version=902218
// @require            https://greasyfork.org/scripts/426803-gistsync/code/gistSync.js?version=957824
// @connect            indiegala.com
// @connect            api.github.com
// @run-at             document-end
// ==/UserScript==

/* global syncIgLib */
(function () {
  if (/^https?:\/\/www\.indiegala\.com\/(library|showcase)/.test(window.location.href)) {
    const games = [...$.makeArray($('a.library-showcase-title,a.main-list-item-clicker')).map(e => $(e).attr('href')?.match(/https:\/\/.*?\.indiegala\.com\/(.*)/)?.[1]?.toLowerCase())].filter(e => e)
    const allGames = GM_getValue('IG-Owned')?.games || []
    GM_setValue('IG-Owned', { time: new Date().getTime(), games: [...new Set([...allGames, ...games])] })
  }
  if (window.location.hostname.includes('.indiegala.com')) {
    if ($('i.fa-download:visible').length > 0) {
      const allGames = GM_getValue('IG-Owned')?.games || []
      GM_setValue('IG-Owned', { time: new Date().getTime(), games: [...new Set([...allGames, window.location.pathname.replace('/', '')])] })
    }
  }
  function checkIgOwned () {
    const allGames = GM_getValue('IG-Owned')?.games || []
    for (const el of $('a[href*=".indiegala.com/"]:not(".ig-checked")')) {
      const $this = $(el).addClass('ig-checked')
      const href = $this.attr('href')
      if (/^https?:\/\/.+?\.indiegala\.com\/.+$/.test(href) && allGames.includes(new URL(href).pathname.replace(/\//g, '').toLowerCase())) {
        const itemContDiv = $this.parents('.item-cont')
        if (window.location.hostname === 'www.indiegala.com' && itemContDiv.length > 0) {
          itemContDiv.addClass('ig-owned')
        } else {
          $this.addClass('ig-owned')
        }
      }
    }
  }
  unsafeWindow.syncIgLib = async function syncIgLib (notice = false, update = false) {
    if (!GM_getValue('IG-Verified')) {
      if (notice) {
        Swal.fire({
          title: '请先完成验证！',
          icon: 'error',
          html: '<a href="https://www.indiegala.com/library" target="_blank">前往验证</a>',
          showCancelButton: true,
          confirmButtonText: '老子完成验证了',
          cancelButtonText: '关闭'
        }).then(({ value }) => {
          if (value) {
            GM_setValue('IG-Verified', true)
          }
        })
      }
      return []
    }
    let allGames = GM_getValue('IG-Owned')?.games || []
    const [pages, games] = await getGames(1, notice)
    if (pages === 0) return
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
        if (notice && new URL(response.finalUrl).pathname === '/login') {
          Swal.fire({
            title: '请先登录！',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: '登录',
            cancelButtonText: '关闭'
          }).then(({ value }) => {
            if (value) {
              window.open('https://www.indiegala.com/login', '_blank')
            }
          })
          return [0, []]
        }
        if (response.status === 200) {
          if (response.responseText.includes('Profile locked')) {
            if (notice) {
              Swal.fire({
                title: '请先完成验证！',
                icon: 'error',
                html: '<a href="https://www.indiegala.com/library" target="_blank">前往验证</a>',
                showCancelButton: true,
                confirmButtonText: '老子完成验证了',
                cancelButtonText: '关闭'
              }).then(({ value }) => {
                if (value) {
                  GM_setValue('IG-Verified', true)
                }
              })
            }
            GM_setValue('IG-Verified', false)
            return [0, []]
          }
          GM_setValue('IG-Verified', true)
          const html = $(response.responseText)
          let pages = 1
          if (page === 1) {
            const lastPageNum = parseInt(html.find('a.profile-private-page-library-pagination-item[href*="library/showcase"]:has(.fa-angle-double-right)').attr('href')?.match(/[\d]+/)?.[0])
            if (!isNaN(lastPageNum)) {
              pages = lastPageNum
            }
          }
          const games = [...$.makeArray(html.find('a.library-showcase-title')).map(e => $(e).attr('href')?.match(/https:\/\/.*?\.indiegala\.com\/(.*)/)?.[1]?.toLowerCase())].filter(e => e)
          return [pages, games]
        } else {
          console.error(response)
          if (notice) {
            Swal.fire({
              title: '获取游戏库数据失败！',
              text: response.status,
              icon: 'error'
            })
          }
        }
      })
      .catch(error => {
        console.error(error)
        if (notice) {
          Swal.fire({
            title: '获取游戏库数据失败！',
            icon: 'error'
          })
        }
        return [0, []]
      })
  }
  GM_registerMenuCommand('同步游戏库', () => { syncIgLib(true, true) })
  GM_addStyle('.ig-owned{color:#ffffff !important;background:#5c8a00 !important;}')
  if (!GM_getValue('IG-Owned')) {
    Swal.fire({
      title: '首次使用IG游戏库检测请先同步！',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '同步',
      cancelButtonText: '关闭'
    }).then(({ value }) => {
      if (value) {
        syncIgLib(true, true)
      }
    })
    return
  }
  checkIgOwned()
  const observer = new MutationObserver(checkIgOwned)
  observer.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
  })
  syncIgLib(false, false)
})()
