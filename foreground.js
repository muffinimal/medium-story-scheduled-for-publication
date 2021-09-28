const scriptdata = document.evaluate("/html/body/script[contains(., 'scheduledPublishAt')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

console.log("This prints to the console of the page (injected only if the page url matched)")

// let first wait for the page to fully load

window.addEventListener('load', (event) => {
    console.log("waiting");
    setTimeout(checkSchedule(), 500);
});

function checkSchedule() {
    // /html/body/script[contains(.,"scheduled")] //scheduledPublishedAt
    data = getdata();

    if (data == null) {
        console.log("Story not scheduled for publication.");
    } else {
        console.log("Story scheduled for publication");

        let publishDateUnix = data["scheduledPublishAt"];
        let publishDate = new Date(publishDateUnix).toLocaleDateString();
        let publishTime = new Date(publishDateUnix).toLocaleTimeString();

        console.log(publishDate);

        createHTML(publishDate, publishTime);
    }
}

function getdata(){
    if( scriptdata.singleNodeValue == null ) {
        return false;
    } else {
        let cdata = extractCData(scriptdata);
        return JSON.parse(cdata);
    }

}

function getPublication() {
    //"homeCollectionId": "2cef85d78a7f", --> 10 in 10. Should test while in Dev|Fiant

}

/**
 * 
 * Butter-bar message 
 * <div class="butterBar" data-action-scope="_actionscope_1">
 *      <div class="butterBar-message">
 *          Your story is scheduled to publish on Thursday, Oct 7 at 4:50pm.
 *      </div>
 * </div>} 
 * @returns 
 */

function extractCData(data) {
    let cdata = data.singleNodeValue.innerText.slice(31);
    cdata = cdata.substr(0, cdata.length - 8);

    return cdata;
}

function createHTML(date, time) {
    let mainArticle = document.querySelectorAll('main[role="main"] > article');

    let scheduledMessageDiv = document.createElement('div');
    scheduledMessageDiv.className = "scheduledMessageDiv";

    let scheduledMessage = document.createElement('span');
    scheduledMessage.className = "scheduledMessage";

    scheduledMessage.innerText = `Scheduled to be published at ${date} at ${time}`;

    scheduledMessageDiv.appendChild(scheduledMessage);

//<div class="butterBar-message">Your story is scheduled to publish on Thursday, Oct 7 at 4:54pm.</div>

    mainArticle[0].prepend(scheduledMessageDiv);
}