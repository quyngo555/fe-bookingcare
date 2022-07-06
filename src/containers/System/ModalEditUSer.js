// import { Button } from "bootstrap";
import { ModalBody, ModalFooter, ModalHeader, Modal, Button } from "reactstrap";
import { emitter } from "../../utils/emitter";

import _ from 'lodash'
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

    }

    componentDidMount() {
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
        console.log('didmount edit modal', this.props.currentUser);
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })

    }
    checkValidateInput = () => {
        let isvalid = true
        let arrInput = Object.keys(this.state)
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isvalid = false
                alert('Missing parameter' + arrInput[i])
                break
            }
        }
        return isvalid
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            this.props.editUser(this.state);

        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className='modal-user-container'
                size="lg"
                centered
            >
                <ModalHeader toggle={() => this.toggle()}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={e => this.handleChangeInput(e, 'email')}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={e => this.handleChangeInput(e, 'password')}
                                value={this.state.password}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label>FirstName</label>
                            <input
                                type="text"
                                onChange={e => this.handleChangeInput(e, 'firstName')}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label>LastName</label>
                            <input
                                type="text"
                                onChange={e => this.handleChangeInput(e, 'lastName')}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input
                                type="text"
                                onChange={e => this.handleChangeInput(e, 'address')}
                                value={this.state.address}
                            />
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => { this.handleSaveUser() }}
                    >Save Change</Button>{' '}
                    <Button
                        color='secondary'
                        className="px-3" onClick={() => this.handleClose()}
                    >Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

