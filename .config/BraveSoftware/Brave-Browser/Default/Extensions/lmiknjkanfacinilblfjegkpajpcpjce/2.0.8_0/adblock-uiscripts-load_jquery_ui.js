function bind_enter_click_to_default(){window.GLOBAL_ran_bind_enter_click_to_default||(GLOBAL_ran_bind_enter_click_to_default=!0,$("html").bind("keypress",function(a){13===a.keyCode&&0>=$("button:focus").size()&&(a.preventDefault(),$(".adblock_default_button").filter(":visible").click())}))}function load_jquery_ui(callback){function load_css(a){var b=chrome.extension.getURL(a),c=$("<link rel=\"stylesheet\" type=\"text/css\" />").attr("href",b).addClass("adblock-ui-stylesheet");$(document.head||document.documentElement).append(c)}load_css("adblock-jquery-ui.custom.css"),load_css("adblock-jquery-ui.override-page.css"),SAFARI?BGcall("readfile","adblock-jquery-ui.min.js",function(result){eval(result),BGcall("getL10NData",function(a){chrome.i18n._setL10nData(a),callback()})}):callback()}var text_direction=function(){var a=navigator.language.match(/^[a-z]+/i)[0];return"ar"===a||"he"===a?"rtl":"ltr"}();function changeTextDirection(a){a.attr("dir",text_direction),"rtl"===text_direction&&($(".ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset").css("float","left"),$(".ui-dialog .ui-dialog-title").css("float","right"),$(".ui-dialog .ui-dialog-titlebar").css("background-position","right center"),$(".ui-dialog .ui-dialog-titlebar-close").css({left:"0.3em",right:"initial"}))}