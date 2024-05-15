import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './../UserManage.scss';
import * as actions from '../../../store/actions'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";


class ManageInfoUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderAll: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            avatar: '',
            role: '',
            userEditId: '',
            birthday: '',
            action: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            let user = this.props.userInfo;
            this.setState({
                genderAll: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                email: user.email,
                password: 'secrethehe',
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phonenumber,
                address: user.address,
                birthday: user.birthday,
                avatar: user.image,
                userEditId: user.id
            })
        }
    }



    handleSaveUser = () => {
        this.props.editUser({
            id: this.state.userEditId,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthday: this.state.birthday,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            avatar: this.state.avatar
        })
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;

        this.setState({
            isOpen: true
        })
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectURL = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectURL,
                avatar: base64
            })
        }
        
    }


    
    render() {
        console.log('check render: ', this.state)
        let genderData = this.state.genderAll;
        let {language} = this.props
        let {email, password, firstName, lastName, phoneNumber, birthday, address, gender} = this.state
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    <FormattedMessage id="manage-user.title"/> 
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-4'>Thông tin cá nhân</div>
                            <div className='row col-12 my-2'>
                                <div className='col-3'>
                                    <label><FormattedMessage id="manage-user.email"/></label>
                                    <input className='form-control' type='email'
                                        value={email}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
                                        disabled={true}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="manage-user.password"/></label>
                                    <input className='form-control' type='password'
                                        value={password}
                                        onChange={(event) => { this.onChangeInput(event, 'password') }}
                                        disabled={true}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="manage-user.firstName"/></label>
                                    <input className='form-control' type='text'
                                        value={firstName}
                                        onChange={(event) => {this.onChangeInput(event, 'firstName')}}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="manage-user.lastName"/></label>
                                    <input className='form-control' type='text'
                                        value={lastName}
                                        onChange={(event) => {this.onChangeInput(event, 'lastName')}}
                                    />
                                </div>
                            </div>
                            <div className='row col-12 my-2'>
                                <div className='col-3'>
                                    <label><FormattedMessage id="manage-user.phoneNumber"/></label>
                                    <input className='form-control' type='text'
                                        value={phoneNumber}
                                        onChange={(event) => {this.onChangeInput(event, 'phoneNumber')}}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="manage-user.birthday"/></label>
                                    <input className='form-control' type='text'
                                        value={birthday}
                                        onChange={(event) => {this.onChangeInput(event, 'birthday')}}
                                    />
                                </div>
                                <div className='col-6'>
                                    <label><FormattedMessage id="manage-user.address"/></label>
                                    <input className='form-control' type='text'
                                        value={address}
                                        onChange={(event) => {this.onChangeInput(event, 'address')}}
                                    />
                                </div>
                            </div>
                            <div className='row col-12 my-2'>
                                <div className='col-3'>
                                    <label><FormattedMessage id="manage-user.gender"/></label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                        value={gender}
                                    >
                                        {genderData && genderData.length > 0 &&
                                            genderData.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                
                                
                               
                            </div>

                            <div className='col-3'>
                                    <label><FormattedMessage id="manage-user.image" /></label>
                                    <div className='preview-img-container'>
                                        <input id='previewImg' type='file' hidden
                                            onChange={(event) => this.handleOnChangeImage(event)}
                                        />
                                        <label className='label-upload' htmlFor='previewImg'><FormattedMessage id="manage-user.preview-image" /><i class="fas fa-upload"></i></label>
                                        <div className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                            onClick={() => this.openPreviewImage()}
                                        ></div>   
                                    </div>
                                </div>
                            <div className='col-12 mb-3'>
                                <button className="btn btn-warning" 
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {<FormattedMessage id="manage-user.edit" />}    
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
                
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        editUser: (data) => dispatch(actions.fetchEditUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageInfoUser);
