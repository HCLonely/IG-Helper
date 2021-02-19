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

// @require            // @require https://greasyfork.org/scripts/418102-tm-request/code/TM_request.js?version=879419
// @connect            freebies.indiegala.com
// @run-at             document-end
// ==/UserScript==

(function () {
  const links = $('#ct').find('a[href^="https://freebies.indiegala.com/"]').map((el, i) => {
    const $this = $(el)
    $this.after(`<a class="ig-helper add-to-library" href="javascript:void(0)" data-href="${$this.attr('href')}" target="_self">入库</a>`)
  })
  $('a.ig-helper.add-to-library').click(async function () {
    const href = $(this).attr('data-href')
    const [url, data] = await TM_request({
      url: href,
      method: 'GET'
    })
      .then(response => {
        if (!response.responseText) {
          console.error(response)
          return null
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
      // 报错
    }
    TM_request({
      url,
      method: 'GET'
    })
  })
})()
