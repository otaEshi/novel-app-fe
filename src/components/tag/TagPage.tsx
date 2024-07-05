import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getNovelListByTag } from "./tagApi";
import { INovel, INovelList } from "../../types/novel";
import NovelCard from "../novel/novelCard/NovelCard";

function TagPage() {
    const { tag } = useParams<{ tag: string }>();
    const dispatch = useAppDispatch();

    const [activePanel, setActivePanel] = useState('popular');

    const tagList = useAppSelector(store => store.home.tagList);
    // const novelList = useAppSelector(store => store.tag.novelList);
    const novelList: INovelList = {
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
    };

    const [currentTag, setCurrentTag] = useState<string>("");

    const handlePanelChange = (panel: string) => {
        setActivePanel(panel);
    };

    const _getNovelListByTag = async (tagName: string) => {
        await dispatch(getNovelListByTag(tagName));
    };

    useLayoutEffect(() => {
        if (tagList) {
            if (tagList.length === 0) return;
        }
        if (tag && tagList && tagList.includes(tag)) {
            _getNovelListByTag(tag);
            setCurrentTag(tag);
        }
    }, [tag, tagList]);

    if (currentTag === "") {
        return <h1>Tag not found</h1>;
    }

    // Filtering novels
    const popularNovels = novelList?.novels?.slice()?.sort((a, b) => b.views - a.views)?.slice(0, 10) || [];
    const newNovels = novelList?.novels?.slice().sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()).slice(0, 10); // Top 10 by creation date
    const recentNovels = novelList?.novels?.slice().sort((a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime()).slice(0, 10); // Top 10 by update date
    const renderNovelCards = (novels: INovel[]) => {
        if (!novels || novels.length === 0) return (<div>No novel found!</div>);
        return novels.map(novel => <NovelCard key={novel.id} novel={novel} />);
    };

    return (
        <>
            <h1>{currentTag}</h1>
            <div>
                {tagList && tagList.length > 0 ? (
                    <div>
                        <div className="btn-group">
                            <button
                                className={`btn btn-primary ${activePanel === 'popular' && 'active'}`}
                                onClick={() => handlePanelChange('popular')}
                            >
                                Popular
                            </button>
                            <button
                                className={`btn btn-primary ${activePanel === 'new' && 'active'}`}
                                onClick={() => handlePanelChange('new')}
                            >
                                New
                            </button>
                            <button
                                className={`btn btn-primary ${activePanel === 'updateRecent' && 'active'}`}
                                onClick={() => handlePanelChange('updateRecent')}
                            >
                                Update Recent
                            </button>
                        </div>
                        <div className="pb-2">
                            {activePanel === 'popular' && (
                                <div className="mt-3">
                                    <div className="d-flex flex-wrap mx-auto gap-3">{renderNovelCards(popularNovels)}</div>
                                </div>
                            )}
                            {activePanel === 'new' && (
                                <div className="mt-3">
                                    <div className="d-flex flex-wrap mx-auto gap-3">{renderNovelCards(newNovels)}</div>
                                </div>
                            )}
                            {activePanel === 'updateRecent' && (
                                <div className="mt-3">
                                    <div className="d-flex flex-wrap mx-auto gap-3">{renderNovelCards(recentNovels)}</div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div>No novel found!</div>
                )}
            </div>
        </>
    );
}

export default TagPage;
