import { createSlice } from "@reduxjs/toolkit";
import { INovelList } from "../../types/novel";
import { getNovelListByTag } from "./tagApi";

interface TagState {
    novelList: INovelList;
}

const initialState: TagState = {
    novelList: {
        novels: [
            {
                id: "2",
                title: "Dummy Title 2",
                genres: ["Dummy Genres 2"],
                author: "Dummy Author 2",
                authorId: "1",
                tags: ["Dummy Tag 3", "Dummy Tag 4", "Dummy Tag 2", "Dummy Tag 2", "Dummy Tag 2", "Dummy Tag 2"],
                image: "https://via.placeholder.com/150",
                chapters: 20,
                rating: 4.0,
                ratingCount: 200,
                status: "Completed",
                views: 2000,
                description: "Dummy Description 2",
                updatedDate: "2021-09-02",
                createdDate: "2021-09-02"
            },
            {
                id: "2",
                title: "Dummy Title 2",
                genres: ["Dummy Genres 2"],
                author: "Dummy Author 2",
                authorId: "1",
                tags: ["Dummy Tag 3", "Dummy Tag 4", "Dummy Tag 2", "Dummy Tag 2", "Dummy Tag 2", "Dummy Tag 2"],
                image: "https://via.placeholder.com/150",
                chapters: 20,
                rating: 4.0,
                ratingCount: 200,
                status: "Completed",
                views: 2000,
                description: "Dummy Description 2",
                updatedDate: "2021-09-02",
                createdDate: "2021-09-02"
            },
            {
                id: "2",
                title: "Dummy Title 2",
                genres: ["Dummy Genres 2"],
                author: "Dummy Author 2",
                authorId: "1",
                tags: ["Dummy Tag 3", "Dummy Tag 4", "Dummy Tag 2", "Dummy Tag 2", "Dummy Tag 2", "Dummy Tag 2"],
                image: "https://via.placeholder.com/150",
                chapters: 20,
                rating: 4.0,
                ratingCount: 200,
                status: "Completed",
                views: 2000,
                description: "Dummy Description 2",
                updatedDate: "2021-09-02",
                createdDate: "2021-09-02"
            },
            {
                id: "2",
                title: "Dummy Title 2",
                genres: ["Dummy Genres 2"],
                author: "Dummy Author 2",
                authorId: "1",
                tags: ["Dummy Tag 3", "Dummy Tag 4", "Dummy Tag 2", "Dummy Tag 2", "Dummy Tag 2", "Dummy Tag 2"],
                image: "https://via.placeholder.com/150",
                chapters: 20,
                rating: 4.0,
                ratingCount: 200,
                status: "Completed",
                views: 2000,
                description: "Dummy Description 2",
                updatedDate: "2021-09-02",
                createdDate: "2021-09-02"
            },
            {
                id: "2",
                title: "Dummy Title 2",
                genres: ["Dummy Genres 2"],
                author: "Dummy Author 2",
                authorId: "1",
                tags: ["Dummy Tag 3", "Dummy Tag 4", "Dummy Tag 2", "Dummy Tag 2", "Dummy Tag 2", "Dummy Tag 2"],
                image: "https://via.placeholder.com/150",
                chapters: 20,
                rating: 4.0,
                ratingCount: 200,
                status: "Completed",
                views: 2000,
                description: "Dummy Description 2",
                updatedDate: "2021-09-02",
                createdDate: "2021-09-02"
            }
        ]
    },
};

const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getNovelListByTag.fulfilled, (state, action) => {
                state.novelList = action.payload;
            });
    }
});

export default tagSlice.reducer;