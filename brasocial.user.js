// ==UserScript==
// @name         BraSocial no Google
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Substitui a página do Google pela BraSocial
// @author       Você
// @match        https://google.com/brasocial
// @match        https://www.google.com/brasocial
// @run-at       document-start
// @grant        GM_getResourceText
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @resource     brasocialCSS https://raw.githubusercontent.com/zoreu/brasocial/main/assets/index-EdyV0dX8.css
// @resource     brasocialJS https://raw.githubusercontent.com/zoreu/brasocial/main/assets/index-CLe3gXM7.js
// ==/UserScript==

(function() {
    'use strict';

    window.stop();

    const cssText = GM_getResourceText('brasocialCSS');
    const jsText = GM_getResourceText('brasocialJS');

    const html = `
        <!doctype html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
            <meta name="theme-color" content="#1a1a1b" />
            <title>BraSocial</title>
            <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23ff4500'/%3E%3Ctext x='50' y='68' font-size='52' font-weight='bold' text-anchor='middle' fill='white' font-family='Arial'%3EBr%3C/text%3E%3C/svg%3E" />
            <style>${cssText}</style>
        </head>
        <body>
            <div id="root"></div>
            <script>${jsText}<\/script>
        </body>
        </html>
    `;

    document.open();
    document.write(html);
    document.close();
})();