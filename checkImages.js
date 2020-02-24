
window.addEventListener('load', (event) => {
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
        let style = window.getComputedStyle(img);
        let imageNaturalWidth = img.naturalWidth;

        // base naturalWidth on current src if srcset is present
        if(img.srcset !== '') {
            let tempimg = document.createElement('img');
            tempimg.setAttribute('src', img.currentSrc);
            tempimg.setAttribute('style', 'margin-top: -5000px; margin-left: -5000px');
            let tempimghandler = document.querySelector('body').appendChild(tempimg);
            imageNaturalWidth = tempimg.naturalWidth;
            document.querySelector('body').removeChild(tempimg);
        }

        if(img.offsetWidth > 0) {
            // the image is visible
            // naturalWidth / dpi * offsetWidth = maxWidthForDevice
            // maxWidthForDevice < width, fail : success
            let maxWidthForDevice = Math.floor((imageNaturalWidth / dpi) * 96);
            let res1 = document.querySelector(`#${img.parentNode.getAttribute('id')} span.res1`);
            if(maxWidthForDevice < img.width) {
                res1.textContent = 'FAIL';
                res1.classList.add('fail');
                let expectedWidth = document.createElement('p');
                let actualWidth = document.createElement('p');
                expectedWidth.classList.add("fail");
                actualWidth.classList.add("fail");
                expectedWidth.textContent = `Expected width: ${maxWidthForDevice}px or less`;
                actualWidth.textContent = `Actual width: ${img.width}px`;
                res1.insertAdjacentElement("afterend", expectedWidth);
                expectedWidth.insertAdjacentElement("afterend", actualWidth);
                console.log('FAIL');
            } else {
                res1.textContent = 'PASS';
                res1.classList.add('pass');
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
    
    var dpi = window.devicePixelRatio * 96;
    var imgs = document.querySelectorAll("img:not([src=''])");
    imgs.forEach( (img) => {
        ratioIsCorrect(img);
        checkImgResolution(img);
    });
});