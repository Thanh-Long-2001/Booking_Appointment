import db from "../models/index";
import bcrypt from "bcryptjs";
const { Op, Sequelize } = require('sequelize');
import emailService from "./emailService"
import { v4 as uuidv4 } from 'uuid';
import { includes } from "lodash";
const jwt = require('jsonwebtoken');
require('dotenv').config()

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e)
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email);
            if(isExist){ //user exist -> compare password
                let user = await db.User.findOne({ 
                    //attributes: ['','']
                    where: {email: email},
                    raw: true
                })
                if(user){
                    let check = bcrypt.compareSync(password, user.password)
                    if(check){
                        userData.errCode = 0
                        userData.errMessage = 'OK'
                        delete user.password
                        // delete user.phonenumber
                        userData.user = user
                    }else{
                        userData.errCode = 3
                        userData.errMessage = 'Wrong password!'
                    }
                }else{
                    userData.errCode = 2
                    userData.errMessage = 'User is not found!'
                }
            }else{
                userData.errCode = 1;
                userData.errMessage = `Your email is not exist. Please try other email!`
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let users = ''
            if(userId === 'ALL'){
                users = await db.User.findAll({
                    where: {roleId: 'R3'},
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            //check Email exist?
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already used. Please try other email!',
                })
            } else {
                

                let userData = {
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar,
                    birthday: data.birthday,
                    password: data.password
                };
                let token = jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn: '1h' });
                
                    await emailService.sendSimpleEmail({
                        receiveEmail: data.email,
                        userName: `${data.firstName} ${data.lastName}`,
                        redirectLink: buildUrlEmail(token)
                    })

                    
            }     
            resolve({
                errCode: 0,
                message: 'OK',
            })    
        } catch (e) {
            reject(e)
        }
    })
}

let verifyUser = (data) => {
    return new Promise(async (resolve, reject) => {
        const decoded = jwt.verify(data.token, process.env.TOKEN_SECRET);
        let hashPasswordFromBcrypt = await hashUserPassword(decoded.password);
        await db.User.create({
            email: decoded.email,
            password: hashPasswordFromBcrypt,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            address: decoded.address,
            phonenumber: decoded.phonenumber,
            gender: decoded.gender,
            roleId: decoded.roleId,
            positionId: decoded.positionId,
            image: decoded.avatar,
            birthday: decoded.birthday
        })
        
        resolve({
            errCode: 0,
            message: 'OK',
        })  
    })
}

let buildUrlEmail = (token) => {
    let result = `${process.env.URL_REACT}/verify-user?token=${token}`
    return result
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: 'The user is not exist!'
            })
        } else {
            await db.User.destroy({
                where: {id: userId}
            })
        }
        resolve({
            errCode: 0,
            message: 'Delete the user succeed!'
        })
    })
}

