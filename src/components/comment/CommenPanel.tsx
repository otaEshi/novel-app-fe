import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IAddCommentRequest, IComment } from "../../types/novel";
import { addComment } from "../novel/novelReadPage/novelReadPageApi";
import { useNavigate } from "react-router";
import BaseModal from "../common/BaseModal";
import ReportModal from "../report/ReportModal";
import { IReportComment } from "../../types/report";
import CommentCard from "./CommentCard";

interface ICommentPanelProps {
    comments: IComment[];
    novelId?: string;
}

function CommentPanel(props: ICommentPanelProps) {
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector(store => store.auth.currentUser);

    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    };

  

    const handlePostComment = () => {
        if (newComment.trim() && currentUser && currentUser.id) {
            const payload: IAddCommentRequest = {
                novelId: props.comments[0].novelId,
                chapterId: '1',
                content: newComment,
                userId: currentUser.id,
            };
            dispatch(addComment(payload));
            setNewComment('');
        }
    };

    return (
        <div className="comment-panel">
            <h3>Comments</h3>
            {currentUser && currentUser.id ? (
                <div className="post-comment mb-3">
                    <textarea
                        className="form-control"
                        rows={3}
                        value={newComment}
                        onChange={handleCommentChange}
                        placeholder="Write your comment..."
                    ></textarea>
                    <button className="btn btn-primary mt-2" onClick={handlePostComment}>Post Comment</button>
                </div>
            ) : (
                <p className="text-muted">Please log in to post a comment.</p>
            )}
            <hr />
            <div className="comments-list">
                {props.comments.map((comment: IComment) => (
                    <div key={comment.commentId} className="comment d-flex align-items-start mb-3 p-2 border rounded">
                        {/* <img src={comment.avatar} alt={`${comment.name}'s avatar`} className="rounded-circle me-3" style={{ width: '50px', height: '50px' }} />
                        <div className="comment-body flex-grow-1">
                            <div className="comment-header d-flex justify-content-between align-items-center mb-1">
                                <span className="font-weight-bold text-primary" onClick={() => navigate(`/user/${comment.userId}`)} style={{ cursor: 'pointer' }}>{comment.name}</span>
                                <span className="text-muted small">{new Date(comment.createDate).toLocaleDateString()}</span>
                            </div>
                            <p className="comment-content mb-1">{comment.content}</p>
                            <div className="comment-actions d-flex">
                                <div> {comment.liked.length} </div>
                                <button className="btn btn-link p-0 text-primary ms-1">Like</button>
                                <button className="btn btn-link p-0 text-danger ms-3">Report</button>
                            </div>
                        </div> */}
                        <CommentCard comment={comment} currentUser={currentUser}/>
                    </div>
                ))}
            </div>
            {/* <BaseModal
                className="h-100"
                show={onShowReportModal}
                onHide={onHideReportModal}
            >
                <ReportModal show={onShowReportModal} handleClose={onHideReportModal} handleReport={_handleReport} usage={"Report review"} />
            </BaseModal> */}
        </div>
    );
}

export default CommentPanel;
