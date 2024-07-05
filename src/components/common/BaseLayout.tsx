import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import styles from './BaseLayout.module.scss';

interface BaseLayoutProps {
    className?: string;
}

function BaseLayout(props: BaseLayoutProps) {
    let customClass = props.className ? ` ${props.className}` : "";

    return (
        <div className={`w-100 h-100 position-absolute overflow-auto d-flex flex-column${customClass}`}>
            <div className={`${styles.headerContainer}`}>
                <Header />
            </div>
            <div className={`flex-fill position-relative overflow-auto ${styles.mainContent} px-4 mx-4`}>
                <div className="h-100 container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default BaseLayout;
