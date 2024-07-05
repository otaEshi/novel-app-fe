import { createSlice } from "@reduxjs/toolkit";
import { ILibraryNovelList } from "../../types/library";
import { addNovelToList, createLibraryList, deleteLibraryList, deleteNovelFromList, getLibraryLists, updateListPrivacy, updateListTitle } from "./libraryApi";
import { showAlert } from "../../utils";
import { library } from "../../dataTemp";

interface LibraryState {
    libraryNovelLists: ILibraryNovelList[];
}

const initialState: LibraryState = {
    libraryNovelLists: library,
};


const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getLibraryLists.fulfilled, (state, action) => {
                state.libraryNovelLists = action.payload;
            })
            .addCase(createLibraryList.fulfilled, (state, action) => {
                state.libraryNovelLists.push(action.payload);
                showAlert("Library list created successfully!", "success");
            })
            .addCase(deleteLibraryList.fulfilled, (state, action) => {
                state.libraryNovelLists = state.libraryNovelLists.filter(
                    list => list.id !== action.meta.arg.listId
                );
                showAlert("Library list deleted successfully!", "success");
            })
            .addCase(deleteNovelFromList.fulfilled, (state, action) => {
                const list = state.libraryNovelLists.find(
                    list => list.id === action.payload.listId
                );
                if (list) {
                    list.novels = list.novels.filter(
                        novel => novel.id !== action.payload.novelId
                    );
                }
                showAlert("Novel deleted from list successfully!", "success");
            })
            .addCase(addNovelToList.fulfilled, (state, action) => {
                const list = state.libraryNovelLists.find(
                    list => list.id === action.payload.id
                );
                if (list) {
                    list.novels = action.payload.novels;
                    showAlert("Novel added to list successfully!", "success");
                }
            })
            .addCase(updateListTitle.fulfilled, (state, action) => {
                const list = state.libraryNovelLists.find(
                    list => list.id === action.payload.id
                );
                if (list) {
                    list.title = action.payload.title;
                    showAlert("List title updated successfully!", "success");
                }
            })
            .addCase(updateListPrivacy.fulfilled, (state, action) => {
                const list = state.libraryNovelLists.find(
                    list => list.id === action.payload.id
                );
                if (list) {
                    list.isPublic = action.payload.isPublic;
                    showAlert("List privacy updated successfully!", "success");
                }
            })
    }
});

export default librarySlice.reducer;