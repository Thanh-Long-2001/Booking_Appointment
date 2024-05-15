import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageInfoUser from '../containers/System/User/ManageInfoUser';
import Header from '../containers/Header/Header';
import ManageBookingUser from '../containers/System/User/ManageBookingUser'

class User extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/user/manage-info" component={ManageInfoUser} />
                            <Route path="/user/manage-booking" component={ManageBookingUser} />
                            
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

export default connect(mapStateToProps, mapDispatchToProps)(User);
