const fs = require('fs')

const User = require('../models/user')
const Doctor = require('../models/doctor')
const Hospital = require('../models/hospital')

const deleteImg = (path) => {
    // * verify if exists a img
    if( fs.existsSync( path ) ) {
        fs.unlinkSync( path ) // * delete img
    }
}

const updateImg = async (collection, id, nameFile) => {

    let oldPath = ''
    
    switch (collection) {
        case 'doctors':
            const doctor = await Doctor.findById(id)

            if(!doctor) {
                return false
            }

            oldPath = `./uploads/doctors/${doctor.img}`
            deleteImg(oldPath)

            doctor.img = nameFile
            await doctor.save()

            return true

        case 'users':
            const user = await User.findById(id)

            if(!user) {
                return false
            }

            oldPath = `./uploads/users/${user.img}`
            deleteImg(oldPath)

            user.img = nameFile
            await user.save()

            return true

        case 'hospitals':
            const hospital = await Hospital.findById(id)

            if(!hospital) {
                return false
            }

            oldPath = `./uploads/hospitals/${hospital.img}`
            deleteImg(oldPath)

            hospital.img = nameFile
            await hospital.save()

            return true
    
        default:
            break;
    }

}

module.exports = {
    updateImg
}