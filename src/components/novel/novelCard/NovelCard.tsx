import React, { useState } from 'react';
import { INovel } from '../../../types/novel';
import { useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

interface NovelCardProps {
    novel: INovel;
}

const NovelCard: React.FC<NovelCardProps> = ({ novel }) => {
    const navigate = useNavigate();

    const renderItems = (items: string[], navigateTo: (item: string) => void) => {
        if (items.length <= 2) {
            return (
                <>
                    {items.map((item, index) => (
                        <div key={item} className="badge bg-primary me-1 tag" onClick={() => navigateTo(item)} style={{ cursor: 'pointer' }}>
                            {item}
                        </div>
                    ))}
                </>
            );
        } else {
            const visibleItems = items.slice(0, 2);
            const hiddenItems = items.slice(2);

            return (
                <>
                    {visibleItems.map((item, index) => (
                        <div key={item} className="badge bg-primary me-1 tag" onClick={() => navigateTo(item)} style={{ cursor: 'pointer' }}>
                            {item}
                        </div>
                    ))}

                    <div className="badge bg-primary me-1 tag" style={{ cursor: 'pointer' }} onClick={() => navigate(`/novel/${novel.id}`)}>
                        +{hiddenItems.length} more
                    </div>
                </>
            );
        }
    };

    const navigateToGenre = (genre: string) => {
        navigate(`/search/${genre}`);
    };

    const navigateToTag = (tag: string) => {
        navigate(`/tags/${tag}`);
    };

    return (
        <div className="card" style={{ maxWidth: '25rem'}}>
            <img className="card-img-top" src={novel && novel.image} alt="" />
            <div className="card-body">
                <h5 className="card-title" onClick={() => navigate(`/novel/${novel && novel.id}`)} style={{ cursor: 'pointer' }}>
                    {novel && novel.title}
                </h5>
                <p className="card-text">Genres: {renderItems(novel && novel.genres, navigateToGenre)}</p>
                <p className="card-text">Tags: {renderItems(novel && novel.tags || [], navigateToTag)}</p>
            </div>
        </div>
    );
};

export default NovelCard;
