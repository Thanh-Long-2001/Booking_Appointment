import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Signup.scss";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils, USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderAll: ['Male', 'Female', 'Other'],

      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
      firstName: '',
      lastName: '',
      birthday: '',
      phoneNumber: '',
      address: '',
      gender: '',
      action: CRUD_ACTIONS.CREATE,
      
      role: USER_ROLE.PATIENT,
      dataUser: {},
    };
  }

  handleSaveUser = () => {
    let isValid = this.checkValidateInput()
    if (isValid === false) return;

    let {action} = this.state
    if (action === CRUD_ACTIONS.CREATE) {
      
        //fire redux create user
        this.props.createNewUser({
            email: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthday: this.state.birthday,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
        })
    }

    
    
  }

  checkValidateInput = () => {
    let isValid = true
    let arrCheck = ['username', 'password', 'firstName', 'lastName', 'phoneNumber', 'address',]
    for (let i = 0; i < arrCheck.length; i++){
        if (!this.state[arrCheck[i]]) {
            isValid = false
            alert('Missing required parameter: ' + arrCheck[i])
            break
        }
    }
    return isValid
}

  

  handleGotoLoginPage = () => {
    if(this.props.history) {
        this.props.history.push(`/login`)
    }
  }

  handleOnChangeUsername = (event) => {

    let username = event.target.value;
    this.setState({
      username: username,
    });

    const emailRegex = /\S+@\S+\.\S+/;
    const isValidEmail = emailRegex.test(username);

    if (!isValidEmail) {
      this.setState({ errMessage: "Invalid email format" });
    } else {
      this.setState({ errMessage: "" });
    }
  };

  handleOnChangeFirstname = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  };

  handleOnChangeLastname = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };

  handleOnChangeBirthday = (event) => {
    this.setState({
      birthday: event.target.value,
    });
  };

  handleOnChangeAddress = (event) => {
    this.setState({
      address: event.target.value,
    });
  };

  handleOnChangePhoneNumber = (event) => {
    this.setState({
      phoneNumber: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state }
    copyState[id] = event.target.value

    this.setState({
        ...copyState
    })
}
  



  render() {
    let {username, password, firstName, lastName, phoneNumber, address, gender, action, birthday, errMessage} = this.state
    //JSX
    let { userInfo } = this.props;
    let genderData = this.state.genderAll;
    console.log(errMessage);
    userInfo = this.state.dataUser;
    return (
      <div className="signup-background">
        <div className="signup-container signup-form">
          <div className="signup-content row">
            <div className="col-12 text-login">Register</div>
            <div className="col-6 form-group login-input">
              <label>Username (email):</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(event) => this.handleOnChangeUsername(event)}
              />

              {errMessage !== '' && (
                  <div className="error" style={{ color: "red" }}>
                  {this.state.errMessage}
                </div>
              )}
            </div>

            

            <div className="col-6 form-group login-input">
              <label>First Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your firstName"
                value={firstName}
                onChange={(event) => this.handleOnChangeFirstname(event)}
              />
            </div>

            

            <div className="col-6 form-group login-input">
              <label>Last Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your lastName"
                value={lastName}
                onChange={(event) => this.handleOnChangeLastname(event)}
              />
            </div>

            <div className="col-6 form-group login-input">
              <label>BirthDay:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your birthday"
                value={birthday}
                onChange={(event) => this.handleOnChangeBirthday(event)}
              />
            </div>

            <div className="col-6 form-group login-input">
              <label>Numberphone:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your numberphone"
                value={phoneNumber}
                onChange={(event) => this.handleOnChangePhoneNumber(event)}
              />
            </div>

            <div className="col-6 form-group login-input">
              <label>Address:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your address"
                value={address}
                onChange={(event) => this.handleOnChangeAddress(event)}
              />
            </div>

            <div className='col-3 form-group login-input'>
              <label>Gender:</label>
              <select className="form-control"
                  onChange={(event) => { this.onChangeInput(event, 'gender') }}
                  value={gender}
              >
                  {genderData && genderData.length > 0 &&
                      genderData.map((item, index) => {
                          return (
                              <option key={index} value={item.keyMap}>
                                  {item}
                              </option>
                          )
                      })
                  }
              </select>
          </div>


            

            <div className="col-6 form-group login-input" style={{marginLeft: "138px"}}>
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fas fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>

            

            <div className="col-8 custom-signup">
              <button
                className="btn-signup"
                onClick={() => {
                  this.handleSaveUser();
                  // alert('create success');
                }}
              >
                Signup
              </button>
            </div>

            

            <div className='col-12 border-new'>
                            <span className='forgot-password dont-account'>Already have an account?</span>
                            <span className='forgot-password let-signup' onClick={this.handleGotoLoginPage}>Login</span>
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
                                <span>Signup with Google</span>
                            </div>
                            
                        </div>
                        <div className='col-12 social-login'>
                            <div className="containerGG background-socialFB">

                                <i className="fab fa-facebook-f facebook"></i>
                                <span>Signup with Facebook</span>
                            </div>
                        </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        // language: state.app.language,
        // userInfo: state.user.userInfo,
        // isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        // userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        createNewUser: (data) => dispatch(actions.fetchCreateNewUser(data)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Signup);
