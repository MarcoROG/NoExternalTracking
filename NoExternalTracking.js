var parseQueryString = function( queryString ) {
    var params = {}, queries, temp, i, l;
    // Split into key/value pairs
    queries = queryString.split("&");
    // Convert the array of strings into an object
    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
};

function isTargeted(anchor)
{
    return anchor.getAttribute("rel") === "nofollow noopener" && anchor.hasAttribute("data-lynx-mode");
}

function buildAnchor(url, name)
{
	if (!url.startsWith("http"))
	{
		if (!url.startsWith("www"))
		{
			url = "www." + url;
		}
		url = "http://" + url;
	}
    return '<a target="_blank" href="'+url+'" rel="nofollow noopener" neutralised="true">' + name + '</a>';
}

function sanitise(anchor)
{
    let url = '';
	let content = anchor.innerHTML;
	if(anchor.hasAttribute("data-lynx-uri"))
	{
		url = anchor.getAttribute("href");
	}
	else
	{
		url = anchor.getAttribute("href"); //TODO: change with a better value
		var queryString = url.substring( url.indexOf('?') + 1 );
		url = decodeURIComponent(parseQueryString(queryString)["u"]);
	}
    anchor.outerHTML = buildAnchor(url, content);
}

function cleanAll()
{
    let body = document.getElementsByTagName("body")[0];
    let anchors = body.getElementsByTagName("a");
    let cleaned = 0;
	console.log("Found " + anchors.length + " candidates");
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