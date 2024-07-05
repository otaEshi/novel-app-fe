import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReview } from '../../types/review';
import { deleteReview, getNovelReview, likeReview, postReview, reportReview, updateReview } from './reviewApi';
import { showAlert } from '../../utils';
import { reviews } from '../../dataTemp';

interface ReviewState {
    reviews: IReview[];
}

const initialState: ReviewState = {
    reviews: reviews
};

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getNovelReview.fulfilled, (state, action) => {
                state.reviews = action.payload;
            })
            .addCase(postReview.fulfilled, (state, action) => {
                state.reviews.push(action.payload);
                showAlert('Review submitted successfully!', 'success');
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                const index = state.reviews.findIndex(review => review.id === action.payload.id);
                if (index !== -1) {
                    state.reviews[index] = action.payload;
                    showAlert('Review updated successfully!', 'success');
                }
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.reviews = state.reviews.filter(review => review.id !== action.payload.id);
                showAlert('Review deleted successfully!', 'success');
            })
            .addCase(likeReview.fulfilled, (state, action) => {
                const index = state.reviews.findIndex(review => review.id === action.payload.id);
                if (index !== -1) {
                    state.reviews[index] = action.payload;
                }
            })
            .addCase(reportReview.fulfilled, (state, action) => {
                showAlert('Review reported successfully!', 'success');
            })
    }
});

export const {  } = reviewSlice.actions;

export default reviewSlice.reducer;