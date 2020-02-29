/**
 * Determine if the display ratio of an image is the same as its
 * natural ratio
 * 
 * Returns true if the display ratio is the same as the native pixel
 * ratio of the image. If the display ratio is not the same, the 
 * image will appear distored and the function will return false.
 * 
 * @param {img} An image element from the source
 * @returns True if the display ratio is the same as the natural ratio, false otherwise
 */
var ratioIsCorrect = (img) => {
    let ratio = img.width / img.height;
    let naturalRatio = img.naturalWidth / img.naturalHeight;
    let style = window.getComputedStyle(img);
    if( ratio > 0 && Math.abs(ratio - naturalRatio) >= 0.02 && '' === style.objectFit ) {
        // return false;
        console.log(`${img.src} has incorrect ratio. Off by ${ratio - naturalRatio}`);
        console.log(img.src, img.alt, style.objectFit);
        // img.style.border = '2px solid red';
        let elem = document.createElement('div');
        elem.nodeValue = `Image is not proportional`;
        img.parentNode.appendChild(elem);
        return false;
    }
    return true;
};

/**
 * Returns an integer representing the actual width of the source image
 * @param {*} img
 * @returns Integer The actual width of the source image
 */
var getNaturalWidth = (img) => {
    let imageNaturalWidth = img.naturalWidth;
    if(img.srcset !== '') {
        let tempimg = document.createElement('img');
        tempimg.setAttribute('src', img.currentSrc);
        tempimg.setAttribute('style', 'margin-top: -5000px; margin-left: -5000px');
        document.querySelector('body').appendChild(tempimg);
        imageNaturalWidth = tempimg.naturalWidth;
        document.querySelector('body').removeChild(tempimg);
    }
    return imageNaturalWidth;
}

/**
 * Returns an integer representing the maximum width of the image in
 * pixels for this device
 * 
 * Given a DOM image object, get the maximum width the image can be
 * displayed at for this device without noticable loss of quality.
 * Note that to calculate this, we convert from natural pixel width
 * to device pixel width.
 * 
 * @param {*} img 
 * @returns Integer The maximum width of the image in pixels for this device
 */
var getMaxWidthForDevice = (img) => {
    return Math.floor(img.imageNaturalWidth / window.devicePixelRatio);
}

/**
 * Returns true if the image has the minimum resolution required to
 * display at the specified width without noticable loss of quality
 * @param {*} imgObj 
 */
var hasMinimumDisplayResolution = (imgObj) => {
    let img = imgObj.img;
    let maxWidthForDevice = imgObj.maxWidthForDevice;
    if(maxWidthForDevice >= img.width) {
        return true;
    } else {
        return false;
    }
}

/**
 * offsetWidth and offsetHeight take into account the visibility of an element (0 if invisible)
 * naturalWidth and naturalHeight are the size of the image if there is no bounding box constraining it (which there almost always is)
 * width and height are either the actual screen pixel width and height or whatever is specified in the corresponding attributes
 */
var checkImgResolution = (img) => {
    if(img.offsetWidth > 0) {
        let maxWidthForDevice = getMaxWidthForDevice({img: img, imageNaturalWidth: getNaturalWidth(img)});
        if(hasMinimumDisplayResolution({img: img, maxWidthForDevice: maxWidthForDevice})) {
            console.log('PASS');
        } else {
            console.log('FAIL');
        }
    } else {
        // the image is hidden
        console.log(`Skipping ${img.src} because it is not visible`);
    }
    /**
     * returns the intrinsic (natural), density-corrected width of the image in CSS pixels
     * This natural width is corrected for the pixel density of the device on which it's being 
     * presented, unlike the value of width.
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalWidth
     * 
     * it generally suffices to say that when the unit px is used, the goal is to try to have 
     * the distance 96px equal about 1 inch on the screen, regardless of the actual pixel 
     * density of the screen. In other words, if the user is on a phone with a pixel density 
     * of 266 DPI, and an element is placed on the screen with a width of 96px, the actual 
     * width of the element would be 266 device pixels.
     * https://developer.mozilla.org/en-US/docs/Glossary/CSS_pixel
     * 
     * How to make images retina ready
     * https://premium.wpmudev.org/blog/make-images-retina-ready/
     * 
     * More on responsive images
     * https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
     * 
     */
}

var runRetinaTest = () => {
    var imgs = document.querySelectorAll("img:not([src=''])");
    imgs.forEach( (img) => {
        ratioIsCorrect(img);
        checkImgResolution(img);
    });
}

window.addEventListener('load', (event) => {
    runRetinaTest();
});