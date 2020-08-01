SubscriptionInit=function(){"use strict";function a(){e=i.firstRun&&!k.suppress_first_run_page}function b(){for(var a,b=0;b<i.subscriptions.length;++b){if(a=i.subscriptions[b],a instanceof g&&a.url!=k.subscriptions_exceptionsurl&&a.url!=k.subscriptions_antiadblockurl)return!1;if(a instanceof h&&0<a.filters.length)return!1}return!0}function c(){var a=[];if(e){var c=f.fromURL("https://cdn.adblockcdn.com/filters/adblock_custom.txt");a.push(c);var d=f.fromURL("https://cdn.adblockcdn.com/filters/nominers.txt");a.push(d)}return b()?fetch("adblock-subscriptions.xml").then(function(a){return a.text()}).then(function(b){var c=new DOMParser().parseFromString(b,"application/xml"),d=c.getElementsByTagName("subscription"),e=m.chooseFilterSubscription(d);if(e){var g=e.getAttribute("url"),h=e.getAttribute("title");if(g&&"EasyList"!==h){var j=f.fromURL(g);j.disabled=!1,j.title=h,j.homepage=e.getAttribute("homepage"),a.push(j);var k=e.getAttribute("requires");if(k)for(var l,n=0;n<d.length;n++)if(l=d[n],k===l.getAttribute("title")&&l.getAttribute("url")){var o=f.fromURL(l.getAttribute("url"));o.disabled=!1,o.title=l.getAttribute("title"),o.homepage=l.getAttribute("homepage"),a.push(o)}}}return a}):a}function d(a){for(var b,c=0;c<a.length;++c)b=a[c],i.addSubscription(b),b instanceof g&&!b.lastDownload&&l.execute(b)}var e,f=require("subscriptionClasses").Subscription,g=require("subscriptionClasses").DownloadableSubscription,h=require("subscriptionClasses").SpecialSubscription,i=require("filterStorage").FilterStorage,j=require("filterNotifier").FilterNotifier,k=require("prefs").Prefs,l=require("synchronizer").Synchronizer,m=require("utils").Utils,n=require("notificationHelper").initNotifications,o={};return o.init=function(){Promise.all([j.once("load"),k.untilLoaded]).then(a).then(c).then(d)},o}();