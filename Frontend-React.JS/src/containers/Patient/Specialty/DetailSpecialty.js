import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/Section/HomeHeader/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getDetailSpecialtyByIdService,
  getAllCodeService,
  getAllSpecialtyService,
} from "../../../services/userService";
import _ from "lodash";
import { FaArrowRightLong } from "react-icons/fa6";
import Select from "react-select";

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
        arrDoctorId: [],
        dataDetailSpecialty: {},
        listProvince: [],
        dataSpecialty: [],
        selectedItem: 0,
        };
    }

    async componentDidMount() {
        const { match } = this.props;
        if (match && match.params && match.params.id) {
            const { id } = match.params;

            try {
                const [detailSpecialtyRes, specialtyRes, provinceRes] = await Promise.all([
                    getDetailSpecialtyByIdService({ id, location: "ALL" }),
                    getAllSpecialtyService(),
                    getAllCodeService("PROVINCE")
                ]);

                if (detailSpecialtyRes.errCode === 0) {
                    const { data } = detailSpecialtyRes;
                    let arrDoctorId = [];

                    if (data && !_.isEmpty(data.doctorSpecialty)) {
                        arrDoctorId = data.doctorSpecialty.map(item => item.doctorId);
                    }

                    const dataProvince = provinceRes.data || [];
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "All",
                    });

                    this.setState({
                        dataDetailSpecialty: data,
                        arrDoctorId,
                        listProvince: dataProvince,
                    });
                }

                if (specialtyRes.errCode === 0) {
                    this.setState({
                        dataSpecialty: specialtyRes.data || [],
                    });
                }
            } catch (error) {
                console.error("Error occurred:", error);
            }
        }
        
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
      
        if (this.props.match.params.id !== prevProps.match.params.id) {
            const id = this.props.match.params.id;
            
            try {
                const [detailSpecialtyRes, provinceRes] = await Promise.all([
                    getDetailSpecialtyByIdService({ id, location: "ALL" }),
                    getAllCodeService("PROVINCE")
                ]);
    
                if (detailSpecialtyRes.errCode === 0 && provinceRes.errCode === 0) {
                    const data = detailSpecialtyRes.data;
                    let arrDoctorId = [];
        
                    if (data && !_.isEmpty(data.doctorSpecialty)) {
                        arrDoctorId = data.doctorSpecialty.map(item => item.doctorId);
                    }
        
                    let dataProvince = provinceRes.data;
        
                    if (dataProvince && dataProvince.length > 0) {
                        dataProvince.unshift({
                            createdAt: null,
                            keyMap: "ALL",
                            type: "PROVINCE",
                            valueEn: "All",
                        });
                    }
        
                    this.setState({
                        dataDetailSpecialty: data,
                        arrDoctorId: arrDoctorId,
                        listProvince: dataProvince,
                      
                    });
                }
            } catch (error) {
                console.error("Error occurred:", error);
            }
        }
    }

    
    handleViewSpecialty = (specialty, index) => {
        if (this.props.history) {
            this.setState({ selectedItem: index });
            this.props.history.replace(`/detail-specialty/${specialty.id}`);
            
        }
    }

    handleOnChangeSelect = async (event) => {
        const { match } = this.props;
        if (match && match.params && match.params.id) {
            const { id } = match.params;
            const location = event.target.value;

            try {
                const res = await getDetailSpecialtyByIdService({ id, location });

                if (res && res.errCode === 0) {
                    const { data } = res;
                    let arrDoctorId = [];

                    if (data && !_.isEmpty(data.doctorSpecialty)) {
                        arrDoctorId = data.doctorSpecialty.map(item => item.doctorId);
                    }

                    this.setState({
                        dataDetailSpecialty: data,
                        arrDoctorId,
                    });
                }
            } catch (error) {
                console.error("Error occurred:", error);
            }
        }
    };

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince, dataSpecialty, selectedItem } = this.state;
        console.log(selectedItem);
        return (
        <div className="detail-specialty-container">
            <HomeHeader />
            <div className="desc-specialty">
                <div className="desc-specialty-left">
                    <div className="desc-specialty-left-body">
                        <div className="desc-specialty-left-body-title">
                            All Services
                        </div>
                        <div className="desc-specialty-left-all">
                            {dataSpecialty &&
                                dataSpecialty.length > 0 &&
                                    dataSpecialty.map((item, index) => {
                                        return (
                                            <div className="" key={index} >
                                            
                                                <div className={`desc-specialty-left-item ${selectedItem == index ? 'active' : ''}`} onClick={() => this.handleViewSpecialty(item, index)}>
                                                    
                                                    {item.name}
                                                    <FaArrowRightLong />
                                                </div>
                                            </div>
                                        );
                                    })
                            }
                        </div>
                        
                        <div className="desc-specialty-left-body-footer">
                            <div className="desc-specialty-left-body-footer-item1">Opening Hours</div>
                            <div className="desc-specialty-left-body-footer-item2"></div>
                            <div className="desc-specialty-left-body-footer-item3">
                                <span>Monday - Wednesday:</span>
                                <span>9am - 6pm</span>
                            </div>
                            <div className="desc-specialty-left-body-footer-item3">
                                <span>Thusday - Sarturday:</span>
                                <span>8am - 5pm</span>
                            </div>
                            <div className="desc-specialty-left-body-footer-item4">
                                <span>Sunday:</span>
                                <span>Closed</span>
                            </div>
                        </div>
                    </div>
                </div>
            
                { (
                    <>
                        
                        <div className="desc-specialty-right">
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                            <div
                                className="desc-specialty-right-image"
                                style={{ backgroundImage: `url(${dataDetailSpecialty.image})` }}
                            ></div>
                            )}

                            <div className="desc-specialty-right-content">
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                                <div
                                dangerouslySetInnerHTML={{
                                    __html: dataDetailSpecialty.descriptionHTML,
                                }}
                                ></div>
                            )}

                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                                <div
                                className="desc-specialty-right-image2"
                                style={{
                                    backgroundImage: `url(${dataDetailSpecialty.image2})`,
                                }}
                                ></div>
                            )}
                            </div>
                        </div>
                    </>
                    )
                }
                
            </div>

            <div className="detail-specialty-body">
                <div className="search-sp-doctor">
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {listProvince &&
                            listProvince.length > 0 &&
                            listProvince.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}>
                                    {item.valueEn}
                                    </option>
                                );
                            })
                        }
                    </select>
                </div>
                {arrDoctorId &&
                    arrDoctorId.length > 0 &&
                    arrDoctorId.map((item, index) => {
                        return (
                            <div className="each-doctor" key={index}>
                            <div className="dt-content-left">
                                <div className="profile-doctor">
                                <ProfileDoctor
                                    doctorId={item}
                                    isShowDescDoctor={true}
                                    isShowLinkDetail={true}
                                    isShowPrice={false}
                                />
                                </div>
                            </div>
                            <div className="dt-content-right">
                                <div className="doctor-schedule">
                                    <DoctorSchedule doctorIdFromParent={item} />
                                </div>
                                <div className="doctor-extra-info">
                                    <DoctorExtraInfo doctorIdFromParent={item} />
                                </div>
                            </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
        );
    }
    }

    const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
    };

    const mapDispatchToProps = (dispatch) => {
    return {};
    };

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
