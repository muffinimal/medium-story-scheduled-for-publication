var scriptdata;

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

window.addEventListener('load', (event) => {
    scriptdata = document.evaluate("/html/body/script[contains(., 'scheduledPublishAt')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    checkScheduled();
});

function checkScheduled() {
    if (data = getData()) {
        console.log("Story scheduled for publication");

        publishDate = getDateTimeScheduled();
        createHTML(publishDate);
    } else {
        console.log("Story not scheduled for publication.");
    }
}

function getDateTimeScheduled(datetime) {
    let publishDateUnix = data["scheduledPublishAt"];
    let publishDate = new Date(publishDateUnix).toLocaleDateString();
    let publishTime = new Date(publishDateUnix).toLocaleTimeString();

    return [publishDate, publishTime];
}

function createHTML(datetime) {
    let mainArticle = document.querySelectorAll('main[role="main"] > article');

    let scheduledMessageDiv = document.createElement('div');
    scheduledMessageDiv.className = "scheduledMessageDiv";

    let scheduledMessage = document.createElement('span');
    scheduledMessage.className = "scheduledMessage";

    scheduledMessage.innerText = `Scheduled to be published at ${datetime[0]} at ${datetime[1]}`;

    scheduledMessageDiv.appendChild(scheduledMessage);

    mainArticle[0].prepend(scheduledMessageDiv);
}