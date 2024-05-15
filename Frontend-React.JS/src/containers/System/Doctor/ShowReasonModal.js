import React, { Component } from 'react';
import { connect } from "react-redux";
import './RemedyModal.scss'
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import Select from "react-select"
import { Toast, toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';


class ShowReasonModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '', 
            // imgBase64: ''
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    render() {
        let { isOpenReasonModal, dataModal, closeReasonModal, sendRemedy } = this.props

        return (
            <Modal
                isOpen={isOpenReasonModal}
                className={'booking-modal-container'}
                size='md'
                centered
                toggle={closeReasonModal}
            >
                <div className="modal-header">
                    <h5 className="modal-title">Lý do khám bệnh</h5>
                    <button type="button" className="close" aria-label="Close" onClick={closeReasonModal}>
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-12 form-group'>
                            <span>{dataModal}</span>
                        </div>
                        
                    </div>
                </ModalBody>
                <ModalFooter>
                    
                    <Button color="secondary" onClick={closeReasonModal}>
                        <FormattedMessage id="admin.manage-patient.cancel"/>
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {    
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowReasonModal);
