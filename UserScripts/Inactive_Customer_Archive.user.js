// ==UserScript==
// @name        Inactive_Customer_Archive
// @namespace   com.b1k.landesk
// @match     https://na13.salesforce.com/*
// @version     1
// @grant       none
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

/* TODO: add to Inactive response list */

$(document).ready(function () {
	var custName, dayoflastcomment, dayssincelastcomment, dayofarchival, textBody;
    // setup button
	$('#bottomButtonRow').append('<input class="btn" type="button" name="inactivatebutton" id="inactivatebutton" value="test" />');
	
	textBody = "Hello " + custName + ",\n\nI just wanted to notify you that your case will be archiving on " + dayofarchival + " as we have yet to receive a response from you on this case since " + dayoflastcomment + ". Please let us know if you have any further questions we can assist you with and we can reopen the case or create a new case if the issue comes up again in the future.\n\n Thanks!\n--\nJoshua Howard\nTechnical Support Engineer - Asset\nLANDesk LDMS Support";
	
	$('#inactivatebutton').click(function () {
		
	});
});