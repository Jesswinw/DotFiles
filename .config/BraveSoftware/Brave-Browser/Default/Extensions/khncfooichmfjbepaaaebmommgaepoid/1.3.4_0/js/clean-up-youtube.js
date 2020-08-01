"use strict";
var toggle, playerCont, atpVal, annVal, adClass;
var adListener = false, lenListener = false, embedListener = false, dimListener = false;
var htmlElem = document.documentElement;

if (window === window.parent && (window.Polymer || document.body.id === "body") && document.cookie.indexOf("SID=") === -1)
	htmlElem.classList.add("yt-signed-out");

function timeOut(waitTime, option) {
	if (option.getAttribute("aria-checked") === "true") {
		option.click();
		setTimeout(timeOut.bind(null, waitTime, option), waitTime);
	}
}

function adRsCheck(playerCont) {
	if (!playerCont.getElementsByClassName("html5-video-player")[0]) return;
	var classes = playerCont.getElementsByClassName("html5-video-player")[0].classList;
	if (adClass || classes.contains("ad-interrupting")) {
		adClass = classes.contains("ad-interrupting");
		if (atpVal || annVal) {
			if (adClass) {
				if (annVal) {
					var [, newAnn] = classCheck(false, true, playerCont);
					if (newAnn) settingsCheck(false, true, playerCont);
				}
			} else {
				var [newAtp, newAnn] = classCheck(atpVal, annVal, playerCont, 2500);
				if (newAtp || newAnn) settingsCheck(newAtp, newAnn, playerCont, 2500);
			}
		}
	}
}

function settingsCheck(isAtp, isAnn, playerCont, waitTime) {
	if (toggle = playerCont.getElementsByClassName("ytp-settings-button")[0]) {
		toggle.click(); toggle.click();
		var retry = false;
		var video = playerCont.getElementsByTagName("video")[0];
		var classes = playerCont.getElementsByClassName("html5-video-player")[0].classList;
		if (!adListener && !embedListener && classes.contains("ad-created")) {
			adClass = classes.contains("ad-interrupting");
			video.addEventListener("resize", adRsCheck.bind(null, playerCont));
			adListener = true;
		}
		(function settingsLoop() {
			var labels = playerCont.getElementsByClassName("ytp-menuitem-label");
			if (!labels.length || (labels.length === 1 && labels[0].innerHTML !== "Annotations")) {
				if (!lenListener && !adListener && !embedListener) {
					video.addEventListener("resize", settingsLoop);
					lenListener = true;
				}
			} else {
				if (lenListener) {
					video.removeEventListener("resize", settingsLoop);
					lenListener = false;
				}
				var atpToggle, annToggle;
				for (var i = 0; i < labels.length; i++) {
					if (labels[i].innerHTML === "Autoplay") {
						atpToggle = labels[i].parentNode;
						atpToggle.classList.add("atpOption");
						if (isAtp) {
							if (waitTime) setTimeout(timeOut.bind(null, waitTime, atpToggle), waitTime);
							if (atpToggle.getAttribute("aria-checked") === "true") atpToggle.click();
							if (!isAnn) return;
						}
					} else if (labels[i].innerHTML === "Annotations") {
						annToggle = labels[i].parentNode;
						annToggle.classList.add("annOption");
						if (isAnn) {
							if (waitTime) setTimeout(timeOut.bind(null, waitTime, annToggle), waitTime);
							if (annToggle.getAttribute("aria-checked") === "true") annToggle.click();
							if (!isAtp || atpToggle) return;
						}
					} else if (labels[i].innerHTML === "Playback speed") {
						if (!retry) {
							setTimeout(settingsLoop, 2000);
							retry = true;
						}
						return;
					}
				}
			}
		}());
	} else if (!playerCont.getElementsByClassName("ytp-unmute")[0] && !playerCont.hidden &&
	!playerCont.getElementsByClassName("watchThumbImageContainer")[0] && document.body.contains(playerCont))
		setTimeout(settingsCheck.bind(null, isAtp, isAnn, playerCont, waitTime), 2000);
}

function classCheck(isAtp, isAnn, playerCont, waitTime) {
	var atpToggle, annToggle;
	if (isAtp && (atpToggle = playerCont.getElementsByClassName("atpOption")[0])) {
		if (waitTime) setTimeout(timeOut.bind(null, waitTime, atpToggle), waitTime);
		if (atpToggle.getAttribute("aria-checked") === "true") atpToggle.click();
		isAtp = false;
	}
	if (isAnn && (annToggle = playerCont.getElementsByClassName("annOption")[0])) {
		if (waitTime) setTimeout(timeOut.bind(null, waitTime, annToggle), waitTime);
		if (annToggle.getAttribute("aria-checked") === "true") annToggle.click();
		isAnn = false;
	}
	var video = playerCont.getElementsByTagName("video")[0];
	var classes = playerCont.getElementsByClassName("html5-video-player")[0];
	if (video && !adListener && !embedListener && (classes = classes.classList) && classes.contains("ad-created")) {
		adClass = classes.contains("ad-interrupting");
		video.addEventListener("resize", adRsCheck.bind(null, playerCont));
		adListener = true;
	}
	return [isAtp, isAnn];
}

