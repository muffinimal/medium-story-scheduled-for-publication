/**
 * TODO: alleen doen 
 *    ! als story daadwerkelijk gesubmit is naar een publication
 *    ? OF als je zelf hebt gescheduled
 *    ! const van scriptdata naar listener verplaatsen;
 */

const scriptdata = document.evaluate("/html/body/script[contains(., 'scheduledPublishAt')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

function extractCData(data) {
    let cdata = data.singleNodeValue.innerText.slice(31);
    cdata = cdata.substr(0, cdata.length - 8);

    return cdata;
}

function getData() {
    if (scriptdata.singleNodeValue == null) {
        return false;
    } else {
        let cdata = extractCData(scriptdata);
        return JSON.parse(cdata);
    }
}

// let first wait for the page to fully load
/**
 * TODO: wachttijd is niet nodig, gewoon wachten op ful page load
 */
window.addEventListener('load', (event) => {
    console.log("waiting for page to fully load");
    //setTimeout(checkSchedule(), 500);
    checkSchedule();
});

function checkSchedule() {
    if (data = getData()) {
        console.log("Story scheduled for publication");

        publishDate = getDateTimeSchedule();
        createHTML(publishDate);

        getPublication();
    } else {
        console.log("Story not scheduled for publication.");
    }
}

function getDateTimeSchedule(datetime) {
    let publishDateUnix = data["scheduledPublishAt"];
    let publishDate = new Date(publishDateUnix).toLocaleDateString();
    let publishTime = new Date(publishDateUnix).toLocaleTimeString();

    return [publishDate, publishTime];
}

function getPublication() {
    //"homeCollectionId": "2cef85d78a7f", --> 10 in 10. Should test while in Dev|Fiant
    /*     "homeCollection": {
            "id": "2cef85d78a7f",
            "name": "10 in 10 Challenge",
            "slug": "10-in-10-challenge",
            "tags": [
              "WRITING",
              "CHALLENGE",
              "LEARN",
              "STORIES",
              "FUN"
            ], */
    // let publicationId = data[homeCollectionId];
    //console.log(publicationId);

    let collectionObj = data.references.Collection;
    let collection = Object.entries(collectionObj).map(([key, value]) => ({ key, ...value }));

    console.info(collection);
    console.log(collection[0].name);
}

function getReviewStatus() {
    /*     "virtuals": {
            "statusForCollection": "PENDING", */
}



function createHTML(datetime) {
    let mainArticle = document.querySelectorAll('main[role="main"] > article');

    let scheduledMessageDiv = document.createElement('div');
    scheduledMessageDiv.className = "scheduledMessageDiv";

    let scheduledMessage = document.createElement('span');
    scheduledMessage.className = "scheduledMessage";

    scheduledMessage.innerText = `Scheduled to be published at ${datetime[0]} at ${datetime[1]}`;

    scheduledMessageDiv.appendChild(scheduledMessage);

    //<div class="butterBar-message">Your story is scheduled to publish on Thursday, Oct 7 at 4:54pm.</div>

    mainArticle[0].prepend(scheduledMessageDiv);
}