function isTargeted(anchor)
{
    return anchor.getAttribute("rel") == "nofollow noopener";
}

function sanitise(anchor)
{
    anchor.setAttribute("href",anchors[i].innerHTML); 
}

var anchors = document.getElementsByTagName("a");
var good = [];
for (i = 0; i < anchors.length; i++) {
    if (isTargeted(anchors[i]))
    { 
        sanitise(anchors[i]);
    }
}