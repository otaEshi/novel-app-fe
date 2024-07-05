import React, { useEffect, useState } from "react";
import { IUserInfoResponse } from "../../../types/auth";
import { showAlert } from "../../../utils";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { IGetReportRequest, IHandleReport } from "../../../types/report";
import { handleReportRequest } from "../../admin/adminMainPage/adminApi";
import { useNavigate } from "react-router";
import { getReport } from "../../userPage/userPage/userApi";

interface IChapterReportModalProps {
    currentUser: IUserInfoResponse;
    show: boolean;
    onClose: () => void;
    novelId: string;
}

function ChapterReportModal(props: IChapterReportModalProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const reports = useAppSelector(store => store.novelManagement.currentReports);
    const warnings = useAppSelector(store => store.novelManagement.warnings);

    const [showUnprocessed, setShowUnprocessed] = useState(true);

    const getData = async () => {
        let payload: IGetReportRequest = {
            id: props.novelId,
            userId: props.currentUser.id,
            type: "chapter",
        }
        await dispatch(getReport(payload))
        payload = {
            id: props.novelId,
            userId: props.currentUser.id,
            type: "warning",
        }
        await dispatch(getReport(payload))
    }

    useEffect(() => {
        getData();
    }
        , [props.currentUser.id, props.novelId])

    // Filter reports into processed and unprocessed arrays
    const unprocessedReports = reports.filter(report => !report.processed);
    const processedReports = reports.filter(report => report.processed);
    const unprocessedWarnings = warnings.filter(warning => !warning.processed);
    const processedWarnings = warnings.filter(warning => warning.processed);

    const handleReport = async (reportId: string) => {
        const payload: IHandleReport = {
            userId: props.currentUser.id,
            reportId: reportId,
            processed: true,
        };
        const res = await dispatch(handleReportRequest(payload));
        if (handleReportRequest.fulfilled.match(res)) {
            showAlert("Report handled", "success");
        } else {
            showAlert("Failed to handle report", "danger");
        }
    };

    const onClickChapter = (chapterId: string) => {
        navigate(`/user/${props.currentUser.id}/novels-management/detail/${props.novelId}/chapter-edit/${chapterId}`)
    }

    return (
        <div className={`modal ${props.show ? 'show' : ''}`} style={{ display: props.show ? 'block' : 'none' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Reports</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={props.onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="btn-group mb-3">
                            <button
                                type="button"
                                className={`btn ${showUnprocessed ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setShowUnprocessed(true)}
                            >
                                Unprocessed
                            </button>
                            <button
                                type="button"
                                className={`btn ${!showUnprocessed ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setShowUnprocessed(false)}
                            >
                                Processed
                            </button>
                        </div>
                        {showUnprocessed ? (
                            <>
                                {(unprocessedReports.length === 0 && unprocessedWarnings.length === 0) ? (
                                    <p>No unprocessed reports available.</p>
                                ) : (
                                    <ul className="list-group">
                                        {unprocessedReports && unprocessedReports.map((report) => (
                                            <li key={report.reportId} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h5 className="text-primary" style={{ cursor: 'pointer' }} onClick={() => onClickChapter(report.chapterId)}>{report.chapterTitle}</h5>
                                                    <p>{report.reason}</p>
                                                </div>
                                                <div>
                                                    <button type="button" className="btn btn-primary" onClick={() => handleReport(report.reportId)}>
                                                        Mark as Handled
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                        {unprocessedWarnings && unprocessedWarnings.map((report) => (
                                            <li key={report.reportId} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h5 className="text-warning" >Warning</h5>
                                                    <p>{report.reason}</p>
                                                </div>
                                                <div>
                                                    <button type="button" className="btn btn-primary" onClick={() => handleReport(report.reportId)}>
                                                        Mark as Handled
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ) : (
                            <>
                                {(processedReports.length === 0 && processedWarnings.length === 0) ? (
                                    <p>No processed reports available.</p>
                                ) : (
                                    <ul className="list-group">
                                        {processedReports && processedReports.map((report) => (
                                            <li key={report.reportId} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h5 className="text-primary" style={{ cursor: 'pointer' }} onClick={() => onClickChapter(report.chapterId)}>{report.chapterTitle}</h5>
                                                    <p>{report.reason}</p>
                                                </div>
                                                <div>
                                                    <button type="button" className="btn btn-secondary" disabled>
                                                        Handled
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                        {processedWarnings && processedWarnings.map((report) => (
                                            <li key={report.reportId} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h5 className="text-warning" >Warning</h5>
                                                    <p>{report.reason}</p>
                                                </div>
                                                <div>
                                                    <button type="button" className="btn btn-secondary" disabled>
                                                        Handled
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={props.onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChapterReportModal;
