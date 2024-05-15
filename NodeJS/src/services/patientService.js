import _ from "lodash";
import db from "../models/index";
import emailService from "./emailService"
import { v4 as uuidv4 } from 'uuid';
import { Sequelize } from "sequelize";
const op = Sequelize.Op
require('dotenv').config()

let postBookAppointmentService = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.id || !data.doctorId || !data.timeType
                || !data.date || !data.fullName || !data.address 
                || !data.selectedGender || !data.phoneNumber || !data.birthday ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters! OK'
                })
            } else {
                let token = uuidv4()

                let scheduleBookingData = await db.Schedule.findOne({
                    where: {
                        doctorId: data.doctorId,
                        timeType: data.timeType,
                        date: data.date,
                    },
                    raw: false,
                    nest: true
                })

                

                if (scheduleBookingData && scheduleBookingData.currentNumber >= scheduleBookingData.maxNumber) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Full patient booking in this time!'
                    })
                    return;
                }
                //upsert patient
                let findBookingCheck = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        date: data.date,
                    },
                    include: [
                        {
                            model: db.User, as: 'userBooking',
                            where: {
                                id: data.id
                            },
                            
                        },
                    ],
                    raw: false,
                    nest: true
                })

                if (findBookingCheck) {
                    resolve({
                        errCode: 3,
                        errMessage: 'You can only book one appointment per day!'
                    })
                    return;
                }

                let user = await db.User.findAll({
                    where: {id: data.id},
                    
                })

                const date = new Date(data.birthday);

                // Lấy ngày, tháng và năm từ đối tượng Date
                const day = date.getDate();
                const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
                const year = date.getFullYear() % 100; // Lấy 2 chữ số cuối của năm

                // Định dạng lại ngày, tháng và năm theo DD/MM/YY
                const formattedDate = `${day}/${month}/${year}`;
                console.log(data.birthday);
                
                //create booking record
                if (user && user[0]) {
                    let bookingObj = await db.Booking.findOrCreate({
                        where: { patientId: data.id, date: data.date, doctorId: data.doctorId },
                        defaults: {
                            statusId: 'S1',
                            doctorId : data.doctorId,
                            patientId : user[0].id,
                            date : data.date,
                            namePatient: data.fullName,
                            numberPhone: data.phoneNumber,
                            birthday: formattedDate,
                            address: data.address,
                            gender: data.selectedGender,
                            timeType: data.timeType,
                            reason: data.reason,
                            token: token
                        }
                    })

                    scheduleBookingData.currentNumber = scheduleBookingData.currentNumber + 1

                    await scheduleBookingData.save()

                    // if (bookingObj[0].token === token) {
                    //     await emailService.sendSimpleEmail({
                    //         receiverEmail: user[0].email,
                    //         patientName: data.fullName,
                    //         time: data.timeString,
                    //         doctorName: data.doctorName,
                    //         language: data.language,
                    //         redirectLink: buildUrlEmail(data.doctorId, token)
                    //     })
                    // }
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save book appointment succeed!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result
}

let postVerifyBookAppointmentService = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: { doctorId: data.doctorId, token: data.token, statusId: 'S1' },
                    raw: false //must be to update
                })

                if (appointment) {
                    appointment.statusId = 'S2'
                    await appointment.save()

                    resolve({
                        errCode: 0,
                        errMessage: 'Update the status appointment succeed!'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment has been activated or does not exist!'
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postBookAppointmentService: postBookAppointmentService,
    postVerifyBookAppointmentService: postVerifyBookAppointmentService
}