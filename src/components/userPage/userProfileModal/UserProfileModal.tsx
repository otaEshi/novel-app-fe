import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { IUpdateUserProfileRequest } from '../../../types/user';
import { updateUserProfile } from '../userPage/userApi';
import { showAlert } from '../../../utils';

interface UserProfileModalProps {
    user: { id: string; name: string; username: string; avatar: string | undefined }; // User data
    onHide: () => void; // Function to handle modal hide
    onUpdateName: (newName: string) => void; // Function to handle name update
    onUpdateAvatar: (avatarData: string) => void; // Function to handle avatar update with base64 data
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
    user,
    onHide,
    onUpdateName,
    onUpdateAvatar,
}) => {
    const [name, setName] = useState(user.name); // State for user's name
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined); // State for previewing avatar

    const dispatch = useAppDispatch();

    const currentUser = useAppSelector(state => state.auth.currentUser);

    // Function to handle form submission for name update
    const handleNameUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onUpdateName(name.trim()); // Trim name before updating
        onHide(); // Close the modal after update
    };

    // Function to handle file upload for avatar update
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64Data = reader.result as string;
                setAvatarPreview(base64Data); // Preview avatar
                onUpdateAvatar(base64Data); // Call parent function to handle avatar update with base64 data
            };
            reader.readAsDataURL(files[0]); // Read file as data URL (base64)
        }
    };

    const handleUpdateUserProfile = async () => {
        if (!currentUser) return;
        if (name.trim() === '') return;
        const payload: IUpdateUserProfileRequest = {
            id: currentUser.id,
            name: name.trim(),
            avatar: avatarPreview ? avatarPreview : user.avatar,
        }
        const res = await dispatch(updateUserProfile(payload))
        if (updateUserProfile.fulfilled.match(res)) {
            onUpdateName(name.trim());
            showAlert('Profile updated successfully', 'success');
            onHide();
        } else if (updateUserProfile.rejected.match(res)) {
            showAlert('Failed to update profile', 'danger')
        }
        // onHide();
    }

    return (
        <div className="modal fade show" style={{ display: 'block', zIndex: 1050 }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Profile</h5>
                        <button type="button" className="btn-close" onClick={onHide}></button>
                    </div>
                    <div className="modal-body">
                        <div className="text-center mb-3">
                            {avatarPreview ? (
                                <img
                                    src={avatarPreview}
                                    alt="Avatar"
                                    className="img-fluid rounded-circle"
                                    style={{ width: '150px', height: '150px' }}
                                />
                            ) : user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt="Avatar"
                                    className="img-fluid rounded-circle"
                                    style={{ width: '150px', height: '150px' }}
                                />
                            ) : (
                                <i className="bi bi-person-circle" style={{ fontSize: '5rem', color: '#6c757d' }}></i>
                            )}
                            <div className="mt-3">
                                <label htmlFor="formFile" className="form-label">Upload New Avatar</label>
                                <input className="form-control" type="file" id="formFile" onChange={handleAvatarChange} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formUsername" className="form-label">Username</label>
                            <input className="form-control" type="text" id="formUsername" disabled readOnly value={user.username} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formName" className="form-label">Name</label>
                            <input
                                className="form-control"
                                type="text"
                                id="formName"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handleUpdateUserProfile}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileModal;
