import userService from "../services/userService"

let handleLogin = async (req, res) => {
    //check email exist
    //compare password
    //return userInfo
    //access token: JWT
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing inputs parameters!'
        })
    }

    let userData = await userService.handleUserLogin(email, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id //ALL or Id

    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            users: []
        })
    }
    
    let users = await userService.getAllUsers(id) 

    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users: users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body)
    return res.status(200).json(message)
}

let verifyUser = async (req, res) => {
    let message = await userService.verifyUser(req.body)
    return res.status(200).json(message)

}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message =  await userService.updateUserData(data)
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await userService.deleteUser(req.body.id)
    return res.status(200).json(message)
}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type)
        console.log(data);
        return res.status(200).json(data)
    } catch (e) {
        console.log('Get all code err: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getUserBookingHistory = async (req, res) => {
    try {
        let data = await userService.getUserBookingHistory(req.query.userId, req.query.date)
        return res.status(200).json(data)
    } catch (e) {
        console.log('Get all code err: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getBookingAndDoctor = async (req, res) => {
    try {
        let data = await userService.getBookingData( req.query.year, req.query.month)

        return res.status(200).json(data)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server kkk'
        })
    }
}

let verifyCode = async (req, res) => {
    await userService.sendCodeVerify(req.body.username)
    return res.status(200)
}

let confirmPassword = async (req, res) => {
    console.log(req.body);
    let data = await userService.confirmChangePassword(req.body.email, req.body.code, req.body.newPassword)
    return res.status(200).json(data)
}

let getClinicByServiceAndProvince = async (req, res) => {
    let data = await userService.getClinicByServiceAndProvince(req.query.service, req.query.province)
    return res.status(200).json(data)
}

let getDoctorByServiceAndProvinceAndClinic = async (req, res) => {
    let data = await userService.getDoctorByServiceAndProvinceAndClinic(req.query.service, req.query.province, req.query.clinic)
    return res.status(200).json(data)
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
    getUserBookingHistory: getUserBookingHistory,
    getBookingAndDoctor: getBookingAndDoctor,
    verifyUser: verifyUser,
    verifyCode: verifyCode,
    confirmPassword: confirmPassword,
    getClinicByServiceAndProvince: getClinicByServiceAndProvince,
    getDoctorByServiceAndProvinceAndClinic: getDoctorByServiceAndProvinceAndClinic,
}