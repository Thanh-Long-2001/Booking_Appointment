import React, { Component } from 'react';
import { connect } from "react-redux";
import './../Doctor/ManagePatient.scss'
import { LANGUAGES } from '../../../utils'
import DatePicker from '../../../components/Input/DatePicker'
import { FormattedMessage } from 'react-intl';
import { getAllCodeService, getUserBookingHistory } from '../../../services/userService';
import moment from 'moment';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import _ from 'lodash';

class MangageBooking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            bookingHistory: [],

        }
    }

    async componentDidMount() {
        await this.getDataBookingHistory()
    }

    

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    getDataBookingHistory = async () => {
        let { user } = this.props;

        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getUserBookingHistory({
            userId: user.id,
            date: formatedDate
        });
        console.log(res);
        if (res && res.errCode === 0) {
            let data = res.data
            this.setState({
                bookingHistory: data
            })
        }

    }

    handleOnchangeDatePicker = (date) => {
        console.log(date[0]);
        this.setState({
            currentDate: date[0],
        },async () => {
            await this.getDataBookingHistory()
        })
    }


    

    

    
    render() {
        let { bookingHistory } = this.state
        let {language, user} = this.props


        return (
            <>
                
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
                                        { bookingHistory && bookingHistory.length > 0 ? 
                                            bookingHistory.map((item, index) => {
                                                let time = language === LANGUAGES.VI
                                                    ? item.timeTypeDataPatient.valueVi
                                                    : item.timeTypeDataPatient.valueEn
                                                let gender = language === LANGUAGES.VI
                                                    ? item.genderData.valueVi
                                                    : item.genderData.valueEn
                                                let statusCheck = language === LANGUAGES.VI
                                                    ? item.statusTypeDataPatient.valueVi
                                                    : item.statusTypeDataPatient.valueEn
                                                console.log('check: ', item)
                                                return (
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
                                                               <div className='row-text'>Đang chờ xác nhận</div>
                                                                
                                                            }
                                                            {/* { item.statusId && item.statusId === 'S2'  &&
                                                                <button
                                                                    className='btn btn-info ml-3'
                                                                    onClick={() => this.handleBtnConfirm(item)}
                                                                ><FormattedMessage id="admin.manage-patient.confirm"/>
                                                                </button>
                                                            } */}
                                                            { item.statusId && item.statusId === 'S2'  &&
                                                                <div className='row-text'>Đã xác nhận</div>
                                                            }
                                                            { item.statusId && item.statusId === 'S4'  &&
                                                                <div className='row-text'>Đã bị hủy</div>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })

                                            : <tr></tr>
                                        }
                                    </tbody>    
                                </table>
                            </div>
                        </div>
                    </div>
                    
      
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

export default connect(mapStateToProps, mapDispatchToProps)(MangageBooking);
