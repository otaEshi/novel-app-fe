import { IComment } from "./novel";
import { IReview } from "./review";
import { report } from 'process';

export interface IReportReview {
    reportId: string;
    reviewId: string;     // review Id
    userId: string;
    reason: string;
    review: IReview;
    processed: boolean;
}

// export interface IReportReviewRequest {
//     reviewId: string;     // review Id
//     userId: string;
//     reason: string;
// }

export interface IReportNovel {
    reportId: string;
    novelId: string;
    userId: string;
    reason: string;
    processed: boolean;
}

// export interface IReportNovelRequest {
//     novelId: string;
//     userId: string;
//     reason: string;
// }

export interface IReportComment {
    reportId: string;
    commentId: string;
    userId: string;
    reason: string;
    comment: IComment;
    processed: boolean;
}

// export interface IReportCommentRequest {
//     commentId: string;
//     userId: string;
//     reason: string;
// }

export interface IReportChapter {
    reportId: string;
    chapterId: string;
    chapterTitle: string;
    userId: string;
    reason: string;
    processed: boolean;
}

export interface IReportRequest {
    id: string;
    userId: string;
    reason: string;
    type: string;
}

export interface IGetReportRequest {
    id: string;
    userId: string;
    type: string;
}

export interface IAdminWarningUser {
    reportId: string
    novelId: string;
    userId: string;
    reason: string;
    processed: boolean;
}

export interface IAdminWarningUserRequest {
    adminId: string;
    novelId: string;
    userId: string;
    reason: string;
    processed: boolean;
}

export interface IAdminReportList {
    reportReview: IReportReview[];
    reportNovel: IReportNovel[];
    reportComment: IReportComment[];
}

export interface IHandleReport {
    userId: string;
    reportId: string;
    processed: boolean;
}