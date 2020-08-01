"use strict";
var hideTrending = false;
var playlistsOff = false;
var listIndex;

function updateTrending() {
	chrome.storage.sync.get(["hide_trending", "playlists_off"], function(settings) {
		if (settings["hide_trending"] != null)
			hideTrending = settings["hide_trending"];
		if (settings["playlists_off"] != null)
			playlistsOff = settings["playlists_off"];
	});
}

updateTrending();
chrome.storage.onChanged.addListener(updateTrending);

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		if (hideTrending && details.url.indexOf("trending") !== -1)
			return {redirectUrl: "https://www.youtube.com"};
		else if (playlistsOff && (listIndex = details.url.indexOf("&list=")) !== -1) {
			if (details.url.substring(8, 9) === "m")
				chrome.tabs.update({"url": details.url.substring(0, listIndex)});
			else return {redirectUrl: details.url.substring(0, listIndex)};
		}
	},
	{
		urls: [
			"https://*.youtube.com/feed/trending*",
			"https://*.youtube.com/watch?v=*&list=*"
		],
		types: ["main_frame", "sub_frame", "xmlhttprequest"]
	},
	["blocking"]
);
