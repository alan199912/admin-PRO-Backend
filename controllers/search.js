const User = require('../models/user')
const Doctor = require('../models/doctor')
const Hospital = require('../models/hospital')

const getAllSearcher = async (req, res) => {

    try {

        const wanted = req.params.wanted
        const regex = new RegExp( wanted, 'i' )

        const [user, doctor, hospital] = await Promise.all([
            User.find({ name: regex }),
            Doctor.find({ name: regex }),
            Hospital.find({ name: regex })
        ])

        res.status(200).json({
            status: 'success',
            user,
            doctor,
            hospital
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            msg: 'Error unexpected'
        })
    }
}

const getCollectionSearcher = async (req, res) => {

    try {

        const collection = req.params.collection
        const wanted = req.params.wanted

        const regex = new RegExp( wanted, 'i' )

        let data = []

        switch (collection) {
            case 'doctors':
                data = await Doctor.find({ name: regex })
                            .populate('user', 'name img')
                            .populate('hospital', 'name img')
                break;

            case 'hospitals':
                data = await Hospital.find({ name: regex })
                                .populate('user', 'name img')
                break;

            case 'users':
                data = await User.find({ name: regex })
                break;

            default:
                return res.status(400).json({
                    status: 'warning',
                    msg: 'Collection not found'
                })
        }
        
        res.status(200).json({
            status: 'success',
            data,
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            msg: 'Error unexpected'
        })
    }
}

module.exports = {
    getAllSearcher,
    getCollectionSearcher
}