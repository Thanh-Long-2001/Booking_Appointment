import clinicService from "../services/clinicService"

let createClinic = async (req, res) => {
    try {
        let info = await clinicService.createClinicService(req.body)
        return res.status(200).json(info)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server ...'
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let info = await clinicService.getAllClinicService(req.query.page)
        return res.status(200).json(info)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server ...'
        })
    }
}

let getAllClinic2 = async (req, res) => {
    try {
        let info = await clinicService.getAllClinicService2()
        return res.status(200).json(info)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server ...'
        })
    }
}

let getDetailClinicById = async (req, res) => {
    try {
        let info = await clinicService.getDetailClinicByIdService(req.query.id)
        return res.status(200).json(info)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server ...'
        })
    }
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getAllClinic2: getAllClinic2,
    getDetailClinicById: getDetailClinicById
}