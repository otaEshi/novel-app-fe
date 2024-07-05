import { useNavigate } from "react-router";
import { INovel } from "../../../types/novel";
import { tags } from "../../../dataTemp";
import { useEffect, useState } from "react";

interface NovelBigCardProps {
    novel: INovel;
}

const MAX_DESCRIPTION_LENGTH = 300; // Set your desired maximum length here

function truncateDescription(description: string, maxLength: number): string {
    if (description.length <= maxLength) {
        return description;
    }
    return description.substring(0, maxLength) + '...';
}

function NovelBigCard(props: NovelBigCardProps) {
    const navigate = useNavigate();
    const { novel } = props;
    const [_novel, set_Novel] = useState<INovel>({
        id: "2",
        title: "The Sign of the Four",
        genres: ["Mystery"],
        author: "Arthur Conan Doyle",
        authorId: "2",
        tags: ["Detectives"],
        image: "https://www.gutenberg.org/cache/epub/2097/pg2097.cover.medium.jpg",
        chapters: 1,
        rating: 4.9,
        ratingCount: 2,
        status: "Completed",
        views: 200456,
        description: "",
        updatedDate: "2000-05-01",
        createdDate: "2000-05-01"
    });

    useEffect(() => {
        if (!novel) return;
        set_Novel(novel);
    }, [novel])

    const truncatedDescription = truncateDescription(_novel.description, MAX_DESCRIPTION_LENGTH);

    return (
        <div 
            className="card h-100 w-100" 
            style={{ backgroundColor: '#adb5bd' }}
        >
            <div className="row g-0 w-100 h-100">
                <div className="col-4">
                    <img 
                        src={_novel.image} 
                        className="img-fluid rounded-start h-100" 
                        alt={_novel.title} 
                    />
                </div>
                <div className="col">
                    <div className="card-body">
                        <h5 
                            className="card-title" 
                            onClick={() => navigate(`/novel/${_novel.id}`)} 
                            style={{ cursor: 'pointer' }}
                        >
                            {_novel.title}
                        </h5>
                        <p className="card-text">
                            <b>Description:</b> {truncatedDescription ? truncatedDescription: 'No description available'}
                        </p>
                        <div>
                            <b>Genres: </b>
                            {_novel.genres && _novel.genres.map(genre => (
                                <span 
                                    key={genre} 
                                    className="badge bg-primary me-1" 
                                    onClick={() => navigate(`/search/${genre}`)} 
                                    style={{ cursor: 'pointer' }}
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                        <div>
                            <b>Tags: </b>
                            {_novel.tags && _novel.tags.map(tag => (
                                <span 
                                    key={tag} 
                                    className="badge bg-primary me-1" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/tags/${tag}`);
                                    }} 
                                    style={{ cursor: 'pointer' }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NovelBigCard;
