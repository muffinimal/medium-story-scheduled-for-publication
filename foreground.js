// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

console.log("This prints to the console of the page (injected only if the page url matched)")

// let first wait for the page to fully load

window.addEventListener('load', (event) => {
    console.log("waiting");
    setTimeout(checkSchedule(), 500);
});

function checkSchedule() {
    var scriptdata = document.evaluate("/html/body/script[contains(., 'scheduledPublishAt')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    // /html/body/script[contains(.,"scheduled")] //scheduledPublishedAt

    if (scriptdata.singleNodeValue == null) {
        console.log("Story not scheduled for publication.");
    } else {
        console.log("Story scheduled for publication");

        let cdata = extractCData(scriptdata);

        jsonobj = JSON.parse(cdata);

        let publishDateUnix = jsonobj["scheduledPublishAt"];
        let publishDate = new Date(publishDateUnix).toLocaleDateString();

        console.log(publishDate);
    }
}
function extractCData(data) {
    let cdata = data.singleNodeValue.innerText.slice(31);
    cdata = cdata.substr(0, cdata.length - 8);

    return cdata;
}
