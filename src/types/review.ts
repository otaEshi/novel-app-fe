export interface IReview {
    id: string;
    userId: string;
    novelId: string;
    novelTitle: string;
    rating: number;
    review: string;
    userAvatar: string;
    userName: string;
    updateDate: string;
    liked: string[]; // Array of user IDs who liked the review
    createAt: string;
}

export interface IPostReview {
    userId: string;
    novelId: string;
    rating: number;
    review: string;
}

export interface IDeleteReview {
    reviewId: string;
    userId: string;
}

export interface IUpdateReview {
    id: string;
    userId: string;
    rating: number;
    review: string;
}

export interface ILikeReview {
    id: string;
    userId: string;
    state: string; // like or unlike
}