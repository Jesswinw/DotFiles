var url=document.location.href,parseElem=document.createElement("textarea"),parseChannelName=function(a){return parseElem.innerHTML=a,a=parseElem.innerText,function(a){return encodeURIComponent(a).replace(/[!'()*]/g,function(a){return"%"+a.charCodeAt(0).toString(16)})}(a.replace(/\s/g,""))};if(!/ab_channel/.test(url)){function a(a){return parseUri(a).pathname.split("/")[2]}function b(a){return parseUri.parseSearch(a).v}function c(a,b){if(a=parseChannelName(a),b)var c=url+"?&ab_channel="+a.replace(/\s/g,"");else var c=url+"&ab_channel="+a.replace(/\s/g,"");window.history.replaceState(null,null,c),BGcall("pageIsWhitelisted",function(a){a&&window.location.reload(!1)})}if(/channel/.test(url)){var xhr=new XMLHttpRequest;xhr.open("GET","https://www.googleapis.com/youtube/v3/channels?part=snippet&id="+a(url)+"&key="+atob("QUl6YVN5QzJKMG5lbkhJZ083amZaUUYwaVdaN3BKd3dsMFczdUlz")),xhr.onload=function(){if(4===xhr.readyState&&200===xhr.status){var a=JSON.parse(xhr.response);a.items[0]&&c(a.items[0].snippet.title,!0)}},xhr.send(null)}else if(/watch/.test(url)){var xhr=new XMLHttpRequest;xhr.open("GET","https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+b(url)+"&key="+atob("QUl6YVN5QzJKMG5lbkhJZ083amZaUUYwaVdaN3BKd3dsMFczdUlz")),xhr.onload=function(){if(4===xhr.readyState&&200===xhr.status){var a=JSON.parse(xhr.response);a.items[0]&&c(a.items[0].snippet.channelTitle,!1)}},xhr.send(null)}else /user/.test(url)&&(document.addEventListener("spfdone",function(){var a=document.querySelector("span .qualified-channel-title-text > a");if(a){var b=document.querySelector("span .qualified-channel-title-text > a").textContent;c(b,!0)}},!0),window.addEventListener("DOMContentLoaded",function(){var a=document.querySelector("span .qualified-channel-title-text > a");if(a){var b=a.textContent;c(b,!0)}},!0))}function onMessage(a){"reloadStyleSheet"==a.type&&(elemhide=new ElemHide,elemhide.apply())}chrome.runtime.onMessage.addListener(onMessage);