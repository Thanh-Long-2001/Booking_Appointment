import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./Section/HomeHeader/HomeHeader";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import HomeService from "./Section/HomeService/HomeService";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutStandingDoctor from "./Section/OutStandingDoctor/OutStandingDoctor";
import HomeChooseUs from "./Section/HomeChooseUs/HomeChooseUs";
import AboutCompany from "./Section/AboutCompany/AboutCompany";
import HomeBanner from "./Section/HomeBanner/HomeBanner";
import HandBook from "./Section/HandBook/HandBook";
import About from "./Section/About/About";
import HomeFooter from "./Section/HomeFooter/HomeFooter";

class HomePage extends Component {
  handleAfterChange = () => {};

  render() {
    
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <TransitionGroup>
          <CSSTransition classNames="fade" timeout={1300}>
            <About />
          </CSSTransition>
          <CSSTransition classNames="fade" timeout={1300}>
            <AboutCompany />
          </CSSTransition>
          <CSSTransition classNames="fade" timeout={1300}>
            <HomeService />
          </CSSTransition>
          <CSSTransition classNames="fade" timeout={1300}>
            <HomeBanner />
          </CSSTransition>
          <CSSTransition classNames="fade" timeout={1300}>
            <HomeChooseUs />
          </CSSTransition>
          <CSSTransition classNames="fade" timeout={1300}>
            <OutStandingDoctor />
          </CSSTransition>
          <CSSTransition classNames="fade" timeout={1300}>
            <HomeFooter />
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
