const { Router } = require('express')
const expressFileUpload = require('express-fileupload')
const { fileUpload, saveImg } = require('../controllers/upload')
const { validateJWT } = require('../middlewares/validateJWT')

const router = Router()

router.use(expressFileUpload())

router.put('/:collection/:id', validateJWT, fileUpload)
router.get('/:collection/:img', saveImg)

module.exports = router