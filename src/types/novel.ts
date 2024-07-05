export interface INovel {
    id: string;
    title: string;
    genres: string[];
    author: string;
    authorId: string;
    tags: string[];
    image: string;
    chapters: number;
    rating: number;
    ratingCount: number;
    status: string; // Ongoing, Completed
    views: number;
    description: string;
    updatedDate: string; // equal last chapter created date
    createdDate: string;
    warning?: boolean;
}

export interface INovelList {
    novels: INovel[];
}

export interface IDeleteChapter {
    userId: string;
    chapterId: string;
}

export interface IUpdateNovelInfoRequest {
    userId: string,
    novelId: string;
    title: string;
    genres: string[];
    tags: string[];
    image: string;
    description: string;
}

export interface ICreateNovelRequest {
    title: string;
    genres: string[];
    tags: string[];
    image: string;
    description: string;
}

export interface ICreateNovelChapterRequest{
    novelId: string;
    title: string;
    content: string;
    status: string;
}

export interface IChangeNovelStatusRequest {
    userId: string;
    chapterId: string;
    status: string;
}

export interface IUpdateChapterRequest {
    id: string;
    userId: string;
    title: string;
    content: string;
    status: string; // Draft, Published, deleted
}

export interface IDeleteChapterRequest {
    userId: string;
    chapterId: string;
}

export interface INovelChapter {
    id: string;
    title: string;
    content: string;
    status: string; // Published, deleted
    chapter: number // Chapter number = total chapter + 1, start from 1
    createdAt: string;
}

export interface IGetChaptersAuthorRequest {
    novelId: string;
    userId: string;
}

export interface IDeleteNovelRequest {
    userId: string;
    novelId: string;
}

export interface IComment {
    commentId: string;
    userId: string;
    name: string;
    avatar: string;
    content: string;
    novelId: string;
    chapterId: string;
    createDate: string;
    liked: string[]; // Array of user IDs who liked the comment
}

export interface ILikeComment {
    userId: string;
    commentId: string;
    state: string; // 'like' or 'unlike'
}

export interface IAddCommentRequest {
    userId: string;
    content: string;
    novelId: string;
    chapterId: string;
}

export interface IDeleteCommentRequest {
    userId: string;
    commentId: string;
}