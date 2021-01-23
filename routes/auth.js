const { Router } = require('express')
const { check } = require('express-validator')
const { login, googleSignIn } = require('../controllers/auth')
const { fieldsValidate } = require('../middlewares/fields-validate')

const router = Router()

router.post('/login',[
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    fieldsValidate
], login)

router.post('/google',[
    check('token', 'The Token google is required').not().isEmpty(),
    fieldsValidate
], googleSignIn)

module.exports = router