# Bookmarklets

This repository is intended to be a series of [bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet)
that make web development easier.

At present, there is a <a href="javascript:(function(){if(null==document.querySelector('script[src^="https://tedsecret"]')){let s=document.createElement('script');s.type='text/javascript';s.src='https://tedsecretsource.github.io/Bookmarklets/bookmarklet.js?v='+parseInt(Math.random()*99999999);document.body.appendChild(s);}else{runRetinaTest();}})();">checkImages bookmarklet</a>
that shows you which pictures are and are not at their optimal resolution for the given 
device. To use this, simply bookmark the link above and then, when looking at a page with
images on it, click the bookmark. Images that are not high enough resolution will have a
grey bar near the top with text in red. Images that are high enough resolution for the
current device will have a grey bar near the top with text in green.

This approach does not work on pages like Google images and some other sites because it is
considered an (XSS) attack vector. However, in order for the script to be blocked, the 
server has to be specially configured. Most servers (as of this writing) are not blocking
the use of bookmarklets and this script.
