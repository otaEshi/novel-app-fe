import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppSelector } from "../../../app/hooks";
import UserManagement from "../userManagement/UserManagement";
import AdminNovelSearch from "../novelSearch/AdminNovelSearch";
import AdminReport from "../report/AdminReport";
import AdminDashboard from "../adminDashboard/AdminDashboard";

function AdminMainPage() {
    const params = useParams();
    const navigate = useNavigate();
    const currentUser = useAppSelector(store => store.auth.currentUser);
    const [selectedPanel, setSelectedPanel] = useState<'Dashboard' | 'Reports' | 'Search Novel' | 'Admin Management'>('Dashboard');

    useEffect(() => {
        if (!currentUser || currentUser.admin_type === 0 || !currentUser.admin_type) {
            navigate('/404');
        }
    }, [currentUser, navigate]);

    useLayoutEffect(() => {
        if (params.panel && params.panel === 'reports') {
            setSelectedPanel( `Reports` );
        } else if (params.panel && params.panel === 'search-novel') {
            setSelectedPanel( `Search Novel` );
        } else if (params.panel && params.panel === 'admin-management' && currentUser.admin_type === 2) {
            setSelectedPanel( `Admin Management` );
        } 
        navigate(`/admin/`)
    }, [params.panel])

    if (!currentUser || currentUser.admin_type === 0 || !currentUser.admin_type) {
        return null;
    }


    return (
        <div className="position-absolute container-fluid vh-100 d-flex p-0">
            <nav className="nav-panel col-md-2 bg-dark text-light p-4 d-flex flex-column">
                <h4 className="text-center mb-4">Admin</h4>
                <ul className="nav flex-column nav-pills">
                    <li className="nav-item mb-2">
                        <button
                            className={`btn btn-dark text-start w-100 ${selectedPanel === 'Dashboard' ? 'active' : ''}`}
                            onClick={() => setSelectedPanel('Dashboard')}
                        >
                            Dashboard
                        </button>
                    </li>
                    <li className="nav-item mb-2">
                        <button
                            className={`btn btn-dark text-start w-100 ${selectedPanel === 'Reports' ? 'active' : ''}`}
                            onClick={() => setSelectedPanel('Reports')}
                        >
                            Reports
                        </button>
                    </li>
                    <li className="nav-item mb-2">
                        <button
                            className={`btn btn-dark text-start w-100 ${selectedPanel === 'Search Novel' ? 'active' : ''}`}
                            onClick={() => setSelectedPanel('Search Novel')}
                        >
                            Search novel
                        </button>
                    </li>
                    {currentUser.admin_type === 2 &&
                        (<li className="nav-item">
                            <button
                                className={`btn btn-dark text-start w-100 ${selectedPanel === 'Admin Management' ? 'active' : ''}`}
                                onClick={() => setSelectedPanel('Admin Management')}
                            >
                                Admin management
                            </button>
                        </li>)}
                </ul>
            </nav>
            <div className="col-md-10 bg-light p-4 overflow-auto">
                {selectedPanel === 'Dashboard' && (
                    <div>
                        <AdminDashboard />
                    </div>
                )}
                {selectedPanel === 'Reports' && (
                    <div>
                        <AdminReport currentUser={currentUser}/>
                    </div>
                )}
                {selectedPanel === 'Search Novel' && (
                    <div>
                        <AdminNovelSearch currentUser={currentUser} />
                    </div>
                )}
                {selectedPanel === 'Admin Management' && (
                    <div>
                        <UserManagement currentUser={currentUser} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminMainPage;
