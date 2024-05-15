import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./HomeChooseUs.scss";
import { FaHeartPulse } from "react-icons/fa6";

class HomeChooseUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="whychoose">
          <div className="whychoose-left">
            <div className="whychoose-left-item1">WHY CHOOSE US</div>
            <div className="whychoose-left-item2">
              We Are Always Open For Your Health Services
            </div>
            <div className="whychoose-left-item3">
              <div className="whychoose-left-item3-item">
                <div className="whychoose-left-item3-item-left">
                  <div className="whychoose-left-item3-item-left-number">
                    01
                  </div>
                  <div className="whychoose-left-item3-item-left-bar"></div>
                </div>
                <div className="whychoose-left-item3-item-right">
                  <div className="whychoose-left-item3-item-right-title">
                    Compassionate & Expert Care
                  </div>
                  <div className="whychoose-left-item3-item-right-content">
                    Our team of dedicated healthcare professionals combines
                    years of experience with a genuine commitment to providing.
                  </div>
                </div>
              </div>
              <div className="whychoose-left-item3-item">
                <div className="whychoose-left-item3-item-left">
                  <div className="whychoose-left-item3-item-left-number">
                    02
                  </div>
                  <div className="whychoose-left-item3-item-left-bar"></div>
                </div>
                <div className="whychoose-left-item3-item-right">
                  <div className="whychoose-left-item3-item-right-title">
                    Patient-Centered Approach
                  </div>
                  <div className="whychoose-left-item3-item-right-content">
                    Your health and well-being are our top priorities. We take
                    the time to listen to your concerns, answer your questions.
                  </div>
                </div>
              </div>
              <div className="whychoose-left-item3-item">
                <div className="whychoose-left-item3-item-left">
                  <div className="whychoose-left-item3-item-left-number">
                    03
                  </div>
                </div>
                <div className="whychoose-left-item3-item-right">
                  <div className="whychoose-left-item3-item-right-title">
                  Personalized Treatment Plans
                  </div>
                  <div className="whychoose-left-item3-item-right-content">
                    We understand that every patient is unique, and their
                    healthcare needs may vary. That's why we create
                    individualized treatment.{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="whychoose-right"></div>
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
  connect(mapStateToProps, mapDispatchToProps)(HomeChooseUs)
);
