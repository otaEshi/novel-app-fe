import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useParams } from 'react-router-dom';
import { showAlert } from '../../../utils';
import { INovel, IUpdateNovelInfoRequest } from '../../../types/novel';
import { getNovelDetail, updateNovelInfo } from '../../novel/novelDetailPage/novelDetailPageApi';

interface IEditNovelProps {
    closeEditNovel: () => void;
}

function EditNovel(props: IEditNovelProps) {
    const { novelId } = useParams<{ novelId: string }>();
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector(state => state.auth.currentUser);
    const novelDetail = useAppSelector(state => state.novelDetail.novel);
    const tagList = useAppSelector(state => state.home.tagList);
    const genreList = useAppSelector(state => state.home.genreList);

    const [novelDetails, setNovelDetails] = useState<INovel>({} as INovel);

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [tagInclude, setTagInclude] = useState<string[]>([]);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredTags, setFilteredTags] = useState<string[]>(tagList);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchTerm(searchValue);
        const filtered = tagList.filter(tag => tag.toLowerCase().includes(searchValue));
        setFilteredTags(filtered);
    };

    const handleTagSelect = (tag: string) => {
        if (tagInclude.includes(tag)) return;
        setTagInclude(prev => [...prev, tag]);
    }

    useEffect(() => {
        if (novelId) {
            dispatch(getNovelDetail(novelId))
        }
    }, [novelId]);

    useEffect(() => {
        setNovelDetails(novelDetail)
    }, [novelDetail])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNovelDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setNovelDetails(prevDetails => ({
                    ...prevDetails,
                    image: reader.result as string
                }));
                setImagePreview(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, type: 'genres' | 'tags') => {
        const { name, checked } = e.target;
        setNovelDetails(prevDetails => {
            const updatedList = checked
                ? [...prevDetails[type], name]
                : prevDetails[type].filter(item => item !== name);

            return {
                ...prevDetails,
                [type]: updatedList
            };
        });
    };

    const handleUpdateNovel = async (status: string) => {
        if (novelDetails.title.trim() === '') {
            showAlert('Title is required', 'danger');
            return;
        }
        if (novelDetails.genres.length === 0) {
            showAlert('Select at least one genre', 'danger');
            return;
        }

        const payload: IUpdateNovelInfoRequest = {
            userId: currentUser?.id,
            novelId: novelDetails.id,
            title: novelDetails.title,
            genres: novelDetails.genres,
            tags: novelDetails.tags,
            image: novelDetails.image,
            description: novelDetails.description,
        }

        const res = await dispatch(updateNovelInfo(payload));
        if (updateNovelInfo.fulfilled.match(res)) {
            showAlert('Novel updated successfully', 'success');
            props.closeEditNovel();
        } else if (updateNovelInfo.rejected.match(res)) {
            showAlert('Failed to update novel', 'danger');
        }
    };

    return (
        <div className="container mt-4">
            <form onSubmit={(e: FormEvent) => e.preventDefault()}>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Update Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <div className="mt-2">
                            <img
                                src={imagePreview}
                                alt="Novel Preview"
                                className="img-thumbnail"
                                style={{ width: '150px', height: '150px' }}
                            />
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={novelDetails.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="genres" className="form-label">Genres</label>
                    <div>
                        {genreList && genreList.map((genre) => (
                            <div key={genre} className="form-check form-check-inline">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`genre-${genre}`}
                                    name={genre}
                                    checked={(novelDetails.genres && novelDetails.genres.length > 0) && novelDetails.genres.includes(genre)}
                                    onChange={(e) => handleCheckboxChange(e, 'genres')}
                                />
                                <label htmlFor={`genre-${genre}`} className="form-check-label">
                                    {genre}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Tags</label>
                    <div className="dropdown">
                        <button 
                            className="btn btn-secondary dropdown-toggle" 
                            type="button" 
                            id="dropdownMenuButton" 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false">
                            Select Tags
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            <li>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search tags"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </li>
                            {filteredTags.map((tag, index) => (
                                <li key={index} className="dropdown-item" onClick={() => handleTagSelect(tag)}>
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='d-flex gap-3 mt-2'>
                        {tagInclude.map((tag, index) => (
                            <div key={index} className='d-flex align-items-center'>
                                <span className='mt-2'>
                                    {tag}
                                </span>
                                <div
                                    className='text-danger fs-3 ms-2'
                                    onClick={() => setTagInclude(prev => prev.filter(t => t !== tag))}
                                    style={{ cursor: 'pointer' }}
                                >
                                    x
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Synopsis/Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows={5}
                        value={novelDetails.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div className="d-flex justify-content-between">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleUpdateNovel('Published')}
                    >
                        Update novel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditNovel;
