const { Router } = require('express')

const { check } = require('express-validator')

const { fieldsValidate } = require('../middlewares/fields-validate')
const { validateJWT } = require('../middlewares/validateJWT')

const { getDoctor, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctor')

const router = Router()

router.get('/', getDoctor)
router.post('/',[
    validateJWT,
    check('name', 'Name of the Doctor is required').not().isEmpty(),
    check('hospital', 'ID Hospital must be valid').isMongoId(),
    fieldsValidate
], createDoctor)
router.put('/:id', updateDoctor)
router.delete('/:id', deleteDoctor)

module.exports = router