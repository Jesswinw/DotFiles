var proxyLegacyGlobals=function(){function c(e){try{e()}catch(e){console.log(e)}}function d(t,e,u){var o=null;return new Proxy(e,{set:function(e,r,n){return o||(o={},setTimeout(function(){c(function(){u(t,o)}),o=null})),e[r]=n,o[r]=n,!0}})}function e(e,t,u,o,r){var i=function(e){return e&&e[o]&&(!r||r(e))},s={};return new Proxy(e,{set:function(e,r,n){return e[r]=n,delete s[r],i(n)&&c(function(){t(n[o],n)}),!0},deleteProperty:function(e,r){var n=e[r],t=i(n);delete e[r],t&&c(function(){u(n[o])})},get:function(e,r){var n=e[r];return i(n)?(s[r]||(s[r]=d(n[o],n,t)),s[r]):e[r]}})}var r=function(e){return"http://group"!==e.url},n=function(e,r){var n={};for(var t in e)r(e[t])&&(n[t]=e[t]);return n};return function(){"undefined"!=typeof Proxy&&reduxApp&&(g_sites=e(g_sites,reduxApp.writeSite,reduxApp.removeSite,"aid",r),g_shares=e(g_shares,reduxApp.writeSharedFolder,reduxApp.removeSharedFolder,"id"),reduxApp.writeBlob({sites:n(g_sites,r),sharedFolders:g_shares}))}}();