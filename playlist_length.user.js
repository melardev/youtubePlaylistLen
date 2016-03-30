// ==UserScript==
// @name        playlist_length
// @namespace   youtube
// @description retrieves the length of a youtube playlist
// @include       *youtube.*/playlist?list=*
// @version     1
// @grant       none
// @run-at document-end
// ==/UserScript==

btn = document.querySelector('button[data-uix-load-more-href]');
count = 4;
doneLoading = true;
var myTimer;
if (btn != null) {
    doneLoading = false;
    myTimer = setInterval(function(){
        btn = document.querySelector('button[data-uix-load-more-href]');
        if(btn != null)
            btn.click();
        else
        {
            clearInterval(myTimer);
            doneLoading = true;
            retrieveLength();
        }
    }, 300);
}

function retrieveLength() {
    hours = 0;
    mins = 0;
    seconds = 0;
    timestamps = document.getElementsByClassName("timestamp");

    for (i = 0; i < timestamps.length; i++) {
        time = (timestamps[i].children[0].innerHTML.split(":"));
        mins += parseInt(time[0]);
        seconds += parseInt(time[1]);
    }

    if (seconds > 60) {
        mins += Math.floor(seconds / 60);
        seconds = seconds % 60;
    }
    if (mins > 60) {
        hours = Math.floor(mins / 60);
        mins = mins % 60;
    }

    playlistMsg = hours + "h " + mins + "mins " + seconds + " secs";

    var newItem = document.createElement("li");
    var textNode = document.createTextNode(playlistMsg);
    newItem.appendChild(textNode);

    header = document.getElementsByClassName("pl-header-details");
    header[0].insertBefore(newItem, header[0].children[1]);
}


if (doneLoading)
    retrieveLength();
/**
 * Created by rabheus on 30/03/2016.
 */
