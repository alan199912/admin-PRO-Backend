const { Router } = require('express')
const { getAllSearcher, getCollectionSearcher } = require('../controllers/search')

const { validateJWT } = require('../middlewares/validateJWT')

const router = Router()

router.get('/:wanted', validateJWT, getAllSearcher)
router.get('/collection/:collection/:wanted', validateJWT, getCollectionSearcher)

module.exports = router