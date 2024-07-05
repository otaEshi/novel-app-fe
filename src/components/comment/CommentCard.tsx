import { useEffect, useState } from "react";
import BaseModal from "../common/BaseModal";
import ReportModal from "../report/ReportModal";
import { IComment, IDeleteCommentRequest, ILikeComment } from "../../types/novel";
import { useNavigate } from "react-router";
import { IUserInfoResponse } from "../../types/auth";
import { IReportRequest } from "../../types/report";
import { useAppDispatch } from "../../app/hooks";
import { likeComment, reportComment, deleteComment } from "../novel/novelReadPage/novelReadPageApi"; // Import deleteComment API
import { showAlert } from "../../utils";

interface ICommentCardProps {
    comment: IComment;
    currentUser: IUserInfoResponse;
}

function CommentCard(props: ICommentCardProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [onShowReportModal, setOnShowReportModal] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        setIsLiked(props.comment.liked.includes(props.currentUser.id));
    }, [props.comment, props.currentUser]);

    const onHideReportModal = () => {
        setOnShowReportModal(false);
    };

    const onOpenReportModal = () => {
        if (!props.currentUser || props.currentUser.id === '') {
            showAlert('Please login to report', 'danger');
            return;
        }
        setOnShowReportModal(true);
    };

    const _handleReport = async (reason: string) => {
        if (reason.trim()) {
            const payload: IReportRequest = {
                id: props.comment.commentId,
                userId: props.currentUser.id,
                reason: reason,
                type: 'comment'
            };
            const res = await dispatch(reportComment(payload));
            if (reportComment.fulfilled.match(res)) {
                showAlert('Reported successfully', 'success');
            }
        }
    };

    const handleLikeComment = () => {
        if (!props.currentUser || props.currentUser.id === '') {
            showAlert('Please login to like this comment', 'danger');
            return;
        }

        let payload: ILikeComment;

        if (isLiked) {
            payload = {
                commentId: props.comment.commentId,
                userId: props.currentUser.id,
                state: 'unlike'
            };
        } else {
            payload = {
                commentId: props.comment.commentId,
                userId: props.currentUser.id,
                state: 'like'
            };
        }
        dispatch(likeComment(payload));
    };

    const handleDeleteComment = async () => {
        if (props.currentUser.id === props.comment.userId) {
            const confirmation = window.confirm("Are you sure you want to delete this comment?");
            if (confirmation) {
                const payload: IDeleteCommentRequest = {
                    userId: props.currentUser.id,
                    commentId: props.comment.commentId
                };
                const res = await dispatch(deleteComment(payload));
                if (deleteComment.fulfilled.match(res)) {
                    showAlert('Comment deleted successfully', 'success');
                } else {
                    showAlert('Failed to delete comment', 'danger');
                }
            }
        }
    };

    return (
        <>
            {/* <img src={props.comment.avatar} alt={`${props.comment.name}'s avatar`} className="rounded-circle me-3" style={{ width: '50px', height: '50px' }} /> */}
            {props.comment.avatar ? (
                <img src={props.comment.avatar} alt="Avatar" className="rounded-circle me-3" style={{ width: '50px', height: '50px' }}/>
            ) : (
                <i className="bi bi-person-circle me-4 ms-2 mt-2" style={{ fontSize: '2.5rem'}}></i>
            )}
            <div className="comment-body flex-grow-1">
                <div className="comment-header d-flex justify-content-between align-items-center mb-1">
                    <span className="font-weight-bold text-primary" onClick={() => navigate(`/user/${props.comment.userId}`)} style={{ cursor: 'pointer' }}>{props.comment.name}</span>
                    <span className="text-muted small">{new Date(props.comment.createDate).toLocaleDateString()}</span>
                </div>
                <p className="comment-content mb-1">{props.comment.content}</p>
                <div className="comment-actions d-flex align-items-center">
                    <div className="me-2">{props.comment.liked.length}</div>
                    <button className="btn btn-link p-0 text-primary me-2" onClick={handleLikeComment}>{isLiked ? 'Unlike' : 'Like'}</button>
                    <button className="btn btn-link p-0 text-danger me-2" onClick={onOpenReportModal}>Report</button>
                    {props.currentUser.id === props.comment.userId && (
                        <button className="btn btn-link p-0 text-danger" onClick={handleDeleteComment}>Delete</button>
                    )}
                </div>
            </div>
            <BaseModal
                className="h-100"
                show={onShowReportModal}
                onHide={onHideReportModal}
            >
                <ReportModal show={onShowReportModal} handleClose={onHideReportModal} handleReport={_handleReport} usage={"Report review"} />
            </BaseModal>
        </>
    );
}

export default CommentCard;
