// ==UserScript==
// @name       SF_webex_scheduling
// @namespace  https://github.com/b1kjsh/sf_tools
// @version    0.20
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_xmlhttpRequest 
// @description  Days Since Updated and the Case Status column is required for this script.
// @include     https://na19.salesforce.com/00U*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @downloadURL   https://github.com/b1kjsh/sf_tools/raw/master/UserScripts/SF_webex_sched.user.js
// @copyright  2012+, You
// ==/UserScript==

$(document).ready(function() {


// Reference URL https://landesk.webex.com/LANDesk/m.php?AT=SM&YE=2014&MO=6&DA=1&HO=08&MI=50&MN=ANOTHERTEST
var baseURL, year, month, day, hour, minute, meetName, casenum, time, arg;
var mEmail, mPhone, mProduct, mPassword, mUser, pw, u, loginURL;
var y, m, d, h, mi, mn, fn, ln, em, wid;

// GM_setValue('email', 'josh.howard@landesk.com');
// GM_setValue('phone', '801-208-1497');
// GM_setValue('username','jhoward');
// GM_setValue('password','Letmein1');
// GM_setValue('product','LANDesk');

baseURL = 'https://landesk.webex.com/landesk/m.php';
loginURL = 'https://landesk.webex.com/landesk/p.php';
arg = 'AT=';
year = '&YE=';
month = '&MO=';
day = '&DA=';
hour = '&HO=';
minute = '&MI=';
meetName = '&MN=';
firstName = '&FN=';
lastName = '&LN=';
pw = '&PW=';
u = '&WID=';
mEmail = GM_getValue('email');
mUser = GM_getValue('username');
PASS = GM_getValue('password');
mPhone = GM_getValue('phone');
mProduct = GM_getValue('product');
backURL = '$BU=panel.html';
casenum = $('#evt3').val();


  // function createButton(value){
    // creates scheduler button
  //   return '<input class="btn" type="button" onclick="'+schedAction(value)+'" nAMe="sched' + value + '" id="sched" value="' + value + '" />';
  // }
  
  
  
  function buildURL(flag) {
    var finalURL;
    console.log('buildURL()','initiated');
    switch(flag)
    { 
      case 'LI':
      finalURL = arg + flag + u + mUser + pw + PASS;
      console.log('buildURL()', finalURL);
      if (DEBUG)
        $('#evt6').val(loginURL+finalURL);
      break;

      case 'SM':
      var date = $('input#StartDateTime').val();
      d = date.replace(/\/([0-9]+)$/, '').replace(/.*\//, '');
      var n = date.length - 1;
      m = date.replace(/\/([0-9]+)\/([0-9]+)$/, '');
      y = date.replace(/^([0-9]+)\/([0-9]+)\//, '');
      var time = $('input#StartDateTime_time').val();
      h = time.replace(/(AM|PM|am|pm)/, '').replace(/:([0-9]+)/, '').replace(/\W/, '');
      mi = time.replace(/(AM|PM|am|pm)/, '').replace(/^([0-9]+):/, '').replace(/\W/, '');
      mn = $('#evt5').val().replace(/\s/g, '%20');
      var test = time.replace(/\w\w$/, '');
      console.log("Check Hour", test);
      if (test == 'PM') {
        console.log("Check Hour","found PM");
        h = parseInt(h) + 12;
        console.log(h);
      }
      finalURL = arg + flag + year + y + month + m + day + d + hour + h + minute + mi + meetName + mn;
      console.log('buildURL()', finalURL);
      if (DEBUG)
      $('#evt6').val(baseURL+finalURL);
      break;
    }

      // &FN=First Name&LN=Last Name &EM=E-mail&WID=Login&PW=Password 

      return finalURL;
    }

    $('table.detailList').first().before('<div id="mContainerDay">' + btnSetDay('Monday') + btnSetDay('Tuesday') + btnSetDay('Wednesday') + btnSetDay('Thursday') + btnSetDay('Friday') + '</div>');

  
  $('#mContainerDay').append('<div id="bContainer">'+btnSetTime('9:00 AM')+btnSetTime('10:00 AM')+btnSetTime('11:00 AM')+btnSetTime('2:00 PM')+btnSetTime('3:00 PM')+btnSetTime('4:00 PM')+'</div>');
  // $('div.linkElements').append('<div id="menu" style="display: none;"><ul><li>Username</li><li>Password</li><li>Menu item</li><li>Menu item</li></ul></div><a id="usersettings" class="menu">User Settings</a>');
  $("div.linkElements").append('<a id="settings">User Settings</a><div id="settingsWrapper" style="display: none;"><div class="userSettingsListItem">Username:</div><input id="username" value="'+ GM_getValue('username') + '"></input>    <div class="userSettingsListItem">Password:</div>    <input id="password" value="'+ GM_getValue('password') + '"></input>    <div class="userSettingsListItem">Phone:</div>    <input id="phone" value="'+ GM_getValue('phone') + '"></input>        <div class="userSettingsListItem">Email:</div>    <input id="email" value="'+ GM_getValue('email') + '"></input>    <div class="userSettingsListItem">Product:</div>    <input id="product" value="'+ GM_getValue('product') + '"></input><br> <input class="btn" type=button  value="save" id="usersettingsSave" /> <input id="usersettingsClose" type=button class="btn" value="close" /></div>');
  $('#usersettingsSave').click(function(){
    GM_setValue('email', $('#email').val());
    GM_setValue('phone', $('#phone').val());
    GM_setValue('username',$('#username').val());
    GM_setValue('password',$('#password').val());
    GM_setValue('product',$('#product').val());
  });
  $('#usersettingsClose').click(function(){$("#settingsWrapper").hide();});
  $("#settings").click(function () {
    $("#settingsWrapper").css(["position","relative"]);
    $("#settingsWrapper").show();
    
});


  function btnSetTime(value) {
    return '<input class="scheduler" type="button" name="sched' + value + '" id="sched" value="' + value + '"/>';
      // return '<input class="btn" type="button" onclick="ActivityFunction.updateEndTime(\'StartDateTime\',\'StartDateTime_time\', \'EndDateTime\', \'EndDateTime_time\');ActivityFunction.checkDuration(\'IsRecurrence\',\'evt15\',\'StartDateTime\',\'StartDateTime_time\',\'EndDateTime\',\'EndDateTime_time\');" name="sched' + value + '" id="sched" value="' + value + '" />';
    }
    function schedAction(v){    
      console.log('scheduling');
      var casenum = $('#evt3').val();
      var custname = $('#evt2').val();
  //  $('#evt6').val(buildURL('1','1','1','1','1','1'));
  $('#evt10').val('Meeting');
  $('#evt5').val('Case '+casenum+' - '+ custname + '');
  $('#StartDateTime_time').val(''+v+'');
  ActivityFunction.updateEndTime('StartDateTime','StartDateTime_time', 'EndDateTime', 'EndDateTime_time');
  ActivityFunction.checkDuration('IsRecurrence','evt15','StartDateTime','StartDateTime_time','EndDateTime','EndDateTime_time');
}

$('.scheduler').click(function() {
  console.log('click',$(this).val());
  schedAction($(this).val());
});


function btnSetDay (value) {
  return '<input class="btn.scheduler" type="button" name="mDay" id="mDay' + value + '" value="'+ value +'" />';
}

function SCHEDULE (url, data) {
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    onload: function(response) {
      console.log(response);
      console.log(response.finalUrl);
      var date, time, meetingkey, mPassword;
      date = $('input#StartDateTime').val();
      time = $('input#StartDateTime_time').val();
      meetingkey = response.finalUrl.match(/([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])/g);
      mPassword = 'no password';
      var message  = 'Hello, \n\n'+'Thank you for contacting LANDesk Support, this is an invite for a WebEx session on Case Number: ' + casenum + '. Please join the meeting scheduled on ' + date + ' at ' + time + ' MST using the following WebEx information:\n' + '\nMeeting Number: '+ meetingkey + '\nMeeting Password: ' + mPassword + '\n\n1. Go to https://landesk.webex.com/ and enter your meeting number.' + '\n2. If requested, enter your name and email address.' + '\n3. If a password is required, enter the meeting password: ' + mPassword + '\n4. Click "Join".' + '\n5. Follow the instructions that appear on your screen.' + '\n\nIf you\'re having issues joining our meeting you can contact me at:\n'; message = message.replace(/landesk/ig,mProduct) + mEmail + '\n' + mPhone;    
      $('#evt6').val(message);
      }
    
    });

}

function POSTLOGIN (url, data) {
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    data: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    onload: function(response) {
      console.log(response);
      console.log(response.finalUrl);
      // var date, time, meetingkey, mPassword;
      // date = $('input#StartDateTime').val();
      // time = $('input#StartDateTime_time').val();
      // meetingkey = response.finalUrl.match(/([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])/g);
      // mPassword = 'no password';
      // var message  = 'Hello, \n\n'+'Thank you for contacting LANDesk Support, this is an invite for a WebEx session on Case Number: ' + casenum + '. Please join the meeting scheduled on ' + date + ' at ' + time + ' MST using the following WebEx information:\n' + '\nMeeting Number: '+ meetingkey + '\nMeeting Password: ' + mPassword + '\n\n1. Go to https://landesk.webex.com/ and enter your meeting number.' + '\n2. If requested, enter your name and email address.' + '\n3. If a password is required, enter the meeting password: ' + mPassword + '\n4. Click "Join".' + '\n5. Follow the instructions that appear on your screen.' + '\n\nIf you\'re having issues joining our meeting you can contact me at:\n'; message = message.replace(/landesk/ig,mProduct) + mEmail + '\n' + mPhone;    
      // $('#evt6').val(message);
      }
    
    });

}

// $('#mDayMonday').click(function() {POST(loginURL,buildURL('LI'));});
$('#mDayTuesday').click(function() {SCHEDULE(baseURL,buildURL('SM'));});

$('#editPage').submit((function(){
  if (mn.length > 0){
      POST(baseURL,buildURL('SM'));
  }}));

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


POSTLOGIN(loginURL,buildURL('LI'));




});


// http://landesk.webex.com/landesk/p.php?AT=SU&PID=PID&FN=First Name&LN=Last Name &EM=E-mail&WID=Login&PW=Password 