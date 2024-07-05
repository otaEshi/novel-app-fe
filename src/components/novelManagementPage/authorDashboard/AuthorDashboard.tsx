import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate, useParams } from "react-router";
import { getCommentsPerChapter, getReviewsPerNovel, getViewPerGenre, getViewPerNovel, getViewPerTag } from '../../admin/adminDashboard/dashboardApi';
import { getNovelListByAuthor } from '../novelManagementApi';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AuthorDashboard() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(state => state.auth.currentUser);

    const novelList = useAppSelector(state => state.novelManagement.novelList);

    const [chosenNovelId, setChosenNovelId] = useState<string>(''); // State for selected novel ID
    const [isFetchData, setIsFetchData] = useState(false);

    const viewPerGenreData = useAppSelector((state) => state.dashboard.viewPerGenre);
    const viewPerTagData = useAppSelector((state) => state.dashboard.viewPerTag);
    const viewPerNovelData = useAppSelector((state) => state.dashboard.viewPerNovel);
    const reviewsPerNovelData = useAppSelector((state) => state.dashboard.reviewsPerNovel);
    const commentsPerChapterData = useAppSelector((state) => state.dashboard.commentsPerChapter);

    const getData = async () => {
        dispatch(getViewPerGenre());
        dispatch(getViewPerTag());
        dispatch(getViewPerNovel({ authorId: currentUser.id }));
        dispatch(getReviewsPerNovel({ authorId: currentUser.id }));
        if (chosenNovelId !== '') {
            dispatch(getCommentsPerChapter({ novelId: chosenNovelId }));
        }
    }

    useEffect(() => {
        if (!isFetchData) {
            return;
        }
        if (novelList && novelList && novelList.length > 0) {
            return;
        }
        dispatch(getNovelListByAuthor(currentUser.id));
        setIsFetchData(true);
    }, [id]);

    useEffect(() => {
        setChosenNovelId(novelList[0]?.id || '');
    }, [novelList]);

    useEffect(() => {
        if (!currentUser || currentUser.id !== id) {
            navigate('/404');
            return;
        }
        getData();
    }, [id, currentUser]);

    useEffect(() => {
        dispatch(getCommentsPerChapter({ novelId: chosenNovelId }));
    }, [chosenNovelId])

    if (!currentUser || currentUser.id !== id) {
        return null;
    }

    // Define chart data and options here
    const genreData = {
        labels: viewPerGenreData && viewPerGenreData.map(genre => genre.genre),
        datasets: [{
            label: 'Views',
            data: viewPerGenreData && viewPerGenreData.map(genre => genre.viewCount),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    const tagData = {
        labels: viewPerTagData && viewPerTagData.map(tag => tag.tag),
        datasets: [{
            label: 'Views',
            data: viewPerTagData && viewPerTagData.map(tag => tag.viewCount),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
        }],
    };

    const novelViewData = {
        labels: viewPerNovelData && viewPerNovelData.map(novel => novel.novelName),
        datasets: [{
            label: 'Views',
            data: viewPerNovelData && viewPerNovelData.map(novel => novel.viewCount),
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
        }],
    };

    const novelReviewData = {
        labels: reviewsPerNovelData && reviewsPerNovelData.map(novel => novel.novelName),
        datasets: [{
            label: 'Reviews',
            data: reviewsPerNovelData && reviewsPerNovelData.map(novel => novel.reviewCount),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }],
    };

    const chapterCommentsData = {
        labels: commentsPerChapterData && commentsPerChapterData.map(chapter => chapter.chapterTitle),
        datasets: [{
            label: 'Comments',
            data: commentsPerChapterData && commentsPerChapterData.map(chapter => chapter.commentCount),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        }],
    };

    return (
        <div className="container mt-4">
            <h2>Author Dashboard</h2>

            <div className="mt-4">
                <h3>Views per Genre</h3>
                <Bar data={genreData} options={{ responsive: true }} />
            </div>

            <div className="mt-4">
                <h3>Views per Tag</h3>
                <Bar data={tagData} options={{ responsive: true }} />
            </div>

            <div className="mt-4">
                <h3>Views per Novel</h3>
                <Bar data={novelViewData} options={{ responsive: true }} />
            </div>

            <div className="mt-4">
                <h3>Reviews per Novel</h3>
                <Bar data={novelReviewData} options={{ responsive: true }} />
            </div>

            <div className="mt-4">
                <h3>Comments per Chapter</h3>
                <div className='d-flex'>
                    <b className='me-2'>Select Novel: </b>
                    <select value={chosenNovelId} onChange={(e) => setChosenNovelId(e.target.value)}>
                        {novelList.map(novel => (
                            <option key={novel.id} value={novel.id}>{novel.title}</option>
                        ))}
                    </select>
                </div>
                <Bar data={chapterCommentsData} options={{ responsive: true }} />
            </div>
        </div>
    );
}

export default AuthorDashboard;
