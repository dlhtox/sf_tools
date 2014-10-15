// ==UserScript==
// @name       MasterList
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @grant       none
// @description  Master list of salesforce scripts
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @updateURL   https://github.com/b1kjsh/sf_tools/raw/master/master.user.js
// @downloadURL   https://github.com/b1kjsh/sf_tools/raw/master/master.user.js
// @copyright  2012+, You
// ==/UserScript==

$(function () {
	console.log("Loaded Master");
	$.getScript("UserScripts/SF_color_coding.user.js");
});