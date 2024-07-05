import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router';
import { showAlert } from '../../utils';
import NovelSlide from '../novel/novelSlide/NovelSlide';
import NovelBigCard from '../novel/novelBigCard/NovelBigCard';
import { INovel } from '../../types/novel';
import NovelCard from '../novel/novelCard/NovelCard';
import { tags } from '../../dataTemp';
import { getRecentlyUpdateList, getTopRatingNovelList, getTopViewNovelList, getYouMayLikeList } from './homeApi';

function Home() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // selection
    const topViewNovelList = useAppSelector(store => store.home.topViewList);
    const topRatingNovelList = useAppSelector(store => store.home.topRatingList);
    const recentUpdateNovelList = useAppSelector(store => store.home.recentUpdateList);
    const youMayLikeList = useAppSelector(store => store.home.youMayLikeList);

    useEffect(() => {
        dispatch(getTopViewNovelList());
        dispatch(getTopRatingNovelList());
        dispatch(getRecentlyUpdateList());
        dispatch(getYouMayLikeList());
    }, [])

    const youMayLikeNovels: INovel[] = [
        {
            id: "2",
            title: "Wired (Buchanan-Renard)",
            genres: ["Romance"],
            author: "Julie Garwood",
            authorId: "2",	
            tags: ["Detectives"],
            image: 'https://allnovel.net/images/wired-buchanan-renard-13.jpg',
            chapters: 20,
            rating: 4.0,
            ratingCount: 200,
            status: "Completed",
            views: 2000,
            description: "A beautiful computer hacker and a bad-boy FBI agent must collaborate—in more ways than one—in the sizzling new novel from #1 New York Times bestselling author Julie Garwood. Allison Trent doesn't look like a hacker. In fact, when she’s not in college working on her degree, she models on the side. But behind her gorgeous face is a brilliant mind for computers and her real love is writing—and hacking—code. Her dream is to write a new security program that could revolutionize the tech industry. Hotshot FBI agent Liam Scott has a problem: a leak deep within his own department. He needs the skills of a top-notch hacker to work on a highly sensitive project: to secretly break into the FBI servers and find out who the traitor is. But he can’t use one of his own. He finds the perfect candidate in Allison. Only, there’s one problem—she wants nothing to do with his job and turns him down flat.",
            updatedDate: "2021-09-02",
            createdDate: "2021-09-02"
        },
        {
            id: "2",
            title: "Dummy Title 2",
            genres: ["Genre 1"],
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
        },{
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
        },{
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
        },{
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
        },{
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
    ]

    const [showMore, setShowMore] = useState(false);

    const handleShowMore = () => {
        setShowMore(true);
    };

    console.log('youMayLikeList', youMayLikeList)

    return (
        <>
            <div className='py-2'>
                <h1>Top view</h1>
                <NovelSlide novels={topViewNovelList} slideId='topView'></NovelSlide>
            </div>
            <div className='py-2 mt-2'>
                <h1>Top rating</h1>
                <NovelSlide novels={topRatingNovelList} slideId='topRating'></NovelSlide>
            </div>
            <div className='py-2 mt-2'>
                <h1>Recent update</h1>
                <NovelSlide novels={recentUpdateNovelList} slideId='recentUpdate'></NovelSlide>
            </div>
            <div className='my-2 pb-4'>
                <h1>You may also like</h1>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {youMayLikeList.slice(0, showMore ? youMayLikeList.length : 6).map(novel => (
                        <div key={novel.id} className="col">
                            <NovelCard novel={novel} />
                        </div>
                    ))}
                </div>
                {!showMore && youMayLikeList.length > 6 && (
                    <button onClick={handleShowMore} className="btn btn-link pb-4 pt-2 mx-auto d-block fs-5">Show More</button>
                )}
            </div>
        </>
    );
}

export default Home;