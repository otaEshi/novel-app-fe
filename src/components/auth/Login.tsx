import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { ILogInPayload } from '../../types/auth';
import { logInRequest, userInfoRequest } from './authApi';
import { useNavigate } from 'react-router';
import { showAlert } from '../../utils';

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    //state
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignIn = async () => {
        if (username === '') {
            showAlert("Username is required", "danger");
            return;
        }
        if (password === '') {
            showAlert('Password is required', 'danger');
            return;
        }
        const payload: ILogInPayload = {
            username: username,
            password: password
        };

        const res = await dispatch<any>(logInRequest(payload));
        if (res.meta.requestStatus === 'fulfilled') {
            showAlert('Sign in successfully!', 'success');
            dispatch(userInfoRequest())
            navigate('/')
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSignIn();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === 'username') {
            setUsername(value);
        }
        if (id === 'password') {
            setPassword(value);
        }
    };

    return (
        <>
            <div className="container position-absolute top-50 start-50 translate-middle pb-5">
                <div className="row justify-content-center mb-5 pb-5">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title text-center mb-4">Login</h1>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        value={username || ''}
                                        onChange={(e) => handleInputChange(e)}
                                        placeholder="username"
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        className="form-control"
                                        type="password"
                                        id="password"
                                        value={password || ''}
                                        onChange={(e) => handleInputChange(e)}
                                        placeholder="password"
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div className="mb-3"></div>
                                <div className="mb-3">
                                    <button className="btn btn-primary" onClick={handleSignIn} tabIndex={-1}>
                                        Login
                                    </button>
                                </div>
                                <div>
                                    <p>
                                        Don't have an account?
                                        <span className='link-primary px-1' onClick={() => navigate(`/signup`)} tabIndex={-1}>
                                            Sign up
                                        </span>
                                        or return to the
                                        <span className='link-primary px-1' onClick={() => navigate(`/`)} tabIndex={-1}>
                                            main page
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;