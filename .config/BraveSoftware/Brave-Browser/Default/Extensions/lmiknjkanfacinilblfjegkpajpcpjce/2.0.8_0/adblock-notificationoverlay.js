window.top===window&&function(){var b="_ABiframe",c="_ABstyle";chrome.extension.onRequest.addListener(function(a,b,c){"showoverlay"===a.command&&a.overlayURL&&a.tabURL===document.location.href&&(d(a.overlayURL),c({ack:a.command}))});var d=function(a){if(!(document.getElementById("_ABoverlay")&&document.getElementById(b))){var d=document.body;if(d){var e=document.createElement("div");e.id="_ABoverlay",d.insertBefore(e,d.firstChild),window.addEventListener("resize",g),window.addEventListener("message",f);var i=document.createElement("style");i.type="text/css",i.id=c,(document.head||document.documentElement).insertBefore(i,null),i.sheet.insertRule("@media print { #_ABoverlay{ height: 0px; display:none } }",0),i.sheet.insertRule("#_ABoverlay { display:block; top:0px; left:0px; height: 0px; width:100%;position:fixed; z-index:2147483647 !important }",0),i.sheet.insertRule("#_ABiframe {border:0px }",0);var j=document.createElement("iframe");j.id=b;var k=h();j.style.width=k+"px",j.scrolling="no";var l=function(){j.style.height="27px",e.style.height="27px"};SAFARI&&(e.appendChild(j),j.src=""+a,l())}}},e=function(){var a=function(a){var b=document.getElementById(a);b&&b.parentNode.removeChild(b)};a("_ABoverlay"),a(c),window.removeEventListener("resize",g),window.removeEventListener("message",f)},f=function(a){"removethe_ABoverlay"==a.data&&e()},g=function(){var c=document.getElementById("_ABoverlay"),d=document.getElementById(b);if(c&&d){var e=h();c.style.width=e+"px",d.style.width=e+"px"}},h=function(){var a=Math.max;if(!window||!window.document)return 0;var b=window.innerWidth,c=document.createElement("div");c.style.cssText="left:0px; right:0px; top:0px; height:0px; visibility:hidden",document.body.appendChild(c);try{if(0>=c.offsetWidth)return b;var d=window.getComputedStyle(document.body);if(!d)return 0;var e=parseInt(d.marginLeft),f=parseInt(d.marginRight);return 0<e||0<f?c.offsetWidth+f+e:a(c.offsetWidth,document.body.offsetWidth)}finally{document.body.removeChild(c)}}}();