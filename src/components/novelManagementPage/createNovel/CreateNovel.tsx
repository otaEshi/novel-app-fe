import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ICreateNovelRequest } from '../../../types/novel';
import { createChapterNovel, createNovel } from '../novelManagementApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { showAlert } from '../../../utils';

interface ICreateNovelProps {
    closeCreateNodel: () => void;
}

function CreateNovel(props: ICreateNovelProps) {
    const [novelDetails, setNovelDetails] = useState<ICreateNovelRequest>({
        title: '',
        genres: [],
        tags: [],
        image: '',
        description: ''
    });

    const tagList = useAppSelector(state => state.home.tagList);
    const currentUser = useAppSelector(state => state.auth.currentUser);
    const genreList = useAppSelector(state => state.home.genreList);

    const [tagInclude, setTagInclude] = useState<string[]>([]);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredTags, setFilteredTags] = useState<string[]>(tagList);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const dispatch = useAppDispatch();

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

    const handleCreateNovel = async (status: string) => {
        if (novelDetails.title.trim() === '') {
            showAlert('Title is required', 'danger');
            return;
        }
        if (novelDetails.genres.length === 0) {
            showAlert('Select at least one genre', 'danger');
            return;
        }
        // Dispatch the action
        const res = await dispatch(createNovel(novelDetails));
        if (createNovel.fulfilled.match(res)) {
            showAlert('Novel created successfully', 'success');
            props.closeCreateNodel();
        } else if (createNovel.rejected.match(res)) {
            showAlert('Failed to create novel', 'danger');
        }
    };

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

    return (
        <div className="container mt-4">
            <form onSubmit={(e: FormEvent) => e.preventDefault()}>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Upload Image</label>
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
                        {genreList.map((genre) => (
                            <div key={genre} className="form-check form-check-inline">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`genre-${genre}`}
                                    name={genre}
                                    checked={novelDetails.genres.includes(genre)}
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
                            <div key={index} className="dropdown-item" onClick={() => handleTagSelect(tag)}>
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
                        onClick={() => handleCreateNovel('Published')}
                    >
                        Create novel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateNovel;
