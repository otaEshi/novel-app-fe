import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IPostReview, IReview } from '../../types/review';
import ReviewCard from './ReviewCard';
import { postReview, updateReview, deleteReview } from './reviewApi'; // Assuming these API functions exist
import { useNavigate } from 'react-router';
import { showAlert } from '../../utils';

function Review() {
    const [rating, setRating] = useState<number | undefined>(undefined);
    const [reviewText, setReviewText] = useState<string>('');
    const [userHasReviewed, setUserHasReviewed] = useState<boolean>(false);
    const [userReview, setUserReview] = useState<IReview | null>(null);
    const [sortBy, setSortBy] = useState<'date' | 'likes'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // Default to descending order

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const currentUser = useAppSelector(state => state.auth.currentUser);
    const reviews = useAppSelector(state => state.review.reviews); // Use const instead of let

    // Effect to check if current user has already reviewed
    useEffect(() => {
        const existingReview = reviews.find(review => review.userId === currentUser?.id);
        if (existingReview) {
            setUserHasReviewed(true);
            setUserReview(existingReview);
            setRating(existingReview.rating);
            setReviewText(existingReview.review);
        } else {
            setUserHasReviewed(false);
            setUserReview(null);
        }
    }, [reviews, currentUser]);

    // Sorting functions
    const sortByUpdateDate = (a: IReview, b: IReview) => {
        if (sortOrder === 'asc') {
            return new Date(a.updateDate).getTime() - new Date(b.updateDate).getTime();
        } else {
            return new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime();
        }
    };

    const sortByLikes = (a: IReview, b: IReview) => {
        if (sortOrder === 'asc') {
            return a.liked.length - b.liked.length;
        } else {
            return b.liked.length - a.liked.length;
        }
    };

    // Function to get sorted reviews array
    const getSortedReviews = () => {
        if (sortBy === 'date') {
            return [...reviews].sort(sortByUpdateDate); // Create a new array and sort it
        } else if (sortBy === 'likes') {
            return [...reviews].sort(sortByLikes); // Create a new array and sort it
        }
        return [...reviews]; // Default return the original array if sortBy is invalid
    };

    const sortedReviews = getSortedReviews(); // Get the sorted reviews array

    const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRating(parseInt(event.target.value));
    };

    const handleReviewTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReviewText(event.target.value);
    };

    const handlePostReview = () => {
        if (rating !== undefined && rating >= 1 && rating <= 5) {
            // Post review logic here (e.g., API call)
            dispatch(postReview({ rating, review: reviewText } as IPostReview));
            // Clear form after submission
            setRating(undefined);
            setReviewText('');
        } else {
            // Handle invalid rating
            showAlert('Please provide a valid rating (1-5) to submit your review.');
        }
    };

    const handleUpdateReview = () => {
        if (rating !== undefined && rating >= 1 && rating <= 5 && userReview) {
            // Update review logic here (e.g., API call)
            dispatch(updateReview({ ...userReview, rating, review: reviewText }));
            // Clear form after submission
            setRating(undefined);
            setReviewText('');
        } else {
            // Handle invalid rating or review not found
            showAlert('Unable to update review. Please try again later.');
        }
    };

    const handleDeleteReview = () => {
        if (userReview) {
            // Delete review logic here (e.g., API call)
            dispatch(deleteReview({ reviewId: userReview.id, userId: userReview.userId }));
            // Clear form after deletion
            setRating(undefined);
            setReviewText('');
        } else {
            // Handle review not found
            showAlert('Unable to delete review. Please try again later.');
        }
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value as 'date' | 'likes');
    };

    const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value as 'asc' | 'desc');
    };

    return (
        <div className="container mt-4">
            {!currentUser?.id ? (
                <div className="alert alert-warning" role="alert">
                    Please{' '}
                    <span className="text-primary m-1" onClick={() => navigate(`/login/`)} style={{ cursor: 'pointer' }}>
                        log in
                    </span>{' '}
                    to write a review.
                </div>
            ) : (
                <>
                    {userHasReviewed ? (
                        <>
                            <h5>Your Review</h5>
                            <div className="mb-3">
                                <label htmlFor="rating" className="form-label">
                                    Rating
                                </label>
                                <select
                                    className="form-select"
                                    id="rating"
                                    value={rating !== undefined ? rating.toString() : ''}
                                    onChange={handleRatingChange}
                                >
                                    <option value="">Select Rating...</option>
                                    <option value="1">1 - Very Poor</option>
                                    <option value="2">2 - Poor</option>
                                    <option value="3">3 - Average</option>
                                    <option value="4">4 - Good</option>
                                    <option value="5">5 - Excellent</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="reviewText" className="form-label">
                                    Review
                                </label>
                                <textarea
                                    className="form-control"
                                    id="reviewText"
                                    rows={3}
                                    value={reviewText}
                                    onChange={handleReviewTextChange}
                                ></textarea>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary me-2"
                                onClick={handleUpdateReview}
                                disabled={rating === undefined || reviewText.trim() === ''}
                            >
                                Update Review
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleDeleteReview}
                            >
                                Delete Review
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="mb-3">
                                <label htmlFor="rating" className="form-label">
                                    Rating
                                </label>
                                <select
                                    className="form-select"
                                    id="rating"
                                    value={rating !== undefined ? rating.toString() : ''}
                                    onChange={handleRatingChange}
                                >
                                    <option value="">Select Rating...</option>
                                    <option value="1">1 - Very Poor</option>
                                    <option value="2">2 - Poor</option>
                                    <option value="3">3 - Average</option>
                                    <option value="4">4 - Good</option>
                                    <option value="5">5 - Excellent</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="reviewText" className="form-label">
                                    Write your review
                                </label>
                                <textarea
                                    className="form-control"
                                    id="reviewText"
                                    rows={3}
                                    value={reviewText}
                                    onChange={handleReviewTextChange}
                                ></textarea>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handlePostReview}
                                disabled={rating === undefined || reviewText.trim() === ''}
                            >
                                Post Review
                            </button>
                        </>
                    )}
                    <hr />
                    <div className="mt-4">
                        <label htmlFor="sortBy" className="form-label me-2">
                            Sort by:
                        </label>
                        <div className='d-flex'>
                            <select
                                id="sortBy"
                                className="form-select me-2"
                                value={sortBy}
                                onChange={handleSortChange}
                            >
                                <option value="date">Update Date</option>
                                <option value="likes">Likes</option>
                            </select>
                            <select
                                id="sortOrder"
                                className="form-select"
                                value={sortOrder}
                                onChange={handleOrderChange}
                            >
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
                        </div>
                    </div>
                </>
            )}
            <hr />
            <h5>Other Reviews</h5>
            {sortedReviews.length > 0 ? (
                <div className="row">
                    {sortedReviews.map(review => (
                        <div key={review.id} className="col-md-4 mb-4">
                            <ReviewCard review={review} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reviews available.</p>
            )}

        </div>
    );
}

export default Review;
