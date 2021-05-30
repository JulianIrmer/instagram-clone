const express = require('express');
const router = express.Router();
const multer = require('multer');
const {ImageSchema} = require('../schemas/imageSchema');

//multer options
const upload = multer({
    dest: __dirname + '../../uploads/images',
    limits: {
        // fileSize: 1000000,
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            cb(new Error('Please upload an image.'))
        }
        cb(undefined, true);
    }
});

router.get('/posts/get', (req, res) => {
});

router.post('/posts/add', upload.single('image'), (req, res) => {
    const image = new ImageSchema();
    image.img.data = fs.readFileSync(req.files.img.path);
    image.img.contentType = 'image/png';

}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
});

router.post('/posts/like', (req, res) => {
});

router.post('/posts/delete', (req, res) => {
});

router.post('/comment/add', (req, res) => {
});

router.get('/comment/delete', (req, res) => {
});

module.exports = router;