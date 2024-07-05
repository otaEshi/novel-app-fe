import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { getNovelDetail } from "./novelDetailPageApi";
import { INovel } from "../../../types/novel";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddToLibraryModal from "../addToLibraryModal/AddToLibraryModal";
import BaseModal from "../../common/BaseModal";
import Review from "../../review/Review";

function NovelDetailPage() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // selector
    const novel = useAppSelector(state => state.novelDetail.novel);
    const currentUser = useAppSelector(state => state.auth.currentUser);

    // state
    const [showAddToLibraryModal, setShowAddToLibraryModal] = useState(false);
    const [isReviewVisible, setIsReviewVisible] = useState(true); // State to toggle panels

    useEffect(() => {
        if (id) {
            dispatch(getNovelDetail(id));
        }
    }, [id, dispatch]);

    const reportNovelError = () => {
        // Implement error reporting functionality
    };

    // function
    const onHideAddToLibraryModal = () => {
        setShowAddToLibraryModal(false);
    };

    const generateTableOfContents = () => {
        const chapters = [];
        for (let i = 1; i <= novel.chapters; i++) {
            chapters.push(
                <li className="list-group-item" key={i} style={{ cursor: 'pointer' }} onClick={() => navigate(`/novel/${id}/chapter/${i}`)}>
                    Chapter {i}
                </li>
            );
        }
        return chapters;
    };

    return (
        <>
            {!novel && (
                <div className="alert alert-danger" role="alert">
                    We cannot find the novel you want.
                    <span className="link" onClick={reportNovelError} style={{ cursor: 'pointer' }}>
                        Report!
                    </span>
                </div>
            )}
            <div className="container mt-4 p-4" style={{ backgroundColor: "#e3e6f9" }}>
                <div className="row">
                    <div className="col-md-4 text-center">
                        <img src={novel.image} alt="Novel" className="img-fluid rounded" />
                    </div>
                    <div className="col-md-8">
                        <h2>{novel.title}</h2>
                        <p><strong>Description:</strong></p>
                        <p>{novel.description}</p>
                        <div className="d-flex">
                            <strong>Author:</strong>
                            <p className="text-primary ms-2" style={{ cursor: 'pointer' }} onClick={() => navigate(`/user/${novel.authorId}`)}>
                                {novel.author}
                            </p>
                        </div>
                        <p><strong>Genres:</strong>
                            {novel.genres.map((genre, index) => (
                                <span key={index} className="badge bg-primary ms-1" onClick={() => navigate(`/search/${genre}`)} style={{ cursor: 'pointer' }}>
                                    {genre}
                                </span>
                            ))}
                        </p>

                        <p><strong>Tags:</strong>
                            {novel.tags && novel.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="badge bg-primary me-1 ms-1"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/tags/${tag}`);
                                    }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </p>
                        <div className="mt-3 d-flex">
                            <button className="btn btn-primary me-3 rounded-pill" onClick={() => navigate(`/novel/${id}/chapter/1`)}>Start reading</button>
                            {   (currentUser && currentUser.id) && 
                                <div>
                                    <button className="btn btn-primary rounded-pill me-3" onClick={() => setShowAddToLibraryModal(true)}>+ Add to library</button>
                                    <button className="btn btn-primary rounded-pill" onClick={() => setShowAddToLibraryModal(true)}> Report novel</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="d-flex justify-content-start mb-3">
                        <button className={`btn ${isReviewVisible ? 'btn-secondary' : 'btn-outline-secondary'} rounded-pill me-2`} onClick={() => setIsReviewVisible(true)}>Review</button>
                        <button className={`btn ${!isReviewVisible ? 'btn-secondary' : 'btn-outline-secondary'} rounded-pill`} onClick={() => setIsReviewVisible(false)}>Table of Contents</button>
                    </div>
                    {isReviewVisible ? (
                        <div className="card">
                            <div className="card-body">
                                {/* <h5 className="card-title">Review</h5>
                                    <p className="card-text">Write your review here</p>
                                    <button className="btn btn-primary rounded-pill">Submit Review</button> */}
                                <Review />
                            </div>
                        </div>
                    ) : (
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Table of Contents</h5>
                                <ul className="list-group">
                                    {generateTableOfContents()}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <BaseModal
                className="h-100"
                show={showAddToLibraryModal}
                onHide={onHideAddToLibraryModal}
            >
                <AddToLibraryModal onClose={onHideAddToLibraryModal} novelId={novel.id} />
            </BaseModal>
        </>
    );
}

export default NovelDetailPage;
