import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableDoctorBooking.scss';
import { getBookingDataAndDoctor } from "../../../../services/userService";
import 'react-markdown-editor-lite/lib/index.css';

class TableDoctorBooking extends Component {

    constructor(props) {
        super(props)
        this.state = {
            doctors: [],
        }
    }

    async componentDidMount() {
        const { currentYear, currentMonth } = this.props;
        let data = await getBookingDataAndDoctor(currentYear, currentMonth);
        this.setState({doctors: data.result})
    }

    async componentDidUpdate(prevProps, prevState) {
        const { currentYear, currentMonth } = this.props;

        if (prevProps.currentYear !== currentYear || prevProps.currentMonth !== currentMonth) {
            let data = await getBookingDataAndDoctor(currentYear, currentMonth);
            this.setState({doctors: data.result})
        }
    }

    

    render() {
        let { doctors } = this.state
        return (
            <>
                <table id='TableDoctorBooking'>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Full name</th>
                                <th>Số lịch hoàn thành</th>
                                <th>Số lịch hủy</th>
                                
                            </tr>
                            {doctors && doctors.length > 0 && 
                                doctors.map((item, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                            <td>{item.doctorEmail}</td>
                                            <td>{item.firstName} {item.lastName}</td>
                                            <td>{item.done}</td>
                                            <td>{item.cancel}</td>
                                           
                                            
                                            </tr>
                                        </>
                                    )
                                })    
                            }                    
                        </tbody>    
                </table>   
            </>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableDoctorBooking);
