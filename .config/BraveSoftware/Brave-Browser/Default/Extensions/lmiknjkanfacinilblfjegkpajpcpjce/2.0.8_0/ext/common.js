"use strict";(function(){("undefined"==typeof chrome||"undefined"==typeof chrome.extension)&&(window.chrome=window.browser),window.ext={};let a=ext._EventTarget=function(){this._listeners=new Set};a.prototype={addListener(a){this._listeners.add(a)},removeListener(a){this._listeners.delete(a)},_dispatch(...a){let b=[];for(let c of this._listeners)b.push(c(...a));return b}};let b=Array.prototype[Symbol.iterator];Symbol.iterator in HTMLCollection.prototype||(HTMLCollection.prototype[Symbol.iterator]=b),Symbol.iterator in NodeList.prototype||(NodeList.prototype[Symbol.iterator]=b),ext.onMessage=new ext._EventTarget,ext.backgroundPage={sendMessage:chrome.runtime.sendMessage,getWindow(){return chrome.extension.getBackgroundPage()}},ext.getURL=chrome.extension.getURL,ext.i18n=chrome.i18n})();