if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let a={};const t=e=>n(e,o),c={module:{uri:o},exports:a,require:t};i[o]=Promise.all(r.map((e=>c[e]||t(e)))).then((e=>(s(...e),a)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BftXpNu1.js",revision:null},{url:"assets/index-BKRr9T5u.css",revision:null},{url:"index.html",revision:"848d495ef02a902a4e966c2a6635b437"},{url:"registerSW.js",revision:"b99b15ab742379b748ea617a9ab5ee14"},{url:"favicon.ico",revision:"14b459643951b62dde1b41bc88d9ce1a"},{url:"maskable-icon-512x512.png",revision:"12f4727fb8858ab29c30a3a608d3f8eb"},{url:"pwa-192x192.png",revision:"538dcc6b1f4ab3188e284985b744cc5f"},{url:"pwa-512x512.png",revision:"2de0c7fa443cfe138a1a850bb462c450"},{url:"pwa-64x64.png",revision:"77ea7f4ca1cb5b52a70d08df134a5e6c"},{url:"manifest.webmanifest",revision:"011804a855956caa9d35f10fbd39a619"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
