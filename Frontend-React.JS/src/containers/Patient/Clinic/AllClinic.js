import React, { Component } from 'react';
import { connect } from "react-redux";
import './AllClinic.scss'
import { LANGUAGES } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/Section/HomeHeader/HomeHeader';
import { getAllClinicService } from '../../../services/userService'
import { GrPrevious, GrNext } from "react-icons/gr";

class AllClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinics: [],
            currentPage: 1,
            totalPages: 0
        }
    }

    async componentDidMount() {
        let res = await getAllClinicService(this.state.currentPage)
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : [],
                totalPages: res.pagination.totalPages ? res.pagination.totalPages : 0
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currentPage !== this.state.currentPage) {
            let res = await getAllClinicService(this.state.currentPage);
             if (res && res.errCode === 0) {
                 this.setState({
                    dataClinics: res.data ? res.data : []
                 })
             }
         }
    }

    handleViewClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    handlePageChange = (pageNumber) => {
        if (pageNumber !== this.state.currentPage) {
            this.setState({ currentPage: pageNumber });
            if (this.props.history) {
                this.props.history.replace(`/all-clinic/page=${pageNumber}`);
            }
        }
    };

    handleNextPage = (pageNumber) => {
        
        if (pageNumber < this.state.totalPages) {
            pageNumber++;

            this.setState({ currentPage: pageNumber });
            if (this.props.history) {
                this.props.history.replace(`/all-clinic/page=${pageNumber}`);
            }
        }
    };

    handlePrevPage = (pageNumber) => {
        if (pageNumber > 1) {
            pageNumber--;

            this.setState({ currentPage: pageNumber });
            if (this.props.history) {
                this.props.history.replace(`/all-clinic/page=${pageNumber}`);
            }
        }
    };

    render() {
        let { dataClinics, currentPage, totalPages } = this.state
        let pages = [];
        for(let i = 1; i<= totalPages; i++) {
            pages.push(i)
        }
        console.log('check data: ', dataClinics)
        return (
            <>
                <HomeHeader/>
                <div className='doctor-all-clinic-container'>
                    <div className='body-all-clinic'>
                        <div className='content-all-clinic'>
                            <FormattedMessage id="homepage.all-clinic"/>
                        </div>
                        <div className='render-clinic'>
                            {dataClinics && dataClinics.length > 0 &&
                                dataClinics.map((item, index) => {
                                    return (
                                        <div className='item-all-clinic' key={index}
                                            onClick={() => this.handleViewClinic(item)}
                                        >
                                            <div className='left-all-clinic'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            >
                                            </div>
                                            <div className='right-all-clinic'>
                                                {item.name}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='pagination'>
                            <button className='btn-prev' onClick={() => this.handlePrevPage(currentPage)}>
                                <GrPrevious />
                            </button>
                            <div className='pages'>
                                {pages.map((pageNumber) => (
                                    
                                    <button className={`page ${pageNumber === currentPage ? 'active' : ''}`} key={pageNumber} onClick={() => this.handlePageChange(pageNumber)}>
                                        {pageNumber}
                                    </button>
                                ))}
                            </div>
                            <button className='btn-next' onClick={() => this.handleNextPage(currentPage)}>
                                <GrNext />
                            </button>

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

export default connect(mapStateToProps, mapDispatchToProps)(AllClinic);
