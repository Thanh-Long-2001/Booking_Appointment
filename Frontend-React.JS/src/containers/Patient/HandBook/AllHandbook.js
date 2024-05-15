import React, { Component } from 'react';
import { connect } from "react-redux";
import './AllHandbook.scss'
import { LANGUAGES } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/Section/HomeHeader/HomeHeader';
import { getAllHandbookService } from '../../../services/userService'
import { GrPrevious, GrNext } from "react-icons/gr";
import * as actions from '../../../store/actions'
class AllHandbook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataHandbook: [],
            currentPage: 1,
            totalPages: 0
        }
    }

    async componentDidMount() {
        let res = await getAllHandbookService(this.state.currentPage)
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbook: res.data ? res.data : [],
                totalPages: res.pagination.totalPages ? res.pagination.totalPages : 0
            })

            
        }
    }


    async componentDidUpdate(prevProps, prevState, snaptshot) {
        if (prevState.currentPage !== this.state.currentPage) {
           let res = await getAllHandbookService(this.state.currentPage);
            if (res && res.errCode === 0) {
                this.setState({
                    dataHandbook: res.data ? res.data : []
                })
            }
        }
    }

    handleViewHandbook = (handbook) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${handbook.id}`)
        }
    }

    handlePageChange = (pageNumber) => {
        if (pageNumber !== this.state.currentPage) {
            this.setState({ currentPage: pageNumber });
            if (this.props.history) {
                this.props.history.replace(`/all-handbook/page=${pageNumber}`);
            }
        }
    };

    handleNextPage = (pageNumber) => {
        
        if (pageNumber < this.state.totalPages) {
            pageNumber++;

            this.setState({ currentPage: pageNumber });
            if (this.props.history) {
                this.props.history.replace(`/all-handbook/page=${pageNumber}`);
            }
        }
    };

    handlePrevPage = (pageNumber) => {
        if (pageNumber > 1) {
            pageNumber--;

            this.setState({ currentPage: pageNumber });
            if (this.props.history) {
                this.props.history.replace(`/all-handbook/page=${pageNumber}`);
            }
        }
    };

    render() {
        let { dataHandbook, currentPage, totalPages } = this.state
        let pages = [];
        for(let i = 1; i<= totalPages; i++) {
            pages.push(i)
        }
        
        return (
            <>
                <HomeHeader/>
                <div className='doctor-all-handbook-container'>
                    <div className='body-all-handbook'>
                        <div className='content-all-handbook'>
                            <FormattedMessage id="homepage.all-handbook"/>
                        </div>
                        <div className="render-handbook">
                            {dataHandbook && dataHandbook.length > 0 &&
                                dataHandbook.map((item, index) => {
                                    return (
                                        <div className='item-all-handbook' key={index}
                                            onClick={() => this.handleViewHandbook(item)}
                                        >
                                            <div className='left-all-handbook'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            >
                                            </div>
                                            <div className='right-all-handbook'>
                                                <div>
                                                    {item.name}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='pagination'>
                            <button className='btn-prev' onClick={() => this.handlePrevPage(currentPage)}>
                                <GrPrevious />
                            </button>
                            <div className='pages'>
                                {pages.map((pageNumber) => (
                                    
                                    <button className={`page ${pageNumber === currentPage ? 'active' : ''}`} key={pageNumber} onClick={() => this.handlePageChange(pageNumber)}>
                                        {pageNumber}
                                    </button>
                                ))}
                            </div>
                            <button className='btn-next' onClick={() => this.handleNextPage(currentPage)}>
                                <GrNext />
                            </button>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {    
        language: state.app.language,
        totalPages: state.admin.totalPagesHB
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllHandBooks: (page) => dispatch(actions.fetchGetAllHandbooks(page)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllHandbook);
