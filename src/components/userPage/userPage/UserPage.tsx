import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Use react-router-dom for navigation
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { IReview } from '../../../types/review';
import ReviewCard from '../../review/ReviewCard';
import { getOriginalWorks, getUser, getUserReviews } from './userApi';
import BaseModal from '../../common/BaseModal';
import UserProfileModal from '../userProfileModal/UserProfileModal';
import { getLibraryLists } from '../../library/libraryApi';
import { IFollowRequest } from '../../../types/user';
import { followRequest, unfollowRequest } from '../follow/followApi';

function UserPage() {
    const { id } = useParams(); // Get user ID from URL params
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector(store => store.auth.currentUser); // Assuming current user is stored in Redux state
    const user = useAppSelector(store => store.user.user); // Assuming user is stored in Redux state
    const originalWorks = useAppSelector(store => store.user.originalWorks); // Assuming original works are stored in Redux state
    const reviews = useAppSelector(store => store.user.reviews); // Assuming reviews are stored in Redux state
    const library = useAppSelector(store => store.user.library); // Assuming library lists are stored in Redux state

    const [activePanel, setActivePanel] = useState<'reviews' | 'library' | 'originalWorks'>('reviews'); // State to manage active panel
    const [expandedList, setExpandedList] = useState<string | null>(null); // State to manage expanded library list
    const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (user.followers.find(follower => follower === currentUser.id)) {
            setIsFollowing(true);
        }
    }, [currentUser, user])

    // use effect 
    useEffect(() => {
        if (!id) return;
        dispatch(getUser(id));
        dispatch(getOriginalWorks(id));
        dispatch(getUserReviews(id));
        dispatch(getLibraryLists(id));
    }, [id])

    if (!user) {
        return <div>Loading...</div>; // Handle loading state
    }

    const onHideProfileModal = () => {
        setIsOpenProfileModal(false);
    }

    const onOpenProfileModal = () => {
        setIsOpenProfileModal(true);
    }

    const onUpdateName = (newName: string) => {

    };

    const onUpdateAvatar = (avatarData: string) => {

    };

    const handleFollow = () => {
        const payload: IFollowRequest = {
            userId: currentUser.id,
            followId: user.id
        }
        if (isFollowing) {
            dispatch(unfollowRequest(payload));
        } else {
            dispatch(followRequest(payload));
        }
    }

    // Dummy library data for demonstration
    // const dummyLibrary = [
    //     {
    //         id: "1",
    //         title: "Fantasy Collection",
    //         isPublic: true,
    //         novels: [
    //             {
    //                 id: "101",
    //                 title: "The Dragon's Roar",
    //                 genres: ["Fantasy", "Adventure"],
    //                 author: "Jane Doe",
    //                 authorId: "auth_001",
    //                 tags: ["Dragon", "Magic", "Quest"],
    //                 image: "https://example.com/images/dragons_roar.jpg",
    //                 chapters: 50,
    //                 rating: 4.5,
    //                 ratingCount: 120,
    //                 status: "Ongoing",
    //                 views: 2000,
    //                 description: "A thrilling journey of a young hero who teams up with a dragon to save the kingdom. A thrilling journey of a young hero who teams up with a dragon to save the kingdom.A thrilling journey of a young hero who teams up with a dragon to save the kingdom.A thrilling journey of a young hero who teams up with a dragon to save the kingdom.A thrilling journey of a young hero who teams up with a dragon to save the kingdom.",
    //                 updatedDate: "2024-06-24",
    //                 createdDate: "2023-06-24"
    //             },
    //             {
    //                 id: "102",
    //                 title: "Elven Forest",
    //                 genres: ["Fantasy", "Mystery"],
    //                 author: "John Smith",
    //                 authorId: "auth_002",
    //                 tags: ["Elf", "Forest", "Magic"],
    //                 image: "https://example.com/images/elven_forest.jpg",
    //                 chapters: 30,
    //                 rating: 4.2,
    //                 ratingCount: 95,
    //                 status: "Completed",
    //                 views: 1500,
    //                 description: "Unveil the mysteries of the enchanted forest with an elf as your guide.",
    //                 updatedDate: "2024-01-15",
    //                 createdDate: "2022-12-01"
    //             }
    //         ]
    //     },
    //     {
    //         id: "2",
    //         title: "Science Fiction Picks",
    //         isPublic: false,
    //         novels: [
    //             {
    //                 id: "201",
    //                 title: "Mars Odyssey",
    //                 genres: ["Science Fiction", "Adventure"],
    //                 author: "Alice Green",
    //                 authorId: "auth_003",
    //                 tags: ["Mars", "Space", "Exploration"],
    //                 image: "https://example.com/images/mars_odyssey.jpg",
    //                 chapters: 45,
    //                 rating: 4.8,
    //                 ratingCount: 150,
    //                 status: "Ongoing",
    //                 views: 3000,
    //                 description: "Join the first human expedition to Mars in an epic adventure.",
    //                 updatedDate: "2024-05-20",
    //                 createdDate: "2023-03-15"
    //             },
    //             {
    //                 id: "202",
    //                 title: "The Quantum Realm",
    //                 genres: ["Science Fiction", "Thriller"],
    //                 author: "Bob Brown",
    //                 authorId: "auth_004",
    //                 tags: ["Quantum", "Science", "Parallel Worlds"],
    //                 image: "https://example.com/images/quantum_realm.jpg",
    //                 chapters: 35,
    //                 rating: 4.6,
    //                 ratingCount: 110,
    //                 status: "Completed",
    //                 views: 2200,
    //                 description: "Explore the mind-bending possibilities of quantum mechanics.",
    //                 updatedDate: "2024-02-28",
    //                 createdDate: "2022-10-10"
    //             }
    //         ]
    //     },
    //     {
    //         id: "3",
    //         title: "Historical Fiction Favorites",
    //         isPublic: true,
    //         novels: [
    //             {
    //                 id: "301",
    //                 title: "The Medieval Knight",
    //                 genres: ["Historical Fiction", "Drama"],
    //                 author: "Charlie King",
    //                 authorId: "auth_005",
    //                 tags: ["Knight", "Medieval", "History"],
    //                 image: "https://example.com/images/medieval_knight.jpg",
    //                 chapters: 20,
    //                 rating: 4.3,
    //                 ratingCount: 70,
    //                 status: "Ongoing",
    //                 views: 1000,
    //                 description: "Follow the journey of a knight during the medieval era.",
    //                 updatedDate: "2024-04-10",
    //                 createdDate: "2023-05-05"
    //             },
    //             {
    //                 id: "302",
    //                 title: "Roman Conquests",
    //                 genres: ["Historical Fiction", "War"],
    //                 author: "Diana Prince",
    //                 authorId: "auth_006",
    //                 tags: ["Rome", "Conquest", "History"],
    //                 image: "https://example.com/images/roman_conquests.jpg",
    //                 chapters: 25,
    //                 rating: 4.7,
    //                 ratingCount: 85,
    //                 status: "Completed",
    //                 views: 1300,
    //                 description: "Experience the epic battles and politics of ancient Rome.",
    //                 updatedDate: "2024-03-18",
    //                 createdDate: "2022-11-30"
    //             }
    //         ]
    //     }
    // ];

    const navigateToGenre = (genre: string) => {
        navigate(`/search/${genre}`);
    };

    const navigateToTag = (tag: string) => {
        navigate(`/tags/${tag}`);
    }

    const toggleExpand = (listId: string) => {
        setExpandedList(prev => (prev === listId ? null : listId)); // Toggle expand/collapse
    };

    const renderItems = (novelId: string, items: string[], navigateTo: (item: string) => void) => {
        if (items && items.length <= 2) {
            return (
                <>
                    {items.map((item, index) => (
                        <div key={item} className="badge bg-primary me-1 tag" onClick={() => navigateTo(item)} style={{ cursor: 'pointer' }}>
                            {item}
                        </div>
                    ))}
                </>
            );
        } else {
            if (!items) return;
            const visibleItems = items.slice(0, 2);
            const hiddenItems = items.slice(2);

            return (
                <>
                    {visibleItems.map((item, index) => (
                        <div key={item} className="badge bg-primary me-1 tag" onClick={() => navigateTo(item)} style={{ cursor: 'pointer' }}>
                            {item}
                        </div>
                    ))}

                    <div className="badge bg-primary me-1 tag" style={{ cursor: 'pointer' }} onClick={() => navigate(`/novel/${novelId}`)}>
                        +{hiddenItems.length} more
                    </div>
                </>
            );
        }
    };

    if (!user || user.admin_type !== 0) {
        return (
            <div>No user found</div>
        )
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-3">
                    {/* User profile card */}
                    <div className="card">
                        <div className="card-body text-center">
                            {/* <img
                                src={user.avatar}
                                alt="Profile"
                                className="img-fluid rounded-circle mb-3"
                                style={{ width: '150px', height: '150px' }}
                            /> */}
                            {user.avatar ? (
                                <img src={user.avatar} alt="Profile" className="img-fluid rounded-circle mb-3" style={{ width: '150px', height: '150px' }} />
                            ) : (
                                <i className="bi bi-person-circle" style={{ fontSize: '2.5rem' }}></i>
                            )}
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">@{user.username}</p>
                            <div className="mb-3">
                                {/* Navigation links */}
                                <span className="me-3 btn btn-link" onClick={() => navigate(`/user/${user.id}/follow/followers`)} style={{ cursor: 'pointer' }}>Followers: {user.followers?.length ?? 0}</span>
                                <span className='btn btn-link' onClick={() => navigate(`/user/${user.id}/follow/following`)} style={{ cursor: 'pointer' }}>Following: {user.following?.length ?? 0}</span>
                            </div>
                            {currentUser.id === id && (
                                <button className="btn btn-primary" onClick={onOpenProfileModal}>Edit Profile</button>
                            )}
                            {(currentUser.id && currentUser.id !== id) && (
                                <button className="btn btn-primary" onClick={handleFollow}>{isFollowing ? 'Unfollow' : 'Follow'}</button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    {/* Main content */}
                    <div className="card">
                        <div className="card-body">
                            {/* Panel toggle buttons */}
                            <div className="btn-group mb-3" role="group" aria-label="Basic example">
                                <button
                                    type="button"
                                    className={`btn ${activePanel === 'reviews' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setActivePanel('reviews')}
                                >
                                    Reviews
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${activePanel === 'library' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setActivePanel('library')}
                                >
                                    Library
                                </button>
                                {/* {currentUser.id === id &&  */}
                                <button
                                    type="button"
                                    className={`btn ${activePanel === 'originalWorks' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setActivePanel('originalWorks')}
                                >
                                    Original Works
                                </button>
                                {/* } */}
                            </div>

                            {/* Content based on active panel */}
                            {activePanel === 'reviews' && (
                                <>
                                    <h5 className="card-title">Reviews</h5>
                                    {/* Display reviews */}
                                    {reviews && reviews.length > 0 ? (
                                        <ul className="list-group">
                                            {reviews.map((review: IReview) => (
                                                <li key={review.id} className="list-group-item">
                                                    <ReviewCard review={review} />
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No reviews found.</p>
                                    )}
                                </>
                            )}

                            {activePanel === 'library' && (
                                <>
                                    <h5 className="card-title">Library</h5>
                                    {/* Display library lists */}
                                    {library && library.length > 0 ? (
                                        <ul className="list-group">
                                            {library.map((list) => (
                                                <div className='mb-2' key={list.id}>
                                                    {list.isPublic && (
                                                        <li className="list-group-item">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div>
                                                                    <h6>{list.title}</h6>
                                                                    <p>Novels count: {list.novels.length}</p>
                                                                </div>
                                                                {/* Expand button */}
                                                                <button
                                                                    className="btn btn-sm btn-outline-secondary"
                                                                    onClick={() => toggleExpand(list.id)}
                                                                >
                                                                    {expandedList === list.id ? 'Collapse' : 'Expand'}
                                                                </button>
                                                            </div>
                                                            {/* Expanded content */}
                                                            {expandedList === list.id && (
                                                                <ul className="list-group mt-2">
                                                                    {list.novels.map(novel => (
                                                                        <li key={novel.id} className="list-group-item mb-2 border">
                                                                            <h6 onClick={() => navigate(`/novel/${novel.id}`)} style={{ cursor: 'pointer' }} className='text-primary'>{novel.title}</h6>
                                                                            <p onClick={() => navigate(`/user/${novel.authorId}`)} style={{ cursor: 'pointer' }} className='d-flex'><b>Author:</b> <div className='text-primary ms-2'>{novel.author}</div> </p>
                                                                            <img
                                                                                src={novel.image}
                                                                                alt={novel.title}
                                                                                style={{ width: '100px', height: 'auto' }}
                                                                            />
                                                                            <p>{novel.description}</p>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </li>
                                                    )}
                                                </div>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No library lists found.</p>
                                    )}
                                </>
                            )}

                            {(activePanel === 'originalWorks') && (
                                <>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <h5 className="card-title">Original Works</h5>
                                        {(currentUser.id === id) && <div className='btn btn-primary mb-1' onClick={() => navigate(`/user/${id}/novels-management`)}> Manage novels </div>}
                                    </div>
                                    {/* Display original works */}
                                    {originalWorks && originalWorks.length > 0 ? (
                                        <ul className="list-group">
                                            {originalWorks.map((novel) => (
                                                <li key={novel.id} className="list-group-item mb-2 border d-flex">
                                                    {/* Novel image */}
                                                    <img
                                                        src={novel.image}
                                                        alt={novel.title}
                                                        style={{ width: '150px', height: 'auto' }}
                                                        className="me-3"
                                                    />
                                                    {/* Novel details */}
                                                    <div>
                                                        <h6 onClick={() => navigate(`/novel/${novel.id}`)} style={{ cursor: 'pointer' }} className='text-primary'>{novel.title}</h6>
                                                        <p className="card-text">Genres: {renderItems(novel.id, novel.genres, navigateToGenre)}</p>
                                                        <p className="card-text">Tags: {renderItems(novel.id, novel.tags || [], navigateToTag)}</p>
                                                        <p>{novel.description}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No original works found.</p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* BaseModal for UserProfileModal */}
            <BaseModal
                show={isOpenProfileModal}
                onHide={onHideProfileModal}
            >
                <UserProfileModal
                    user={currentUser} // Pass current user to UserProfileModal
                    onHide={onHideProfileModal}
                    onUpdateName={onUpdateName}
                    onUpdateAvatar={onUpdateAvatar}
                />
            </BaseModal>
        </div>
    );
}


export default UserPage;
