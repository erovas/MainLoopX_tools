/**
 * Import.js v1.1.0
 * Pequeña librería para "importar" scripts y estilos de forma sincrona, asincrona ó diferido (default)
 * (c) 2021 Emanuel Rojas Vásquez
 * MIT License
 * [Compatibility IE11+]
 * https://github.com/erovas/Import.js
 */
 !function(e,i){if(e.Import)return console.error("Import.js has already been defined");function c(){}let a=i.head,d="load",u="error";function p(r,e,o){return function(n){if(e){let e=i.createElement("style");e.innerHTML=n,a.appendChild(e);var t=e.sheet.cssRules;for(let e=0;e<t.length;e++)r.sheet.insertRule(t[e],e);a.removeChild(e),a.appendChild(r),o(r)}else r.innerHTML=n,a.appendChild(r),a.removeChild(r),o(r)}}function t(n,t,e){var r="STYLE"==n.tagName,o=e||{},e=o.mode;let s=o[d]||c,l=o[u]||c;"sync"==e?function(e,n,t){let r=new XMLHttpRequest;r.open("GET",e,!1),r.send();var o=r.status;200<=o&&o<300||304==o?n(r.responseText):t(e,o,r.statusText)}(t,p(n,r,s),l):"async"==e?function(n,t,r){let o=new XMLHttpRequest;o.onloadend=function(){var e=o.status;200<=e&&e<300||304==e?t(o.responseText):r(n,e,o.statusText)},o.open("GET",n,!0),o.send()}(t,p(n,r,s),l):(r?((n=i.createElement("link")).href=t,n.rel="stylesheet"):(n.async=!1,n.src=t),n.onload=function(){r||a.removeChild(n),s(n)},n.onerror=function(e){a.removeChild(n),l(t,-1,"unknow")},a.appendChild(n))}e.Import={JS:function(e,n){t(i.createElement("script"),e+".js",n)},CSS:function(e,n){t(i.createElement("style"),e+".css",n)}}}(window,document);