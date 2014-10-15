// ==UserScript==
// @name       SF_color_coding
// @namespace  https://github.com/b1kjsh/sf_tools
// @version    0.34
// @grant       none
// @description  Days Since Updated and the Case Status column is required for this script.
// @include     https://na19.salesforce.com/500?*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @downloadURL   https://github.com/b1kjsh/sf_tools/raw/master/UserScripts/SF_color_coding.user.js
// @copyright  2012+, You
// ==/UserScript==



$(document).ready(function () {
    console.log("---SF_color_coding loaded in window version 0.33---");
    var mArray = [];
    function getCases() {
        var selector = $(".x-grid3-td-CASES_CASE_NUMBER");
        // selector.css('background','#000000');
        console.log(selector.length);
        selector.each(function() {
            // console.log('test');
            var k = $(this).find('div').find('a').attr('href');
            mArray.push(k);
            // console.log('k is',k);
            for (var i = mArray.length - 1; i >= 0; i--) {
                // console.log('mArray',mArray[i]);
                // $('body').append('<div id="m">'+mArray[i]+'</div>');
            }
        });
    }

    function colorAged() {
        console.log('---Checking Case Age---');
        $('.x-grid3-col-00N30000004r0fd').each(function() {
            // console.log($(this).html());
            if ($(this).html() == 1 && $(this).parent("td").parent("tr").find('.x-grid3-col-CASES_STATUS:contains("Waiting")').length > 0){
                $(this).parent("td").parent("tr").parent("tbody").css('background', '#EBC299');
            }
            if ($(this).html() > 1){
                $(this).parent("td").parent("tr").parent("tbody").css('background', '#FFCC66');
            }
            if ($(this).html() > 2 ) {
                $(this).parent("td").parent("tr").parent("tbody").css('background', '#FF9933');
            }
            if ($(this).html() > 3 ) {
                $(this).parent("td").parent("tr").parent("tbody").css('background', '#FF3300');
            }            
        });    
        checkPRT();
    }

    function checkPRT() {
        console.log('---Checking Case PRT---');
        $('.x-grid3-col-00N30000004r0gN').each(function() {

            var parent = $(this).parent("td").parent("tr").find('td');
            var mdate = new Date();
            var cdate = new Date($(this).html());
            console.log(cdate.toDateString());
            var diffDate = cdate - mdate;
            var hourDiff = Math.floor(diffDate / 1000 / 60 / 60);
            if ( hourDiff <= 24 && hourDiff > 12 ){
                // console.log(diffDate, hourDiff);

            }
            if ( hourDiff <= 12 && hourDiff > 8 ){
                // console.log(diffDate, hourDiff);
                console.log(hourDiff,"Yellow Case: " + casess);
                    parent.find('div').css('font', 'italic 12px/18px Arial, Helvetica, sans-serif');
                // $(this).parent("td").parent("tr").parent("tbody").css('background', '#EBC299');
            }
            if ( hourDiff <= 8 && hourDiff > 6 ){
                // console.log(diffDate, hourDiff);
                console.log(hourDiff,"Orange Case: " + casess);
                parent.find('.x-grid3-col-CASES_CASE_NUMBER').each(function() {
                    parent.find('div').css('font', 'bold 12px/18px Arial, Helvetica, sans-serif');
                    $(this).parent("td").parent("tr").parent("tbody").css('background', '#FF9933');
                });

            }
            if ( hourDiff <= 6 && hourDiff > 3 ){
                // console.log(diffDate, hourDiff);
            }
            if ( hourDiff <= 3 ){
                var casess = $(this).parent("td").parent("tr").find('.x-grid3-col-CASES_CASE_NUMBER').find('a').html();
                console.log(hourDiff,"Red Case: " + casess);
                parent.find('.x-grid3-col-CASES_CASE_NUMBER').each(function() {
                    parent.find('div').css('font', 'italic bold 12px/18px Arial, Helvetica, sans-serif');
                    $(this).parent("td").parent("tr").parent("tbody").css('background', '#FF3300');
                });
            }
        });

    }


    function color() {
        console.log('---Checking Case Status---');
        $(".x-grid3-row-table").find(("div:contains('Open: Not Reviewed')")).parent("td").parent("tr").parent("tbody").css('background', '#ffaf9b');
        $(".x-grid3-row-table").find(("div:contains('Open: Under Review')")).parent("td").parent("tr").parent("tbody").css('background', '#9beeff');
        $(".x-grid3-row-table").find(("div:contains('Open: Escalated to')")).parent("td").parent("tr").parent("tbody").css('background', '#f1ff9b');
        $(".x-grid3-row-table").find(("div:contains('Open: Waiting on Customer')")).parent("td").parent("tr").parent("tbody").css('background', '#9bffc8');
        $(".x-grid3-row-table").find(("div:contains('Open: Patch Delivered')")).parent("td").parent("tr").parent("tbody").css('background', '#CC6600');
        // $('.x-grid3-col-00N30000004r0fO').css('visibility','hidden');
        
    }

    setTimeout(function() {
        color();
        colorAged();
    }, 5000);

    $(window).resize(function() {
        setTimeout(function() {
            color();
            colorAged();
        }, 1000);        
    });
    console.log(mArray.toString(),n);

    var open = window.XMLHttpRequest.prototype.open,
    send = window.XMLHttpRequest.prototype.send,
    onReadyStateChange;

    function openReplacement(method, url, async, user, password) {
        var syncMode = async !== false ? 'async' : 'sync';
        console.warn('Preparing ' + syncMode + ' HTTP request : ' + method + ' ' + url);
        if (/ListServlet/.test(url)){
            setTimeout(function () {
             color();
             colorAged();
             getCases();
         }, 500);
            console.log('Case Refresh Detected','Attempting to color found objects');
        }
        return open.apply(this, arguments);
    }

    function sendReplacement(data) {
        console.warn('Sending HTTP request data : ', data);

        if (this.onreadystatechange) {
            this._onreadystatechange = this.onreadystatechange;
        }
        this.onreadystatechange = onReadyStateChangeReplacement;

        return send.apply(this, arguments);
    }

    function onReadyStateChangeReplacement() {
        console.warn('HTTP request ready state changed : ' + this.readyState);
        if (this._onreadystatechange) {
            return this._onreadystatechange.apply(this, arguments);
        }
    }

    window.XMLHttpRequest.prototype.open = openReplacement;
    window.XMLHttpRequest.prototype.send = sendReplacement;

});