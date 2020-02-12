
/**
 * Determine if the display ratio of an image is the same as its natural ratio
 * @param {*} img An image element from the source
 */
var ratioIsCorrect = (img) => {
    let ratio = img.width / img.height;
    let naturalRatio = img.naturalWidth / img.naturalHeight;
    if( ratio > 0 && Math.abs(ratio - naturalRatio) >= 0.02 ) {
        // return false;
        console.log(`${ratio - naturalRatio}`);
        console.log(img.src, img.alt, img.style.objectFit);
        img.style.border = '2px solid red';
    }
};

var imgs = document.querySelectorAll("img:not([src=''])");
imgs.forEach( (img) => {
    ratioIsCorrect(img);
});
