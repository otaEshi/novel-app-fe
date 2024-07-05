import React, { useEffect, useState } from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import { useAppSelector } from '../../app/hooks';
import Loading from './Loading';


// TODO: Improve logic for loading
// Delay to show for 0.5s then fadeIn in 0.5s
// When a startBusy is fired, the loadingContainer should show immediately 
// to prevent user to interactive with GUI, such as clicking button or input text...


function LoadingContainer() {
    // Tracking if any promise is inprogress
    const { promiseInProgress } = usePromiseTracker();

    const show = useAppSelector(state => state.loading.show);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;
        setShowLoader(show);

        return () => {
            timeout && clearTimeout(timeout);
        };
    }, [show]);

    return (
        // If any promise is inprogress or function startBusy is called then show the loader
        promiseInProgress || showLoader ? <Loading /> : null
    );
}

export default LoadingContainer;