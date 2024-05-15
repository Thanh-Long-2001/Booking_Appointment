import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import { LANGUAGES } from '../../../utils'
import DatePicker from '../../../components/Input/DatePicker'
import { FormattedMessage } from 'react-intl';
import { getListPatientForDoctorService, sendRemedyService, getAllCodeService, cancelPatientService } from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import _ from 'lodash';
import { IoIosInformationCircleOutline } from "react-icons/io";
import ShowReasonModal from './ShowReasonModal';
class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
            isOpenReasonModal: false,
            reason: '',
            listStatus: []
        }
    }

    async componentDidMount() {
        await this.getDataPatient()
    }

    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()
        let res = await getListPatientForDoctorService({
            doctorId: user.id,
            date: formatedDate,
            statusId: 'ALL'
        })
        
        let resStatus = await getAllCodeService('STATUS')

            if (res && res.errCode === 0 && resStatus && resStatus.errCode === 0) {

                let dataStatus = resStatus.data

                if (dataStatus && dataStatus.length > 0) {
                    dataStatus.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: "STATUS",
                        valueEn: "All",
                        valueVi: 'Tất cả'
                    })
                }

                this.setState({
                    dataPatient: res.data,
                    listStatus: dataStatus ? dataStatus : []
                })
            }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        },async () => {
            await this.getDataPatient()
        })
    }

    handleBtnConfirm = (item, doctorName) => {
        
  
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            date: item.date,
            patientEmail: item.userBooking.email,
            patientName: `${item.userBooking.firstName} ${item.userBooking.lastName}`,
            timeType: item.timeType,
            timeType2: item.timeTypeDataPatient.valueEn,
            doctorName: doctorName
        }
        let timestamp = parseInt(data.date, 10);
        const date = new Date(timestamp);

                // Lấy ngày, tháng và năm từ đối tượng Date
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const year = date.getFullYear(); // Lấy 2 chữ số cuối của năm

        // Định dạng lại ngày, tháng và năm theo DD/MM/YY
        const formattedDate = `${day}/${month}/${year}`;
        data.date = formattedDate;

        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    handleBtnCancel = async (item) => {
        let res = await cancelPatientService({
            doctorId: item.doctorId,
            patientId: item.patientId,
        })
        if (res && res.errCode === 0) {
            toast.success('Cancel appointment succeed!')
            await this.getDataPatient()
        } else {
            toast.error('Cancel appointment failed!')
        }
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    handleOpenShowReason = (reason) => {
        console.log(reason);
        this.setState({
            isOpenReasonModal: true,
            reason: reason
        })
        console.log(this.state.reason);
    }

    closeReasonModal = () => {
        this.setState({
            isOpenReasonModal: false,
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state
        this.setState({
            isShowLoading: true
        })

        let res = await sendRemedyService({
            email: dataChild.email,
            // imageBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            timeType2: dataModal.timeType2,
            language: this.props.language,
            patientName: dataModal.patientName,
            doctorName: dataModal.doctorName,
            date: dataModal.date
  
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send remedy succeed!')
            this.closeRemedyModal()
            await this.getDataPatient()
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Send remedy failed!')
        }
    }

    handleOnChangeSelect = async (event) => {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()
        let res = await getListPatientForDoctorService({
                doctorId: user.id,
                date: formatedDate,
                statusId: event.target.value
            })
            
        if (res && res.errCode === 0) {
            let data = res.data
            this.setState({
                dataPatient: data
            })
        }
    }

    render() {
        let { dataPatient, isOpenRemedyModal, dataModal, listStatus, isOpenReasonModal } = this.state
        let {language, user} = this.props
        console.log(user);
        const doctorName = `${user.firstName} ${user.lastName}`
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className='manage-patient-container'>
                        <div className='m-p-title'>
                            <FormattedMessage id="admin.manage-patient.title"/>
                        </div>
                        <div className='manage-patient-body row'>
                            <div className='col-4 form-group'>
                                <label><FormattedMessage id="admin.manage-patient.chose-date"/></label>
                                <DatePicker 
                                    onChange={this.handleOnchangeDatePicker}
                                    className='form-control'
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className='col-2 form-group select-cus'>
                                <label><FormattedMessage id="admin.manage-patient.chose-status"/></label>
                                <select onChange={(event) => this.handleOnChangeSelect(event)}>
                                    { listStatus && listStatus.length > 0 &&
                                        listStatus.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-12 table-manage-patient'>
                                <table id="customers">
                                    <tbody>
                                        <tr>
                                            <th><FormattedMessage id="manage-user.numeric"/></th>
                                            
                                            <th><FormattedMessage id="manage-user.time"/></th>
                                            <th>Người dùng</th>
                                            <th>Đối tượng khám</th>
                                            <th>Ngày sinh</th>
                                            <th><FormattedMessage id="manage-user.gender"/></th>
                                            <th><FormattedMessage id="manage-user.address"/></th>
                                            <th><FormattedMessage id="manage-user.status" /></th>
                                            <th><FormattedMessage id="manage-user.action"/></th>
                                            
                                        </tr>
                                        { dataPatient && dataPatient.length > 0 ? 
                                            dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.VI
                                                    ? item.timeTypeDataPatient.valueVi
                                                    : item.timeTypeDataPatient.valueEn
                                                let gender = language === LANGUAGES.VI
                                                    ? item.genderData.valueVi
                                                    : item.genderData.valueEn
                                                let statusCheck = language === LANGUAGES.VI
                                                    ? item.statusTypeDataPatient.valueVi
                                                    : item.statusTypeDataPatient.valueEn
                                                console.log('check: ', item.reason)
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                        <td>{ index + 1 }</td>
                                                        <td>{ time }</td>
                                                        <td>{ `${item.userBooking.firstName} ${item.userBooking.lastName}`}</td>
                                                        <td>{item.namePatient}</td>
                                                        <td>{item.birthday}</td>
                                                        <td>{ gender }</td>
                                                        <td>{item.address}</td>
                                                        <td>{ statusCheck }</td>
                                                        {/* <td>{item.patientData.email}</td> */}
                                                        <td>
                                                            { item.statusId && item.statusId === 'S1'  &&
                                                                <div className='row-text'>
                                                                    <button className='btn btn-info ml-3' onClick={() => this.handleBtnConfirm(item, doctorName)}>
                                                                            <FormattedMessage id="admin.manage-patient.confirm"/>
                                                                    </button>
                                                                    <button className='btn btn-danger ml-3' onClick={() => this.handleBtnCancel(item)}>
                                                                        <FormattedMessage id="admin.manage-patient.cancel"/>
                                                                    </button>
                                                                    
                                                                </div>
                                                                
                                                            }
                                                            {/* { item.statusId && item.statusId === 'S2'  &&
                                                                <button
                                                                    className='btn btn-info ml-3'
                                                                    onClick={() => this.handleBtnConfirm(item)}
                                                                ><FormattedMessage id="admin.manage-patient.confirm"/>
                                                                </button>
                                                            } */}
                                                            { item.statusId && item.statusId === 'S2'  &&
                                                                <div className='row-text'><FormattedMessage id="admin.manage-patient.confirm"/></div>
                                                            }
                                                            { item.statusId && item.statusId === 'S4'  &&
                                                                <div className='row-text'><FormattedMessage id="admin.manage-patient.check-cancel"/></div>
                                                            }
                                                        </td>
                                                        
                                                    </tr>
                                                    <div style={{position: 'relative', top: '-38px', right: '-1150px', height: '0'}}>
                                                        <IoIosInformationCircleOutline style={{fontSize: '18px'}} onClick={() => this.handleOpenShowReason(item.reason)}/>
                                                    </div>
                                                    </>
                                                )
                                            })

                                            : <tr></tr>
                                        }
                                    </tbody>    
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenRemedyModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                    <ShowReasonModal
                        isOpenReasonModal={isOpenReasonModal}
                        dataModal={this.state.reason}
                        closeReasonModal={this.closeReasonModal}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {    
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
