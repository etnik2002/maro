const cloudinary = require('cloudinary').v2;
const Image = require('./model');

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

module.exports = {
    uploadImage : async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path);

            const newImage = new Image({
                imageUrl: result.secure_url
            });
            await newImage.save();
            
            // res.json(newImage);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error -> ' + err);
        }
    },
    
    getImages: async (req, res) => {
        const images = await Image.find({}).sort({ createdAt: -1 });
        res.status(200).json(images);
    }

};
