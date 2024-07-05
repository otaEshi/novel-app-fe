import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INovel, INovelChapter, INovelList } from '../../types/novel';
import { changeChapterStatusNovel, createChapterNovel, createNovel, deleteNovel, getChaptersAuthor, getNovelListByAuthor, permanentDeleteChapter, updateChapter } from './novelManagementApi';
import { IReportChapter, IAdminWarningUser } from '../../types/report';
import { getReport } from '../userPage/userPage/userApi';
import { novels } from '../../dataTemp';

// Define the initial state interface
interface NovelManagementState {
    novelList: INovel[];
    currentNovelChapters: INovelChapter[];
    currentReports: IReportChapter[];
    warnings: IAdminWarningUser[];
}

// Define the initial state
const initialState: NovelManagementState = {
    // Initialize your state properties here
    warnings: [
        {
            reportId: '1',
            novelId: '1',
            userId: '1',
            reason: 'Inappropriate content',
            processed: true,
        }
    ],
    currentReports: [
        {
            reportId: '1',
            chapterId: '1',
            chapterTitle: 'The Beginning',
            userId: '1',
            reason: 'Inappropriate content',
            processed: false,
        },
        {
            reportId: '2',
            chapterId: '2',
            chapterTitle: 'The Adventure Continues',
            userId: '1',
            reason: 'Inappropriate content',
            processed: false,
        },
        {
            reportId: '3',
            chapterId: '3',
            chapterTitle: 'Secrets Revealed',
            userId: '1',
            reason: 'Inappropriate content',
            processed: false,
        },
        {
            reportId: '4',
            chapterId: '4',
            chapterTitle: 'The Final Battle',
            userId: '1',
            reason: 'Inappropriate content',
            processed: true,
        },
    ],
    novelList:
        [
            novels[0],
        ],
    currentNovelChapters: [
        {
            id: '1',
            title: 'The Beginning',
            content: 'Once upon a time...',
            status: 'Published',
            chapter: 1,
            createdAt: '2021-09-02',
        },
        {
            id: '2',
            title: 'The Adventure Continues',
            content: 'In a faraway land...',
            status: 'Published',
            chapter: 2,
            createdAt: '2021-09-02',
        },
        {
            id: '3',
            title: 'Secrets Revealed',
            content: 'As the night fell...',
            status: 'Deleted',
            chapter: 3,
            createdAt: '2021-09-02',
        },
        {
            id: '4',
            title: 'The Final Battle',
            content: 'With swords drawn...',
            status: 'Deleted',
            chapter: 4,
            createdAt: '2021-09-02',
        },
    ],
};

// Create the slice
const novelManagementSlice = createSlice({
    name: 'novelManagement',
    initialState,
    reducers: {
        // Define your actions and their corresponding reducers here
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNovelListByAuthor.fulfilled, (state, action) => {
                state.novelList = action.payload;
            })
            .addCase(getChaptersAuthor.fulfilled, (state, action) => {
                state.currentNovelChapters = action.payload;
            })
            .addCase(createNovel.fulfilled, (state, action) => {
                state.novelList.push(action.payload);
            })
            .addCase(createChapterNovel.fulfilled, (state, action) => {
                state.novelList.push(action.payload);
            })
            .addCase(changeChapterStatusNovel.fulfilled, (state, action) => {
                const updatedChapter = action.payload;
                const index = state.currentNovelChapters.findIndex(chapter => chapter.id === updatedChapter.id);
                state.currentNovelChapters[index] = updatedChapter;
            })
            .addCase(updateChapter.fulfilled, (state, action) => {
                const updatedChapter = action.payload;
                const index = state.currentNovelChapters.findIndex(chapter => chapter.id === updatedChapter.id);
                state.currentNovelChapters[index] = updatedChapter;
            })
            .addCase(permanentDeleteChapter.fulfilled, (state, action) => {
                const deletedChapter = action.payload;
                const index = state.currentNovelChapters.findIndex(chapter => chapter.id === deletedChapter.id);
                state.currentNovelChapters.splice(index, 1);
            })
            .addCase(deleteNovel.fulfilled, (state, action) => {
                const deletedNovel = action.payload;
                const index = state.novelList.findIndex(novel => novel.id === deletedNovel.id);
                state.novelList.splice(index, 1);
            })
            .addCase(getReport.fulfilled, (state, action) => {
                if (action.meta.arg.type === 'chapter') {
                    state.currentReports = action.payload;
                } else if (action.meta.arg.type === 'warning') {
                    state.warnings = action.payload;
                }
            })
    }
});

// Export the actions and reducer
export const { actions, reducer } = novelManagementSlice;

export default novelManagementSlice.reducer;