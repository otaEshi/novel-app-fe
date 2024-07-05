import React from 'react';

interface ReportModalProps {
    show: boolean;
    handleClose: () => void;
    handleReport: (reason: string) => void;
    usage: string;
}

const ReportModal: React.FC<ReportModalProps> = ({ usage, show, handleClose, handleReport }) => {
    const [reason, setReason] = React.useState('');

    const handleSubmit = () => {
        handleReport(reason);
        handleClose();
    };

    return (
        <div className={`modal ${show ? 'd-block' : ''}`} tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{usage}</h5>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="reportReason">Reason:</label>
                            <textarea
                                id="reportReason"
                                className="form-control"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                rows={3}
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                            Send
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;
