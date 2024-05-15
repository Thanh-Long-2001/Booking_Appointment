import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage, IntlProvider, useIntl } from "react-intl";
import { LANGUAGES, USER_ROLE } from "../../../../utils";
import { changeLanguageApp } from "../../../../store/actions/appActions";
import { withRouter } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { fetchSearchSpecialty } from "../../../../store/actions/adminActions";
import { userMenu } from "../../../Header/menuApp";
import { FiLogOut } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import { BiSolidChevronsRight } from "react-icons/bi";
import { FaCircleChevronDown } from "react-icons/fa6";
import _ from "lodash";
import LoadingOverlay from 'react-loading-overlay';
import MenuSelect from "../MenuSelect/MenuSelect";
import * as actions from "../../../../store/actions";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
      isMenuOpen: false,
      isShowLoading: false,

      isOpenModalSelect: false
    };
  }

  handleReturnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
      this.props.updateActiveMenu();
    }
  };

  handleGotoLoginPage = () => {
    if (this.props.history) {
      this.props.history.push(`/login`);
    }
  };

  handleViewAllClinic = () => {
    if (this.props.history) {
      this.props.history.push(`/all-clinic`);
      this.props.updateActiveMenu("facility");

    }
  };

  handleViewAllSpecialty = () => {
    if (this.props.history) {
      this.props.history.push(`/all-specialty`);
      this.props.updateActiveMenu("services");
    }
  };

  

  handleViewAllDoctor = () => {
    if (this.props.history) {
      this.props.history.push(`/all-doctor`);

      this.props.updateActiveMenu("doctor");

    }
  };

  handleViewAllHandbook = () => {
    if (this.props.history) {
      this.props.history.push(`/all-handbook`);
      this.props.updateActiveMenu("handbook");

      
    }
  };

  updateActiveMenu = (menuName) => {
    this.setState({
      activeMenu: menuName
    });
  };

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];

    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.PATIENT) {
        menu = userMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });

   
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeMenu !== this.state.activeMenu) {
      // Hành động sau khi state đã được cập nhật
      console.log("State has been updated:", this.state.activeMenu);
    }
  }

  handleGotoUserInfoPage = () => {
    this.setState({ isShowLoading: true });

    setTimeout(() => {
      let { userInfo, history } = this.props;
      if (userInfo.roleId === "R3") {
        history.push(`/user/manage-info`);
      } else if (userInfo.roleId === "R2") {
        history.push(`/doctor/manage-schedule`);
      } else {
        history.push(`/system/manage-user`);
      }
      this.setState({ isShowLoading: false });
    }, 2000); // 2 seconds delay
  };

  openMenuSelect = () => {
    this.setState({
      isOpenModalSelect: true
    })
  }

  closeModalSelect = () => {
    this.setState({
      isOpenModalSelect: false
    })
}

  render() {
    let { isLoggedIn, userInfo, activeMenu } = this.props;
    let { isOpenModalSelect } = this.state;

    let imgBase64 = "";
    if(userInfo.image) {

      imgBase64 = new Buffer(userInfo.image, 'base64').toString('binary');
    }
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text='Loading...'
        >
                  <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <div
                className="header-logo"
                onClick={() => this.handleReturnToHome()}
              ></div>
            </div>
            <div className="center-content">
              <div
                className={`child-content ${activeMenu === 'services' ? 'active' : ''}`}
                onClick={() => this.handleViewAllSpecialty()}
              >
                <div>
                  <b>
                    SERVICES
                  </b>
                </div>
                
              </div>
             
              <div
                className={`child-content ${activeMenu === 'facility' ? 'active' : ''}`}
                onClick={() => this.handleViewAllClinic()}
              >
                <div>
                  <b>
                    FACILITIES
                  </b>
                </div>
            
              </div>
              <div
                className={`child-content ${activeMenu === 'doctor' ? 'active' : ''}`}
                onClick={() => this.handleViewAllDoctor()}
              >
                <div>
                  <b>
                    DOCTORS
                  </b>
                </div>
                
                
              </div>
              <div
                className={`child-content ${activeMenu === 'handbook' ? 'active' : ''}`}
                onClick={() => this.handleViewAllHandbook()}
              >
                <div>
                  <b>
                    HANDBOOKS
                  </b>
                </div>
                
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-phone"></i>
                +08484848484
                
              </div>
              <div className="bulkhead"></div>

              {isLoggedIn ? (
                <div className="login2" onClick={this.handleGotoUserInfoPage} >
                  <div className="user-element" style = {{backgroundImage: `url(${imgBase64})`}}>
                  <FaCircleChevronDown className="setting"/>
                    
                  </div>
                  
                  
                </div>
              ) : (
                <div className="login" onClick={this.handleGotoLoginPage}>
                  Đăng nhập
                </div>
              )}
            </div>
          </div>
        </div>

        {this.props.isShowBanner == true && (
          <div className="home-header-banner">
            <div className="overlay">
              <div className="content-up">
                <div className="content-left">
                 
                  <div className="content-left-child2">
                    <FormattedMessage id="banner.contentLeft2" />
                  </div>
                  <div className="content-left-child3">
                    <FormattedMessage id="banner.contentLeft3" />
                  </div>
                  <div className="content-left-child4" onClick={() => this.openMenuSelect()} style={{cursor: "pointer"}}>
                    <FormattedMessage id="banner.contentLeft4" />
                  </div>
                </div>
                <div className="content-between"></div>
                
              </div>
            </div>
          </div>
        )}

        <MenuSelect
            isOpenModal={isOpenModalSelect}
            closeSelectModal={this.closeModalSelect} 

        />
        
        </LoadingOverlay>

      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
    dataSpecialty: state.admin.dataSpecialty,
    activeMenu: state.admin.activeMenu
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    fetchSearchSpecialty: (nameInput) => dispatch(fetchSearchSpecialty(nameInput)),
    updateActiveMenu: (menuName) => dispatch(actions.setActiveMenu(menuName)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
