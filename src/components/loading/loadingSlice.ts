import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false,
    delay: 1000
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        toggle(state, action) {
            state.show = action.payload;
        },
        startBusy(state) {
            state.show = true;
            state.delay = 1000;
        },
        endBusy(state) {
            state.show = false;
            state.delay = 0;
        },
    },
});

export const { toggle, startBusy, endBusy } = loadingSlice.actions;
export default loadingSlice.reducer;