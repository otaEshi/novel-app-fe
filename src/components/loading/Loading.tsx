import styles from './Loading.module.scss';


interface LoadingProps {
    fade: boolean;
    show: boolean;
}

const defaultProps: Partial<LoadingProps> = {
    fade: true,
    show: true
};

function Loading(props: LoadingProps) {
    return (
        <div className={`${styles.loadingContainer} ${props.show ? styles.show : ""} ${props.fade ? styles.fade : ""}`} onContextMenu={e => e.preventDefault()}>
            <div className={`${styles.loadingPanel}`}>
                <div className={`${styles.loadingSpinner}`} />
                <div className={styles.loadingText}>Loading</div>
            </div>
        </div>
    );
}

Loading.defaultProps = defaultProps;

export default Loading;