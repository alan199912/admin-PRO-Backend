const { Router } = require('express')
const { check } = require('express-validator')
const { fieldsValidate } = require('../middlewares/fields-validate')
const { getUsers, createUsers, updateUser, deleteUser } = require('../controllers/user')
const { validateJWT } = require('../middlewares/validateJWT')

const router = Router()

router.get('/', validateJWT, getUsers)
router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('password','The password is required').not().isEmpty(),
    check('email', 'The email is required').isEmail().not().isEmpty(),
    fieldsValidate,
], createUsers)
router.put('/:id', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('role','The role is required').not().isEmpty(),
    check('email', 'The email is required').isEmail().not().isEmpty(),
    fieldsValidate
],
updateUser)
router.delete('/:id', validateJWT, deleteUser)

module.exports = router