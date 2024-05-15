import _ from "lodash";
import db from "../models/index";

let createClinicService = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown || !data.address) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllClinicService = (page) => {
    const pageSize = 5; // Số lượng bản ghi trên mỗi trang
    const offset = (page - 1) * pageSize;
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.Clinic.findAll({
                limit: pageSize,
                offset: offset,
            })
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary')
                    return item
                })
            }
        
            let allData = await db.Clinic.findAll({})
            const totalPages = Math.ceil((allData.length / pageSize));
            resolve({
                errCode: 0,
                errMessage: 'OK',
                data,
                pagination: {
                    pageSize: pageSize,
                    totalPages: totalPages
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getAllClinicService2 = () => {
  
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.Clinic.findAll({
            
            })
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary')
                    return item
                })
            }
        
 
            resolve({
                errCode: 0,
                errMessage: 'OK',
                data,
                
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getDetailClinicByIdService = (inputId) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: { id: inputId },
                    attributes: ['descriptionHTML', 'descriptionMarkdown', 'name', 'address', 'image'],
                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary')
                }

                if (data) {
                    let doctorClinic = []
                    doctorClinic = await db.Doctor_Info.findAll({
                        where: { clinicId: inputId },
                        attributes: ['doctorId', 'provinceId'],
                    })
                    data.doctorClinic = doctorClinic
                } else data = {}
                    
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createClinicService: createClinicService,
    getAllClinicService: getAllClinicService,
    getAllClinicService2: getAllClinicService2,
    getDetailClinicByIdService: getDetailClinicByIdService
}