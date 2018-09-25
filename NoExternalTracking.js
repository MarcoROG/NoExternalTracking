function isTargeted(anchor)
{
    return anchor.getAttribute("rel") === "nofollow noopener";
}

function buildAnchor(url, name)
{
    return '<a href="'+url+'">' + name + '</a>';
}

function sanitise(anchor)
{
    let url = anchor.innerHTML;
    anchor.outerHTML = buildAnchor(url, url);
}

function cleanAll()
{
    let body = document.getElementsByTagName("body")[0];
    let anchors = body.getElementsByTagName("a");
    let cleaned = 0;

    for (i = 0; i < anchors.length; i++) {
        if (isTargeted(anchors[i]))
        { 
            sanitise(anchors[i]);
            cleaned ++;
        }
    }

    console.log("Removed " + cleaned + " trackers");
}

let intervalID = setInterval(cleanAll, 800);