function newCheck(isAtp, isAnn) {
	if (!window.Polymer) return;
	if ((playerCont = document.getElementsByTagName("ytd-watch-flexy")[0]) && !(playerCont.hidden)) {
		[isAtp, isAnn] = classCheck(isAtp, isAnn, playerCont, 1500);
		if (isAtp && ((toggle = document.getElementById("toggle")) || (toggle = document.getElementById("improved-toggle"))))
			if (toggle.checked || toggle.active) toggle.click();
		if (isAtp || isAnn) settingsCheck(isAtp, isAnn, playerCont, 2500);
	} else if (isAnn && (playerCont = document.querySelector('ytd-browse[page-subtype="channels"]')) &&
	playerCont.getElementsByTagName("ytd-channel-video-player-renderer")[0] && !playerCont.hidden) {
		[, isAnn] = classCheck(false, true, playerCont, 1500);
		if (isAnn) settingsCheck(false, true, playerCont);
	}
	return true;
}

function oldCheck(isAtp, isAnn) {
	if (document.body.id !== "body") return;
	if (playerCont = document.querySelector('#body[data-spf-name="watch"] #page.watch')) {
		[isAtp, isAnn] = classCheck(isAtp, isAnn, playerCont, 1500);
		if (isAtp && (toggle = document.getElementById("autoplay-checkbox")))
			if (toggle.checked) toggle.click();
		if (isAtp || isAnn) settingsCheck(isAtp, isAnn, playerCont, 1500);
	} else if (isAnn && (playerCont = document.getElementById("upsell-video"))) {
		[, isAnn] = classCheck(false, true, playerCont);
		if (isAnn) settingsCheck(false, true, playerCont);
	}
	return true;
}

function mbCheck(isAtp, isAnn) {
	if (!document.getElementById("player-container-id")) return;
	if ((playerCont = document.getElementById("player")) && !playerCont.hidden) {
		if (isAtp && (toggle = document.querySelector(".ytm-autonav-toggle > button")))
			if (toggle.getAttribute("aria-pressed") === "true") toggle.click();
		if (isAnn) {
			[, isAnn] = classCheck(false, true, playerCont);
			if (isAnn) settingsCheck(false, true, playerCont);
		}
	}
	return true;
}

function embedCheck() {
	if (!(playerCont = document.getElementsByClassName("ytp-embed")[0])) return;
	var isAnn = true;
	if (embedListener) [, isAnn] = classCheck(false, true, playerCont);
	if (!embedListener && playerCont.getElementsByClassName("ytp-playlist-menu-button")[0].title) {
		playerCont.getElementsByTagName("video")[0].addEventListener("resize", function() {
			if (annVal) embedCheck();
		});
		embedListener = true;
	}
	if (isAnn) settingsCheck(false, true, document.body);
	return true;
}

function fsCheck() {
	var isFs;
	if (outerWidth && outerHeight) isFs = 1 >= outerWidth - innerWidth && 1 >= outerHeight - innerHeight;
	else isFs = screen.width === innerWidth && screen.height === innerHeight;
	if ((isFs === false) && htmlElem.getAttribute("is_fs") !== "false")
		htmlElem.setAttribute("is_fs", false);
	else if (isFs && htmlElem.getAttribute("is_fs") !== "true")
		htmlElem.setAttribute("is_fs", true);
}

if (window.Polymer) window.addEventListener("resize", fsCheck);

function dimCheck() {
	if (this && this.videoWidth) {
		var dim = this.videoWidth/this.videoHeight <= 2;
		if (dim !== (htmlElem.getAttribute("dimension") === "true")) htmlElem.setAttribute("dimension", dim);
	}
}

function dimInit() {
	if (!dimListener && (playerCont = document.getElementsByTagName("ytd-watch-flexy")[0]) && !playerCont.hidden) {
		var video;
		if (video = playerCont.getElementsByTagName("video")[0]) {
			video.addEventListener("resize", dimCheck);
			dimCheck.call(video);
			dimListener = true;
		} else setTimeout(dimInit, 1500);
	}
}

function listenerInit(v) {
	if (annVal == null) {
		atpVal = htmlElem.getAttribute("hide_autoplay") === "true";
		annVal = htmlElem.getAttribute("hide_annotations") === "true";
	}
	if ((v === 1 && window.Polymer) || v === 2) {
		if (!htmlElem.hasAttribute("is_fs")) fsCheck();
		if (!dimListener) dimInit();
	}
	if (atpVal || annVal)
		if (v === 1)
			newCheck(atpVal, annVal) || oldCheck(atpVal, annVal) || mbCheck(atpVal, annVal) || (annVal && embedCheck());
		else if (v === 2) newCheck(atpVal, annVal);
		else if (v === 3) oldCheck(atpVal, annVal);
		else if (v === 4) mbCheck(atpVal, annVal);
}

window.addEventListener("load", listenerInit.bind(null, 1));
window.addEventListener("yt-page-data-updated", listenerInit.bind(null, 2));
window.addEventListener("spfdone", listenerInit.bind(null, 3));
window.addEventListener("state-navigateend", listenerInit.bind(null, 4));

new MutationObserver(function(mutations) {
	if (annVal != null) {
		var atpOld = atpVal, annOld = annVal;
		atpVal = htmlElem.getAttribute("hide_autoplay") === "true";
		annVal = htmlElem.getAttribute("hide_annotations") === "true";
		if ((!atpOld && atpVal) || (!annOld && annVal))
			newCheck(atpVal, annVal) || oldCheck(atpVal, annVal) || mbCheck(atpVal, annVal) || ((!annOld && annVal) && embedCheck());
	}
}).observe(htmlElem, {attributes: true, attributeFilter: ["hide_cards"]});
