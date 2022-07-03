// import { Button } from "bootstrap";
import { ModalBody, ModalFooter, ModalHeader, Modal, Button } from "reactstrap";



import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
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
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            this.props.createNewUser(this.state);
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
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={e => this.handleChangeInput(e, 'password')}
                                value={this.state.password}
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
                        onClick={() => { this.handleAddNewUser() }}
                    >Add New</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

