"undefined"==typeof may_open_dialog_ui&&(may_open_dialog_ui=!0);function top_open_whitelist_ui(){if(may_open_dialog_ui){may_open_dialog_ui=!1;var a=getUnicodeDomain(document.location.host);SAFARI&&""===a&&0===document.location.href.indexOf("feed:https")&&(a=parseUri(document.location.pathname).host),BGcall("emitPageBroadcast",{fn:"send_content_to_back",options:{}}),load_jquery_ui(function(){var d=Math.max;function b(){c(!0)}function c(a){var b="",c=$("#domainslider",g)[0].valueAsNumber,d=$("#pathslider",g)[0].valueAsNumber;a&&0!=c&&(b="*.");for(var e=c;e<=j.length-2;e++)b+=j[e]+".";b+=j[j.length-1];for(var e=1;e<=d;e++)b+="/"+l[e];if(l.length==d+1&&k[1]?k[2]&&(b+=k[2]):(b+="/",a&&(b+="*")),a){for(b=b.replace(/(\/[^\/]{6})[^\/]{3,}([^\/]{6})/g,"$1...$2"),30<b.indexOf("/")&&60<=b.length&&(b=b.replace(/^([^\/]{20})[^\/]+([^\/]{6}\/)/,"$1...$2"));60<=b.length;)b=b.replace(/(\/.{4}).*?\/.*?(.{4})(?:\/|$)/,"$1...$2/");var f=b.match(/^[^\/]+/)[0],h=b.match(/\/.*$/)[0];$("#domainpart",g).text(f),$("#pathpart",g).text(h)}else return b}if(1<=$("frameset").length)return alert(translate("wizardcantrunonframesets")),may_open_dialog_ui=!0,void $(".adblock-ui-stylesheet").remove();var e=translate("buttonexclude"),f={};f[e]={text:e,class:"adblock_default_button",click:function(){var a="@@||"+c()+"$document";BGcall("addCustomFilter",a,function(){$("#reload_page").is(":checked")?document.location.reload():(may_open_dialog_ui=!0,$(".adblock-ui-stylesheet").remove(),g.remove())})}},f[translate("buttoncancel")]=function(){g.dialog("close")};var g=$("<div>").append("<span>"+translate("adblock_wont_run_on_pages_matching")+"</span>").append("<br/><br/><i id=\"domainpart\"></i><i id=\"pathpart\"></i>").append("<br/><br/><br/><span id=\"whitelister_dirs\">"+translate("you_can_slide_to_change")+"</span>").append("<br/><span id=\"modifydomain\">"+translate("modifydomain")+"<input id=\"domainslider\" type=\"range\" min=\"0\" value=\"0\"/></span>").append("<span id=\"modifypath\">"+translate("modifypath")+"<input id=\"pathslider\" type=\"range\" min=\"0\" value=\"0\"/></span>").append("<br/><input type=\"checkbox\" id=\"reload_page\" checked/><label style=\"display: inline;\" for=\"reload_page\">"+translate("reloadpageafterwhitelist")+"</label>").dialog({title:translate("whitelistertitle2"),dialogClass:"adblock-whitelist-dialog",width:600,minHeight:130,buttons:f,close:function(){may_open_dialog_ui=!0,$(".adblock-ui-stylesheet").remove(),g.remove()}});changeTextDirection($("body .adblock-whitelist-dialog")),$(".adblock-whitelist-dialog").parent().css({position:"relative"}),$(".adblock-whitelist-dialog").css({top:200,left:200,position:"fixed"});var h=parseUri.secondLevelDomainOnly(a,!0),j=a.substr(0,a.lastIndexOf(h)).split(".");j.splice(j.length-1,1,h);var k=document.location.pathname.match(/(.*?)(\/?)(\?|$)/),l=k[1].split("/"),m=1===j.length,n=/^(\d+\.){3}\d+$/.test(a),o=!(m||n);$("#modifydomain",g).toggle(o);var p=!!k[1];$("#modifypath",g).toggle(p),$("#whitelister_dirs",g).toggle(o||p),$("#domainslider",g).attr("max",d(j.length-1,1)),$("#pathslider",g).attr("max",d(l.length-1,1)),$("#pathslider, #domainslider",g).on("input change",function(){b()}),b(),bind_enter_click_to_default()})}}