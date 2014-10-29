// ==UserScript==
// @name       SF_webex_calls
// @namespace  https://github.com/b1kjsh/sf_tools
// @version    0.10
// @grant       GM_xmlhttpRequest
// @description  Days Since Updated and the Case Status column is required for this script.
// @include     https://na19.salesforce.com/00U*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @downloadURL   https://github.com/b1kjsh/sf_tools/raw/master/UserScripts/SF_WebEx_Calls.user.js
// @copyright  2012+, You
// ==/UserScript==
$('#mDayMonday').click(function() {
    console.log('clicked');
    GM_xmlhttpRequest({
      method: "POST",
      url: baseURL,
      data: buildURL('SM'),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      onload: function(response) {
        console.log(response);
        // if (response.responseText.indexOf("Logged in as") > -1) {
        //   location.href = "http://www.example.net/dashboard";
        // }
      }
    });
    
  });