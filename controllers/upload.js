
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { updateImg } = require('../helpers/update-img');

const fileUpload = async (req, res) => {
    
    try {

        const { collection, _id } = req.params

        const collectionValids = ['users', 'doctors', 'hospitals']

        if(!collectionValids.includes(collection)) {
            return res.status(400).json({
                    status: 'warning',
                    msg: 'Colletion not found'
                })
        }

        // * verify is exist a file
        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                status: 'warning',
                msg: 'No files were uploaded.',
                body: req.files
            })
        }

        // * process the image
        const file = req.files.img

        const cutName = file.name.split('.')

        const extensionFile = cutName[ cutName.length - 1 ] // * jpg png... etc

        // * verify extension
        const extensionValid = ['png', 'jpg', 'jpeg', 'gif']

        if(!extensionValid.includes(extensionFile)) {
            return res.status(400).json({
                status: 'warning',
                msg: 'No files extension valid.'
            })
        }

        // * file name
        const nameFile = `${uuidv4()}.${extensionFile}`

        // * path to save file
        const path = `./uploads/${collection}/${nameFile}`

        // * User the mv() to move the file
        file.mv(path, (err) => {
            if(err){
                return res.status(500).json({
                    status: 'warning',
                    msg: 'Error trying to save the img.'
                })
            }
            // * update DB
            updateImg(collection, _id, nameFile)

            res.status(200).json({
                status: 'success',
                msg: 'File Upload !',
                file: nameFile
            })
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            msg: 'Error unexpected',
            error: error.message
        })
    }
}

const saveImg = (req, res) => {

    const { collection, img } = req.params

    const pathImg = path.join( __dirname, `../uploads/${collection}/${img}` )

    // * img by default
    if( fs.existsSync(pathImg) ) {
        res.sendFile( pathImg )
    } else {
        const dafaultImg = path.join( __dirname, `../uploads/no-img.jpg` )
        res.sendFile( dafaultImg )
    }
}

module.exports = {
    fileUpload,
    saveImg
}