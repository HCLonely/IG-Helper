// ==UserScript==
// @name               IG-Add2Lib
// @namespace          IG-Add2Lib
// @version            1.0.8
// @description        indiegala 快速领取免费游戏
// @author             HCLonely
// @license            MIT
// @iconURL            https://auto-task-test.hclonely.com/img/favicon.ico
// @homepage           https://github.com/HCLonely/IG-Helper/
// @supportURL         https://github.com/HCLonely/IG-Helper/issues/
// @updateURL          https://raw.githubusercontent.com/HCLonely/IG-Helper/master/IG-Add2Lib.user.js
// @downloadURL        https://raw.githubusercontent.com/HCLonely/IG-Helper/master/IG-Add2Lib.user.js

// @include            *://keylol.com/*

// @grant              GM_addStyle
// @grant              GM_xmlhttpRequest
// @grant              GM_registerMenuCommand
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
  function addButton () {
    for (const el of $('a[href*=".indiegala.com/"]:not(".ig-add2lib")')) {
      const $this = $(el).addClass('ig-add2lib')
      const href = $this.attr('href')
      if (/^https?:\/\/.+?\.indiegala\.com\/.+$/.test(href) && !['/login', '/library'].includes(new URL(href).pathname)) {
        $this.after(`<a class="add-to-library" href="javascript:void(0)" onclick="addToIndiegalaLibrary(this)" data-href="${href}" target="_self">入库</a>`)
      }
    }
  }
  unsafeWindow.addToIndiegalaLibrary = async function (el) {
    const href = typeof el === 'string' ? el : $(el).attr('data-href')
    Swal.fire({
      title: '正在获取入库链接...',
      text: href,
      icon: 'info'
    })
    const url = await TM_request({
      url: href,
      method: 'GET',
      anonymous: true,
      timeout: 30000,
      retry: 3
    })
      .then(response => {
        if (!response.responseText) {
          console.error(response)
          return null
        }
        const pageId = response.responseText.match(/dataToSend\.gala_page_id[\s]*?=[\s]*?'(.*?)';/)?.[1]
        if (!pageId) {
          console.error(response)
          return null
        }
        return new URL(`/ajax/add-to-library/${pageId}/${new URL(href).pathname.replace(/\//g, '')}/${new URL(href).hostname.replace('.indiegala.com', '')}`, href).href
      })
      .catch(error => {
        console.error(error)
        return null
      })
    if (!url) {
      Swal.update({
        title: '获取入库链接失败！',
        text: href,
        icon: 'error'
      })
      return null
    }
    Swal.update({
      title: '正在入库...',
      text: href,
      icon: 'info'
    })
    return TM_request({
      url,
      method: 'POST',
      responseType: 'json',
      nocache: true,
      headers: {
        'content-type': 'application/json'
      },
      timeout: 30000,
      retry: 3
    })
      .then(response => {
        if (response.response?.status === 'ok') {
          Swal.update({
            title: '入库成功！',
            text: href,
            icon: 'success'
          })
          if (syncIgLib) {
            syncIgLib(false, false).then(allGames => {
              for (const el of $('a[href*=".indiegala.com/"]')) {
                const $this = $(el).addClass('ig-checked')
                const href = $this.attr('href')
                if (/^https?:\/\/[\w\d]+?\.indiegala\.com\/.+$/.test(href) && allGames.includes(new URL(href).pathname.replace(/\//g, ''))) {
                  $this.addClass('ig-owned')
                }
              }
            })
          }
          return true
        } else if (response.response?.status === 'added') {
          Swal.update({
            title: '已在库中！',
            text: href,
            icon: 'warning'
          })
          return true
        } else if (response.response?.status === 'login' || response.response?.status === 'auth') {
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
          return false
        } else {
          console.error(response)
          Swal.update({
            title: '入库失败！',
            text: href,
            icon: 'error'
          })
          return null
        }
      })
  }
  GM_registerMenuCommand('入库所有', async () => {
    const links = $.makeArray($('a.add-to-library')).map((e, i) => {
      return $(e).prev().hasClass('ig-owned') ? null : $(e).attr('data-href')
    }).filter(e => e)
    const newLinks = [...new Set(links)]
    const failedLinks = []
    for (const link of newLinks) {
      const result = await addToIndiegalaLibrary(link)
      if (result === false) {
        break
      } else if (!result) {
        failedLinks.push(`<a href="${link}" target=_blank">${link}</a>`)
      }
    }
    if (failedLinks.length === 0) {
      Swal.fire({
        title: '全部任务完成！',
        icon: 'success'
      })
    } else {
      Swal.fire({
        title: '以下任务未完成！',
        icon: 'warning',
        html: failedLinks.join('<br/>')
      })
    }
  })
  GM_addStyle('.add-to-library{margin-left:10px;}')
  addButton()
  const observer = new MutationObserver(addButton)
  observer.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
  })
})()
