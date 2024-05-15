import React, { Component } from 'react';
import { connect } from "react-redux";
import './AllDoctor.scss'
import { IoSearchSharp } from "react-icons/io5";
import { getAllDoctorsService, getDoctorByName } from '../../../services/userService'
import HomeHeader from '../../HomePage/Section/HomeHeader/HomeHeader';
import SearchDoctor from './Search';
import DoctorList from './DoctorList';

class AllDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: [],
            searchInput: '',
            currentPage: 1,
            totalPages: 0,
            dataLoaded: false // Biến để theo dõi trạng thái dữ liệu đã được tải hay chưa
        }
    }

    async componentDidMount() {
        // Load all doctors when component mounts
        await this.loadDoctors();
    }

    async componentDidUpdate(prevProps, prevState, snaptshot) {
        // Load doctors if currentPage changes
        if (prevState.currentPage !== this.state.currentPage) {
            await this.loadDoctors();
        } else if (prevState.searchInput !== this.state.searchInput) {
            // Load doctors if searchInput changes
            await this.loadDoctorsByName(this.state.searchInput);
        }
    }

    async loadDoctors() {
        let res = await getAllDoctorsService(this.state.currentPage);
        if (res && res.errCode === 0) {
            this.setState({
                arrDoctors: res.data ? res.data : [],
                totalPages: res.pagination.totalPages ? res.pagination.totalPages : 0,
                dataLoaded: true // Cập nhật trạng thái dữ liệu đã được tải
            });
        }
    }

    async loadDoctorsByName(searchInput) {
        let res = await getDoctorByName(searchInput);
        if (res && res.errCode === 0) {
            this.setState({
                arrDoctors: res.data ? res.data : [],
                dataLoaded: true // Cập nhật trạng thái dữ liệu đã được tải
            });
        }
    }

    handleSearch = (searchInput) => {
        // Update searchInput state and trigger componentDidUpdate to load doctors by name
        if (this.props.history) {
            this.props.history.push(`/all-doctor?name=${searchInput}`);
            this.setState({
                searchInput: searchInput,
                dataLoaded: false // Đặt lại trạng thái dữ liệu chưa được tải khi thay đổi searchInput
            });
        }
    };

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }

    handlePageChange = (pageNumber) => {
        if (pageNumber !== this.state.currentPage) {
            this.setState({ currentPage: pageNumber });
            if (this.props.history) {
                this.props.history.replace(`/all-doctor/page=${pageNumber}`);
            }
        }
    };

    handleNextPage = (pageNumber) => {
        if (pageNumber < this.state.totalPages) {
            pageNumber++;
            this.setState({ currentPage: pageNumber });
            if (this.props.history) {
                this.props.history.replace(`/all-doctor/page=${pageNumber}`);
            }
        }
    };

    handlePrevPage = (pageNumber) => {
        if (pageNumber > 1) {
            pageNumber--;
            this.setState({ currentPage: pageNumber });
            if (this.props.history) {
                this.props.history.replace(`/all-doctor/page=${pageNumber}`);
            }
        }
    };

    render() {
        const { arrDoctors, currentPage, totalPages, dataLoaded } = this.state;
        // Nếu dữ liệu chưa được tải, hiển thị một phần nào đó để thông báo đang tải


        return (
            <>
                <HomeHeader />
                <div className='doctor-all-doctor-container'>
                    <div className='body-all-doctor'>
                        <div className='doctor-banner'></div>
                        <div className='doctor-content'>
                            <SearchDoctor handleSearch={this.handleSearch} />
                            <div className='doctor-right-content'>
                                <DoctorList
                                    arrDoctors={arrDoctors}
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    handlePrevPage={this.handlePrevPage}
                                    handleNextPage={this.handleNextPage}
                                    handlePageChange={this.handlePageChange}
                                    handleViewDetailDoctor={this.handleViewDetailDoctor}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default AllDoctor;
