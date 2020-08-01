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

function restoreOptions() {
	chrome.storage.sync.get(settings => {
		Object.keys(defaultSettings).forEach(key => {
			if (settings.hasOwnProperty(key)) document.getElementById(key).checked = settings[key];
			else document.getElementById(key).checked = defaultSettings[key];
		});
	});
}

document.addEventListener("DOMContentLoaded", restoreOptions);

var checks = document.getElementsByTagName("input");
for (var i = 0; i < checks.length; i++) {
	checks[i].addEventListener('change', function() {
		var listElem = this.parentNode.parentNode;
		var childCbs = listElem.getElementsByTagName("input");
		for (var i = 1; i < childCbs.length; i++) childCbs[i].checked = this.checked;
		if (listElem.parentNode.parentNode.tagName === "LI" && !this.checked) checkParents(listElem.parentNode.children);
		Object.keys(defaultSettings).forEach(key => defaultSettings[key] = document.getElementById(key).checked);
		chrome.storage.sync.clear();
		chrome.storage.sync.set(defaultSettings);
	});
}

function checkParents(cbSiblings) {
	var parentLi = cbSiblings[0].parentNode.parentNode;
	parentLi.getElementsByTagName("input")[0].checked = false;
	if (parentLi.parentNode.parentNode.tagName === "LI") checkParents(parentLi.parentNode.children);
}

document.getElementById("reload").addEventListener("click", function() {chrome.tabs.reload();});
