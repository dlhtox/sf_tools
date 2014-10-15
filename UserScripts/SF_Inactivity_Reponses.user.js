// ==UserScript==
// @name        SF_Inactivity_Reponses
// @namespace   https://github.com/b1kjsh/sf_tools
// @include     https://na19.salesforce.com/500*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @updateURL	https://github.com/b1kjsh/sf_tools/raw/master/UserScripts/SF_Inactivity_Reponses.user.js
// @downloadURL https://github.com/b1kjsh/sf_tools/raw/master/UserScripts/SF_Inactivity_Reponses.user.js
// @version     1
// @grant       none
// ==/UserScript==
// $(document).ready(function() {

	var resp_00,resp_01,resp_02;
	var resp_00_button,resp_01_button,resp_02_button;


// Based off information from Days since last modified is greater than 2, and the case status is Open: Waiting on Customer
// I would automatically send:

resp_00 = "Just checking in. I wanted to check on the status of this case. Do you need any more assistance? Let me know how I may assist you. \n\n" +
"Regards,\n\n";
/* 
If Days since last modified is greater than 3, and the case status is Open: Waiting on Customer
I would automatically send:
*/

resp_01 = "Is there any news regarding this case? I would like to know how you would like to proceed with this case. Would you prefer I keep checking in, just wait to hear back from you, or close this case out and we can open it again if there are problems. I want to make sure you are supported, but don't want to continually bother you either.\n\n" +
"Let me know how to proceed.\n\n" +
"Regards,\n\n";

// If Days since last modified is greater than 4, and the case status is Open: Waiting on Customer
// I would automatically send:

resp_02 = "As I have not heard anything back regarding my previous emails, and I can't keep cases open indefinitely, I will go ahead and archive this case. This case can be reopened at your convenience. If you have new information regarding this case or have any questions, please reference this case number and do one of the following to reopen this case: Reply to this email, open a new ticket at support.landesk.com, or call 1.800.581.4553.\n\n" +
"Have a great day!\n\n" +
"Regards,\n\n";

function createButton(val) {
	var id = val.replace(/ /,'_');
	$('.pbBottomButtons').append('<input type=button class=mbutton value="'+val+'" id="'+id+'"/>');
	switch (val){
		case '2 Day':
		val = resp_00;
		break;
		case '3 Day':
		val = resp_01;
		break;
		case '4 Day':
		val = resp_02;
		break;
	}
	console.log("---Created Button '"+ val +"'---");
	$('#'+id).click(function() {mClick(val);});
}

function mClick(val){
	// $('.pbBottomButtons').append('<input type=textbox value="'+val+'" id/>');	
	$('#CommentBody').val(val);
}

$(document).ready(function(){
	console.log("---Launching SF_Inactivity_Reponses---");
	createButton('2 Day');
	createButton('3 Day');
	createButton('4 Day');
});

