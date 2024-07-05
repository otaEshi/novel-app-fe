import { useState } from 'react';

import { useAppDispatch } from '../../app/hooks';
import { ISignUpPayload } from '../../types/auth';
import { logInRequest, signUpRequest, userInfoRequest } from './authApi';
import { useNavigate } from 'react-router';
import { showAlert } from '../../utils';

function SignUp() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    //state
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');

    const handleSignUp = async () => {

        if (name === '') {
            showAlert('Name is required', 'danger');
            return;
        }

        if (username === '') {
            showAlert('Username is required', 'danger');
            return;
        }

        if (password === '') {
            showAlert('Password is required', 'danger');
            return;
        }

        if (rePassword === '') {
            showAlert('Password is required', 'danger');
            return;
        }

        if (rePassword !== password) {
            showAlert('Password does not match', 'danger');	
            return;
        }

        // Dispatch sign up request
        const payload: ISignUpPayload = {
            name: name,
            username: username,
            password: password,
        };

        const res = await dispatch(signUpRequest(payload))
        if (res.meta.requestStatus === 'fulfilled') {
            showAlert('Sign up successfully!', 'success');
            dispatch(userInfoRequest())
            navigate('/')
        }
    };


    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSignUp();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === 'name') {
            setName(value);
        }
        if (id === 'username') {
            setUsername(value);
        }
        if (id === 'password') {
            setPassword(value);
        }
        if (id === 'rePassword') {
            setRePassword(value);
        }
    };

    return (
        <>
            <div className="container position-absolute top-50 start-50 translate-middle pb-5">
            <div className="row justify-content-center mb-5 pb-5">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title text-center mb-4">Sign up</h1>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        value={name || ''}
                                        onChange={(e) => handleInputChange(e)}
                                        placeholder="name"
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
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
                                        type="text"
                                        id="password"
                                        value={password || ''}
                                        onChange={(e) => handleInputChange(e)}
                                        placeholder="password"
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="rePassword"
                                        value={rePassword || ''}
                                        onChange={(e) => handleInputChange(e)}
                                        placeholder="Re-password"
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-primary" onClick={handleSignUp} tabIndex={-1}>
                                        Sign up
                                    </button>
                                </div>
                                <div>
                                    <p>
                                        Already have an account?
                                        <span className='link-primary px-1' onClick={() => navigate(`/login`)} tabIndex={-1}>
                                            Login
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

export default SignUp;