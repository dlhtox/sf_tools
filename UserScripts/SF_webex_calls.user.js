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
function POST (url, data) {
  // body...
    GM_xmlhttpRequest({
      method: "POST",
      url: url,
      data: data,
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
}
