const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth')
const { fieldsValidate } = require('../middlewares/fields-validate')

const router = Router()

router.post('/login',[
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    fieldsValidate
], login)

module.exports = router