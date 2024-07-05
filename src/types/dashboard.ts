export interface IViewPerGenre {
    genre: string;
    viewCount: number;
}

export interface IViewPerTag {
    tag: string;
    viewCount: number;
}

export interface IViewPerNovel {
    novelId: string;
    novelName: string;
    viewCount: number;
}

export interface IViewPerNovelRequest {
    authorId: string;
}

export interface ICommentPerChapter {
    chapterTitle: string;
    commentCount: number;
}

export interface ICommentPerChapterRequest{
    novelId: string;
}

export interface IReviewPerNovel {
    novelId: string;
    novelName: string;
    reviewCount: number;
}

export interface IReviewPerNovelRequest {
    authorId: string;
}

export interface IUserPerTimeRequest {
    year: string; // year
    isNewAccount: boolean;
}

export interface IUserPerTime {
    userCount: number[]; // 12 number from Jan to Dec 
}

export interface IUserPerTimeResponse {
    userPerTime: IUserPerTime;
    isNewAccount: boolean;
}