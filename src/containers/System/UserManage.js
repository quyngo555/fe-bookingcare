import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers } from '../../services/userService'
class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUsers: []
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


    render() {
        console.log('check render', this.state);
        let arrUsers = this.state.arrUsers
        return (
            <div className='users-container'>
                <div className="text-center title">Manage users</div>
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
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
                                            <button className='btn-edit'><i className='fas fa-pencil-alt' /></button>
                                            <button className='btn-delete'><i className='fas fa-trash' /></button>
                                        </td>

                                    </tr>
                                )
                            })
                        }

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
