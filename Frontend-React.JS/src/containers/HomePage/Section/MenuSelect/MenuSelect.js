import React, { Component } from 'react';
import { connect } from "react-redux";
import './MenuSelect.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import * as actions from '../../../../store/actions'
import Select from "react-select"
import { getAllSpecialtyService, getScheduleDoctorByDateService, getAllClinicService2, getAllCodeService, getClinicByServiceAndProvince , getClinicByServiceAndProvinceAndClinic} from '../../../../services/userService'
import BookingModal from '../../../Patient/Doctor/Modal/BookingModal';
import moment from 'moment';

class MenuSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProvince: [],
            dataSpecialty: [],
            dataClinic: [],
            dataDoctor: [],
            selectedSpecialty: null,
            selectedProvince: null,
            selectedClinic: null,
            selectedDoctor: null,
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
            allDays: [],
            allAvailableTime: [],
            selectedDay: null,
            selectedTimeIndex: null
        }
    }

    async componentDidMount() {
        let allDays = this.getArrDays()
        const [listSpecialty, listClinic, listProvince] = await Promise.all([
            getAllSpecialtyService(),
            getAllClinicService2(),
            getAllCodeService("PROVINCE")
        ]) 
        
        let dataSpecialty = listSpecialty.data.map(item => ({ label: item.name, value: item.id }));
        let dataProvince = listProvince.data.map(item => ({ label: item.valueVi, value: item.keyMap }))
        this.setState({
            allDays: allDays,
            dataSpecialty, 
            dataProvince
        })

    }

    

    async componentDidUpdate(prevProps, prevState, snapshot) {
       
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ 
            selectedSpecialty: selectedOption,
            selectedClinic: null,
            selectedDoctor: null,
            selectedProvince: null,
            dataClinic: [],
            dataDoctor: [],
            selectedDay: null,

        })
    }

    handleChangeSelectClinic = (selectedOption) => {
        this.setState({ selectedClinic: selectedOption }, async () => {
            let { selectedSpecialty, selectedProvince, selectedClinic } = this.state;
            let dataRes = await getClinicByServiceAndProvinceAndClinic(selectedSpecialty.value, selectedProvince.value, selectedClinic.value)
            let dataDoctor = dataRes.data.map(item => ({ label: `${item.firstName} ${item.lastName}`, value: item.id}))
            this.setState({ 
                dataDoctor,
                selectedDoctor: null,
                selectedDay: null,

            })
        })
    }

    handleChangeSelectProvince = (selectedOption) => {
        this.setState({ selectedProvince: selectedOption }, async () => {
            let { selectedSpecialty, selectedProvince } = this.state;
            let dataRes = await getClinicByServiceAndProvince(selectedSpecialty.value, selectedProvince.value)
            let dataClinic = dataRes.data.map(item => ({ label: item.name, value: item.id}))
            this.setState({ 
                dataClinic,
                selectedClinic: null,
                selectedDoctor: null,
                dataDoctor: [],
                selectedDay: null,
            })
        })
    }

    handleChangeSelectDoctor = (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption }, async () => {
            let { allDays, selectedDoctor } = this.state;
            this.handleOnchangeSelect(allDays[0])
            
        })
    }

    handleClickScheduleTime = (index, time) => {
        this.setState({
            selectedTimeIndex: index,
            dataScheduleTimeModal: time
        })
    }

    getArrDays = () => {
        let arrDays = []
            for (let i = 0; i < 7; i++){
                let object = {}
                
                    if (i === 0) {
                        let labelNew = moment(new Date()).format('DD/MM')
                        let today = `Today - ${labelNew}`
                        object.label = today
                    }
                    else {
                        object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
                    }  
                

                object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
                arrDays.push(object)
        }
        return arrDays
    }

    openBookingModal = () => {
        this.setState({
            isOpenModalBooking: true
        },() => {
            this.props.closeSelectModal()
        })
    }
    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    handleOnchangeSelect = async (selectedOption) => {
        
            let doctorId = this.state.selectedDoctor
            this.setState({
                selectedDay: selectedOption
            }, async () => {
                let { selectedDay } = this.state
                let res = await getScheduleDoctorByDateService(doctorId.value, selectedDay.value)

                if (res && res.errCode === 0) {
                    this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
                }
            })
  
            
        
    }

    

    render() {
        let {  dataSpecialty, dataProvince, isOpenModalBooking, dataScheduleTimeModal, allDays, allAvailableTime, selectedDay, selectedTimeIndex } = this.state
        let { isOpenModal, closeSelectModal } = this.props

        return (
            
                <>
                    <Modal
                        isOpen={isOpenModal}
                        // toggle={() => {  }}
                        className={'booking-modal-container'}
                        size='lg'
                        centered
                    >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <div className='left'></div>
                            <span className='right'
                                onClick={closeSelectModal}
                            ><i className="fas fa-times"></i></span>
                        </div>
                        <div className='booking-modal-body-selectmodal'>
                            {/* {JSON.stringify(dataTime)} */}
                            
                            <div className='row'>
                                
                                <div className='col-6 form-group'>
                                    <label>Chọn dịch vụ</label>
                                    <Select
                                        
                                        value={this.state.selectedSpecialty}
                                        onChange={this.handleChangeSelect}
                                        options={dataSpecialty}
                                    />
                                </div>

                                <div className='col-5 form-group'>
                                    <label>Chọn tỉnh</label>
                                    <Select
                                        value={this.state.selectedProvince}
                                        onChange={this.handleChangeSelectProvince}
                                        options={dataProvince}
                                    />
                                </div>



                                <div className='col-6 form-group'>
                                    <label>Chọn cơ sở</label>
                                    <Select
                                        value={this.state.selectedClinic}
                                        onChange={this.handleChangeSelectClinic}
                                        options={this.state.dataClinic}
                                    />
                                </div>

                                <div className='col-5 form-group'>
                                    <label>Chọn bác sĩ</label>
                                    <Select
                                        value={this.state.selectedDoctor}
                                        onChange={this.handleChangeSelectDoctor}
                                        options={this.state.dataDoctor}
                                    />
                                </div>
                                <div className='col-5 form-group'>
                                    <label>Chọn ngày</label>
                                    <Select
                                        value={selectedDay}
                                        onChange={this.handleOnchangeSelect}
                                        options={this.state.allDays}
                                    />
                                </div>
                                
                            </div>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ? 
                                <>
                                    <div className='time-content-btns'>
                                        {allAvailableTime.map((item, index) => {
                                            let timeDisplay = item.timeTypeData.valueVi
                                            let buttonClass = 'btn-vi'
                                            if (item.currentNumber === 4) {
                                                buttonClass += ' noactive';
                                                return (
                                                    <button key={index}
                                                        className={buttonClass}
                                                        disabled={true}
                                                    >{timeDisplay}</button>
                                                );
                                            }
                                            if (index === selectedTimeIndex) { // Kiểm tra xem nút có được chọn không
                                                buttonClass += ' active'; // Thêm class active nếu được chọn
                                            }
                                            return (
                                                <button key={index}
                                                    className={buttonClass}
                                                    onClick={() => this.handleClickScheduleTime(index, item)}
                                                >{timeDisplay}</button>
                                            )
                                        })}
                                    </div>
                                    
                                </>
                                :
                                <div className='no-schedule'>No Schedule</div>
                                
                            }
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn btn-primary btn-booking-confirm'
                                onClick={this.openBookingModal}
                            > Tiếp theo
                            </button>
                            
                        </div>
                    </div>
                    </Modal>

                    <BookingModal
                        isOpenModal={isOpenModalBooking}
                        closeBookingModal={this.closeBookingModal} 
                        dataTime={dataScheduleTimeModal}
                    />
                </>

                
        
        );
    }
}

const mapStateToProps = (state) => {
    return {    
        language: state.app.language,
        genders: state.admin.genders,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuSelect);
