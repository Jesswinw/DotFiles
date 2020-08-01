var getDecodedHostname=require("url").getDecodedHostname;with(require("filterClasses"))this.Filter=Filter,this.WhitelistFilter=WhitelistFilter;with(require("subscriptionClasses"))this.Subscription=Subscription,this.SpecialSubscription=SpecialSubscription,this.DownloadableSubscription=DownloadableSubscription;with(require("filterValidation"))this.parseFilter=parseFilter,this.parseFilters=parseFilters;var FilterStorage=require("filterStorage").FilterStorage,FilterNotifier=require("filterNotifier").FilterNotifier,Prefs=require("prefs").Prefs,Synchronizer=require("synchronizer").Synchronizer,Utils=require("utils").Utils,NotificationStorage=require("notification").Notification,punycode=require("punycode");const{RegExpFilter}=require("filterClasses");var SAFARI=!1,createPageWhitelistFilter=function(a){var a=a.replace(/#.*$/,""),b=a.match(/^([^\?]+)(\??)/),c=b[2],d="@@|"+b[1]+(c?"?":"|")+"$document";return addCustomFilter(d)},tryToUnwhitelist=function(a){a=a.replace(/#.*$/,"");var b=getUserFilters();if(!b||0===!b.length)return!1;for(var c=0;c<b.length;c++){var d=b[c],e=d.search(/@@\*\$document,domain=\~/);if(-1<e){a=a.replace(/((http|https):\/\/)?(www.)?/,"").split(/[/?#]/)[0];var f=Filter.fromText(d);FilterStorage.removeFilter(f);var g=Filter.fromText(d+"|~"+a);return FilterStorage.addFilter(g),!0}if(isWhitelistFilter(d)){try{var h=Filter.fromText(d)}catch(a){continue}if(h.matches(a,RegExpFilter.typeMap.DOCUMENT,!1))return FilterStorage.removeFilter(h),!0}}return!1},addCustomFilter=function(a){try{var b=Filter.fromText(a);return FilterStorage.addFilter(b),isSelectorFilter(a)&&countCache.addCustomFilterCount(a),null}catch(a){return a.toString()}},removeCustomFilter=function(a){var b=getUserFilters();if(!b||0===!b.length)return!1;for(var c,d=0;d<b.length;d++)if(c=b[d],0===c.indexOf(a)){var e=Filter.fromText(c);FilterStorage.removeFilter(e)}},countCache=function(){var a,b=function(){ext.storage.set("custom_filter_count",a)};return{updateCustomFilterCountMap:function(c){a=c||a,b()},removeCustomFilterCount:function(c){c&&a[c]&&(delete a[c],b())},getCustomFilterCount:function(b){return a[b]||0},addCustomFilterCount:function(c){var d=c.split("##")[0];a[d]=this.getCustomFilterCount(d)+1,b()},init:function(){ext.storage.get("custom_filter_count",function(b){a=b.custom_filter_count||{}})}}}();countCache.init();var updateCustomFilterCountMap=function(a){countCache.updateCustomFilterCountMap(a)},removeCustomFilterForHost=function(a){countCache.getCustomFilterCount(a)&&(removeCustomFilter(a),countCache.removeCustomFilterCount(a))},confirmRemovalOfCustomFiltersOnHost=function(a,b){var c=countCache.getCustomFilterCount(a),d=translate("confirm_undo_custom_filters",[c,a]);confirm(d)&&(removeCustomFilterForHost(a),SAFARI?b.url=b.url:chrome.tabs.reload(b.id))},reloadTab=function(a,b){var c=b,d=function(a,b,e){"complete"===b.status&&"complete"===e.status&&setTimeout(function(){chrome.tabs.sendMessage(a,{command:"reloadcomplete"}),"function"==typeof c&&c(e),chrome.tabs.onUpdated.removeListener(d)},2e3)};"string"==typeof a&&(a=parseInt(a)),chrome.tabs.onUpdated.addListener(d),chrome.tabs.reload(a,{bypassCache:!0},function(){})},isSelectorFilter=function(a){return /\#\@?\#./.test(a)},isWhitelistFilter=function(a){return /^\@\@/.test(a)},isSelectorExcludeFilter=function(a){return /\#\@\#./.test(a)};(function(){ext.onMessage.addListener(function(a,b,c){if("call"==a.command){var d=window[a.fn];!d,a.args&&a.args.push&&a.args.push(b);var e=d.apply(window,a.args);c(e)}})})();var getAdblockUserId=function(){return STATS.userId()},addGABTabListeners=function(a){gabQuestion.addGABTabListeners(a)},removeGABTabListeners=function(a){gabQuestion.removeGABTabListeners(a)},getCurrentTabInfo=function(a,b){ext.pages.query({active:!0,lastFocusedWindow:!0},function(c){if(0!==c.length){if(page=c[0],page&&!page.url)return void(b||window.setTimeout(function(){getCurrentTabInfo(a,!0)},250));page.unicodeUrl=getUnicodeUrl(page.url.href);var d=pageIsUnblockable(page.unicodeUrl),e=Prefs.show_statsinicon,f={page:page,disabledSite:d,settings:getSettings()};d||(f.whitelisted=checkWhitelisted(page)),a(f)}})},pageIsUnblockable=function(a){if(!a)return!0;var b="";return b=a.protocol?a.protocol:parseUri(a).protocol,"http:"!==b&&"https:"!==b&&"feed:"!==b},pageIsWhitelisted=function(a){return checkWhitelisted(a.page)!=null},pausedKey="paused",pausedFilterText1="@@",pausedFilterText2="@@^$document",adblockIsPaused=function(a){if(a===void 0)return!0===sessionstorage_get(pausedKey);var b=parseFilter(pausedFilterText1),c=parseFilter(pausedFilterText2);!0===a?(FilterStorage.addFilter(b.filter),FilterStorage.addFilter(c.filter),ext.storage.set(pausedKey,!0)):(FilterStorage.removeFilter(b.filter),FilterStorage.removeFilter(c.filter),ext.storage.remove(pausedKey)),sessionstorage_set(pausedKey,a)};ext.storage.get(pausedKey,function(a){if(a[pausedKey]){var b=function(a){if("load"==a){FilterNotifier.removeListener(b);var c=parseFilter(pausedFilterText1),d=parseFilter(pausedFilterText2);FilterStorage.removeFilter(c.filter),FilterStorage.removeFilter(d.filter),ext.storage.remove(pausedKey)}};FilterNotifier.addListener(b)}});var readfile=function(a){var b=new XMLHttpRequest;return b.open("GET",chrome.extension.getURL(a),!1),b.send(),b.responseText};""!==chrome.runtime.id||chrome.runtime.onInstalled.addListener(function(a){"update"!==a.reason&&"install"!==a.reason});var updateStorageKey="last_known_version";chrome.runtime.onInstalled.addListener(function(a){("update"===a.reason||"install"===a.reason)&&localStorage.setItem(updateStorageKey,chrome.runtime.getManifest().version)});var openTab=function(a){ext.pages.open(a)},createWhitelistFilterForYoutubeChannel=function(a){if(/ab_channel=/.test(a))var b=a.match(/ab_channel=([^]*)/)[1];else var b=a.split("/").pop();if(b){var c="@@|https://www.youtube.com/*"+b+"|$document";return addCustomFilter(c)}};var runChannelWhitelist=function(a,b){"www.youtube.com"===parseUri(a).hostname&&getSettings().youtube_channel_whitelist&&!parseUri.parseSearch(a).ab_channel&&chrome.tabs.executeScript(b,{file:"adblock-ytchannel.js",runAt:"document_start"})};chrome.tabs.onCreated.addListener(function(a){chrome.runtime.lastError||chrome.tabs.get(a.id,function(a){chrome.runtime.lastError||a&&a.url&&a.id&&runChannelWhitelist(a.url,a.id)})}),chrome.tabs.onUpdated.addListener(function(a,b){if(!chrome.runtime.lastError&&"loading"===b.status){if(chrome.runtime.lastError)return;chrome.tabs.get(a,function(a){a&&a.url&&a.id&&runChannelWhitelist(a.url,a.id)})}});var youTubeHistoryStateUpdateHanlder=function(a){if(a&&a.hasOwnProperty("frameId")&&a.hasOwnProperty("tabId")&&a.hasOwnProperty("url")&&a.hasOwnProperty("transitionType")&&"link"===a.transitionType){var b=new URL(a.url);if("www.youtube.com"===b.hostname){var c=ext.getFrame(a.tabId,a.frameId),d=ext.getPage(a.tabId),e=checkWhitelisted(d);d.url=b,d._url=b,c.url=b,c._url=b;var f=checkWhitelisted(d);f||f===e||d.sendMessage({type:"reloadStyleSheet"})}}},addYouTubeHistoryStateUpdateHanlder=function(){chrome.webNavigation.onHistoryStateUpdated.addListener(youTubeHistoryStateUpdateHanlder)},removeYouTubeHistoryStateUpdateHanlder=function(){chrome.webNavigation.onHistoryStateUpdated.removeListener(youTubeHistoryStateUpdateHanlder)};_settings.onload().then(function(){getSettings().youtube_channel_whitelist&&addYouTubeHistoryStateUpdateHanlder()});function isSafariContentBlockingAvailable(){return SAFARI&&safari}var getDebugInfo=function(a){response={},response.other_info={},response.other_info.buildtype=SAFARI?-1<safari.extension.baseURI.indexOf("com.betafish.adblockforsafari-UAMUU4S2D9")?" Stable":" Unofficial":"pljaalgmajnlogcgiohkhdmgpomjcihk"===chrome.runtime.id?" Beta":"gighmmpiobklfepjocnamgkkbiglidom"===chrome.runtime.id||"aobdicepooefnbaeokijohmhjlleamfj"===chrome.runtime.id?" Stable":" Unofficial",response.other_info.version=chrome.runtime.getManifest().version;var b={},c=getSubscriptionsMinusText();for(var d in c)c[d].subscribed&&(b[d]={},b[d].lastSuccess=new Date(1e3*c[d].lastSuccess),b[d].lastDownload=new Date(1e3*c[d].lastDownload),b[d].downloadCount=c[d].downloadCount,b[d].downloadStatus=c[d].downloadStatus);response.subscriptions=b;var e=getUserFilters();e&&e.length&&(response.custom_filters=e.join("\n"));var f={},g=getSettings();for(setting in g)f[setting]=JSON.stringify(g[setting]);if(response.settings=f,response.prefs=JSON.stringify(Prefs),response.other_info.browser=STATS.browser,response.other_info.browserVersion=STATS.browserVersion,response.other_info.osVersion=STATS.osVersion,response.other_info.os=STATS.os,window.blockCounts&&(response.other_info.blockCounts=blockCounts.get()),localStorage&&localStorage.length){response.other_info.localStorageInfo={},response.other_info.localStorageInfo.length=localStorage.length;var h=1;for(var i in localStorage)response.other_info.localStorageInfo["key"+h]=i,h++}else response.other_info.localStorageInfo="no data";response.other_info.is_adblock_paused=adblockIsPaused(),ext.storage.get("total_pings",function(b){response.other_info.total_pings=b.total_pings||0;chrome.storage.local.get("exclude_filters",function(b){b&&b.exclude_filters&&(response.excluded_filters=b.exclude_filters);chrome.storage.local.get("migrateLogMessageKey",function(b){if(b&&b.migrateLogMessageKey){messages=b.migrateLogMessageKey.split("\n");for(var c,d=0;d<messages.length;d++)c="migration_message_"+d,response.other_info[c]=messages[d]}a&&a(response)})})})};function updateFilterLists(){for(var a,b=0;b<FilterStorage.subscriptions.length;b++)a=FilterStorage.subscriptions[b],a instanceof DownloadableSubscription&&Synchronizer.execute(a,!0,!0)}function getUserFilters(){for(var a,b=[],c=0;c<FilterStorage.subscriptions.length;c++)if(a=FilterStorage.subscriptions[c],!!(a instanceof SpecialSubscription))for(var d,e=0;e<a.filters.length;e++)d=a.filters[e],b.push(d.text);return b}getUnicodeDomain=function(a){return a?punycode.toUnicode(a):a},getUnicodeUrl=function(a){if(a&&0<a.indexOf("xn--")){var b=parseUri(a);return b.href=b.href.replace(b.hostname,punycode.toUnicode(b.hostname)),b.href}return a};