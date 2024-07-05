import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import CreateNovel from './createNovel/CreateNovel';
import { deleteNovel, getNovelListByAuthor } from './novelManagementApi'; // Adjust this import based on your API or Redux actions
import { IDeleteNovelRequest } from '../../types/novel';
import { showAlert } from '../../utils';

function NovelManagementPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector(state => state.auth.currentUser);
    const novelList = useAppSelector(state => state.novelManagement.novelList);
    const [isCreatingNovel, setIsCreatingNovel] = useState(false);

    React.useEffect(() => {
        if (!currentUser || currentUser.id !== id || !id) {
            navigate('/404');
            return;
        }
        dispatch(getNovelListByAuthor(id));
    }, [currentUser, id, navigate]);

    if (!currentUser || currentUser.id !== id) {
        return null;
    }

    const handleCreateNovel = () => {
        setIsCreatingNovel(true);
    };

    const handleBackToManagement = () => {
        setIsCreatingNovel(false);
    };

    const handleEditNovel = (novelId: string) => {
        navigate(`/user/${currentUser.id}/novels-management/detail/${novelId}`);
    };

    const handleDashboard = () => {
        navigate(`/user/${currentUser.id}/novels-management/dashboard`);
    }

    const handleDeleteNovel = async (novelId: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this novel?");
        if (confirmed) {
            const payload: IDeleteNovelRequest = {
                userId: currentUser.id,
                novelId: novelId,
            };
            const res = await dispatch(deleteNovel(payload));
            if (deleteNovel.fulfilled.match(res)) {
                showAlert('Novel deleted successfully', 'success');
            } else if (deleteNovel.rejected.match(res)) {
                showAlert('Failed to delete novel', 'danger');
            }
        }
    };

    return (
        <div className="container mt-4">
            {isCreatingNovel ? (
                <>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h1>Create a new novel</h1>
                        <div className='btn btn-secondary' onClick={handleBackToManagement}>Back to Management</div>
                    </div>
                    <CreateNovel closeCreateNodel={handleBackToManagement} />
                </>
            ) : (
                <>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h1>Manage your novels</h1>
                        <div>
                            <div className='btn btn-primary me-2' onClick={handleDashboard}>Dashboard</div>
                            <div className='btn btn-primary' onClick={handleCreateNovel}>Create a novel</div>
                        </div>
                    </div>
                    <table className="table table-striped">
                        {novelList && novelList.length > 0 && (
                            <thead>
                                <tr>
                                    <th scope="col">Story</th>
                                    <th scope="col">Chapters</th>
                                    <th scope="col">Views</th>
                                    <th scope="col">Rating</th> {/* Added Rating header */}
                                    <th scope="col">Rating Count</th> {/* Added Rating Count header */}
                                    <th scope="col"></th> {/* Added Actions header */}
                                </tr>
                            </thead>
                        )}
                        <tbody>
                            {novelList && novelList.length > 0 ? (
                                novelList.map(novel => (
                                    <tr key={novel.id} onClick={() => handleEditNovel(novel.id)} style={{ cursor: 'pointer' }}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={novel.image}
                                                    alt={novel.title}
                                                    className="img-thumbnail mr-2"
                                                    style={{ width: '50px', height: '50px' }}
                                                />
                                                <span className='ms-2'>{novel.title}</span>
                                            </div>
                                        </td>
                                        <td className='pt-3 ps-4'>{novel.chapters}</td>
                                        <td className='pt-3 ps-3'>{novel.views}</td>
                                        <td className='pt-3 ps-4'>{novel.rating?.toFixed(1) || 'N/A'}</td> {/* Display rating */}
                                        <td className='pt-3 ps-5'>{novel.ratingCount || 0}</td> {/* Display rating count */}
                                        <td>
                                            <button className="btn btn-danger mt-1" onClick={(e) => { e.stopPropagation(); handleDeleteNovel(novel.id); }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>
                                        <div className="text-center py-4">
                                            <p>No works! Click the button below to create your first novel</p>
                                            <div className="btn btn-outline-primary" onClick={handleCreateNovel}>
                                                Create Now
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default NovelManagementPage;
