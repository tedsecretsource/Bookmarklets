/**
 * Determine if the display ratio of an image is the same as its natural ratio
 * @param {*} img An image element from the source
 */
var ratioIsCorrect = (img) => {
    let ratio = img.width / img.height;
    let naturalRatio = img.naturalWidth / img.naturalHeight;
    let style = window.getComputedStyle(img);
    if( ratio > 0 && Math.abs(ratio - naturalRatio) >= 0.02 && '' === style.objectFit ) {
        // return false;
        console.log(`${ratio - naturalRatio}`);
        console.log(img.src, img.alt, style.objectFit);
        // img.style.border = '2px solid red';
        let elem = document.createElement('div');
        elem.nodeValue = `Image is not proportional`;
        img.parentNode.appendChild(elem);
    }
};

var checkImgResolution = (img) => {
    let style = window.getComputedStyle(img);
    
    console.log({img});
    console.log({style});
}

// Binary search, (faster then loop)
// also don't test every possible value, since it tries low, mid, and high
// http://www.geeksforgeeks.org/find-the-point-where-a-function-becomes-negative/
function findFirstPositive(b, a, i, c) {
    c=(d,e)=>e>=d?(a=d+(e-d)/2,0<b(a)&&(a==d||0>=b(a-1))?a:0>=b(a)?c(a+1,e):c(d,a-1)):-1
    for (i = 1; 0 >= b(i);) i *= 2
    return c(i / 2, i)|0
}


var dpi = findFirstPositive(x => matchMedia(`(max-resolution: ${x}dpi)`).matches);
console.log({dpi});
var imgs = document.querySelectorAll("img:not([src=''])");
imgs.forEach( (img) => {
    ratioIsCorrect(img);
});
