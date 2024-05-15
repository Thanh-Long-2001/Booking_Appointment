import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./About.scss";
import { FiPhoneCall } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { MdOutlinePlace } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
class About extends Component {
  render() {
    return (
      <div className="section-about">
        
        
        <div className="about-footer">
          <div className="about-footer-element">
            <div className="about-footer-element-icon">
              <FiPhoneCall />
            </div>
            <div className="about-footer-element-title">
              <FormattedMessage id="homepage.about-emergency"></FormattedMessage>
            </div>
            <div className="about-footer-element-content">
              <span>+9999994444</span>
            </div>
          </div>
          <div className="about-footer-element">
            <div className="about-footer-element-icon">
              <MdOutlinePlace />
            </div>
            <div className="about-footer-element-title">
              <FormattedMessage id="homepage.about-address"></FormattedMessage>
            </div>
            <div className="about-footer-element-content">
              <span><FormattedMessage id="homepage.about-content1"></FormattedMessage></span>
            </div>
          </div>
          <div className="about-footer-element">
            <div className="about-footer-element-icon">
              <TfiEmail />
            </div>
            <div className="about-footer-element-title">
              <FormattedMessage id="homepage.about-email"></FormattedMessage>
            </div>
            <div className="about-footer-element-content">
              <span><FormattedMessage id="homepage.about-content2"></FormattedMessage></span>
            </div>
          </div>
          <div className="about-footer-element">
            <div className="about-footer-element-icon">
              <FaRegClock />
            </div>
            <div className="about-footer-element-title">
              <FormattedMessage id="homepage.about-workinghour"></FormattedMessage>
            </div>
            <div className="about-footer-element-content">
              <span><FormattedMessage id="homepage.about-content3"></FormattedMessage></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    //inject
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
