import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { searchNovels } from './searchApi';
import NovelCard from '../novel/novelCard/NovelCard';
import { useParams } from 'react-router';
import { ISearchNovel } from '../../types/search';

interface GenreState {
    [genre: string]: number; // 0: normal, 1: include, 2: exclude
}

interface TagState {
    [tag: string]: number; // 0: normal, 1: include
}

const SearchPage: React.FC = () => {
    const { genre } = useParams();

    const genreList = useAppSelector(store => store.home.genreList);
    const tagList = useAppSelector(store => store.home.tagList);
    const novelList = useAppSelector(store => store.search.novelList);

    const dispatch = useAppDispatch();

    const [showMore, setShowMore] = useState(false);
    const [genres, setGenres] = useState<GenreState>(
        genreList.reduce((acc, genre) => {
            acc[genre] = 0; // Initialize all genres with normal state
            return acc;
        }, {} as GenreState)
    );
 
    const [ratingOption, setRatingOption] = useState<string>('max');
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [chapters, setChapters] = useState<number | undefined>(undefined);
    const [chaptersOption, setChaptersOption] = useState<string>('max');
    const [rating, setRating] = useState<number | undefined>(undefined);
    const [reviews, setReviews] = useState<number | undefined>(undefined);
    const [reviewsOption, setReviewsOption] = useState<string>('max');
    const [view, setView] = useState<number | undefined>(undefined);
    const [viewOption, setViewOption] = useState<string>('max');
    const [sortBy, setSortBy] = useState<string>('Rating');
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [tagInclude, setTagInclude] = useState<string[]>([]);
    const [tagExclude, setTagExclude] = useState<string[]>([]);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredTags, setFilteredTags] = useState<string[]>(tagList);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchTerm(searchValue);
        const filtered = tagList.filter(tag => tag.toLowerCase().includes(searchValue));
        setFilteredTags(filtered);
    };

    const handleTagSelect = (tag: string, isInclude: boolean) => {
        if (isInclude) {
            if (tagInclude.includes(tag) || tagExclude.includes(tag)) return;
            setTagInclude(prev => [...prev, tag]);
        } else {
            if (tagExclude.includes(tag) || tagInclude.includes(tag)) return;
            setTagExclude(prev => [...prev, tag]);
        }
    }

    useEffect(() => {
        if (genre && genres[genre] !== undefined) {
            setGenres(prev => ({
                ...prev,
                [genre]: 1
            }));
        }
    }, [genre]);

    const handleShowMore = () => {
        setShowMore(true);
    };

    const handleGenreChange = (genre: string) => {
        setGenres(prev => ({
            ...prev,
            [genre]: (prev[genre] + 1) % 3 // Cycle through 0, 1, 2 states
        }));
    };

    const handleRatingOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRatingOption(e.target.value);
    };

    const handleChaptersChange = (value: string) => {
        const parsedValue = parseInt(value);
        setChapters(isNaN(parsedValue) ? undefined : parsedValue);
    };

    const handleChaptersOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChaptersOption(e.target.value);
    };

    const handleRatingChange = (value: string) => {
        const parsedValue = parseInt(value);
        setRating(isNaN(parsedValue) ? undefined : parsedValue);
    };

    const handleReviewsChange = (value: string) => {
        const parsedValue = parseInt(value);
        setReviews(isNaN(parsedValue) ? undefined : parsedValue);
    };

    const handleReviewsOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setReviewsOption(e.target.value);
    };

    const handleViewChange = (value: string) => {
        const parsedValue = parseInt(value);
        setView(isNaN(parsedValue) ? undefined : parsedValue);
    };

    const handleViewOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setViewOption(e.target.value);
    };

    const onSearch = () => {
        const payload: ISearchNovel = {
            title,
            author,
            chapters,
            chaptersOption,
            rating,
            ratingOption,
            reviews,
            reviewsOption,
            view,
            viewOption,
            genreInclude: Object.keys(genres).filter(key => genres[key] === 1),
            genreExclude: Object.keys(genres).filter(key => genres[key] === 2),
            tagsInclude: tagInclude,
            tagsExclude: tagExclude,
            sortBy,
            isAscending,
        };
        console.log('payload', payload)
        dispatch(searchNovels(payload));
    };

    return (
        <div className="container my-4">
            <h2 className="mb-4">Search Novels</h2>
            <div className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="author" className="form-label">Author:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        name="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>

                <div className="col-md-4">
                    <label htmlFor="chapters" className="form-label">Chapters:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="chapters"
                        name="chapters"
                        value={chapters ?? ''}
                        onChange={(e) => handleChaptersChange(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <label htmlFor="chaptersOption" className="form-label">Option:</label>
                    <select
                        className="form-select"
                        id="chaptersOption"
                        name="chaptersOption"
                        value={chaptersOption}
                        onChange={handleChaptersOptionChange}
                    >
                        <option value="max">Max</option>
                        <option value="min">Min</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="rating" className="form-label">Rating:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="rating"
                        name="rating"
                        value={rating ?? ''}
                        onChange={(e) => handleRatingChange(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <label htmlFor="ratingOption" className="form-label">Option:</label>
                    <select
                        className="form-select"
                        id="ratingOption"
                        name="ratingOption"
                        value={ratingOption}
                        onChange={handleRatingOptionChange}
                    >
                        <option value="max">Max</option>
                        <option value="min">Min</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="reviews" className="form-label">Reviews:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="reviews"
                        name="reviews"
                        value={reviews ?? ''}
                        onChange={(e) => handleReviewsChange(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <label htmlFor="reviewsOption" className="form-label">Option:</label>
                    <select
                        className="form-select"
                        id="reviewsOption"
                        name="reviewsOption"
                        value={reviewsOption}
                        onChange={handleReviewsOptionChange}
                    >
                        <option value="max">Max</option>
                        <option value="min">Min</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <label htmlFor="view" className="form-label">View:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="view"
                        name="view"
                        value={view ?? ''}
                        onChange={(e) => handleViewChange(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <label htmlFor="viewOption" className="form-label">Option:</label>
                    <select
                        className="form-select"
                        id="viewOption"
                        name="viewOption"
                        value={viewOption}
                        onChange={handleViewOptionChange}
                    >
                        <option value="max">Max</option>
                        <option value="min">Min</option>
                    </select>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Genres:</label>
                    <div className="form-check">
                        {genreList.map(genre => (
                            <div key={genre} className="form-check form-check-inline">
                                <input
                                    type="checkbox"
                                    className={`form-check-input ${genres[genre] === 2 ? 'bg-danger' : ''}`}
                                    id={`genre-${genre}`}
                                    checked={genres[genre] === 1}
                                    onChange={() => handleGenreChange(genre)}
                                />
                                <label className="form-check-label" htmlFor={`genre-${genre}`}>
                                    {genre}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-12">
                    <label className="form-label">Tags:</label>
                    {/* {tagList.map(tag => (
                            <div key={tag} className="form-check form-check-inline">
                                <input
                                    type="checkbox"
                                    className={`form-check-input ${tags[tag] === 1 ? 'bg-success' : ''}`}
                                    id={`tag-${tag}`}
                                    checked={tags[tag] === 1}
                                    onChange={() => handleTagChange(tag)}
                                />
                                <label className="form-check-label" htmlFor={`tag-${tag}`}>
                                    {tag}
                                </label>
                            </div>
                        ))} */}
                </div>
                <div className='col-6'>
                    <div className="dropdown">
                        Include
                        <button className="ms-2 btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => setSearchTerm('')}>
                            Select Tag
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search tags"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            {filteredTags.map((tag, index) => (
                                <div key={index} className="dropdown-item" onClick={() => handleTagSelect(tag, true)}>
                                    {tag}
                                </div>
                            ))}
                        </div>
                        <div className='d-flex gap-3'>
                            {tagInclude.map((tag, index) => (
                                <div key={index} className='d-flex align-items-center ms-2'>
                                    <span className='mt-2'>
                                        {tag}
                                    </span>
                                    <div
                                        className='text-danger fs-3 ms-2'
                                        onClick={() => setTagInclude(prev => prev.filter(t => t !== tag))}
                                        style={{ cursor: 'pointer'}}
                                    >
                                        x
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-6'>
                    <div className="dropdown">
                        Exclude
                        <button className="ms-2 btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => setSearchTerm('')}>
                            Select Tag
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search tags"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            {filteredTags.map((tag, index) => (
                                <div key={index} className="dropdown-item" onClick={() => handleTagSelect(tag, false)}>
                                    {tag}
                                </div>
                            ))}
                        </div>
                        <div className='d-flex gap-3'>
                            {tagExclude.map((tag, index) => (
                                <div key={index} className='d-flex align-items-center ms-2'>
                                    <span className='mt-2'>
                                        {tag}
                                    </span>
                                    <div
                                        className='text-danger fs-3 ms-2'
                                        onClick={() => setTagExclude(prev => prev.filter(t => t !== tag))}
                                        style={{ cursor: 'pointer'}}
                                    >
                                        x
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className='d-flex align-items-center'>
                        <label htmlFor="sortBy" className="form-label me-2 mt-1">Sort By:</label>
                        <select
                            className="form-select"
                            id="sortBy"
                            name="sortBy"
                            value={sortBy}
                            style={{ maxWidth: '200px' }}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="Rating">Rating</option>
                            <option value="Reviews">Reviews</option>
                            <option value="View">View</option>
                            <option value="Chapters">Chapters</option>
                            <option value="newest">Newest</option>
                        </select>
                    </div>
                </div>
                <div className="col mt-4">
                    <label className="form-label">Sort Order:</label>
                    <div className="form-check form-check-inline ms-3">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="ascending"
                            name="sortOrder"
                            value="ascending"
                            checked={isAscending}
                            onChange={() => setIsAscending(true)}
                        />
                        <label className="form-check-label" htmlFor="ascending">
                            Ascending
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="descending"
                            name="sortOrder"
                            value="descending"
                            checked={!isAscending}
                            onChange={() => setIsAscending(false)}
                        />
                        <label className="form-check-label" htmlFor="descending">
                            Descending
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary mt-3" onClick={onSearch}>Search</button>
                </div>
            </div>
            <div className='my-2 pb-4'>
                <h1>Search results</h1>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {novelList.novels && novelList.novels.slice(0, showMore ? novelList.novels.length : 6).map(novel => (
                        <div key={novel.id} className="col">
                            <NovelCard novel={novel} />
                        </div>
                    ))}
                </div>
                {!showMore && novelList.novels && novelList.novels.length > 6 && (
                    <button onClick={handleShowMore} className="btn btn-link pb-4 pt-2 mx-auto d-block fs-5">Show More</button>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
