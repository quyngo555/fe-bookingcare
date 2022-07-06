import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService'
import ModalUser from './ModalUser';
import ModalEditUSer from './ModalEditUSer';
import { emitter } from "../../utils/emitter"
class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUSer: false,
            userEdit: {}
        }
    }


    async componentDidMount() {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUSer: !this.state.isOpenModalEditUSer
        })
    }



    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    createNewUser = async (data) => {

        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModalUser: false,
                })
                emitter.emit("EVENT_CLEAR_MODAL_DATA", { 'id': 'your id' })
            }
            console.log('response create user', response);
        } catch (error) {
            console.log(error);
        }
        console.log('check data from child', data);
    }

    handleDeleteUser = async (user) => {
        console.log('click delete', user);
        try {
            let res = await deleteUserService(user.id)
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact()
            } else {
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleEditUser = (user) => {
        console.log('edit user', user)
        this.setState({
            isOpenModalEditUSer: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUSer: false
                })
                await this.getAllUsersFromReact()
            }

        } catch (error) {
            console.log(error);
        }
    }
    render() {
        console.log('check render', this.state);
        let arrUsers = this.state.arrUsers
        return (
            <div className='users-container'>

                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}

                />
                {this.state.isOpenModalEditUSer &&
                    <ModalEditUSer
                        isOpen={this.state.isOpenModalEditUSer}
                        toggleFromParent={this.toggleUserEditModal}
                        createNewUser={this.createNewUser}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className="text-center title">Edit users</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    ><i className='fas fa-plus'></i>
                        Add new users
                    </button>
                </div>
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>

                            <tr>
                                <th>Email</th>
                                <th>firstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>PhoneNumber</th>
                                <th>Gender</th>
                                <th>Action</th>
                            </tr>
                            {
                                arrUsers && arrUsers.map(user => {
                                    return (
                                        <tr>
                                            <td>{user.email}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.address}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.gender === 0 ? 'Male' : 'Female'}</td>

                                            <td>
                                                <button className='btn-edit' onClick={() => this.handleEditUser(user)}><i className='fas fa-pencil-alt' /></button>
                                                <button className='btn-delete' onClick={() => this.handleDeleteUser(user)}><i className='fas fa-trash' /></button>
                                            </td>

                                        </tr>
                                    )
                                })
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
