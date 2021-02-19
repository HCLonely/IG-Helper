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

// @require            https://cdn.jsdelivr.net/gh/HCLonely/auto-task@3.4.9/require/require.min.js#md5=d9df51f8aa156512ba0fd711d3af24b9
// @resource           CSS https://cdn.jsdelivr.net/gh/HCLonely/auto-task@3.4.9/require/fuck-task.min.css#md5=63de64705df01c0ddba37b9924000319

// @grant              GM_setValue
// @grant              GM_getValue
// @grant              GM_listValues
// @grant              GM_deleteValue
// @grant              GM_addStyle
// @grant              GM_xmlhttpRequest
// @grant              GM_registerMenuCommand
// @grant              unsafeWindow

// @connect            freebies.indiegala.com
// @run-at             document-end
// ==/UserScript==

(function () {
  const links = $('#ct').find('a[href^="https://freebies.indiegala.com/"]').map((e, i) => {
    const $this = $(e)
    $this.after(`<a class="ig-helper add-to-library" href="" data-href="${$this.attr('href')}">入库</a>`)
  })
})()
