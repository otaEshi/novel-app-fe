import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getFollowers, getFollowing } from "./followApi";
import { IGetFollowRequest, IUserCard } from "../../../types/user";
import { showAlert } from "../../../utils";
import { useEffect, useState } from "react";
import UserCard from "../UserCard";
import { getUser } from "../userPage/userApi";

function FollowPage() {
    const { id, state } = useParams(); // state: followers or following
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const followers = useAppSelector(store => store.follow.followers)
    const following = useAppSelector(store => store.follow.following)
    const user = useAppSelector(store => store.user.user); 

    // use state
    const [users, setUsers] = useState<IUserCard[]>();

    const [searchQuery, setSearchQuery] = useState('');

    // function
    const getFollow = async () => {
        if (!id && !state) return;
        if (state === 'followers') {
            const payload: IGetFollowRequest = {
                userId: id!,
                state: state,
            }
            dispatch(getFollowers(payload));
        }
        if (state === 'following') {
            const payload: IGetFollowRequest = {
                userId: id!,
                state: state,
            }
            dispatch(getFollowing(payload));
        }
    }

    useEffect(() => {
        if (state === 'followers') {
            setUsers(followers);
        } else {
            setUsers(following);
        }
    }, [id, followers, following])

    // use effect
    useEffect(() => {
        if (!id || !state) return
        dispatch(getUser(id));
        getFollow();
        if (!user || user.admin_type !== 0) {
            navigate('/404');
        }
    }, [id, state])

    // active when have backend
    // useEffect(() => {
    //     if (state === 'followers') {
    //         setUsers(followers);
    //     } else {
    //         setUsers(following);
    //     }
    // })

    // Filter users based on search query
    const filteredUsers = users &&  users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!users || user.admin_type !== 0) {
        return null
    }

    return (
        <>
            <div className="container mt-4">
                <div className="btn btn-link mb-3 ps-0" onClick={() => navigate(`/user/${id}`)}> Return </div>
                <div className="row mb-3">
                    <div className="col-12">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search users"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    {filteredUsers && filteredUsers.map(user => (
                        <div key={user.id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <UserCard user={user} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default FollowPage;