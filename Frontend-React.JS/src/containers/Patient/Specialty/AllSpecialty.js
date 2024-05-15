import React, { Component } from 'react';
import { connect } from "react-redux";
import './AllSpecialty.scss'
import { LANGUAGES } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/Section/HomeHeader/HomeHeader';
import { getAllSpecialtyService } from '../../../services/userService'
import { FaChevronRight } from "react-icons/fa";
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
class AllSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: [],
            showAllServices: false,
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialtyService();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : [],
            })
        }

    }

    componentWillUnmount() {
        // Clear interval when component unmounts to prevent memory leaks
        clearInterval(this.state.intervalId);
    }

    

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    handleToggleShowAll = () => {
        this.setState(prevState => ({
            showAllServices: !prevState.showAllServices
        }));
    }

    handleViewSpecialty = (specialty) => {
        if (this.props.history) {
            console.log(this.props.history);
            this.props.history.push(`/detail-specialty/${specialty.id}`)
        }
    }

    render() {
        let { dataSpecialty,currentIndex } = this.state
        const { showAllServices } = this.state;
        const slicedData = dataSpecialty.slice(0, showAllServices ? dataSpecialty.length : 4);
        const slicedData2 = dataSpecialty.slice(4, showAllServices ? dataSpecialty.length : 8);
        return (
            <>
                <HomeHeader/>
                <div className='doctor-all-service-container'>
                    <div className='allServices-content'>
                        <div className='allServics-title'>
                            
                        </div>
                        <div className='allServices-body'>
                            <div className='allServices-body-up'>
                                <div className='allServices-body-up-img'>

                                </div>
                                <div className='allServices-body-up-content'>
                                    OUR SERVICES
                                </div>
                            </div>
                            <div className='allServices-body-down'>
                                <div className='allServices-body-down-left'>
                                    <div>
                                        {slicedData.map((item, index) => {
                                            const hiddenClass = item.hidden ? 'hidden' : '';
                                            const activeClass = index === 0 && !item.hidden ? 'active' : '';
                                            return (
                                                <div key={index}>
                                                    <div className={`item-all-services ${hiddenClass} ${activeClass}`} onClick={() => this.handleViewSpecialty(item)}>
                                                        <div className='left-all-services'>{item.name}</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div>
                                        {slicedData2.map((item, index) => {
                                            
                                            return (
                                                <div key={index}>
                                                    <div className={`item-all-services`} style={{marginTop: "50px", marginBottom: "100px"}} onClick={() => this.handleViewSpecialty(item)}>
                                                        <div className='left-all-services'>{item.name}</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    
                                </div>

                                <div className='allServices-body-down-right'>
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className='allServices-footer'>
                        <div className='allServices-footer-title'>We Are Pleased To Offer You The Healthy</div>
                        <div className='allServices-footer-btn'>
                            <button className="btn-contact" >CONTACT US NOW</button>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {    
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllSpecialty);
