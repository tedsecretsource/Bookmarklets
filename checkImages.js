var checkRatio = (img) => {
    let ratio = img.width / img.height;
    let naturalRatio = img.naturalWidth / img.naturalHeight;
    if( ratio > 0 && ratio !== naturalRatio ) {
        console.log(`${ratio - naturalRatio}`);
        console.log({img});
    }
};

var imgs = document.querySelectorAll("img:not([src=''])");
imgs.forEach( (img) => {
    checkRatio(img);
});
