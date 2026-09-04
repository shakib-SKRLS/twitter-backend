const multer = require('multer')
const multerS3 = require("multer-s3")
const aws = require("aws-sdk")
const dotenv = require("dotenv")


aws.config.update({
    region: process.env.AWS_REGION,
    secretAccessKey: process.env.SECRET_AWS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY
})


const s3 = new aws.S3()


const upload = multer({
    storage:multerS3({
        s3: s3,
        bucket:process.env.BUCKET_NAME,
        acl:'public-read',
        metadata: function(req,file,cb){
            cb(null,{fieldName: file.fieldname});
        },
        key: function(req,file,cb){
            cb(null, Date.now().toString())
        }
    })
});

module.exports = upload;