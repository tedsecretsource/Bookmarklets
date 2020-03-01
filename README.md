# Bookmarklets

This repository is intended to be a series of [bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet)
that make web development easier.

At present, there is a [checkImages bookmarklet](javascript:%28function%28%29%7Bif%28null%3D%3Ddocument.querySelector%28%27script%5Bsrc%5E%3D%22https%3A%2F%2Ftedsecret%22%5D%27%29%29%7Blet%20s%3Ddocument.createElement%28%27script%27%29%3Bs.type%3D%27text%2Fjavascript%27%3Bs.src%3D%27https%3A%2F%2Ftedsecretsource.github.io%2FBookmarklets%2Fbookmarklet.js%3Fv%3D%27%2BparseInt%28Math.random%28%29%2A99999999%29%3Bdocument.body.appendChild%28s%29%3B%7Delse%7BrunRetinaTest%28%29%3B%7D%7D%29%28%29%3B)
that shows you which pictures are and are not at their optimal resolution for the given 
device. To use this, simply bookmark the link above and then, when looking at a page with
images on it, click the bookmark. Images that are not high enough resolution will have a
grey bar near the top with text in red. Images that are high enough resolution for the
current device will have a grey bar near the top with text in green.

This approach does not work on pages like Google images and some other sites because it is
considered an (XSS) attack vector. However, in order for the script to be blocked, the 
server has to be specially configured. Most servers (as of this writing) are not blocking
the use of bookmarklets and this script.
