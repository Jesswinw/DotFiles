"use strict";
var defaultSettings = {
	hide_feed: true,
	hide_sidebar: true,
	hide_recommended: true,
	hide_chat: true,
	hide_playlists: true,
	hide_endscreen: true,
	hide_cards: false,
	hide_comments: false,
	hide_prof: false,
	hide_mix: true,
	hide_merch: true,
	hide_meta: false,
	hide_bar: false,
	hide_desc: false,
	hide_header: false,
	hide_notifs: true,
	hide_left: true,
	hide_search: true,
	hide_trending: false,
	hide_autoplay: true,
	hide_annotations: true,
	playlists_off: false
};
var htmlElem = document.documentElement;

function updateOptions() {
	chrome.storage.sync.get(settings => {
		Object.keys(defaultSettings).forEach(key => {
			if (settings.hasOwnProperty(key))
				htmlElem.setAttribute(key, settings[key]);
			else
				htmlElem.setAttribute(key, defaultSettings[key]);
		});
	});
}

if (window === window.parent || document.getElementById("player")) {
	updateOptions();
	chrome.storage.onChanged.addListener(updateOptions);
	var elem = document.createElement("script");
	elem.src = chrome.runtime.getURL("js/clean-up-youtube.js");
	htmlElem.appendChild(elem);
}
