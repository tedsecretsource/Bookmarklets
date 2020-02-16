/**
 * Determine if the display ratio of an image is the same as its natural ratio
 * @param {img} An image element from the source
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
    }
};

/**
 * offsetWidth and offsetHeight take into account the visibility of an element (0 if invisible)
 * naturalWidth and naturalHeight are the size of the image if there is no bounding box constraining it (which there almost always is)
 * width and height are either the actual screen pixel width and height or whatever is specified in the corresponding attributes
 */
var checkImgResolution = (img) => {
    console.log({img});
    if(img.offsetWidth > 0) {
        // the image is visible
        // naturalWidth / dpi * offsetWidth = maxWidthForDevice
        // maxWidthForDevice < width, fail : success
        let maxWidthForDevice = (img.naturalWidth / dpi) * 96;
        console.log(`maxWidthForDevice: ${maxWidthForDevice}`);
        console.log(`Actual width: ${img.width}`);
        if(maxWidthForDevice < img.width) {
            console.log('FAIL');
        } else {
            console.log('PASS');
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
     */
}


/**
 * A better way to determine the resolution / pixel density
 */

// Binary search, (faster then loop)
// also don't test every possible value, since it tries low, mid, and high
// http://www.geeksforgeeks.org/find-the-point-where-a-function-becomes-negative/
function findFirstPositive(b, a, i, c) {
    c=(d,e)=>e>=d?(a=d+(e-d)/2,0<b(a)&&(a==d||0>=b(a-1))?a:0>=b(a)?c(a+1,e):c(d,a-1)):-1
    for (i = 1; 0 >= b(i);) i *= 2
    return c(i / 2, i)|0
}

window.addEventListener('load', (event) => {
    // https://stackoverflow.com/questions/279749/detecting-the-system-dpi-ppi-from-js-css#answer-35941703
    var dpi = findFirstPositive(x => matchMedia(`(max-resolution: ${x}dpi)`).matches);
    console.log({dpi});

    var imgs = document.querySelectorAll("img:not([src=''])");
    imgs.forEach( (img) => {
        ratioIsCorrect(img);
        checkImgResolution(img);
    });
}