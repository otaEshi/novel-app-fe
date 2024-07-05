import React from 'react';
import { INovel } from '../../../types/novel';
import NovelBigCard from '../novelBigCard/NovelBigCard';

interface NovelSlideProps {
    novels: INovel[];
    slideId: string;
}

function NovelSlide(props: NovelSlideProps) {
    return (
        <div id={`${props.slideId}`} className="carousel slide" data-bs-ride="carousel">
            {/* Indicators */}
            <div className="carousel-indicators">
                {props.novels ? props.novels.map((novel, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target={`#${props.slideId}`}
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : undefined}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))
                : 
                <div> No novel found</div>
            }
            </div>
            {/* Carousel Items */}
            <div className="carousel-inner" style={{ height: '400px' }}>
                {props.novels ? props.novels && props.novels.map((novel, index) => (
                    <div
                        key={index}
                        className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}
                    >
                        <NovelBigCard novel={novel} />
                    </div>
                ))
                :
                <div> No novel found </div>
            }
            </div>
            {/* Carousel Controls */}
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#${props.slideId}`}
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#${props.slideId}`}
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default NovelSlide;
