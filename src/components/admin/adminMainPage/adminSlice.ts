import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../../types/user';
import { adjustAdminRight, getAdminList, getAdminReportList, handleReportRequest, searchUser } from './adminApi';
import { showAlert } from '../../../utils';
import { IAdminReportList } from '../../../types/report';
import { deleteComment } from '../../novel/novelReadPage/novelReadPageApi';

interface AdminState {
    userList: IUser[];
    adminList: IUser[];
    reportList: IAdminReportList;
}

const initialState: AdminState = {
    userList: [
        {
            id: "1",
            followers: ["2", "3"],
            following: ["4", "5", "6"],
            username: 'Guest',
            name: 'nam',
        } as IUser,
        {
            id: "1",
            followers: ["2", "3"],
            following: ["4", "5", "6"],
            username: 'Guest',
            name: 'nam',
        } as IUser,
        {
            id: "1",
            followers: ["2", "3"],
            following: ["4", "5", "6"],
            username: 'Guest',
            name: 'nam',
        } as IUser,
        {
            id: "1",
            followers: ["2", "3"],
            following: ["4", "5", "6"],
            username: 'Guest',
            name: 'nam',
        } as IUser,
        {
            id: "1",
            followers: ["2", "3"],
            following: ["4", "5", "6"],
            username: 'Guest',
            name: 'nam',
        } as IUser,
        {
            id: "1",
            followers: ["2", "3"],
            following: ["4", "5", "6"],
            username: 'Guest',
            name: 'nam',
        } as IUser,
    ],
    adminList: [
        {
            id: "1",
            followers: ["2", "3"],
            following: ["4", "5", "6"],
            username: 'Guest',
            name: 'nam',
        } as IUser,
        {
            id: "1",
            followers: ["2", "3"],
            following: ["4", "5", "6"],
            username: 'Guest',
            name: 'nam',
        } as IUser,
        {
            id: "1",
            followers: ["2", "3"],
            following: ["4", "5", "6"],
            username: 'Guest',
            name: 'nam',
        } as IUser,
        {
            id: "1",
            followers: ["2", "3"],
            following: ["4", "5", "6"],
            username: 'Guest',
            name: 'nam',
        } as IUser,
        {
            id: "1",
            followers: ["2", "3"],
            following: ["4", "5", "6"],
            username: 'Guest',
            name: 'nam',
        } as IUser,
        {
            id: "1",
            followers: ["2", "3"],
            following: ["4", "5", "6"],
            username: 'Guest',
            name: 'nam',
        } as IUser,
        {
            id: "1",
            followers: ["2", "3"],
            following: ["4", "5", "6"],
            username: 'Guest',
            name: 'nam',
        } as IUser,
        {
            id: "1",
            followers: ["2", "3"],
            following: ["4", "5", "6"],
            username: 'Guest',
            name: 'nam',
        } as IUser,
        {
            id: "1",
            followers: ["2", "3"],
            following: ["4", "5", "6"],
            username: 'Guest',
            name: 'nam',
        } as IUser,
    ],
    reportList: {
        reportReview: [
            {
                reportId: "1",
                reviewId: "1",
                userId: "user1",
                reason: "Inappropriate content",
                processed: false,
                review: {
                    id: "1",
                    userId: "user2",
                    userName: "User 2",
                    userAvatar: "/avatars/user2.jpg",
                    novelId: "novel1",
                    novelTitle: "Novel 1",
                    rating: 4,
                    review: "This is a review of Novel 1.",
                    updateDate: "",
                    liked: ["user3", "user4"],
                    createAt: '2021-09-07'
                }
            },
            // Add more report review objects as needed
        ],
        reportNovel: [
            {
                reportId: "2",
                novelId: "novel2",
                userId: "user3",
                reason: "Copyright violation",
                processed: false
            },
            // Add more report novel objects as needed
        ],
        reportComment: [
            {
                reportId: "3",
                commentId: "comment1",
                userId: "user4",
                reason: "Spam",
                comment: {
                    commentId: "comment1",
                    userId: "user5",
                    name: "nam",
                    avatar: "/avatars/user5.jpg",
                    novelId: "novel3",
                    chapterId: "chapter1",
                    content: "This is a comment on Chapter 1 of Novel 3.",
                    createDate: "",
                    liked: [],
                },
                processed: false
            },
            // Add more report comment objects as needed
        ]
    }
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAdminList.fulfilled, (state, action) => {
                state.adminList = action.payload;
            })
            .addCase(searchUser.fulfilled, (state, action) => {
                state.userList = action.payload;
            })
            .addCase(adjustAdminRight.fulfilled, (state, action) => {
                if (action.payload.admin_type === 0) {
                    const userIndex = state.adminList.findIndex(user => user.id === action.payload.id);
                    if (userIndex !== -1) {
                        const removedUser = state.adminList.splice(userIndex, 1)[0];
                        state.userList.push(removedUser);
                        showAlert('Successfully removed admin rights!', 'success');
                    }
                } else if (action.payload.admin_type === 1) {
                    const userIndex = state.userList.findIndex(user => user.id === action.payload.id);
                    if (userIndex !== -1) {
                        const removedUser = state.userList.splice(userIndex, 1)[0];
                        state.adminList.push(removedUser);
                        showAlert('Successfully granted admin rights!', 'success');
                    }
                }
            })
            .addCase(getAdminReportList.fulfilled, (state, action) => {
                state.reportList = action.payload;
            })
            .addCase(handleReportRequest.fulfilled, (state, action) => {
                
                // Update reportComment
                state.reportList.reportComment = state.reportList.reportComment.map(report => {
                    if (report.commentId === action.meta.arg.reportId) {
                        showAlert('Handle report successfully', 'success');
                        return { ...report, processed: true };
                    }
                    return report;
                });
            
                // Update reportNovel
                state.reportList.reportNovel = state.reportList.reportNovel.map(report => {
                    if (report.novelId === action.meta.arg.reportId) {
                        return { ...report, processed: true };
                    }
                    return report;
                });
            
                // Update reportReview
                state.reportList.reportReview = state.reportList.reportReview.map(report => {
                    if (report.reviewId === action.meta.arg.reportId) {
                        return { ...report, processed: true };
                    }
                    return report;
                });
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                showAlert('Successfully deleted comment!', 'success');
                state.reportList.reportComment = state.reportList.reportComment.filter(report => report.commentId !== action.meta.arg.commentId)
            })
    }
});

export const { } = adminSlice.actions;

export default adminSlice.reducer;