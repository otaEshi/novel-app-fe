import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../types/user";
import { getOriginalWorks, getUser, getUserReviews, updateUserProfile } from "./userApi";
import { INovel } from "../../../types/novel";
import { IReview } from "../../../types/review";
import { followRequest, unfollowRequest } from "../follow/followApi";
import { ILibraryNovelList } from "../../../types/library";
import { getLibraryLists } from "../../library/libraryApi";
import { library } from "../../../dataTemp";

interface UserState {
    user: IUser;
    originalWorks: INovel[];
    reviews: IReview[];
    library: ILibraryNovelList[];
}

const initialState: UserState = {
    user: {
        id: "1",
        followers: ["2", "3"],
        following: ["4", "5", "6"],
        username: 'Guest',
        name: 'nam',
    } as IUser,
    originalWorks: [{
        id: '1',
        title: 'Original Novel 1',
        author: 'User Name',
        authorId: 'user-id',
        image: 'https://via.placeholder.com/150',
        description: 'Description of Original Novel 1',
        genres: ['Fantasy', 'Adventure', 'Action'],
        tags: ['tag1', 'tag2', 'tag3'],
    } as INovel,
    {
        id: '2',
        title: 'Original Novel 2',
        author: 'User Name',
        authorId: 'user-id',
        image: 'https://via.placeholder.com/150',
        description: 'Description of Original Novel 2',
    } as INovel,
    ],
    reviews: [
        // {
        //     id: '1',
        //     rating: 4,
        //     review: 'This novel kept me on the edge of my seat!',
        //     novelId: "101",
        //     novelTitle: 'The Great Adventure',
        //     userId: "1",
        //     userAvatar: 'https://example.com/avatar1.jpg',
        //     userName: 'JohnDoe',
        //     updateDate: '2021-09-07',
        //     liked: ["201", "user2"],
        //     createAt: '2021-09-07'
        // },
        // {
        //     id: '2',
        //     rating: 5,
        //     review: 'A must-read for everyone!',
        //     novelId: "102",
        //     novelTitle: 'Mystery in the Woods',
        //     userId: "202",
        //     userAvatar: 'https://example.com/avatar2.jpg',
        //     userName: 'JaneSmith',
        //     updateDate: '2022-09-01',
        //     liked: ["user1", "user3", "user4"],
        //     createAt: '2021-09-07'
        // },
        // {
        //     id: '3',
        //     rating: 3,
        //     review: 'Interesting plot, but the ending was predictable.',
        //     novelId: "103",
        //     novelTitle: 'Secrets of the Past',
        //     userId: "203",
        //     userAvatar: 'https://example.com/avatar3.jpg',
        //     userName: 'MichaelBrown',
        //     updateDate: '2010-09-01',
        //     liked: [],
        //     createAt: '2021-09-07'
        // },
        // {
        //     id: '4',
        //     rating: 5,
        //     review: 'Couldn\'t put it down!',
        //     novelId: "104",
        //     novelTitle: 'The Lost City',
        //     userId: "204",
        //     userAvatar: 'https://example.com/avatar4.jpg',
        //     userName: 'EmilyJohnson',
        //     updateDate: '2021-09-01',
        //     liked: ["user1", "user2"],
        //     createAt: '2021-09-07'
        // },
    ],
    library: library,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getOriginalWorks.fulfilled, (state, action) => {
                state.originalWorks = action.payload;
            })
            .addCase(getUserReviews.fulfilled, (state, action) => {
                state.reviews = action.payload;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(followRequest.fulfilled, (state, action) => {
                state.user.following.push(action.meta.arg.followId)
            })
            .addCase(unfollowRequest.fulfilled, (state, action) => {
                state.user.following = state.user.following.filter(followId => followId !== action.meta.arg.followId)
            })
            .addCase(getLibraryLists.fulfilled, (state, action) => {
                state.library = action.payload;
            })
    }
});

export const { } = userSlice.actions;
export default userSlice.reducer;