# Bookmarklets

This repository is intended to be a series of [bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet)
that make web development easier.

At present, there is a checkImages bookmarklet
that shows you which pictures are and are not at their optimal resolution for the given 
device. To use this, create a bookmark with a URL consisting of the contents of the 
[bookmarklet.js](https://raw.githubusercontent.com/tedsecretsource/Bookmarklets/master/bookmarklet.js)
file and then, when looking at a page with
images on it, click the bookmark. Images that are not high enough resolution will have a
dark grey bar near the top with text in red. Images that are high enough resolution for the
current device will have a grey bar near the top with text in green.
Also, hovering over any image will show you the image at its maximum 
width (for the current device).

This approach does not work on pages like Google images and some other sites because it is
considered an (XSS) attack vector. However, in order for the script to be blocked, the 
server has to be specially configured. Most servers (as of this writing) are not blocking
the use of bookmarklets and this script.
