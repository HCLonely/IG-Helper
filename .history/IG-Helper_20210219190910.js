// ==UserScript==
// @name               IG-Helper
// @namespace          IG-Helper
// @version            1.0.0
// @description        indiegala 快速领取免费游戏
// @author             HCLonely
// @license            MIT
// @iconURL            https://auto-task-test.hclonely.com/img/favicon.ico
// @homepage           https://github.com/HCLonely/IG-Helper/
// @supportURL         https://github.com/HCLonely/IG-Helper/issues/
// @updateURL          https://github.com/HCLonely/IG-Helper/issues/new/choose
// @downloadURL        https://github.com/HCLonely/IG-Helper/issues/new/choose

// @include            *://keylol.com/*

// @grant              GM_setValue
// @grant              GM_getValue
// @grant              GM_listValues
// @grant              GM_deleteValue
// @grant              GM_addStyle
// @grant              GM_xmlhttpRequest
// @grant              GM_registerMenuCommand
// @grant              unsafeWindow

// @require            https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.slim.min.js
// @require            https://cdn.jsdelivr.net/npm/sweetalert2@9
// @require            https://cdn.jsdelivr.net/npm/promise-polyfill@8.1.3/dist/polyfill.min.js
// @require            https://greasyfork.org/scripts/418102-tm-request/code/TM_request.js?version=902218
// @connect            freebies.indiegala.com
// @run-at             document-end
// ==/UserScript==

(function () {
  addButton()
  const observer = new MutationObserver(addButton)
  observer.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
  })
  function addButton () {
    for (const el of $('a[href^="https://freebies.indiegala.com/"]:not(".ig-helper")')) {
      const $this = $(el)
      $this.after(`<a class="add-to-library" href="javascript:void(0)" onclick="addToIndiegalaLibrary(this)" data-href="${$this.attr('href')}" target="_self">入库</a>`).addClass('ig-helper')
    }
  }
  unsafeWindow.addToIndiegalaLibrary = async function (el) {
    const href = $(el).attr('data-href')
    Swal.fire({
      title: '正在获取入库链接...',
      icon: 'info'
    })
    const url = await TM_request({
      url: href,
      method: 'GET'
    })
      .then(response => {
        if (!response.responseText) {
          console.error(response)
          return null
        }
        if (response.responseText.includes('https://www.indiegala.com/login')) {
          return 0
        }
        const matchUrl = response.responseText.match(/var[\s]*?url[\s]*?=[\s]*?'(\/ajax\/add-to-library\/.*?\/.*?\/freebies)';/)?.[1]
        if (!matchUrl) {
          console.error(response)
          return null
        }
        return new URL(matchUrl, href).href
      })
      .catch(error => {
        console.error(error)
        return null
      })
    if (!url) {
      if (url === 0) {
        return Swal.fire({
          title: '请先登录！',
          icon: 'error'
        })
      } else {
        return Swal.update({
          title: '获取入库链接失败！',
          icon: 'error'
        })
      }
    }
    Swal.update({
      title: '正在入库...',
      icon: 'info'
    })
    TM_request({
      url,
      method: 'POST',
      responseType: 'json',
      nocache: true,
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => {
        if (response.response?.status === 'ok') {
          Swal.update({
            title: '入库成功！',
            icon: 'success'
          })
        } else {
          console.error(response)
          Swal.update({
            title: '入库失败！',
            icon: 'error'
          })
        }
      })
  }
})()
