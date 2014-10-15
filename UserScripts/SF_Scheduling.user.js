// ==UserScript==	
// @nAMe        SF_Scheduling
// @nAMespace   com.b1k.landesk
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @version     1
// @include		https://na19.salesforce.com/00U*
// @grant       none
// ==/UserScript==
/* TODO: add to master */

$(document).ready(function () {
	//https://landesk.webex.com/LANDesk/m.php?AT=SM&YE=2014&MO=6&DA=1&HO=08&MI=50&MN=ANOTHERTEST
	
	function schedAction(v){		
		var casenum = $('#evt3').val();
		var custname = $('#evt2').val();
//	$('#evt6').val(buildURL('1','1','1','1','1','1'));
return '$(\'#evt10\').val(\'Meeting\');$(\'#evt5\').val(\'Case '+casenum+' - '+ custname + '\');$(\'#StartDateTime_time\').val(\''+v+'\');ActivityFunction.updateEndTime(\'StartDateTime\',\'StartDateTime_time\', \'EndDateTime\', \'EndDateTime_time\');ActivityFunction.checkDuration(\'IsRecurrence\',\'evt15\',\'StartDateTime\',\'StartDateTime_time\',\'EndDateTime\',\'EndDateTime_time\');';
}

function createButton(value){
	return '<input class="btn" type="button" onclick="'+schedAction(value)+'" nAMe="sched' + value + '" id="sched" value="' + value + '" />';
}


$('table.detailList').first().before('<div id="bContainer">'+createButton('9:00 AM')+createButton('10:00 AM')+createButton('11:00 AM')+createButton('2:00 PM')+createButton('3:00 PM')+createButton('4:00 PM')+'</div>');
$('#bContainer').css('margin-left','auto');
$('#bContainer').css('margin-right','auto');
$('#bContainer').css('width','45em');
	// $('input#inactivatebutton.btn').val('Schedule WebEx');
	// $('input#inactivatebutton.btn').click(function () {	
		// console.log(buildURL('1','1','1','1','1',$('#evt5').val()));
		//jQuery.post(buildURL('1','1','1','1','1',$('#evt5').val()));
		
	// });






});