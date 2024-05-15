import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { 
  getAllHandbookService, 
  getAllComment, 
  createNewComment, 
  updateCommentByUser, 
  deleteCommentByUser } 
  from "../../../../services/userService";
import { FormattedMessage } from "react-intl";
import "./HandBook.scss";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";

class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandbook: [],
    };
  }

  async componentDidMount() {
    let res = await getAllHandbookService();
    console.log("check res: ", res);
    if (res && res.errCode === 0) {
      this.setState({
        dataHandbook: res.data ? res.data : [],
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleViewHandbook = (handbook) => {
    if (this.props.history) {
      this.props.history.push(`/detail-handbook/${handbook.id}`);
    }
  };

  handleViewAllHandbook = () => {
    if (this.props.history) {
      this.props.history.push(`/all-handbook`);
    }
  };

 

  render() {
    let { dataHandbook } = this.state;
    return (
      <div className="section-share section-handbook">
        <div className="section-container4">
          <div className="section-header4">
            <span className="title-section4">
              <FormattedMessage id="homepage.handbook" />
            </span>
          </div>
          <div className="section-body4">
            {dataHandbook &&
              dataHandbook.length > 0 &&
              dataHandbook.map((item, index) => {
                return (
                  <div
                    className="section-customize4"
                    key={index}
                    onClick={() => this.handleViewHandbook(item)}
                  >
                    <div className="customize-border4">
                      <div className="header-handbook"></div>
                      <div
                        className="bg-image4"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="handbook-name">
                        <p
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            lineClamp: 1,
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            maxWidth: 310,
                          }}
                        >
                          {item.name}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="section-footer4">
            <span className="title-section">
              <FormattedMessage id="homepage.more" />
            </span>
            <div className="icon-more">
              <FontAwesomeIcon icon={faAnglesDown} size="1x" />
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
    userInfo: state.user.userInfo,
    //inject
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HandBook)
);
