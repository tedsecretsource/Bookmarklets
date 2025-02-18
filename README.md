# Bookmarklets

This repository is intended to be a series of [bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet) that make web development easier. Bookmarklets are small pieces of JavaScript code that can be saved as bookmarks in your browser. When you click on the bookmark, the JavaScript code is executed on the current page.

----

# Check Images

This Bookmarklet flags images that are not at their optimal resolution for the current device. It does this by comparing the width of the image to the pixel density of the device. If the image is not at its optimal resolution, a dark grey bar will appear at the top of the image with red text. If the image is at its optimal resolution (or better), a grey bar will appear at the top of the image with green text. Hovering over any image will show you the image at its maximum width (for the current device).

## Usage

Create a new bookmark with this as the source code:

```javascript
javascript:(function(){if(null==document.querySelector('script[src^="https://tedsecret"]')){let s=document.createElement('script');s.type='text/javascript';s.src='https://tedsecretsource.github.io/Bookmarklets/checkImages.js?v='+parseInt(Math.random()*99999999);document.body.appendChild(s);}else{runRetinaTest();}})();
```

Go to a web page that has images on it. Open the console and click the bookmark. The images will be analyzed and a report will be shown in the console. Hovering over any image will show you the image at its optimal resolution for the current device.

The labels **Max Width** and **Actual Width** refer to the following:

**Max Width** is the maximum width that the image should be displayed at given the pixel density of the device. For example, given an image of 300 pixels wide, if the device has a pixel density of 2, the Max Width is 150 pixels (half the width of the image). If the device has a pixel density of 3, the Max Width is 100 (one third the width of the image).

For retina devices, the Max Width is the width of the image divided by the pixel density of the device. MacBook Pros have a pixel density of 2, so the Max Width is half the width of the image. iPhones have a pixel density of 3, so the Max Width is one third the width of the image.

**Actual Width** is the width of the image as it is actually being displayed on the page. If the Actual Width is more than the Max Width, the image is not at its optimal resolution for the current device (and may well look blurry).

# Check Links

This bookmarklet prints a list of all the links on the page.

```javascript
javascript:(function(){let links = document.querySelectorAll("a:not([href=''])"); links.forEach((link) => { console.log(link.href);})})();
```
