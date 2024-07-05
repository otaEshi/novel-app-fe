import { ILibraryNovelList } from "./library";
import { IReview } from "./review";

export interface IUser {
    id: string;
    name: string;
    username: string;
    library: ILibraryNovelList[];
    reviews: string[];
    followers: string[]; // ids of followers
    following: string[]; // ids of following
    originalWorks: string[]; // ids of original works/novels
    avatar?: string;
    admin_type: number; // 0: normal user, 1: web admin, 2: system admin 
    createDate: string;
}

export interface IUserCard {
    id: string;
    name: string;
    avatar?: string;
}

export interface IGetFollowRequest {
    userId: string;
    state: string;
}

export interface IFollowRequest {
    userId: string;
    followId: string;
}

export interface IUnfollowResponse {
    unfollowId: string;
}

export interface IUpdateUserProfileRequest {
    id: string;
    name: string;
    avatar?: string;
}