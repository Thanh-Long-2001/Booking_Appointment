import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FaCaretDown } from "react-icons/fa";
import Select from 'react-select';
import { Chart, ColumnChart } from './Chart'
import "./ManageStatistical.scss"
import TableDoctorBooking from './TableDoctorBooking';

class MangageStatistical extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            currentYear: new Date().getFullYear(), // Năm hiện tại
            years: [new Date().getFullYear()],
            currentMonth: new Date().getMonth(), 
            months: []
        }
    }

    async componentDidMount() {
        this.updateYearList();
        this.updateMonthList();
    }

    componentDidUpdate(prevProps, prevState, snaptshot) {
        //render -> didUpdate
        if (prevState.years !== this.state.years) {
            // Cập nhật danh sách năm nếu có sự thay đổi
            // this.updateYearList();
        }
    }

    updateYearList = () => {
        const { currentYear, years } = this.state;
        // Tạo một mảng mới bắt đầu từ năm hiện tại và kết thúc ở năm hiện tại + 10
        const newYears = Array.from({ length: 10 }, (_, index) => currentYear + index);
        // Cập nhật danh sách năm
        this.setState({ years: [...newYears] });
    };

    handleYearChange = (selectedOption) => {
        // Cập nhật state khi người dùng chọn năm
        this.setState({ currentYear: selectedOption.value });
    }

    updateMonthList = () => {
        const { currentMonth } = this.state;
        // Tạo một mảng mới bắt đầu từ năm hiện tại và kết thúc ở năm hiện tại + 10
        const newMonths = Array.from({ length: 12 }, (_, index) => index + 1);
        // Cập nhật danh sách năm
        this.setState({ months: [...newMonths] });
    };

    handleMonthChange = (selectedOption) => {
        // Cập nhật state khi người dùng chọn năm
        this.setState({ currentMonth: selectedOption.value });
    }

    render() {
        
        const { years, currentYear, months, currentMonth } = this.state;
        console.log(currentMonth);
        const optionsYear = years.map(year => ({ value: year, label: year }));
        const optionsMonth = months.map(month => ({ value: month, label: `Tháng ${month}` }));
        return (
            <div className='statistical-container'>
                <div style={{display: 'flex', marginTop: "50px", alignItems: 'center'}}>
                    <span className='label-year'>Chọn năm</span>
                    <Select 
                        className='select-year'
                        value={currentYear} 
                        onChange={this.handleYearChange}
                        options={optionsYear}
                        placeholder={currentYear}
                    />
                </div>
                
                
                <div className='title'>
                    THỐNG KÊ NĂM {currentYear}
                </div>

                <ColumnChart currentYear={currentYear}/>

                <div style={{display: 'flex', marginTop: "50px", alignItems: 'center', marginBottom: "50px"}}>
                    <span className='label-month'>Xem chi tiết từng tháng</span>
                    <Select 
                        className='select-month'
                        value={currentMonth} 
                        onChange={this.handleMonthChange}
                        options={optionsMonth}
                        placeholder={`Tháng ${currentMonth}`}
                    />
                </div>     

                <TableDoctorBooking currentYear={currentYear} currentMonth={currentMonth} />       
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
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
      
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MangageStatistical);
