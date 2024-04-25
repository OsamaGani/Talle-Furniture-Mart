const multer = require('multer');

function saveImage(){
    const storage = multer.diskStorage({
        destination : (req , file , cb)=>{
            cb(null,"./public/product-image");
        },
        filename : (req , file , cb)=>{
            console.log(file)
            let fileExtension = file.originalname.split('.').pop();
            let timestamp = Date.now();
            cb(null,"product-"+timestamp+"."+fileExtension );
        }
    })

    const upload = multer({storage : storage});
    return upload
}

module.exports = {
    saveImage : saveImage()
}