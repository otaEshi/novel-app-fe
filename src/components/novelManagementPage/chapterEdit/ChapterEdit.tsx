import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { ICreateNovelChapterRequest, INovelChapter, IUpdateChapterRequest } from "../../../types/novel";
import { createChapterNovel, updateChapter } from "../novelManagementApi";
import { showAlert } from "../../../utils";

function ChapterEdit() {
    const { id, novelId, chapterId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector(state => state.auth.currentUser);
    const currentNovelChapters = useAppSelector(state => state.novelManagement.currentNovelChapters);

    const [chapter, setChapter] = useState<INovelChapter | undefined>();

    useEffect(() => {
        if (id && novelId && chapterId) {
            const foundChapter = currentNovelChapters.find(chapter => chapter.id === chapterId);
            if (foundChapter) {
                setChapter(foundChapter);
            }
        }
    }, [id, novelId, chapterId, currentNovelChapters]);

    useEffect(() => {
        if (!currentUser || currentUser.id !== id) {
            navigate('/404');
        }
    }, [currentUser, id, navigate]);

    if (!currentUser || currentUser.id !== id) {
        return null;
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChapter(prevChapter => ({
            ...prevChapter!,
            title: e.target.value
        }));
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setChapter(prevChapter => ({
            ...prevChapter!,
            content: e.target.value
        }));
    };

    const handleSaveChapter = async () => {
        if (!chapterId) return;
        if (!chapter?.content) {
            showAlert('Chapter content is required', 'danger');
            return;
        }

        const payload: IUpdateChapterRequest = {
            id: chapterId,
            userId: currentUser.id,
            title: chapter?.title || '',
            content: chapter?.content,
            status: 'Published'
        };
        const res = await dispatch(updateChapter(payload));
        if (updateChapter.fulfilled.match(res)) {
            navigate(`/user/${currentUser.id}/novels-management/detail/${novelId}`);
            showAlert('Chapter updated successfully', 'success');
        } else if (updateChapter.rejected.match(res)) {
            showAlert('Failed to update chapter', 'danger');
        }
    };

    const handleCreateChapter = async () => {
        if (!novelId) return;
        if (!chapter?.content) {
            showAlert('Chapter content is required', 'danger');
            return;
        }

        const payload: ICreateNovelChapterRequest = {
            novelId: novelId,
            title: chapter?.title || '',
            content: chapter.content,
            status: 'Published'
        };
        const res = await dispatch(createChapterNovel(payload));
        if (createChapterNovel.fulfilled.match(res)) {
            navigate(`/user/${currentUser.id}/novels-management/detail/${novelId}`);
            showAlert('Chapter created successfully', 'success');
        } else if (createChapterNovel.rejected.match(res)) {
            showAlert('Failed to create chapter', 'danger');
        }
    };

    const handleReturn = () => {
        navigate(`/user/${currentUser.id}/novels-management/detail/${novelId}`);
    };

    return (
        <div className="container">
            <div className="mb-3">
                <label htmlFor="chapterTitle" className="form-label">Chapter Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="chapterTitle"
                    value={chapter?.title || ''}
                    onChange={handleTitleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="chapterContent" className="form-label">Chapter Content</label>
                <textarea
                    className="form-control"
                    id="chapterContent"
                    rows={20}
                    value={chapter?.content || ''}
                    onChange={handleContentChange}
                ></textarea>
            </div>
            {chapterId === "new" ?
                (
                    <button className="btn btn-primary me-2" onClick={handleCreateChapter}>Create</button>
                ) :
                (
                    <button className="btn btn-primary me-2" onClick={handleSaveChapter}>Save</button>
                )
            }
            <button className="btn btn-secondary" onClick={handleReturn}>Return</button>
        </div>
    );
}

export default ChapterEdit;
