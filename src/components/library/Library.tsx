import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getLibraryLists, createLibraryList, deleteLibraryList, deleteNovelFromList, updateListPrivacy, updateListTitle } from './libraryApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import BaseModal from '../common/BaseModal';
import CreateListModal from './CreateListModal';

function Library() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const currentUser = useAppSelector(store => store.auth.currentUser);
    const libraryNovelLists = useAppSelector(store => store.library.libraryNovelLists);

    const [selectedList, setSelectedList] = useState<string | null>(null);
    const [showCreateListModal, setShowCreateListModal] = useState(false);

    const [curentListTitle, setCurrentListTitle] = useState<string>('');

    useEffect(() => {
        if (selectedList !== null) {
            libraryNovelLists
                .filter(list => list.id === selectedList)
                .map(list => setCurrentListTitle(list.title));
        }
    }, [selectedList])

    useEffect(() => {
        if (currentUser.id) {
            dispatch(getLibraryLists(currentUser.id));
        }
    }, [currentUser.id, dispatch]);

    const handleCreateList = (title: string, isPublic: boolean) => {
        if (title.trim()) {
            dispatch(createLibraryList({ userId: currentUser.id, title: title, isPublic: isPublic }));
            onHideCreateListModal()
        }
    };

    const handleDeleteList = (listId: string) => {
        dispatch(deleteLibraryList({ userId: currentUser.id, listId }));
        if (selectedList === listId) {
            setSelectedList(null);
        }
    };

    const handleDeleteNovel = (listId: string, novelId: string) => {
        dispatch(deleteNovelFromList({ userId: currentUser.id, listId, novelId }));
    };

    const handleUpdatePrivacy = (listId: string, isPublic: boolean) => {
        dispatch(updateListPrivacy({ userId: currentUser.id, listId, isPublic }));
    };

    const onHideCreateListModal = () => {
        setShowCreateListModal(false);
    };

    const onOpenCreateListModal = () => {
        setShowCreateListModal(true);
    }

    const handleUpdateTitle = (listId: string) => {
        dispatch(updateListTitle({ userId: currentUser.id, listId, title: curentListTitle }));
    }

    const onChangeListTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentListTitle(e.target.value);
    }

    return (
        <div className="container mt-4">
            {currentUser.id ? (
                <>
                    <div className="row">
                        <div className="col-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Library</h5>
                                    <p className="card-text">List of novels you have saved.</p>
                                    <ul className="list-group mb-3">
                                        {libraryNovelLists.map(list => (
                                            <li
                                                key={list.id}
                                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setSelectedList(list.id)}
                                            >
                                                {list.title}
                                                <div className="btn-group ms-2">
                                                    <button
                                                        className="btn btn-secondary btn-sm dropdown-toggle dropdown-toggle-split"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        {list.isPublic ? 'Public' : 'Private'}
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <button
                                                                className="dropdown-item"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleUpdatePrivacy(list.id, true);
                                                                }}
                                                            >
                                                                Public
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                className="dropdown-item"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleUpdatePrivacy(list.id, false);
                                                                }}
                                                            >
                                                                Private
                                                            </button>
                                                        </li>
                                                    </ul>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteList(list.id);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                        <button
                                            className="btn btn-primary"
                                            onClick={onOpenCreateListModal}
                                        >
                                            Create List
                                        </button>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Novel Lists</h5>
                                    {selectedList !== null ? (
                                        libraryNovelLists
                                            .filter(list => list.id === selectedList)
                                            .map(list => (
                                                <div key={list.id}>

                                                    <h6>{list.title}</h6>
                                                    <div className=' my-2 d-flex'> 
                                                    <input type="text" className="form-control me-2" value={curentListTitle} style={{maxWidth: '550px'}} onChange={onChangeListTitle}></input>
                                                    <button className="btn btn-primary" onClick={() => handleUpdateTitle(list.id)}>Update Title</button>
                                                    </div>

                                                    <ul className="list-group">
                                                        {list.novels.map(novel => (
                                                            <li className="list-group-item" key={novel.id}>
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div style={{maxWidth: '610px'}}>
                                                                        <strong>{novel.title}</strong>
                                                                        <p className="mb-1">{novel.description}</p>
                                                                    </div>
                                                                    <div>
                                                                        <button
                                                                            className="btn btn-primary me-2"
                                                                            onClick={() => navigate(`/novel/${novel.id}`)}
                                                                        >
                                                                            View
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-danger"
                                                                            onClick={() => handleDeleteNovel(list.id, novel.id)}
                                                                        >
                                                                            Remove
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))
                                    ) : (
                                        <p>Please select a list to view the novels.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body text-center">
                                <h5 className="card-title">Please
                                    <span
                                        className='link-primary mx-1'
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => navigate('/login')}
                                    >
                                        log in
                                    </span>
                                    to view your library.
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <BaseModal
                className="h-100"
                show={showCreateListModal}
                onHide={onHideCreateListModal}
            >
                <CreateListModal onClose={onHideCreateListModal} handleCreateList={handleCreateList} />
            </BaseModal>
        </div>
    );
}

export default Library;
