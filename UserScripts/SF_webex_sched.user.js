// ==UserScript==
// @name       SF_webex_scheduling
// @namespace  https://github.com/b1kjsh/sf_tools
// @version    0.14
// @grant       none
// @description  Days Since Updated and the Case Status column is required for this script.
// @include     https://na19.salesforce.com/00U*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @downloadURL   https://github.com/b1kjsh/sf_tools/raw/master/UserScripts/SF_webex_sched.user.js
// @require       https://github.com/b1kjsh/sf_tools/raw/master/UserScripts/SF_webex_calls.user.js
// @copyright  2012+, You
// ==/UserScript==

$(document).ready(function() {
// Reference URL https://landesk.webex.com/LANDesk/m.php?AT=SM&YE=2014&MO=6&DA=1&HO=08&MI=50&MN=ANOTHERTEST
  var baseURL, year, month, day, hour, minute, meetName, casenum, time;
  var mEmail, mPhone, mProduct, mPassword;

  baseURL = 'https://landesk.webex.com/landesk/m.php?AT=';
  year = '&YE=';
  month = '&MO=';
  day = '&DA=';
  hour = '&HO=';
  minute = '&MI=';
  meetName = '&MN=';
  backURL = '$BU=panel.html';
  casenum = $('#evt3').val();
  
  
  // function createButton(value){
    // creates scheduler button
  //   return '<input class="btn" type="button" onclick="'+schedAction(value)+'" nAMe="sched' + value + '" id="sched" value="' + value + '" />';
  // }
  
  
  
  function buildURL(flag) {
      var y, m, d, h, mi, mn;
      console.log('buildURL()','initiated');
      var date = $('input#StartDateTime').val();
      d = date.replace(/\/([0-9]+)$/, '').replace(/.*\//, '');
      var n = date.length - 1;
      m = date.replace(/\/([0-9]+)\/([0-9]+)$/, '');
      y = date.replace(/^([0-9]+)\/([0-9]+)\//, '');
      var time = $('input#StartDateTime_time').val();
      h = time.replace(/(AM|PM|am|pm)/, '').replace(/:([0-9]+)/, '').replace(/\W/, '');
      mi = time.replace(/(AM|PM|am|pm)/, '').replace(/^([0-9]+):/, '').replace(/\W/, '');
      mn = $('#evt5').val().replace(/\s/, '%20');
      var test = time.replace(/\w\w$/, '');
      console.log("Check Hour", test);
      if (test == 'PM') {
        console.log("Check Hour","found PM");
          h = parseInt(h) + 12;
          console.log(h);
      }
  
      $('#evt6').val(baseURL + flag + year + y + month + m + day + d + hour + h + minute + mi + meetName + mn);
      return flag + year + y + month + m + day + d + hour + h + minute + mi + meetName + mn + '&TC=2';
  }
  
  
  
  
  
  
  
  // $('.btn[name=save]').first().before('<input class="btn" type="button" id="create"/>');
  // $('.pbTitle').css('width','18%');
  // $('input#create').val('Schedule WebEx');
  // $('input#create').css('margin-right', '5px');
  // $('input#create').click(function () {
  //     var kk = $('#evt6').val() || "default";    
  //     if (kk != "default" && kk.length > 500){
          
  //         foundMK = String(kk).match(/[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/);
  //         self.port.emit('message', buildURL('EM&MK='+ foundMK));
  //         console.log('rescheduling', foundMK);
  //     }else {
  //         self.port.emit('message', buildURL('SM'));
  //     }
  // });
  
  // self.port.on('meetingkey', function(meetingkey){
  //     var date = $('input#StartDateTime').val();
  //     time = $('input#StartDateTime_time').val();
      
  // var message  = 'Hello, \n\n'+
  //                'Thank you for contacting LANDesk Support, this is an invite for a WebEx session on Case Number: ' +
  //                casenum + '. Please join the meeting scheduled on ' + 
  //                date + ' at ' + time + ' MST using the following WebEx information:\n' +
  //                '\nMeeting Number: '+ meetingkey +
  //                '\nMeeting Password: ' + mPassword +
  //                '\n\n1. Go to https://landesk.webex.com/ and enter your meeting number.' +
  //                '\n2. If requested, enter your name and email address.' +
  //                '\n3. If a password is required, enter the meeting password: ' + mPassword +
  //                '\n4. Click "Join".' +
  //                '\n5. Follow the instructions that appear on your screen.' +
  //                '\n\nIf you\'re having issues joining our meeting you can contact me at:\n'; 
  //                message = message.replace(/landesk/ig,mProduct) + mEmail + '\n' + mPhone;
  
  //     $('#evt6').val(message);
  // });
  // self.port.on('mEmail', function(value){
  //     mEmail = value;
  // });
  // self.port.on('mPhone', function(value){
  //     mPhone = value;
  // });
  // self.port.on('mProduct', function(value){
  //     mProduct = value;
  // });
  // self.port.on('mPassword', function(value){
  //     mPassword = value;
  // });
  
  
  $('table.detailList').first().before('<div id="mContainerDay">' + btnSetDay('Monday') + btnSetDay('Tuesday') + btnSetDay('Wednesday') + btnSetDay('Thursday') + btnSetDay('Friday') + '</div>');
  // $('#bContainer').css('margin-left','auto');
  // $('#bContainer').css('margin-right','auto');
  // $('#bContainer').css('width','45em');
  
  $('#mContainerDay').append('<div id="bContainer">'+btnSetTime('9:00 AM')+btnSetTime('10:00 AM')+btnSetTime('11:00 AM')+btnSetTime('2:00 PM')+btnSetTime('3:00 PM')+btnSetTime('4:00 PM')+'</div>');

  
  function btnSetTime(value) {
      return '<input class="btn.scheduler" type="button" name="sched' + value + '" id="sched" value="' + value + '" onclick= "'+ schedAction(value) +'"/>';
      // return '<input class="btn" type="button" onclick="ActivityFunction.updateEndTime(\'StartDateTime\',\'StartDateTime_time\', \'EndDateTime\', \'EndDateTime_time\');ActivityFunction.checkDuration(\'IsRecurrence\',\'evt15\',\'StartDateTime\',\'StartDateTime_time\',\'EndDateTime\',\'EndDateTime_time\');" name="sched' + value + '" id="sched" value="' + value + '" />';
  }

  function schedAction(v){    
      var casenum = $('#evt3').val();
      var custname = $('#evt2').val();
  //  $('#evt6').val(buildURL('1','1','1','1','1','1'));
  return '$(\'#evt10\').val(\'Meeting\');$(\'#evt5\').val(\'Case '+casenum+' - '+ custname + '\');$(\'#StartDateTime_time\').val(\''+v+'\');ActivityFunction.updateEndTime(\'StartDateTime\',\'StartDateTime_time\', \'EndDateTime\', \'EndDateTime_time\');ActivityFunction.checkDuration(\'IsRecurrence\',\'evt15\',\'StartDateTime\',\'StartDateTime_time\',\'EndDateTime\',\'EndDateTime_time\');';
  }
  
  function btnSetDay (value) {
    return '<input class="btn.scheduler" type="button" name="mDay" id="mDay' + value + '" value="'+ value +'" />';
  }
  
  $('#mDayMonday').click(function() {POST(baseURL,buildURL('SM'))});

});
