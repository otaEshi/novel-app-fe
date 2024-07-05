import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useLayoutEffect } from 'react'; // Import useState as well
// import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTagList } from '../home/homeApi';
import { logout } from '../auth/authSlice';

function Header() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const currentUser = useAppSelector(state => state.auth.currentUser);
    const genres = useAppSelector(store => store.home.genreList)

    // State
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useLayoutEffect(() => {
        if (currentUser && currentUser.admin_type && currentUser.admin_type !== 0) {
        //   navigate('/admin');
        }
    }, [currentUser])

    useEffect(() => {
        dispatch(getTagList());
    }, []);

    const handleLogout = () => {
        setDropdownOpen(false);
        dispatch(logout());
    };


    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className='w-100 h-10'>
            <nav className={` navbar navbar-expand-lg navbar-light bg-light`}>
                <div className="container">
                    <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}> <b> Pj3 Novel </b></div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <div className="nav-link" onClick={() => navigate('/search')} style={{ cursor: 'pointer' }}>Search</div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link" onClick={() => navigate(`/user/library`)} style={{ cursor: 'pointer' }}>Library</div>
                            </li>
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" id="tagsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Genres
                                </div>
                                <ul className="dropdown-menu" aria-labelledby="tagsDropdown" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    {genres.map((genre, index) => (
                                        <li key={index}>
                                            <div className="dropdown-item" onClick={() => navigate(`/search/${genre}`)} style={{ cursor: 'pointer' }}>{genre}</div>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {currentUser.id ? (
                                // Render dropdown for logged-in user
                                <li className="nav-item dropdown">
                                    <div className="nav-link dropdown-toggle pt-0" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                                        {currentUser.avatar ? (
                                            <img src={currentUser.avatar} alt="Avatar" className="avatar" style={{ marginRight: '5px', borderRadius: '50%', width: '25px', height: '25px' }} />
                                        ) : (
                                            <i className="bi bi-person-circle" style={{ fontSize: '1.5rem', marginRight: '5px' }}></i>
                                        )}
                                        {currentUser.name}
                                    </div>
                                    <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                                        <li><div className="dropdown-item" onClick={() => { navigate(`/user/${currentUser.id}`); setDropdownOpen(false) }} style={{ cursor: 'pointer' }}>Profile</div></li>
                                        <li><div className="dropdown-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</div></li>
                                    </ul>
                                </li>
                            ) : (
                                // Render login button if user is not logged in
                                <li className="nav-item">
                                    <div className="nav-link" onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Login</div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
