// ==UserScript==
// @name       TempEntitlement_Script
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include      https://na19.salesforce.com/500*
// @copyright  2012+, Me
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js

// ==/UserScript==

$(document).ready(function() {
    
    if ($("#cas14_ileinner").text() == 'Validate Contacts Account'){
        var custName,custEmail,custPhone,custComp,mText,label;
        label = 'Temp Entitlement Canned Message';
        custName = $('#cas3_ileinner').text();   
        custEmail = $('#cas10_ileinner').text();
        custPhone = $('#cas9_ileinner').text();
        custComp = $('#cas15_ileinner').text();

        if (custEmail.size < 2){
            custEmail = "No Email Address Provided.";
        }
        if (custPhone.size < 2){
            custPhone = "No Phone Number Provided.";
        }


        mText = "Hello " + custName.replace(/\ .*/,'') + ',\n';
        mText = mText +"\nI recently received an internal entitlement request for our company showing you are registering with our Support Portal using the following information:";
        mText = mText + "\n\n  Contact Name: " + custName;
        mText = mText + "\n  Contact Email: " + custEmail;
        mText = mText + "\n  Contact Phone: " + custPhone;
        mText = mText + "\n  Account: " + custComp.replace(/.*:.!*/,'').replace(/Validation is required./,'');
        mText = mText + "\n\nUnfortunately I have no record of this account, or company, within our company records. Is that the company you are trying to obtain support for?  Otherwise, is there a parent company, or another company name, that you would be receiving support under?  Perhaps a contact or co-worker that may have contacted us that you can reference?  Do you know who your sales contact, or LANDesk point of contact, is for this account?";
        mText = mText + "\nPlease let me know as you are able so that we may move forward in supporting you and your account.";
        mText = mText + "\n\nThanks!";
        
        $(".listHoverLinks").after("<a class=\"mylinklet\">"+label+"</a>");
        
        $(".mylinklet").css("font-weight","bold");
        $(".mylinklet").css("color","red");
        
        $(".mylinklet").click(function() {                          
            $(".mylinklet").after('<br/><textarea class="mytextarea">' +mText+ '</textarea>');
        });   
    }
});