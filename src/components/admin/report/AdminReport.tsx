import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { IAdminReportList, IHandleReport } from "../../../types/report";
import { useNavigate } from 'react-router';
import { getAdminReportList, handleReportRequest } from '../adminMainPage/adminApi';
import { IDeleteCommentRequest } from '../../../types/novel';
import { IUserInfoResponse } from '../../../types/auth';
import { deleteComment } from '../../novel/novelReadPage/novelReadPageApi';
import { IDeleteReview } from '../../../types/review';
import { deleteReview } from '../../review/reviewApi';

interface AdminReportProps {
    currentUser: IUserInfoResponse;
}

function AdminReport(props: AdminReportProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [activeTab, setActiveTab] = useState({
        novels: 'unprocessed',
        reviews: 'unprocessed',
        comments: 'unprocessed'
    });

    const reportList: IAdminReportList = useAppSelector(store => store.admin.reportList);

    useEffect(() => {
        dispatch(getAdminReportList())
    })

    const handleNovel = (novelId: string) => {
        navigate(`admin/search-novel/${novelId}`);
    }

    const handleDeleteReview = (reviewId: string) => {
        const confirmation = window.confirm("Are you sure you want to delete this review?");
        if (confirmation) {
            const payload: IDeleteReview = {
                userId: props.currentUser.id,
                reviewId: reviewId,
            };
            dispatch(deleteReview(payload));
        }
    }

    const handleDeleteComment = (commentId: string) => {
        const confirmation = window.confirm("Are you sure you want to delete this comment?");
        if (confirmation) {
            const payload: IDeleteCommentRequest = {
                userId: props.currentUser.id,
                commentId: commentId,
            };
            dispatch(deleteComment(payload));
        }
    }

    const handleReport = (reportId: string) => {
        const payload: IHandleReport = {
            userId: props.currentUser.id,
            reportId: reportId,
            processed: true
        }
        dispatch(handleReportRequest(payload));
    }

    const unprocessedReports = {
        novels: reportList.reportNovel.filter(report => !report.processed),
        reviews: reportList.reportReview.filter(report => !report.processed),
        comments: reportList.reportComment.filter(report => !report.processed)
    };

    const processedReports = {
        novels: reportList.reportNovel.filter(report => report.processed),
        reviews: reportList.reportReview.filter(report => report.processed),
        comments: reportList.reportComment.filter(report => report.processed)
    };

    const handleTabChange = (type: string, tab: string) => {
        setActiveTab(prev => ({ ...prev, [type]: tab }));
    };

    return (
        <div className="container mt-4">
        <div className="row">
            {/* Report Novel Panel */}
            <div className="card mb-4 h-100">
                <div className="card-header bg-success text-white">
                    Novels
                    <div className="btn-group float-end">
                        <button
                            className={`btn ${activeTab.novels === 'unprocessed' ? 'btn-light' : 'btn-secondary'}`}
                            onClick={() => handleTabChange('novels', 'unprocessed')}
                        >
                            Unprocessed
                        </button>
                        <button
                            className={`btn ${activeTab.novels === 'processed' ? 'btn-light' : 'btn-secondary'}`}
                            onClick={() => handleTabChange('novels', 'processed')}
                        >
                            Processed
                        </button>
                    </div>
                </div>
                <div className="card-body report-panel overflow-auto">
                    {(activeTab.novels === 'unprocessed' ? unprocessedReports.novels : processedReports.novels).length === 0 ? (
                        <p>No reports available.</p>
                    ) : (
                        (activeTab.novels === 'unprocessed' ? unprocessedReports.novels : processedReports.novels).map((report, index) => (
                            <div key={index} className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Novel id: {report.novelId}</h5>
                                    <p className="card-text">Reason: {report.reason}</p>
                                    <button 
                                        className="btn btn-success" 
                                        onClick={() => handleReport(report.reportId)}
                                    >
                                        Done
                                    </button>
                                    <button 
                                        className="btn btn-primary ms-2" 
                                        onClick={() => handleNovel(report.novelId)}
                                    >
                                        View novel
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Report Review Panel */}
            <div className="card mb-4 h-100">
                <div className="card-header bg-primary text-white">
                    Reviews
                    <div className="btn-group float-end">
                        <button
                            className={`btn ${activeTab.reviews === 'unprocessed' ? 'btn-light' : 'btn-secondary'}`}
                            onClick={() => handleTabChange('reviews', 'unprocessed')}
                        >
                            Unprocessed
                        </button>
                        <button
                            className={`btn ${activeTab.reviews === 'processed' ? 'btn-light' : 'btn-secondary'}`}
                            onClick={() => handleTabChange('reviews', 'processed')}
                        >
                            Processed
                        </button>
                    </div>
                </div>
                <div className="card-body report-panel overflow-auto">
                    {(activeTab.reviews === 'unprocessed' ? unprocessedReports.reviews : processedReports.reviews).length === 0 ? (
                        <p>No reports available.</p>
                    ) : (
                        (activeTab.reviews === 'unprocessed' ? unprocessedReports.reviews : processedReports.reviews).map((report, index) => (
                            <div key={index} className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Review: {report.review.review}</h5>
                                    <p className="card-text">Reason: {report.reason}</p>
                                    <button 
                                        className="btn btn-success" 
                                        onClick={() => handleReport(report.reportId)}
                                    >
                                        Done
                                    </button>
                                    <button 
                                        className="btn btn-danger ms-2" 
                                        onClick={() => handleDeleteReview(report.review.id)}
                                    >
                                        Delete review
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Report Comment Panel */}
            <div className="card mb-4 h-100">
                <div className="card-header bg-warning text-dark">
                    Comments
                    <div className="btn-group float-end">
                        <button
                            className={`btn ${activeTab.comments === 'unprocessed' ? 'btn-light' : 'btn-secondary'}`}
                            onClick={() => handleTabChange('comments', 'unprocessed')}
                        >
                            Unprocessed
                        </button>
                        <button
                            className={`btn ${activeTab.comments === 'processed' ? 'btn-light' : 'btn-secondary'}`}
                            onClick={() => handleTabChange('comments', 'processed')}
                        >
                            Processed
                        </button>
                    </div>
                </div>
                <div className="card-body report-panel overflow-auto">
                    {(activeTab.comments === 'unprocessed' ? unprocessedReports.comments : processedReports.comments).length === 0 ? (
                        <p>No reports available.</p>
                    ) : (
                        (activeTab.comments === 'unprocessed' ? unprocessedReports.comments : processedReports.comments).map((report, index) => (
                            <div key={index} className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Comment: {report.comment.content}</h5>
                                    <p className="card-text">Reason: {report.reason}</p>
                                    <button 
                                        className="btn btn-success" 
                                        onClick={() => handleReport(report.reportId)}
                                    >
                                        Done
                                    </button>
                                    <button 
                                        className="btn btn-danger ms-2" 
                                        onClick={() => handleDeleteComment(report.commentId)}
                                    >
                                        Delete comment
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    </div>
    );
};
export default AdminReport;
