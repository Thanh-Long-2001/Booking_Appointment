import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
import { FaArrowLeftLong } from "react-icons/fa6";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
            dataUser: {}
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleGotoSignupPage = () => {
        if(this.props.history) {
            this.props.history.push(`/signup`)
        }
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if(data && data.errCode !== 0){
                this.setState({
                    errMessage: data.message
                })
            }
            if(data && data.errCode === 0){
                this.props.userLoginSuccess(data.user)
                if (data.user.roleId === 'R1') {
                    this.props.navigate('/system/user-manage')
                } else if (data.user.roleId === 'R2') {
                    this.props.navigate('/doctor/manage-patient')
                } else if (data.user.roleId === 'R3') {
                    this.props.navigate('/home')
                } 
            }
        } catch (e) {
            if(e.response){
                if(e.response.data){
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
            
        }    
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            this.handleLogin()
        }
    }

    gotoHomePage = () => {
        if(this.props.history) {
            this.props.navigate('/home')
        }
    }

    gotoForgetPasswordPage = () => {
        if(this.props.history) {
            this.props.navigate('/forget-password')
        }
    }

    render() {
        //JSX
        let { userInfo } = this.props
        userInfo = this.state.dataUser
        return (
           <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>
                            <FaArrowLeftLong style={{marginLeft: "-123px", cursor: 'pointer'}} onClick={this.gotoHomePage}/>
                            <span style={{marginLeft: "90px"}}>Login </span>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Email:</label>
                            <input type='text' 
                            className='form-control' 
                            placeholder='Enter your username'
                            value={this.state.username}
                            onChange={(event) => this.handleOnChangeUsername(event)}
                            />
                        </div>
                        
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} 
                                    className='form-control' 
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <span onClick={() => {this.handleShowHidePassword()}}>
                                    <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-6' style={{margin: "auto"}}>
                            <button className='btn-login' style={{borderRadius: "4px"}} onClick={() => {this.handleLogin()}}>Đăng nhập</button>
                        </div>
                        <div className='col-12' style={{marginTop: "-10px", textAlign: "center", color: "blue", cursor: "pointer"}}>
                            <span className='forgot-password' onClick={this.gotoForgetPasswordPage}>Quên mật khẩu?</span>
                        </div>

                        <div className='col-12 border-new' style={{marginTop: "10px"}}>
                            <span className='forgot-password dont-account'>Tạo tài khoản mới?</span>
                            <span className='forgot-password let-signup' onClick={this.handleGotoSignupPage}>Đăng ký</span>
                        </div>

                        {/* <div className='col-12 text-center mt-3'>
                            <div className='border-line-text'></div>
                            <span className='text-other-login'>Or</span>
                            <div className='border-line-text'></div>
                        </div> */}
                        {/* <div className='col-12 social-login'>
                            <div className="containerGG background-socialGG">
                                <div className="logo">
                                    <div className="g-line"></div>
                                    <span className="red"></span>
                                    <span className="yellow"></span>
                                    <span className="green"></span>
                                    <span className="blue"></span>
                                </div>
                                <span>Login with Google</span>
                            </div>
                            
                        </div>
                        <div className='col-12 social-login'>
                            <div className="containerGG background-socialFB">

                                <i className="fab fa-facebook-f facebook"></i>
                                <span>Login with Facebook</span>
                            </div>
                        </div> */}
                    </div>
                </div>
           </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
