import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllClinicService } from "../../../../services/userService";
import { withRouter } from "react-router-dom";
import "./HomeService.scss";
import { getAllSpecialtyService } from '../../../../services/userService'
class HomeService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialtyService()
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleViewSpecialty = (specialty) => {
    if (this.props.history) {
        console.log(this.props.history);
        this.props.history.push(`/detail-specialty/${specialty.id}`)
    }
  }

  

  render() {
    let { dataSpecialty } = this.state;

    return (
      <div className="section-home-service">
        <div className="home-service-header">OUR SERVICES</div>
        <div className="home-service-title">
          Our Specialties Technical Service
        </div>
        <div className="home-service-content">
          {dataSpecialty && dataSpecialty.length > 0 &&
            dataSpecialty.map((item, index) => {
                return (
                  <div className="home-service-content-element" key={index}>
                    <div className="home-service-content-element-icon icon1">
                      <div className="icon1" style={{ backgroundImage: `url(${item.image})`, backgroundSize: "cover", borderRadius: "50%"}}></div>
                    </div>
                    <div className="home-service-content-element-title">
                      {item.name}
                    </div>
                    <div className="home-service-content-element-item">
                      <button className="button-readmore" onClick={() => this.handleViewSpecialty(item)}>Read More</button>
                    </div>
                  </div>
                )
            })
          }
          
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeService)
);
