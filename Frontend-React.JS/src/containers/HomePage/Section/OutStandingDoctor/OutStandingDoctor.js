import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import "./OutStandingDoctor.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snaptshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  handleViewAllDoctor = () => {
    if (this.props.history) {
      this.props.history.push(`/all-doctor`);
    }
  };

  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    return (
      <div className="section-outstanding-doctor">
        <div className="section-container3">
          <div className="section-header3">
            <span className="title-section3">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </span>
          </div>
          <div className="section-body">
            {arrDoctors &&
              arrDoctors.length > 0 &&
              arrDoctors.map((item, index) => {
                let imgBase64 = "";
                if (item.image) {
                  imgBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }

                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;

                return (
                  <div
                    className="section-customize3"
                    key={index}
                    onClick={() => this.handleViewDetailDoctor(item)}
                  >
                    <div className="customize-border3">
                      
                      <div
                        className="bg-image3"
                        style={{ backgroundImage: `url(${imgBase64})` }}
                      />

                      <div className="position3">
                        <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                        <div>{item.Doctor_Info.Specialty.name}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