let updateUserData = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                attributes: {
                    exclude: ['password']
                },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                user.roleId = data.roleId
                user.positionId = data.positionId
                user.gender = data.gender
                user.phonenumber = data.phonenumber
                user.birthday = data.birthday
                if (data.avatar) {
                    user.image = data.avatar
                }

                await user.save()
                
                resolve({
                    errCode: 0,
                    message: 'Update the user succeed!'
                })
            }
            else{
                resolve({
                    errCode: 2,
                    errMessage: 'User is not found!'
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise( async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let res = {};
                let allCode = await db.Allcode.findAll({
                    where: { type: typeInput }
                })
                res.errCode = 0;
                res.data = allCode;
                resolve(res)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getUserBookingHistory = (userId, date) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!userId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        patientId: userId,
                        date: date,
                    },
                    include: [
                        {
                            model: db.User,
                            as: "userBooking",
                            attributes: ['email', 'firstName', 'lastName', 'address', 'gender'],
                            include: [
                                { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                            ]
                        },
                        { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'timeTypeDataPatient', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'statusTypeDataPatient', attributes: ['valueEn', 'valueVi'] }
                    ],
                    raw: false, 
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch(e) {
            reject(e)
        }
    })
}

let getBookingData = (year, month) => {
    
    return new Promise( async (resolve, reject) => {
        try {
            if(!year || !month) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        createdAt: {
                            [db.Sequelize.Op.and]: [
                                { [db.Sequelize.Op.gte]: new Date(year, month - 1, 1) },
                                { [db.Sequelize.Op.lt]: new Date(year, month, 1) }
                            ]
                        },
                      
                    },
                    include: [
                        {
                            model: db.User,
                            as: 'doctorBooking',
                            attributes: ['id', 'email', 'firstName', 'lastName', 'address', 'gender'],
                            include: [
                                { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                            ]
                        },
                        { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'timeTypeDataPatient', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'statusTypeDataPatient', attributes: ['valueEn', 'valueVi'] }
                    ],
                    raw: false, 
                    nest: true
                })

                let doctorBookings = [];
                data.forEach(booking => {
                    let doctor = booking['doctorBooking']; // Lấy id của bác sĩ
                    
                        doctorBookings.push(doctor); // Thêm id của bác sĩ với số lượng booking là 1
                    
                });

                let doneBooking = [];
                let cancelBooking = [];
                data.forEach(item => {
                    if(item.statusId == "S2") {
                        doneBooking.push(item.doctorBooking);
                    } else if (item.statusId == "S4") {
                        cancelBooking.push(item.doctorBooking)
                    }
                })

                // doctor done
                let doneGroupedDoctors = new Map();
                doneBooking.forEach(doctor => {
                    let id = doctor.id;
                    if (!doneGroupedDoctors.has(id)) {
                        doneGroupedDoctors.set(id, {
                            doctor: doctor,
                            count: 1
                        });
                    } else {
                        let group = doneGroupedDoctors.get(id);
                        group.count++;
                    }
                });

                // Chuyển đổi Map thành mảng để trả về
                let doneDoctorBooking = Array.from(doneGroupedDoctors.values());

                // doctor cancel
                let cancelGroupedDoctors = new Map();
                cancelBooking.forEach(doctor => {
                    let id = doctor.id;
                    if (!cancelGroupedDoctors.has(id)) {
                        cancelGroupedDoctors.set(id, {
                            doctor: doctor,
                            count: 1
                        });
                    } else {
                        let group = cancelGroupedDoctors.get(id);
                        group.count++;
                    }
                });

                // Chuyển đổi Map thành mảng để trả về
                let cancelDoctorBooking = Array.from(cancelGroupedDoctors.values());

                // result
                let result = [];

                doneDoctorBooking.forEach(doneItem => {
                    let doctorId = doneItem.doctor.id;
                    let doneCount = doneItem.count;
                    let cancelCount = cancelDoctorBooking.find(cancelItem => cancelItem.doctor.id === doctorId)?.count || 0;

                    result.push({
                        doctorId: doctorId,
                        doctorEmail: doneItem.doctor.email,
                        firstName: doneItem.doctor.firstName,
                        lastName: doneItem.doctor.lastName,
                        done: doneCount,
                        cancel: cancelCount
                    });
                });

                cancelDoctorBooking.forEach(cancelItem => {
                    let doctorId = cancelItem.doctor.id;
                    if (!result.some(item => item.doctorId === doctorId)) {
                        result.push({
                            doctorId: doctorId,
                            doctorEmail: cancelItem.doctor.email,
                            firstName: cancelItem.doctor.firstName,
                            lastName: cancelItem.doctor.lastName,
                            done: 0,
                            cancel: cancelItem.count
                        });
                    }
                });




                
                resolve({
                    errCode: 0,
                    doneBooking: doneBooking.length,
                    cancelBooking: cancelBooking.length,
                    result: result
                })
            }
        } catch(e) {
            reject(e)
        }
    })
}

