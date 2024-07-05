
type PageOption = { value: number, label: string; } | number;

interface ISelectOptionsProps {
    size: "sm" | "lg" | null,
    sizePerPage: number,
    sizePerPageOptions: PageOption[],
    onSizeChange: (size: number) => void,
}

interface IPaginationProps extends ISelectOptionsProps {
    page: number,
    totalSize: number,
    pagesNextToActivePage: number,
    itemsPerPageText: string,
    showItemsPerPage: boolean,
    onPageChange: (page: number) => void,
}

const pagination = (lastPage: number, props: IPaginationProps) => {
    let { page, pagesNextToActivePage } = props;
    let current = page,
        last = lastPage,
        delta = pagesNextToActivePage,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l = undefined,
        isDotsIncludes = false;

    if (current <= delta * 2 + 2) {
        left = 1;
        right = delta * 2 + 4;
    }
    if (current > lastPage - (delta * 2 + 2)) {
        left = lastPage - (delta * 2 + 2);
        right = lastPage;
    }
    if (lastPage <= delta * 4 + 1) {
        left = 1;
        right = delta * 4 + 1;
    }
    for (let i = 1; i <= last; i++) {
        if (i === 1 || i === last || (i >= left && i < right)) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l && i - l !== 1) {
            rangeWithDots.push(
                <li className="page-item disabled" key={isDotsIncludes ? -1 : 0}>
                    <span className="page-link">...</span>
                </li>
            );
            isDotsIncludes = true;
        }
        rangeWithDots.push(
            <li className={page === i ? "page-item active" : "page-item"} key={i}>
                <span className="page-link" onClick={(e) => { e.preventDefault(); props.onPageChange(i); }}>
                    {i}
                </span>
            </li>
        );
        l = i;
    }
    return rangeWithDots;
};


const SelectOptions = (props: ISelectOptionsProps) => {
    const { sizePerPage, sizePerPageOptions, size } = props;

    const optionsList = sizePerPageOptions.map((option, index) => {
        if (typeof option === 'number') {
            return <option key={index} value={option}>{option}</option>;
        } else if (typeof option === 'object') {
            return <option key={index} value={option.value}>{option.label}</option>;
        }
        return null;
    });

    return (
        <select
            className={size ? `form-select form-select-${size}` : "form-select"}
            value={sizePerPage}
            onChange={(e) => props.onSizeChange(parseInt(e.target.value))}
        >
            {optionsList}
        </select>
    );
};

const SimplePagination = (props: IPaginationProps) => {
    const { totalSize, sizePerPage, page, itemsPerPageText, size, showItemsPerPage } = props;
    let pageNum = Math.ceil(totalSize / sizePerPage);
    let pageList = pagination(pageNum, props);
    return (
        <div className="d-flex justify-content-end align-items-center flex-wrap gap-2">
            {showItemsPerPage ?
                <div className="d-flex align-items-center">
                    <div className="me-1">
                        <SelectOptions {...props} />
                    </div>
                    <div>{itemsPerPageText}</div>
                </div>
                : null
            }
            <ul className={"pagination mb-0 " + (size ? `pagination-${size} ` : "")}>
                <li className={page === 1 ? "page-item disabled" : "page-item"}>
                    <span className="page-link" onClick={(e) => { e.preventDefault(); props.onPageChange(page - 1); }}>
                        Prev
                    </span>
                </li>
                {pageList}
                <li className={page === pageNum ? "page-item disabled" : "page-item"}>
                    <span className="page-link" onClick={(e) => { e.preventDefault(); props.onPageChange(page + 1); }}>
                        Next
                    </span>
                </li>
            </ul>
        </div>
    );
};

SimplePagination.defaultProps = {
    page: 1,
    size: null,
    sizePerPage: 10,
    totalSize: 0,
    pagesNextToActivePage: 1,
    sizePerPageOptions: [10, 25, 50, 100],
    itemsPerPageText: 'items',
    showItemsPerPage: true
};

export default SimplePagination;