// ==UserScript==
// @name         BraSocial no Google
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  BraSocial - rede social descentralizada
// @author       zoreu
// @match        http://google.com/brasocial*
// @match        https://google.com/brasocial*
// @match        http://www.google.com/brasocial*
// @match        https://www.google.com/brasocial*
// @updateURL    https://github.com/zoreu/brasocial/raw/refs/heads/main/brasocial.user.js
// @downloadURL  https://github.com/zoreu/brasocial/raw/refs/heads/main/brasocial.user.js
// @run-at       document-start
// @grant        GM_getResourceText
// @resource     brasocialCSS https://raw.githubusercontent.com/zoreu/brasocial/main/assets/index-ChuMDevT.css
// @resource     brasocialJS https://raw.githubusercontent.com/zoreu/brasocial/main/assets/index-B0sau6Ew.js
// ==/UserScript==

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════
    //  🔒 FORÇAR HTTP → HTTPS
    //  Roda primeiro. Se a URL atual for http://, troca para https://
    //  preservando host, caminho, query e hash, e recarrega.
    // ═══════════════════════════════════════════════════════════════
    if (location.protocol === 'http:') {
        const httpsURL =
            'https://' +
            location.host +
            location.pathname +
            location.search +
            location.hash;

        // location.replace não deixa entrada no histórico (melhor que href)
        location.replace(httpsURL);
        return; // para aqui; o script será reinjetado na versão https
    }

    // ═══════════════════════════════════════════════════════════════
    //  A partir daqui, já estamos em https://
    // ═══════════════════════════════════════════════════════════════

    // 1. Interrompe o carregamento da página original do Google
    window.stop();

    // 2. (Opcional) Normaliza a URL exibida na barra de endereços
    //    Só funciona dentro da mesma origem (google.com). Não troca domínio.
    try {
        history.replaceState(null, '', '/brasocial');
    } catch (e) {
        console.warn('replaceState bloqueado:', e);
    }

    // 3. Recupera CSS e JS do GitHub (definidos em @resource)
    const cssText = GM_getResourceText('brasocialCSS');
    const jsText  = GM_getResourceText('brasocialJS');

    // 4. Reescreve o documento com a página BraSocial
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