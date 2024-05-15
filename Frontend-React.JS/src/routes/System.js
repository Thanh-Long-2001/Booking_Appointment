import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/User/UserRedux';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/Doctor/ManageDoctor';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic'
import ManageHandBook from '../containers/System/HandBook/ManageHandBook';
import ManageStatistical from '../containers/System/Admin/Statistical/ManageStatistical';


class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props; 
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            {/* <Route path="/system/user-manage" component={UserManage} /> */}
                            <Route path="/system/user-manage" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={ManageDoctor} />
                            <Route path="/system/manage-specialty" component={ManageSpecialty} />
                            <Route path="/system/manage-clinic" component={ManageClinic} />
                            <Route path="/system/manage-handbook" component={ManageHandBook} />
                            <Route path="/system/manage-statistical" component={ManageStatistical} />

                            {/* <Route component={() => { return (<Redirect to={} />) }} /> */}
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
