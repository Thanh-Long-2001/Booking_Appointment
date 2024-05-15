import axios from "../axios";

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', {email, password})
}

const getAllUsers = (inputId) => {
    //template string
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    console.log('check data from service: ', data)
    return axios.post('/api/create-new-user', data)
}

const verifyUser = (data) => {
    return axios.post('/api/verify-user', data)

}

const sendCode = (data) => {
    return axios.post('/api/send-code', data)

}

const confirmPassword = (data) => {
    return axios.post('/api/confirm-password', data)
}

const deleteUserService = (userId) => {
    // return axios.delete('/api/delete-user', {id: userId})
    return axios.delete('/api/delete-user', {data: {id: userId}})
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctorsService = (page) => {
    return axios.get(`/api/get-all-doctors?page=${page}`)
}

const getAllDoctorsService2 = () => {
    return axios.get(`/api/get-all-doctors2`)
}

const getDoctorByName = (name) => {
    return axios.get(`/api/get-doctor-by-name?name=${name}`)
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-info-doctors', data)
}

const getDetailDoctorInfoService = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveScheduleDoctorsService = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
} 

const getScheduleDoctorByDateService = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInfoDoctorByIdService = (inputId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${inputId}`)
}

const getProfileDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookingService = (data) => {
    return axios.post('/api/patient-book-appointment', data)
} 

const postVerifyBookingService = (data) => {
    return axios.post('/api/verify-book-appointment', data)
} 

const createNewSpecialtyService = (data) => {
    return axios.post('/api/create-new-specialty', data)
} 

const getAllSpecialtyService = () => {
    return axios.get(`/api/get-all-specialty`)
}

const getDetailSpecialtyByIdService = (data) => { 
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const createNewClinicService = (data) => {
    return axios.post('/api/create-new-clinic', data)
} 

const getAllClinicService = (page) => {
    return axios.get(`/api/get-all-clinic?page=${page}`)
}

const getAllClinicService2 = (page) => {
    return axios.get(`/api/get-all-clinic2`)
}

const getDetailClinicByIdService = (data) => { 
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}



const sendRemedyService = (data) => {
    return axios.post('/api/send-remedy', data)
} 

const createNewHandBookService = (data) => {
    return axios.post('/api/create-new-handbook', data)
} 

const getAllHandbookService = (page) => {
    return axios.get(`/api/get-all-handbook?page=${page}`)
}

const getDetailHandbookByIdService = (data) => { 
    return axios.get(`/api/get-detail-handbook-by-id?id=${data.id}`)
}

const getSpecialtyByNameService = (nameInput) => { 
    return axios.get(`/api/get-specialty-by-name?name=${nameInput}`) 
}

const cancelPatientService = (data) => {
    return axios.post('/api/cancel-patient', data)
} 

const getListPatientForDoctorService = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}&statusId=${data.statusId}`)
}

const getUserBookingHistory = (data) => {
    return axios.get(`/api/get-history-booking?userId=${data.userId}&date=${data.date}`)
}

const getAllComment = (handbookId) => {
    return axios.get(`/api/get-all-comment?handbookId=${handbookId}`)
}

const createNewComment = (data) => {
    return axios.post(`/api/create-new-comment`, data)
}

const updateCommentByUser = (data) => {
    return axios.put(`/api/update-comment`, data)
}

const deleteCommentByUser = (id) => {
    
    return axios.delete(`/api/delete-comment?id=${id}`)
}

const getBookingDataAndDoctor = (year, month) => {
    return axios.get(`/api/get-booking-data?year=${year}&month=${month}`)
}

const getClinicByServiceAndProvince = (service, province) => {
    return axios.get(`/api/get-clinic-by-service-and-province?service=${service}&province=${province}`)
}

const getClinicByServiceAndProvinceAndClinic = (service, province, clinic) => {
    return axios.get(`/api/get-doctor-by-service-and-province-and-clinic?service=${service}&province=${province}&clinic=${clinic}`)
}

export {
    handleLoginApi, 
    updateCommentByUser, 
    deleteCommentByUser,
    createNewComment,
    getAllComment,
    createNewHandBookService, 
    getAllHandbookService, 
    cancelPatientService,
    getAllUsers, 
    getDetailHandbookByIdService,
    createNewUserService, 
    getSpecialtyByNameService,
    getDoctorByName,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorsService,
    getAllDoctorsService2,
    saveDetailDoctorService,
    getDetailDoctorInfoService,
    saveScheduleDoctorsService,
    getScheduleDoctorByDateService,
    getExtraInfoDoctorByIdService,
    getProfileDoctorByIdService,
    postPatientBookingService,
    postVerifyBookingService,
    createNewSpecialtyService,
    getAllSpecialtyService,
    getDetailSpecialtyByIdService,
    createNewClinicService,
    getAllClinicService,
    getDetailClinicByIdService,
    getListPatientForDoctorService,
    sendRemedyService,
    getUserBookingHistory,
    getAllClinicService2,
    getBookingDataAndDoctor,
    verifyUser,
    sendCode,
    confirmPassword,
    getClinicByServiceAndProvince,
    getClinicByServiceAndProvinceAndClinic
}