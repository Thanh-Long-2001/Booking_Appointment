import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./HomeBanner.scss";

class HomeBanner extends Component {
  render() {
    return (
      <div className="home-banner">
            <div className="home-banner-header">
                <span>We’re Welcoming New Patients And Can’t Wait To Meet You!</span>
            </div>
            <div className="home-banner-content">
                <span>A brief statement outlining the purpose and mission of the clinic. This can include the commitment to patient care, community health, and any specific goals or values. Specify the types of medical services provided</span>
            </div>
            <div className="home-banner-footer">
                <button className="btn-bookAppointment">BOOK APPOINTMENT</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeBanner);