let sendCodeVerify = (email) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({ 
            where: { email: email}
        })
        if(user) {
            let codeVerify = Math.floor((Math.random()*1000000)+1);
            await emailService.sendCodeEmail(
                {
                    codeVerify: codeVerify,
                    receiverEmail: email
    
                }
            )
            let userCode = await db.VerifyCode.findOne({
                where: { userId: user.id},
                raw: false
            })
            if(userCode) {
                userCode.code = codeVerify;

                await userCode.save();
                resolve({
                    errCode: 0,
                    message: 'Update the code succeed!'
                })
                
            } else {
                await db.VerifyCode.create({
                    userId: user.id,
                    code: codeVerify
                })

                resolve({
                    errCode: 0,
                    message: 'Create the code succeed!'
                })
            }

           
        } 
        
        resolve({
            errCode: 0,
            message: 'OK',
        })  
    })
}

let confirmChangePassword = (email, code, newPassword) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({ 
            where: { email: email},
            raw: false
        })
        if(user) {

            
            let userCode = await db.VerifyCode.findOne({
                where: { 
                    userId: user.id,
                    code: code
                },
                raw: false
            })

            if(userCode) {
                let newPasswordHashed = await hashUserPassword(newPassword);
                user.password = newPasswordHashed;
                
                await user.save()
            }
            

           
        } 
        
        resolve({
            errCode: 0,
            message: 'OK',
        })  
    })
}

const getClinicByServiceAndProvince = async (service, province) => {
    try {
        let doctorInfos = await db.Doctor_Info.findAll({
            where: {
                specialtyId: service,
                provinceId: province
            },
            attributes: ['clinicId'] // Chỉ lấy trường clinicId
        });

        // Trích xuất các clinicId từ kết quả
        let clinicIds = doctorInfos.map(info => info.clinicId);

        // Loại bỏ các giá trị trùng lặp
        clinicIds = [...new Set(clinicIds)];

        if (clinicIds.length === 0) {
            return {
                errCode: 0,
                data: []
            };
        }

        // Bước 2: Lấy thông tin các phòng khám từ bảng Clinic
        let clinics = await db.Clinic.findAll({
            where: {
                id: clinicIds
            }
        });

        return {
            errCode: 0,
            data: clinics
        };
    } catch (error) {
        console.error('Error in getClinicByServiceAndProvince:', error);
        return {
            errCode: 1,
            errMessage: 'Error from server'
        };
    }
};


const getDoctorByServiceAndProvinceAndClinic = async (service, province, clinic) => {
    try {
        let doctorInfos = await db.Doctor_Info.findAll({
            where: {
                specialtyId: service,
                provinceId: province,
                clinicId: clinic
            },
            attributes: ['doctorId'] // Chỉ lấy trường clinicId
        });

        // Trích xuất các clinicId từ kết quả
        let doctorIds = doctorInfos.map(info => info.doctorId);

        // Loại bỏ các giá trị trùng lặp
        doctorIds = [...new Set(doctorIds)];

        if (doctorIds.length === 0) {
            return {
                errCode: 0,
                data: []
            };
        }

        console.log(doctorIds);

        // Bước 2: Lấy thông tin các phòng khám từ bảng Clinic
        let doctors = await db.User.findAll({
            where: {
                id: doctorIds
            }
        });

        return {
            errCode: 0,
            data: doctors
        };
    } catch (error) {
        console.error('Error in getClinicByServiceAndProvinceAndClinic:', error);
        return {
            errCode: 1,
            errMessage: 'Error from server'
        };
    }
};



module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
    getUserBookingHistory: getUserBookingHistory,
    getBookingData: getBookingData,
    verifyUser: verifyUser,
    sendCodeVerify: sendCodeVerify,
    confirmChangePassword: confirmChangePassword,
    getClinicByServiceAndProvince: getClinicByServiceAndProvince,
    getDoctorByServiceAndProvinceAndClinic: getDoctorByServiceAndProvinceAndClinic,
}