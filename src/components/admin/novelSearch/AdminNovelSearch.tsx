import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getNovelDetail } from '../../novel/novelDetailPage/novelDetailPageApi';
import { deleteNovel } from '../../novelManagementPage/novelManagementApi';
import { IDeleteNovelRequest } from '../../../types/novel';
import { IUserInfoResponse } from '../../../types/auth';
import { sendWarning } from '../adminMainPage/adminApi';
import { showAlert } from '../../../utils';
import { IAdminWarningUser, IAdminWarningUserRequest } from '../../../types/report';
import BaseModal from '../../common/BaseModal';
import ReportModal from '../../report/ReportModal';
import { useParams } from 'react-router';

interface AdminNovelSearchProps {
    searchId?: string;
    currentUser: IUserInfoResponse;
}

const AdminNovelSearch = (props: AdminNovelSearchProps) => {
    const params = useParams();

    const [novelId, setNovelId] = useState('');
    const dispatch = useAppDispatch();

    const novel = useAppSelector(state => state.novelDetail.novel);

    const [onShowWarningModal, setOnShowWarningModal] = React.useState(false);

    const handleSearch = async () => {
        await dispatch(getNovelDetail(novelId));
    };

    const onHideWarningModal = () => {
        setOnShowWarningModal(false)
    }

    const onOpenWarningModal = () => {
        setOnShowWarningModal(true)
    }

    const handleSetNovelIdViaParam = async () => {
        if (params.info) {
            await setNovelId(params.info);
            handleSearch();
        }
    }

    useLayoutEffect(() => {
        handleSetNovelIdViaParam()
    }, [params.info])

    const handleSendWarning = async (reason: string) => {
        // You may want to add a reason or other details for the warning
        if (reason) {
            const payload: IAdminWarningUserRequest = {
                adminId: props.currentUser.id,
                novelId: novel.id,
                userId: novel.authorId,
                reason: reason,
                processed: false,
            }
            const res = await dispatch(sendWarning(payload));
            if (sendWarning.fulfilled.match(res)) {
                showAlert("Warning sent successfully.", "success");
            } else if (sendWarning.rejected.match(res)) {
                showAlert("Failed to send warning.", "danger");
            }
        }
    };

    const handleDeleteNovel = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this novel?");
        if (confirmDelete) {
            const payload: IDeleteNovelRequest = {
                novelId: novelId,
                userId: props.currentUser.id
            }
            const res = await dispatch(deleteNovel(payload));
            if (deleteNovel.fulfilled.match(res)) {
                showAlert("Novel deleted successfully.", "success");
            } else if (deleteNovel.rejected.match(res)) {
                showAlert("Failed to delete novel.", "danger");
            }
        }
    };

    useEffect(() => {
        if (props.searchId) {
            setNovelId(props.searchId);
            handleSearch();
        }
    }, [props.searchId]);


    return (
        <div className="container mt-4">
            <div className="mb-3 row">
                <label htmlFor="novelId" className="col-sm-2 col-form-label">Novel ID</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        id="novelId"
                        value={novelId}
                        onChange={(e) => setNovelId(e.target.value)}
                        placeholder="Enter Novel ID"
                        required
                    />
                </div>
            </div>
            <button onClick={handleSearch} className="btn btn-primary">Search</button>

            {novel && (
                <div className="mt-4">
                    <h2>Novel information</h2>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={novel.image} alt={novel.title} className="img-fluid img-thumbnail" />
                                </div>
                                <div className="col-md-8">
                                    <div className='d-flex align-items-center'>
                                    <h3>{novel.title}</h3>
                                        {(novel.warning || true) && <div className='text-warning ms-3'>Warned</div>}
                                    </div>
                                        <p><strong>Description:</strong> {novel.description}</p>
                                    <p><strong>Genres:</strong> {novel.genres.join(', ')}</p>
                                    <p><strong>Tags:</strong> {novel.tags.join(', ')}</p>
                                    <p><strong>Chapters:</strong> {novel.chapters}</p>
                                    <p><strong>Views:</strong> {novel.views}</p>
                                    <p><strong>Rating:</strong> {novel.rating}</p>
                                    <p><strong>Rating Count:</strong> {novel.ratingCount}</p>
                                    <div className="mt-3">
                                        <button
                                            onClick={onOpenWarningModal}
                                            className="btn btn-warning me-2"
                                        >
                                            Send Warning
                                        </button>
                                        <button
                                            onClick={handleDeleteNovel}
                                            className="btn btn-danger"
                                        >
                                            Delete Novel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <BaseModal
                className="h-100"
                show={onShowWarningModal}
                onHide={onHideWarningModal}
            >
                <ReportModal show={onShowWarningModal} handleClose={onHideWarningModal} handleReport={handleSendWarning} usage={"Warning"} />
            </BaseModal>
        </div>
    );
};

export default AdminNovelSearch;
