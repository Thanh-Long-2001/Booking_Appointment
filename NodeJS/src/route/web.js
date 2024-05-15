import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController"
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController"
import handbookController from '../controllers/handbookController'
import commentController from "../controllers/commentController";

let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/about', homeController.getAboutPage)
    router.get('/crud', homeController.getCRUD) //get all user
    
    router.post('/post-crud', homeController.postCRUD) // add user
    router.get('/get-crud', homeController.displayGetCRUD) // view all user
    router.get('/edit-crud', homeController.getEditCRUD) //get data need edit
    router.post('/put-crud', homeController.putCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)

    //rest-api
    //USER
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)
    router.get('/api/allcode', userController.getAllCode)
    router.get('/api/get-history-booking', userController.getUserBookingHistory)
    router.get('/api/get-booking-data', userController.getBookingAndDoctor)
    router.post('/api/verify-user', userController.verifyUser)
    router.post('/api/send-code', userController.verifyCode)
    router.post('/api/confirm-password', userController.confirmPassword)
    router.get('/api/get-clinic-by-service-and-province', userController.getClinicByServiceAndProvince)
    router.get('/api/get-doctor-by-service-and-province-and-clinic', userController.getDoctorByServiceAndProvinceAndClinic)
    //DOCTOR
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome)
    router.get('/api/get-all-doctors', doctorController.getAllDoctors)
    router.get('/api/get-all-doctors2', doctorController.getAllDoctors2)
    router.post('/api/save-info-doctors', doctorController.postInfoDoctors)
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById)
    router.post('/api/bulk-create-schedule', doctorController.postScheduleDoctors)
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleDoctorByDate)
    router.get('/api/get-extra-info-doctor-by-id', doctorController.getExtraInfoDoctorById)
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById)
    router.get('/api/get-list-patient-for-doctor', doctorController.getListPatientForDoctor)
    router.post('/api/send-remedy', doctorController.sendRemedy)
    router.post('/api/cancel-patient', doctorController.cancelPatient)
    router.get('/api/get-doctor-by-name', doctorController.getDoctorByName)
    //PATIENT BOOKING
    router.post('/api/patient-book-appointment', patientController.postBookAppointment)
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment)

    //SPECIALTY
    router.post('/api/create-new-specialty', specialtyController.createSpecialty)
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty)
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById)
    router.get('/api/get-specialty-by-name', specialtyController.getSpecialtyByName)

    //CLINIC
    router.post('/api/create-new-clinic', clinicController.createClinic)
    router.get('/api/get-all-clinic', clinicController.getAllClinic)
    router.get('/api/get-all-clinic2', clinicController.getAllClinic2)
    router.get('/api/get-detail-clinic-by-id', clinicController.getDetailClinicById)

    //HANDBOOK
    router.post('/api/create-new-handbook', handbookController.createHandbook)
    router.get('/api/get-all-handbook', handbookController.getAllHandbook)
    router.get('/api/get-detail-handbook-by-id', handbookController.getDetailHandbookById)

    //COMMENT
    router.get('/api/get-all-comment', commentController.handleGetAllComment)
    router.post('/api/create-new-comment', commentController.handleCreateNewComment)
    router.put('/api/update-comment', commentController.handleUpdateComment)
    router.delete('/api/delete-comment', commentController.handleDeleteComment)
    return app.use("/", router)
}

module.exports = initWebRoutes;