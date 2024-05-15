import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";
import { FaFacebook } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagram  } from "react-icons/fa";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <div className="home-footer-left">
          <div className="home-footer-left-title"></div>
          <div className="home-footer-left-content">
            <div className="home-footer-left-items">
              <div>About Us</div>
              <div>Annual Checkup</div>
              <div>Blog</div>
              <div>Carrers</div>
            </div>
            <div className="home-footer-left-items">
              <div>Get A Digonisis</div>
              <div>Get A Digonisis</div>
              <div>Privacy Policy</div>
            </div>
            <div className="home-footer-left-items">
              <div>Contact Us</div>
              <div>FAQ’s</div>
            </div>
          </div>
        </div>
        <div className="home-footer-right">
          <div className="home-footer-right-title">Follow Us</div>
          <div className="home-footer-right-content">
            <div className="home-footer-right-item1">
                <FaFacebook />
            </div>
            <div className="home-footer-right-item2">
                <AiFillTwitterCircle />
            </div>
            <div className="home-footer-right-item3">
                <FaLinkedin />
            </div>
            <div className="home-footer-right-item4">
                <div>
                <FaInstagram  />
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
