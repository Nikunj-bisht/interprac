const mongoose = require('mongoose');
const Ppdt = require('../models/ppdtSchema');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;

const upload = multer({
    storage: new GridFsStorage({
        url:'mongodb+srv://nicola:qObaF401D1ej4Vj4@cluster0.3uhra.mongodb.net/authusers?retryWrites=true&w=majority',
        option:{ useUnifiedTopology: true,
            useNewUrlParser: true,},
        file:(req,file)=>{
console.log(file,'fi')
            return {
                bucketName: "photos",
                fileName: `${file.originalname}`
            }
        },

    })
})
exports.saveImage = upload.single("file");

exports.createPpdtRoom = async(req,res) => {

 const {title} = req.body;
console.log(req.body)
await Ppdt.create({
    title: title,
    Time: new Date(),
})

return "re";

}