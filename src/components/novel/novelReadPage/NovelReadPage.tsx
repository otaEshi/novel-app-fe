import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { setTheme, setFontSize, setFontFamily, setLineHeight } from './novelReadPageSlice';
import styles from './NovelReadPage.module.scss'; // Import CSS Module
import { useNavigate, useParams } from 'react-router';
import { getChapter, getTotalChapter } from './novelReadPageApi';
import CommentPanel from '../../comment/CommenPanel';

function NovelReadPage() {
    const { novel_id, chapter_number } = useParams<{ novel_id: string; chapter_number: string; }>();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { content, title, theme, fontSize, fontFamily, lineHeight, totalChapter, comments } = useAppSelector(store => store.novelReadPage);

    // useEffect

    // function
    const getData = async () => {
        if (!novel_id || !chapter_number) return;
        await dispatch(getChapter({ novel_id, chapter_number }))
        await dispatch(getTotalChapter(novel_id))
    }

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setTheme(event.target.value));
    };

    const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFontSize(parseInt(event.target.value, 10)));
    };

    const handleFontFamilyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFontFamily(event.target.value));
    };

    const handleLineHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setLineHeight(parseFloat(event.target.value)));
    };

    // Split content into sentences based on period (.)
    const sentences = content.split('.');

    // Dummy functions for navigation (replace with actual functionality)
    const goToPreviousChapter = () => {
        chapter_number && navigate(`/novel/${novel_id}/chapter/${parseInt(chapter_number, 10) - 1}`)
    };

    const toIndex = () => {
        navigate(`/novel/${novel_id}`)
    };

    const goToNextChapter = () => {
        chapter_number && navigate(`/novel/${novel_id}/chapter/${parseInt(chapter_number, 10) + 1}`)
    };

    // if not found
    // useEffect(() => {
    //     if (!novel_id || !chapter_number) {
    //         navigate('/404');
    //     } else {
    //         getData()
    //     }
    // }, [novel_id, chapter_number])

    // if (!novel_id || !chapter_number) return null;

    return (
        <>
            <div className={`${styles.novelReadPage} ${theme === 'dark' ? styles.dark : ''} ${theme === 'lightYellow' ? styles.lightYellow : ''}`}>
                <div className={styles.novelContentPanel}>
                    <div
                        className={styles.novelContent}
                        style={{ fontSize: `${fontSize}px`, fontFamily, lineHeight: `${lineHeight}` }}
                    >
                        <h1> {title} </h1>
                        {sentences.map((sentence, index) => (
                            <p key={index}>{sentence.trim()}.</p>
                        ))}
                    </div>
                </div>
                <div className={`${styles.novelSettingsPanel} ${styles.novelSettingsPanelCompact}`}>
                    <h3>Settings</h3>
                    <div className="form-group pb-2">
                        <label htmlFor="theme">Theme:</label>
                        <select id="theme" className="mt-1 form-control" value={theme} onChange={handleThemeChange}>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="lightYellow">Light Yellow</option>
                        </select>
                    </div>
                    <div className="form-group pb-2">
                        <label htmlFor="fontSize mt-1">Font Size:</label>
                        <input
                            id="fontSize"
                            type="number"
                            className="form-control"
                            value={fontSize}
                            onChange={handleFontSizeChange}
                            min="12"
                            max="32"
                        />
                    </div>
                    <div className="form-group pb-2">
                        <label htmlFor="fontFamily">Font Family:</label>
                        <select
                            id="fontFamily"
                            className="form-control mt-1"
                            value={fontFamily}
                            onChange={handleFontFamilyChange}
                        >
                            <option value="Arial">Arial</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Courier New">Courier New</option>
                            {/* Add more font options as needed */}
                        </select>
                    </div>
                    <div className="form-group pb-2">
                        <label htmlFor="lineHeight">Line Height:</label>
                        <input
                            id="lineHeight"
                            type="number"
                            className="form-control mt-1"
                            value={lineHeight}
                            onChange={handleLineHeightChange}
                            step="0.1"
                            min="1"
                            max="2"
                        />
                    </div>
                </div>
            </div>
            <div className={`${styles.chapterNavigation} d-flex justify-content-center`}>
                {chapter_number !== "1" &&
                    <button className={`btn btn-link`} onClick={goToPreviousChapter}>Previous Chapter</button>
                }
                <button className={`btn btn-link`} onClick={toIndex}>Novel</button>
                {totalChapter !== chapter_number &&
                    <button className="btn btn-link" onClick={goToNextChapter}>Next Chapter</button>
                }
            </div>
            <hr />
            <CommentPanel comments={comments} novelId={novel_id} />
        </>
    );
}

export default NovelReadPage;
