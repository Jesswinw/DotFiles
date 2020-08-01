var backgroundPage=ext.backgroundPage.getWindow(),require=backgroundPage.require,Filter=require("filterClasses").Filter,FilterStorage=require("filterStorage").FilterStorage,Prefs=require("prefs").Prefs,getBlockedPerPage=require("stats").getBlockedPerPage,getDecodedHostname=require("url").getDecodedHostname,page=null,pageInfo=null,activeTab=null;$(function(){function a(){SAFARI?(safari.self.hide(),setTimeout(function(){window.location.reload()},200)):window.close()}localizePage();var b=chrome.extension.getBackgroundPage();$(".menu-entry, .menu-status, .separator").hide(),b.recordGeneralMessage("popup_opened"),b.getCurrentTabInfo(function(c){function d(a){a.forEach(function(a){f[a]=!0})}function e(a){a.forEach(function(a){f[a]=!1})}page=c.page,pageInfo=c;var f={};d(["div_options","separator2"]);var g=b.adblockIsPaused();g?d(["div_status_paused","separator0","div_paused_adblock","div_options"]):c.disabledSite?d(["div_status_disabled","separator0","div_pause_adblock","div_options","div_help_hide_start"]):c.whitelisted?d(["div_status_whitelisted","div_enable_adblock_on_this_page","separator0","div_pause_adblock","separator1","div_options","div_help_hide_start"]):(d(["div_pause_adblock","div_blacklist","div_whitelist","div_whitelist_page","div_show_resourcelist_start","div_report_an_ad","separator1","div_options","div_help_hide_start","separator3","block_counts"]),$("#page_blocked_count").text(getBlockedPerPage(page).toLocaleString()),$("#total_blocked_count").text(Prefs.blocked_total.toLocaleString()),$("#block_counts_help").toggle(c.settings.show_block_counts_help_link).click(function(){b.setSetting("show_block_counts_help_link",!1),ext.pages.open($(this).attr("href")),$(this).hide(),a()}));var h=parseUri(page.unicodeUrl).host,i=c.settings.show_advanced_options,j=!g&&(c.disabledSite||!c.whitelisted),k=c.disabledSite?void 0:h;for(var l in j&&b.countCache.getCustomFilterCount(k)&&d(["div_undo","separator0"]),SAFARI&&!advanced_option&&e(["div_report_an_ad","separator1"]),"www.youtube.com"===h&&/channel|user/.test(page.unicodeUrl)&&/ab_channel/.test(page.unicodeUrl)&&j&&c.settings.youtube_channel_whitelist&&($("#div_whitelist_channel").html(translate("whitelist_youtube_channel",parseUri.parseSearch(page.unicodeUrl).ab_channel)),d(["div_whitelist_channel"])),chrome.runtime&&"pljaalgmajnlogcgiohkhdmgpomjcihk"===chrome.runtime.id&&d(["div_status_beta"]),SAFARI&&c.settings.safari_content_blocking&&e(["div_paused_adblock","div_whitelist_page","div_whitelist"]),f)f[l]&&$("#"+l).show();(SAFARI||!Prefs.show_statsinpopup||g||c.disabledSite||c.whitelisted)&&$("#block_counts").hide()}),SAFARI&&($(window).load(function(){var a=$("body").outerHeight();safari.extension.popovers[0].height=a+5,safari.extension.popovers[0].width=270}),activeTab=safari.application.activeBrowserWindow.activeTab),$("#bugreport").click(function(){b.recordGeneralMessage("bugreport_clicked");ext.pages.open(""),a()}),$("#titletext").click(function(){b.recordGeneralMessage("titletext_clicked");OPERA||SAFARI,a()}),$("#div_enable_adblock_on_this_page").click(function(){b.recordGeneralMessage("enable_adblock_clicked"),b.tryToUnwhitelist(page.unicodeUrl)?(SAFARI?activeTab.url=activeTab.url:chrome.tabs.reload(),a()):$("#div_status_whitelisted").replaceWith(translate("disabled_by_filter_lists"))}),$("#div_paused_adblock").click(function(){b.recordGeneralMessage("unpause_clicked"),b.adblockIsPaused(!1),b.updateButtonUIAndContextMenus(),a()}),$("#div_undo").click(function(){b.recordGeneralMessage("undo_clicked");var c=parseUri(page.unicodeUrl).host;SAFARI||(activeTab=page),b.confirmRemovalOfCustomFiltersOnHost(c,activeTab),a()}),$("#div_whitelist_channel").click(function(){b.recordGeneralMessage("whitelist_youtube_clicked"),b.createWhitelistFilterForYoutubeChannel(page.unicodeUrl),a(),SAFARI?activeTab.url=activeTab.url:chrome.tabs.reload()}),$("#div_pause_adblock").click(function(){b.recordGeneralMessage("pause_clicked");try{pageInfo.settings.safari_content_blocking?alert(translate("safaricontentblockingpausemessage")):(b.adblockIsPaused(!0),b.updateButtonUIAndContextMenus()),a()}catch(a){b.log(a)}}),$("#div_blacklist").click(function(){b.recordGeneralMessage("blacklist_clicked"),SAFARI?b.dispatchMessage("show-blacklist-wizard"):b.emitPageBroadcast({fn:"top_open_blacklist_ui",options:{nothing_clicked:!0}},{tab:page}),a()}),$("#div_whitelist").click(function(){b.recordGeneralMessage("whitelist_domain_clicked"),SAFARI?b.dispatchMessage("show-whitelist-wizard"):b.emitPageBroadcast({fn:"top_open_whitelist_ui",options:{}},{tab:page}),a()}),$("#div_whitelist_page").click(function(){b.recordGeneralMessage("whitelist_page_clicked"),b.createPageWhitelistFilter(page.unicodeUrl),a(),SAFARI?activeTab.url=activeTab.url:chrome.tabs.reload()}),$("#div_show_resourcelist").click(function(){b.recordGeneralMessage("resource_clicked"),"Mac OS X"===backgroundPage.STATS.os&&$("#new_resourcelist_explanation").text(translate("new_resourcelist_explanation_osx")),$("#new_resourcelist_explanation").slideToggle()}),$("#div_report_an_ad").click(function(){b.recordGeneralMessage("report_ad_clicked");var c="adblock-adreport.html?url="+encodeURIComponent(page.unicodeUrl)+"&tabId="+page.id;b.ext.pages.open(b.ext.getURL(c)),a()}),$("#div_options").click(function(){b.recordGeneralMessage("options_clicked"),b.ext.pages.open(b.ext.getURL("options.html")),a()}),$("#div_help_hide").click(function(){b.recordGeneralMessage("help_clicked"),OPERA?$("#help_hide_explanation").text(translate("operabutton_how_to_hide2")).slideToggle():SAFARI?$("#help_hide_explanation").text(translate("safaributton_how_to_hide2")).slideToggle(function(){var a=$("body").outerHeight();safari.extension.popovers[0].height=a}):$("#help_hide_explanation").slideToggle()}),$("#link_open").click(function(){b.recordGeneralMessage("link_clicked"),a()})});