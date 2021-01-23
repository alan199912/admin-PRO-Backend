const { Router } = require('express')

const { check } = require('express-validator')

const { fieldsValidate } = require('../middlewares/fields-validate')
const { validateJWT } = require('../middlewares/validateJWT')

const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospital')

const router = Router()

router.get('/', getHospitals)
router.post('/',[
    validateJWT,
    check('name', 'Name of the Hospital is required').not().isEmpty(),
    fieldsValidate
], createHospital)
router.put('/:id', updateHospital)
router.delete('/:id', deleteHospital)

module.exports = router