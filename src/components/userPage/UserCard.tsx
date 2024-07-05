import React from 'react';
import { IUser, IUserCard } from '../../types/user';
import { useNavigate } from 'react-router';

interface IUserCardProps {
    user: IUserCard;
}

const UserCard: React.FC<IUserCardProps> = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex align-items-center">
                    {/* Avatar */}
                    <img
                        src={user.avatar} // Replace with actual avatar URL or source
                        alt="Avatar"
                        className="rounded-circle me-3"
                        style={{ width: '80px', height: '80px' }}
                    />

                    {/* User Info */}
                    <div>
                        <h5
                            className="card-title"
                            onClick={() => navigate(`/user/${user.id}`)}
                            style={{ cursor: "pointer" }}
                        >
                            {user.name}
                        </h5>
                        {/* <p className="card-text">@{user.username}</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
