import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { publicChannelRequest } from './publicEmailApi';
import { endBusy, startBusy } from '../loading/loadingSlice';



interface PublicEmailProps {

}


function PublicEmail(props: PublicEmailProps) {
    const [status, setStatus] = useState("");
    const [data, setData] = useState<Record<string, string>>({});
    const location = useLocation();
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        let _data: Record<string, string> = {};
        let params = location.search.replace("?", "").split("&");
        for (let param of params) {
            let [key, value] = param.split('=');
            _data[key] = value;
        }
        setData(_data);
        async function doEffect() {
            startBusy();
            let res = await dispatch(publicChannelRequest({ search: location.search }));
            if (res.meta.requestStatus === "fulfilled") {
                setStatus(res.payload.message);
            } else {
                setStatus(res.payload.response.data.detail);
            }
            endBusy();
        }
        doEffect();
    }, [dispatch, location]);

    return (
        <div className="container mt-5 bg-body">
            {status && (
                <>
                    <div className="fs-2 mt-3 text-uppercase">{data.action} {data.type}</div>
                    <div className=' mt-3'>{status}</div>
                    <div className="mt-3">
                        <NavLink to={"/"}>
                            <i className="fa fa-home me-2"></i>
                            Return home
                        </NavLink>
                    </div></>
            )}

        </div>

    );
}

export default PublicEmail;