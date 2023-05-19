const router = require("express").Router();
const { uploadImage, getImages } = require("./controller");  
const { productUpload } = require("./multer");

router.post('/upload', productUpload.single('imageUrl'), uploadImage);

router.get('/images', getImages);

module.exports = router;



