import React, { useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { adjustAdminRight, searchUser } from '../adminMainPage/adminApi';
import { IAdjustAdminRequest, ISearchUserRequest } from '../../../types/admin';
import { IUserInfoResponse } from '../../../types/auth';
import { useParams } from 'react-router';

interface UserManagementProps {
    currentUser: IUserInfoResponse;
}

const UserManagement: React.FC<UserManagementProps> = ({ currentUser }) => {
    const params = useParams();

    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useAppDispatch();

    const userList = useAppSelector(state => state.admin.userList);
    const adminList = useAppSelector(state => state.admin.adminList);

    const handleSearch = async () => {
        const payload: ISearchUserRequest = {
            username: searchTerm
        }
        await dispatch(searchUser(payload));
    };

    const handleAddToAdmin = async (userId: string) => {
        const payload: IAdjustAdminRequest = {
            currentUserId: currentUser.id,
            userId: userId,
            admin_type: 1,
        }
        await dispatch(adjustAdminRight(payload));
    };

    const handleRevokeAdmin = async (userId: string) => {
        const payload: IAdjustAdminRequest = {
            currentUserId: currentUser.id,
            userId: userId,
            admin_type: 0
        }
        await dispatch(adjustAdminRight(payload));
    };

    const handleSetSearchViaParam = async () => {
        if (params.info) {
            await setSearchTerm(params.info);
            handleSearch();
        }
    }

    useLayoutEffect(() => {
        handleSetSearchViaParam()
    }, [params.info])

    return (
        <div className="container mt-4">
            <div className="mb-3 row">
                <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter username"
                    />
                </div>
            </div>
            <button onClick={handleSearch} className="btn btn-primary mb-4">Search</button>

            <h2>Search Results</h2>
            <div className="list-group mb-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {userList.map(user => (
                    <div key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            {/* <img src={user.avatar} alt={user.username} className="img-thumbnail rounded-circle me-2" style={{ width: '50px', height: '50px' }} /> */}
                            {user.avatar ? (
                                <img src={user.avatar} alt="Avatar" className="avatar" style={{ marginRight: '5px', borderRadius: '50%', width: '25px', height: '25px' }} />
                            ) : (
                                <i className="bi bi-person-circle" style={{ fontSize: '1.5rem', marginRight: '5px' }}></i>
                            )}
                            <h5 className="mb-0">{user.username}</h5>
                        </div>

                        <button
                            className="btn btn-success"
                            onClick={() => handleAddToAdmin(user.id)}>
                            Promote to Admin
                        </button>
                    </div>
                ))}
            </div>

            <h2>Current Admins</h2>
            <div className="list-group" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {adminList.map(admin => (
                    <div key={admin.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            {/* <img src={admin.avatar} alt={admin.username} className="img-thumbnail rounded-circle me-2" style={{ width: '50px', height: '50px' }} /> */}
                            {admin.avatar ? (
                                <img src={admin.avatar} alt="Avatar" className="avatar" style={{ marginRight: '5px', borderRadius: '50%', width: '25px', height: '25px' }} />
                            ) : (
                                <i className="bi bi-person-circle" style={{ fontSize: '1.5rem', marginRight: '5px' }}></i>
                            )}
                            <h5 className="mb-0">{admin.username}</h5>
                        </div>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleRevokeAdmin(admin.id)}>
                            Revoke Admin Rights
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserManagement;
