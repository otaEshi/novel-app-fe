import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getChaptersAuthor, changeChapterStatusNovel, permanentDeleteChapter } from "../novelManagementApi";
import { getNovelDetail } from "../../novel/novelDetailPage/novelDetailPageApi";
import EditNovel from "../editNovel/EditNovel";
import BaseModal from "../../common/BaseModal";
import ChapterReportModal from "../chapterReportModal/ChapterReportModal";

function NovelManageDetail() {
    const { id, novelId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector(state => state.auth.currentUser);
    const currentNovelChapters = useAppSelector(state => state.novelManagement.currentNovelChapters);
    const currentNovel = useAppSelector(state => state.novelDetail.novel);

    const [showPublished, setShowPublished] = useState(true);
    const [showDeleted, setShowDeleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // New state for toggling edit view
    const [isShowChapterReportModal, setIsShowChapterReportModal] = useState(false); // New state for toggling chapter report modal

    const fetchData = async () => {
        if (id && novelId) {
            const payload = {
                novelId: novelId,
                userId: id,
            };
            dispatch(getChaptersAuthor(payload));
            dispatch(getNovelDetail(novelId));
        }
    };

    useEffect(() => {
        fetchData();
    }, [id, novelId]);

    useEffect(() => {
        if (!currentUser || currentUser.id !== id || !novelId) {
            navigate('/404');
        }
    }, [id]);

    if (!currentUser || currentUser.id !== id || !novelId) {
        return null;
    }

    const handleEditChapter = (chapterId: string) => {
        navigate(`/user/${currentUser.id}/novels-management/detail/${novelId}/chapter-edit/${chapterId}`)
    };

    const handleCreateNewChapter = () => {
        navigate(`/user/${currentUser.id}/novels-management/detail/${novelId}/chapter-edit/new`);
    }

    const handleDeleteChapter = (chapterId: string) => {
        const payload = {
            userId: currentUser.id,
            chapterId: chapterId,
            status: 'Deleted',
        };
        dispatch(changeChapterStatusNovel(payload));
    };

    const handleRestoreChapter = (chapterId: string) => {
        const payload = {
            userId: currentUser.id,
            chapterId: chapterId,
            status: 'Published',
        };
        dispatch(changeChapterStatusNovel(payload));
    };

    const handlePermanentlyDeleteChapter = (chapterId: string) => {
        const confirmed = window.confirm("Are you sure you want to permanently delete this chapter?");
        if (confirmed) {
            const payload = {
                userId: currentUser.id,
                chapterId: chapterId,
            };
            dispatch(permanentDeleteChapter(payload));
        }
    }

    const renderChapters = (status: string) => {
        const filteredChapters = currentNovelChapters.filter(chapter => chapter.status === status);

        return (
            <ul className="list-group">
                {filteredChapters.map(chapter => (
                    <li key={chapter.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <span>Chapter {chapter.chapter}: {chapter.title}</span>
                        </div>
                        <div>
                            {chapter.status === 'Deleted' && (
                                <div>
                                    <button className="btn btn-primary mx-2" onClick={() => handleRestoreChapter(chapter.id)}>Restore</button>
                                    <button className="btn btn-danger" onClick={() => handlePermanentlyDeleteChapter(chapter.id)}>Permanently delete</button>
                                </div>
                            )}
                            {chapter.status === 'Published' && (
                                <div>
                                    <button className="btn btn-primary mx-2" onClick={() => handleEditChapter(chapter.id)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteChapter(chapter.id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    const handleReturn = () => {
        navigate(`/user/${currentUser.id}/novels-management`);
    };

    const handleEditNovelInfo = () => {
        setIsEditing(true); // Show edit panel
    };

    const closeEditPanel = () => {
        setIsEditing(false); // Show details panel
        fetchData(); // Refresh novel details
    };

    const handleReport = () => {
        onShowChapterReportModal()
    }

    const onHideChapterReportModal = () => {
        setIsShowChapterReportModal(false);
    }

    const onShowChapterReportModal = () => {
        setIsShowChapterReportModal(true);
    }

    return (
        <div className="container">
            {isEditing ? (
                <>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h1>Edit novel</h1>
                        <div className='btn btn-outline-primary' onClick={closeEditPanel}>Back to Management</div>
                    </div>
                    <EditNovel
                        closeEditNovel={closeEditPanel}
                    />
                </>
            ) : (
                <>
                    <div className="d-flex justify-content-between">
                        <div className="mb-2">
                            <button className="btn btn-outline-primary me-2" onClick={handleReturn}>Return to Novels Management</button>
                            <button className="btn btn-outline-primary" onClick={handleReport}>Reports</button>
                        </div>
                        <button className="btn btn-primary mb-2" onClick={handleCreateNewChapter}>Create new chapter</button>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <img
                                        src={currentNovel.image}
                                        alt={currentNovel.title}
                                        className="img-thumbnail"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </div>
                                <div className="col-md-9">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="card-title" style={{ cursor: 'pointer' }} onClick={() => navigate(`/novel/${currentNovel.id}`)}>{currentNovel.title}</h5>
                                        <button className="btn btn-primary mx-2" onClick={handleEditNovelInfo}>Edit</button>
                                    </div>
                                    <p><strong>Author:</strong> <span className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate(`/user/${currentNovel.authorId}`)}> {currentNovel.author} </span></p>
                                    <p><strong>Description:</strong> {currentNovel.description}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="mb-3">
                                <div className="btn-group">
                                    <button
                                        type="button"
                                        className={`btn btn-${showPublished ? 'primary' : 'outline-primary'}`}
                                        onClick={() => {
                                            setShowPublished(true);
                                            setShowDeleted(false);
                                        }}
                                    >
                                        Published Chapters
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn btn-${showDeleted ? 'primary' : 'outline-primary'}`}
                                        onClick={() => {
                                            setShowPublished(false);
                                            setShowDeleted(true);
                                        }}
                                    >
                                        Deleted Chapters
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    {showPublished && renderChapters('Published')}
                                    {showDeleted && renderChapters('Deleted')}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <BaseModal
                className="h-100"
                show={ isShowChapterReportModal }
                onHide={onHideChapterReportModal }
            >
                <ChapterReportModal show={isShowChapterReportModal} currentUser={currentUser} onClose={onHideChapterReportModal} novelId={novelId}/>
            </BaseModal>
        </div>
    );
}

export default NovelManageDetail;
