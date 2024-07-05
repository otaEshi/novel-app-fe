import React, { useState } from 'react';

interface CreateListModalProps {
    onClose: () => void;
    handleCreateList: (title: string, isPublic: boolean) => void;
}

function CreateListModal(props: CreateListModalProps) {
    const [title, setTitle] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const handlePublicPrivateSelect = (value: boolean) => {
        setIsPublic(value);
    };

    const handleCreateButtonClick = () => {
        if (title.trim()) {
            props.handleCreateList(title, isPublic);
            props.onClose(); // Close modal after creating list
        }
    };

    return (
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Create List</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={props.onClose}></button>
            </div>
            <div className="modal-body">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Public/Private</label>
                    <div className="dropdown">
                        <button
                            className="btn border dropdown-toggle"
                            type="button"
                            id="publicPrivateDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {isPublic ? 'Public' : 'Private'}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="publicPrivateDropdown">
                            <li>
                                <button
                                    className={`dropdown-item ${isPublic ? 'active' : ''}`}
                                    onClick={() => handlePublicPrivateSelect(true)}
                                >
                                    Public
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`dropdown-item ${!isPublic ? 'active' : ''}`}
                                    onClick={() => handlePublicPrivateSelect(false)}
                                >
                                    Private
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleCreateButtonClick}>
                    Create
                </button>
                <button type="button" className="btn btn-secondary" onClick={props.onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default CreateListModal;
