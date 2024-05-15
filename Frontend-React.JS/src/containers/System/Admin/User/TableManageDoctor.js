import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageDoctor.scss';
import * as actions from '../../../../store/actions'
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

class TableManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchGetAllDoctors2()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)
    }

    handleEditUser = (user) => {
        console.log('user edit: ', user)
        this.props.handleEditUserFromParent(user)
    }



    render() {

        let arrUsers = this.state.userRedux
        return (
            <>
                <table id='TableManageDoctor'>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Phone number</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers && arrUsers.length > 0 && 
                                arrUsers.map((item, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>{item.phonenumber}</td>
                                            <td>
                                                    <button className='btn-edit'
                                                    onClick={() => this.handleEditUser(item)}    
                                                    ><i className="fas fa-pencil-alt"></i></button>

                                                    <button className='btn-delete'
                                                    onClick={() => this.handleDeleteUser(item)}
                                                    ><i className="fas fa-trash-alt"></i></button>
                                            </td>
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
        listUsers: state.admin.allDoctors2
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGetAllDoctors2: () => dispatch(actions.fetchGetAllDoctors2()),
        deleteUserRedux: (id) => dispatch(actions.fetchDeleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageDoctor);
