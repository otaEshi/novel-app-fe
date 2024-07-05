import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const HTTP_STATUS = {
    401: "Unauthorized",
    403: "Permission Denied",
    404: "Page Not Found"
};

interface ErrorPageProps {
    code: 401 | 403 | 404;
    message?: string;
}


function ErrorPage(props: ErrorPageProps) {
    const location = useLocation();

    return (
        <div className="container mt-5 bg-body d-flex flex-column align-items-center">
            <div className="display-1">{props.code}</div>
            <div className='fs-3 mt-3 text-uppercase'>{HTTP_STATUS[props.code]}</div>
            {location.state?.message
                ? <div className="mt-3">{location.state.message}</div>
                : (props.message
                    ? <div className="mt-3">{props.message}</div>
                    : null
                )
            }
            <div className="mt-5">
                <NavLink to={"/"} className="btn btn-primary px-4">
                    <i className="fa fa-home me-2"></i>
                    Return home
                </NavLink>
            </div>
        </div>
    );
}

export default ErrorPage;