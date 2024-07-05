import React from 'react';
import { ILikeReview, IReview } from '../../types/review';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { likeReview, reportReview } from './reviewApi';
import BaseModal from '../common/BaseModal';
import { showAlert } from '../../utils';
import ReportModal from '../report/ReportModal';
import { IReportRequest } from '../../types/report';

interface ReviewCardProps {
    review: IReview;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector((state) => state.auth.currentUser);

    const [onShowReportModal, setOnShowReportModal] = React.useState(false);

    // Sample function to generate stars based on rating
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
        }
        return stars;
    };

    const onLikeReview = () => {
        if (!currentUser || currentUser.id === '') {
            showAlert('Please login to like this review', 'danger')
            return;
        }
        if (currentUser.id === review.userId) {
            showAlert('You cannot like your own review', 'danger')
            return;
        }
        let payload: ILikeReview
        if (currentUser.id === review.userId) {
            payload = {
                id: review.id,
                userId: currentUser.id,
                state: 'unlike'
            }
        } else {
            payload = {
                id: review.id,
                userId: currentUser.id,
                state: 'like'
            }
        }
        dispatch(likeReview(payload))
    }

    const onOpenReportModal = () => {
        if (!currentUser || currentUser.id === '') {
            showAlert('Please login to report', 'danger')
            return;
        }
        if (currentUser.id === review.userId) {
            showAlert('You cannot report your own review', 'danger')
            return;
        }
        setOnShowReportModal(true)
    }

    const onHideReportModal = () => {
        setOnShowReportModal(false)
    }

    const _handleReport = (reason: string) => {
        if (reason.trim()) {
            const payload: IReportRequest = {
                id: review.id,
                userId: currentUser.id,
                reason: reason,
                type: "review"
            }
            dispatch(reportReview( payload ))
        }
    }

    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex align-items-start">
                    {/* Avatar */}
                    <img
                        src={review.userAvatar} // Replace with actual avatar URL or source
                        alt="Avatar"
                        className="rounded-circle me-3"
                        style={{ width: '50px', height: '50px' }}
                    />

                    {/* Reviewer's Name and Novel Title */}
                    <div className="flex-grow-1">
                        <h5 className="card-title" onClick={() => navigate(`/user/${review.userId}`)} style={{ cursor: "pointer" }}>{review.userName}</h5>
                        <p className="card-text">Reviewed <strong onClick={() => navigate(`/novel/${review.novelId}`)} style={{ cursor: "pointer" }}>{review.novelTitle}</strong></p>

                        {/* Rating */}
                        <p className="card-text">
                            Rated it{' '}
                            {renderStars(review.rating)} {/* Call renderStars function to display stars */}
                        </p>

                        {/* Review Content */}
                        <p className="card-text">{review.review}</p>

                        {/* Additional features */}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            {/* Creation/Update Date */}
                            <small className="text-muted">Date: {new Date(review.updateDate).toLocaleDateString()}</small>

                            {/* Like Button (Sample, replace with actual functionality) */}
                            <div>
                                <button className="btn btn-sm btn-outline-primary me-2" onClick={onLikeReview}>
                                    Like {review.liked.length} {/* Replace with actual like count */}
                                </button>

                                {/* Report Button (Sample, replace with actual functionality) */}
                                <button className="btn btn-sm btn-outline-danger" onClick={onOpenReportModal}>
                                    Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BaseModal
                className="h-100"
                show={onShowReportModal}
                onHide={onHideReportModal}
            >
                <ReportModal show={onShowReportModal} handleClose={onHideReportModal} handleReport={_handleReport} usage={"Report review"}/>
            </BaseModal>
        </div>
    );
};

export default ReviewCard;
