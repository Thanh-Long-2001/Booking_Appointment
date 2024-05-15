import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import HomePage from './HomePage/HomePage';
import DetailDoctor from './Patient/Doctor/DetailDoctor';
import CustomScrollbars from '../components/CustomScrollbars';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Home from '../routes/Home';
import Login from './Auth/Login';
import Signup from './Register/signup';
import ForgetPassword  from './ForgetPassword/ForgetPassword';
import Header from './Header/Header';
import System from '../routes/System';
import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import Doctor from '../routes/Doctor';
import User from '../routes/User';
import VerifyEmail from './Patient/VerifyEmail';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty';
import DetailClinic from './Patient/Clinic/DetailClinic';
import DetailHandBook from './Patient/HandBook/DetailHandBook';
import reduxStore, { persistor } from '../redux';
import AllClinic from './Patient/Clinic/AllClinic';
import AllSpecialty from './Patient/Specialty/AllSpecialty';
import AllDoctor from './Patient/Doctor/AllDoctor';
import AllHandbook from './Patient/HandBook/AllHandbook';
import SearchSpecialty from './HomePage/SearchSpecialty/SearchSpecialty';
import "../fontawesome"


class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">

                        <div className="content-container">
                            <CustomScrollbars style={{height: '100vh', width: '100%'}}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.SIGNUP} exact component={(Signup)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />   
                                    <Route path={path.USER} component={userIsAuthenticated(User)} />                                
                                    <Route path={path.HOMEPAGE} component={(HomePage)} />
                                    <Route path={path.FORGET_PASSWORD} component={(ForgetPassword)} />
                                    {/* <Route path={path.FORGET_PASSWORD_CODE} component={(ForgetPasswordCode)} /> */}
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} /> 
                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                                    <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                                    <Route path={path.DETAIL_HANDBOOK} component={DetailHandBook} />
                                    <Route path={path.VERIFY_USER} component={VerifyEmail} /> 

                                    <Route path={path.ALL_CLINIC} component={AllClinic} />
                                    <Route path={path.ALL_SPECIALTY} component={AllSpecialty} />
                                    <Route path={path.ALL_DOCTOR} component={AllDoctor} />
                                    <Route path={path.ALL_HANDBOOK} component={AllHandbook} />
                                    <Route path={path.SEARCH_SPECIALTY} component={SearchSpecialty} />
                                </Switch>
                            </CustomScrollbars>
                        </div>

                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover={false}
                            theme="light"
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);