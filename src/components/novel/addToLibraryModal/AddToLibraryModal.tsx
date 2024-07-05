import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addNovelToList } from '../../library/libraryApi';
import { useNavigate } from 'react-router';

interface AddToLibraryModalProps {
    onClose: () => void;
    novelId: string;
}

function AddToLibraryModal(props: AddToLibraryModalProps) {
    const dispatch = useAppDispatch();
    const libraryNovelLists = useAppSelector(state => state.library.libraryNovelLists);
    const currentUser = useAppSelector(state => state.auth.currentUser);
    const navigate = useNavigate();

    const handleAddToLibrary = (listId: string) => {
        dispatch(addNovelToList({ userId: currentUser.id, listId, novelId: props.novelId }));
    };

    return (
        <>
            {
                currentUser.id ? (
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add to Library</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={props.onClose}></button>
                        </div>
                        <div className="modal-body">
                            <p>Select a list to add this novel:</p>
                            <ul className="list-group">
                                {libraryNovelLists.map(list => (
                                    <li
                                        key={list.id}
                                        className="list-group-item mb-2 border"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleAddToLibrary(list.id)}
                                    >
                                        {list.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className='my-3 ms-2'>Please <span className='text-primary' onClick={() => navigate(`/login`)} style={{cursor: 'pointer'}}>log in</span> to add this novel to your library.</div>
                    </div>
                )
            }
        </>
    );
}

export default AddToLibraryModal;
