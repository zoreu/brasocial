// ==UserScript==
// @name         BraSocial no Google
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Substitui a página do Google pela BraSocial e força HTTPS
// @author       Você
// @match        http://google.com/brasocial*
// @match        https://google.com/brasocial*
// @match        http://www.google.com/brasocial*
// @match        https://www.google.com/brasocial*
// @run-at       document-start
// @grant        GM_getResourceText
// @resource     brasocialCSS https://raw.githubusercontent.com/zoreu/brasocial/main/assets/index-EdyV0dX8.css
// @resource     brasocialJS https://raw.githubusercontent.com/zoreu/brasocial/main/assets/index-CLe3gXM7.js
// ==/UserScript==

(function() {
    'use strict';

    // ── 1. Força HTTPS antes de qualquer coisa ─────────────────────────
    // Se a página atual for http, redireciona para a versão https
    // preservando o caminho e a query string.
    if (location.protocol === 'http:') {
        location.replace(
            'https://' + location.host + location.pathname + location.search + location.hash
        );
        return; // interrompe a execução; o redirect vai recarregar o script em https
    }

    // ── 2. Para o carregamento da página original do Google ───────────
    window.stop();

    // ── 3. (Opcional) Altera a URL exibida na barra de endereços ──────
    // history.replaceState só permite mudar o path/query/hash dentro da
    // MESMA origem (google.com). Para mudar o domínio seria necessário
    // um redirect real, o que sairia da página do Google.
    // Exemplo: exibir "google.com/brasocial" em vez de "google.com/brasocial?foo=bar"
    try {
        history.replaceState(null, '', '/brasocial');
    } catch (e) {
        // Alguns navegadores/CSP podem bloquear; ignora silenciosamente
        console.warn('Não foi possível alterar a URL:', e);
    }

    // ── 4. Carrega os assets do GitHub ────────────────────────────────
    const cssText = GM_getResourceText('brasocialCSS');
    const jsText  = GM_getResourceText('brasocialJS');

    // ── 5. Reescreve o documento com a página BraSocial ──────────────
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