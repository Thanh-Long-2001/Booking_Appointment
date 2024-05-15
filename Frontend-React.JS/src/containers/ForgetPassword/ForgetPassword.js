import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './ForgetPassword.scss';
import { sendCode, confirmPassword } from '../../services/userService';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Toast, toast } from 'react-toastify';

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            showChangePassword: false,
            newPassword: '',
            confirmPassword: '',
            isShowPassword: false,
            code: null,
            errMessage: '',
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    handleOnChangePass = (event) => {
        this.setState({
            newPassword: event.target.value,
            errMessage: '' // Xóa thông báo lỗi khi người dùng thay đổi email
        })
    }

    handleOnChangeConfirm = (event) => {
        this.setState({
            confirmPassword: event.target.value,
            errMessage: '' // Xóa thông báo lỗi khi người dùng thay đổi email
        })
    }

    handleOnChangeCode = (event) => {
        this.setState({
            code: event.target.value,
            errMessage: '' // Xóa thông báo lỗi khi người dùng thay đổi mã xác nhận
        })
    }

    // Kiểm tra xem mật khẩu nhập lại có khớp với mật khẩu mới không
    checkPasswordMatch = () => {
        const { newPassword, confirmPassword } = this.state;
        if (newPassword !== confirmPassword) {
            this.setState({ errMessage: 'Mật khẩu không khớp' });
            return false;
        }
        return true;
    }


    gotoLoginPage = () => {
        if(this.props.history) {
            this.props.navigate('/login')
        }
    }

    sendCodeVerify = async (email) => {
        let data = {
            username: email,
        }
        this.setState({
            showChangePassword: true,
        })
        await sendCode(data)
        
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    confirmChangePassword = async () => {
        if (!this.checkPasswordMatch()) {
            return;
        } else {
            let data = {
                email: this.state.username,
                code: this.state.code,
                newPassword: this.state.confirmPassword
            }
            let res = await confirmPassword(data)
            if (res && res.errCode === 0) {
                toast.success("Đổi mật khẩu thành công")
            }
        }
    }

    render() {
        let {username, showChangePassword, newPassword, confirmPassword, code} = this.state
        return (
           <div className='forget-background'>
                {!showChangePassword ? (
                    <div className='login-container'>
                        <div className='login-content row'>
                            <div className='col-12 text-login'>
                                <FaArrowLeftLong style={{marginLeft: "-60px", cursor: 'pointer'}} onClick={this.gotoLoginPage}/>
                                <span style={{marginLeft: "40px"}}>Quên mật khẩu </span>
                            </div>
                            <div className='col-12 form-group login-input'>
                                <label>Email:</label>
                                <input type='text' 
                                className='form-control' 
                                placeholder='Enter your email'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                                />
                            </div>
                            <div className='col-12' style={{color: 'red'}}>
                                {this.state.errMessage}
                            </div>
                            
                            <div className='col-9' style={{margin: "auto"}}>
                                <button className='btn-login' onClick={() => {this.sendCodeVerify(username)}}>Xác nhận</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>
                            <FaArrowLeftLong style={{marginLeft: "-60px", cursor: 'pointer'}} onClick={this.gotoLoginPage}/>
                            <span style={{marginLeft: "40px"}}>Đổi mật khẩu </span>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Mật khẩu:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} 
                                    className='form-control' 
                                    placeholder='Enter your email'
                                    value={newPassword}
                                    onChange={(event) => this.handleOnChangePass(event)}
                                />
                                <span onClick={() => {this.handleShowHidePassword()}}>
                                    <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                            
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Xác nhận mật khẩu:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} 
                                    className='form-control' 
                                    placeholder='Enter your email'
                                    value={confirmPassword}
                                    onChange={(event) => this.handleOnChangeConfirm(event)}
                                />
                                <span onClick={() => {this.handleShowHidePassword()}}>
                                    <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-6 form-group login-input'>
                            <label>Nhập mã xác nhận:</label>
                            <input type='text' 
                            className='form-control' 
                            placeholder='Enter your email'
                            value={this.state.code}
                            onChange={(event) => this.handleOnChangeCode(event)}
                            />
                        </div>
                        
                        <div className='col-6' >
                            <button className='btn-login' style={{marginTop: "36px", borderRadius: "4px"}} onClick={this.confirmChangePassword}>Xác nhận</button>
                        </div>
                    </div>
                </div>
                )}
                
           </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
