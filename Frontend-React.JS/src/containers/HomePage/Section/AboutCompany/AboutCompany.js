import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./AboutCompany.scss";
import { FaHeartPulse } from "react-icons/fa6";

class AboutCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="about-company">
          <div className="company-left"></div>
          <div className="company-right">
            <div className="company-right-item1">ABOUT US COMPANY</div>
            <div className="company-right-item2">
              Affordable Health Care Solutions
            </div>
            <div className="company-right-item3">
              A brief statement outlining the purpose and mission of the clinic.
              This can include the commitment to patient care, community health,
              and any specifical goals for our values.
            </div>
            <div className="company-right-item4">
                <div className="company-right-item4-left">
                    <div className="company-right-item4-item">
                        <FaHeartPulse />
                        <span>Medical Professionals</span>
                    </div>
                    <div className="company-right-item4-item">
                        <FaHeartPulse />
                        <span>Emergency Care</span>
                    </div>
                    <div className="company-right-item4-item">
                        <FaHeartPulse />
                        <span>Services Offered</span>
                    </div>
                </div>
                <div className="company-right-item4-right">

                    <div className="company-right-item4-item">
                        <FaHeartPulse />
                        <span>Facilities and Equipment</span>
                    </div>
                    <div className="company-right-item4-item">
                        <FaHeartPulse />
                        <span>Medical Consulting</span>
                    </div>
                    <div className="company-right-item4-item">
                        <FaHeartPulse />
                        <span>Specializations</span>
                    </div>
                </div>
            </div>
            <div className="company-right-item5">
                <button className="company-btn-readmore">MORE ABOUT US</button>
            </div>
          </div>
        </div>
      </>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AboutCompany)
);
