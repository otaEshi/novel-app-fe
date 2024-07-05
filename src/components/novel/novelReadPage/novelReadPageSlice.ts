import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReadPage } from '../../../types/readPage';
import { deleteComment, getChapter, getChapterComment, getTotalChapter } from './novelReadPageApi';
import { IComment } from '../../../types/novel';

const initialState: IReadPage = {
    title: 'Chapter 1',
    comments: [{
        commentId: '1',
        userId: '1',
        name: 'Nam',
        avatar: '',
        content: 'This chapter was so captivating! I couldn’t put it down.',
        novelId: 'novel001',
        chapterId: 'chapter001',
        createDate: '2024-06-01T12:00:00Z',
        liked: ['user456', 'user789']
    },
    {
        commentId: '2',
        userId: 'user456',
        name: 'Bob Smith',
        avatar: '',
        content: 'Great pacing and character development. Looking forward to the next chapter!',
        novelId: 'novel001',
        chapterId: 'chapter001',
        createDate: '2024-06-02T14:30:00Z',
        liked: ['1']
    },
    {
        commentId: '3',
        userId: 'user789',
        name: 'Carol Davis',
        avatar: '',
        content: 'I loved the twist at the end! It really caught me by surprise.',
        novelId: 'novel001',
        chapterId: 'chapter001',
        createDate: '2024-06-03T10:15:00Z',
        liked: ['user123', 'user456']
    },
    {
        commentId: '4',
        userId: 'user234',
        name: 'David Harris',
        avatar: '',
        content: 'Not my favorite chapter. I felt like it dragged a bit.',
        novelId: 'novel001',
        chapterId: 'chapter001',
        createDate: '2024-06-04T08:20:00Z',
        liked: []
    },
    {
        commentId: '5',
        userId: 'user567',
        name: 'Eve Martinez',
        avatar: '',
        content: 'The descriptions were so vivid, I felt like I was there!',
        novelId: 'novel001',
        chapterId: 'chapter001',
        createDate: '2024-06-05T16:45:00Z',
        liked: ['user789']
    },
    {
        commentId: '6',
        userId: 'user678',
        name: 'Frank Nelson',
        avatar: '',
        content: 'A decent chapter overall, but I’m hoping for more action in the next one.',
        novelId: 'novel001',
        chapterId: 'chapter002',
        createDate: '2024-06-06T11:00:00Z',
        liked: []
    },
    {
        commentId: '7',
        userId: 'user890',
        name: 'Grace Lee',
        avatar: '',
        content: 'Wow, that was an intense read. The emotions were so raw and real.',
        novelId: 'novel001',
        chapterId: 'chapter002',
        createDate: '2024-06-07T13:30:00Z',
        liked: ['user123', 'user567']
    },
    {
        commentId: '8',
        userId: 'user345',
        name: 'Hank Green',
        avatar: '',
        content: 'I’m really invested in these characters now. They feel like real people!',
        novelId: 'novel001',
        chapterId: 'chapter002',
        createDate: '2024-06-08T17:00:00Z',
        liked: ['user456']
    },
    {
        commentId: '9',
        userId: 'user456',
        name: 'Ivy White',
        avatar: '',
        content: 'This chapter was a bit slow for my taste. Hoping for more action next time.',
        novelId: 'novel001',
        chapterId: 'chapter003',
        createDate: '2024-06-09T12:45:00Z',
        liked: []
    },
    {
        commentId: '10',
        userId: 'user567',
        name: 'Jack Brown',
        avatar: '',
        content: 'I appreciate the character development, but the pacing could be improved.',
        novelId: 'novel001',
        chapterId: 'chapter003',
        createDate: '2024-06-10T15:00:00Z',
        liked: ['user678', 'user890']
    },
    ],
    content: `A five-minute clip on the evening news turned Allison Trent into a full-blown criminal. She had wiggled across the line many times before, but she'd never done anything so bold or blatant. Within a couple of years she had accumulated more than eighty million dollars. On paper that would have made her a titan. In reality she was as poor as a church mouse. The motivation to commit the first crime came to Allison quite unexpectedly as she was sitting on an overstuffed sofa in a coffee shop close to the Boston College campus. She was working on a class project that was due the next day and was so completely focused on the computer sitting on her lap that she was oblivious of the activity around her, not even hearing the news broadcast coming from the television that was suspended from the wall opposite her-that is, until the words "terrible injustice" broke through her concentration and drew her eyes up to the screen. The young male reporter seemed genuinely sympathetic as he read his story from the teleprompter. The subject was a local nursing home called Sunset Gardens, one of twenty homes for the elderly located across the East Coast owned and operated by a corporation out of Philadelphia. The corporate home offices, he explained, kept a database with vital information pertaining to every single one of their clients. They were vigilant in protecting privacy, had all the bells and whistles installed to keep personal data ironclad against bugs and viruses, and had paid a hefty salary to a tech company whose only job was to monitor the system. None of that mattered, though. Their system had been hacked, and the identities of all the residents in all twenty facilities were stolen with one keystroke. And because First National was designated as the official bank for all Sunset Gardens homes and their residents, within minutes its accounts were wiped out as well. The reporter went on to point out that a large number of the residents had no family to help them, and while the money in First National was FDIC insured, it could take the authorities a good long while to sort through the facts and reimburse every account. What were the residents supposed to do until then? Allison wondered. A sense of outrage was growing inside her as she listened to the catastrophic details of the crime, but the tragedy hit home when the reporter played a clip of his interview with one of the elderly residents. Her name was Ella O'Connor. He knelt beside Ella's wheelchair and held her veiny hand as he asked her what the news meant to her. Ella's watery eyes stared at the reporter for a moment as though she was trying to understand the question. "I don't know," she said. And then a look of despair crossed her face. "I hope they don't make me leave." Ella was all alone, afraid, and feeling helpless. Allison knew exactly how that felt. Her heart went out to Ella and all the other poor souls. Some of them would die before it was all sorted out, and in their golden years dealing with such stress and fear would be traumatic. What had happened to them was beyond cruel. An interview with the president of the Sunset Gardens Corporation was played next. With a shrug in his voice, he said, "The authorities told me it was most likely the Russians behind the hacking. Or possibly the Chinese. The truth is, we may never know." His defeated "Oh well, what can you do?" attitude infuriated Allison. She knew the FBI had experts trying to locate the hackers and shut them down, but it was apparent they hadn't had any luck so far. The invasion of secure systems was becoming epidemic. Just the week before, the news agencies had announced that the Pentagon had been hacked. The FBI was certain the Russians were behind the theft of employee information then as well, but proving it was a huge challenge. What could she do? Something . . . maybe. It wouldn't hurt to try to find the Sunset Gardens hackers, would it? Was it her ego or her arrogance that made her think she might succeed? She had always had the ability to solve complex problems. Even at an early age, her thought processes were out of the box. She had been just eight years old when her uncanny ability was first noticed. Her older sister, Charlotte, had bought a five-hundred-piece jigsaw puzzle at a yard sale and placed all the tiny pieces on the floor in their room. When Allison came home from school, Charlotte asked her if she wanted to help put the puzzle together. Allison knelt on the floor and stared at the scattered pieces for no more than a minute or two while her brain studied them. Not only could she tell Charlotte what the picture was, but she knew where the pieces fit. It was as though she was watching each part of the puzzle connect to the next. After separating the tiny cardboard tiles into six piles, she went to work. Charlotte watched in amazement. In less than five minutes, Allison had the perimeter of the square picture put together, and within another twenty, the entire puzzle was completed. Allison didn't think she had accomplished anything unusual, but Charlotte was clearly impressed. She told Allison that most people didn't look at things the way she did.`,
    totalChapter: "3",
    theme: 'light',
    fontSize: 16,
    fontFamily: 'Arial',
    lineHeight: 1.5,
};

const novelReadPageSlice = createSlice({
    name: 'novelReadPage',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        },
        setFontSize: (state, action: PayloadAction<number>) => {
            state.fontSize = action.payload;
        },
        setFontFamily: (state, action: PayloadAction<string>) => {
            state.fontFamily = action.payload;
        },
        setLineHeight: (state, action: PayloadAction<number>) => {
            state.lineHeight = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChapter.fulfilled, (state, action) => {
                state.content = action.payload.content;
                state.title = action.payload.title;
            })
            .addCase(getTotalChapter.fulfilled, (state, action) => {
                state.totalChapter = action.payload;
            })
            .addCase(getChapterComment.fulfilled, (state, action) => {
                state.comments = action.payload;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(comment => comment.commentId !== action.meta.arg.commentId);
            })
    }
});

export const { setTheme, setFontSize, setFontFamily, setLineHeight } = novelReadPageSlice.actions;

export default novelReadPageSlice.reducer;
