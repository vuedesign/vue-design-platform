import { useEffect, useState } from 'react';
import { Left, Right } from '@icon-park/react';
import styles from './Pagination.module.scss';

export type PaginationProps = {
    total: number;
    size: number;
    page: number;
    onPage: (page: number) => void;
    onSize: (size: number) => void;
};

function createPageNumber(total: number, size: number): number[] {
    const pages = getPages(total, size);
    let pageNumber = [];
    for (let i = 0; i < pages; i++) {
        pageNumber.push(i + 1);
    }
    return pageNumber;
}

function getPages(total: number, size: number): number {
    return Math.ceil(total / size);
}

export const Pagination = (props: PaginationProps) => {
    const [isPrevDisable, setIsPrevDisable] = useState(false);
    const [isNextDisable, setIsNextDisable] = useState(false);
    const [views, setViews] = useState(props.total ? [1] : []);

    setIsPrevDisable(props.page <= 1);
    const pages = getPages(props.total, props.size);
    setIsNextDisable(props.page >= pages);
    //   useEffect(() => {
    //     // setIsPrevDisable(props.page <= 1)
    //     // const pages = getPages(props.total, props.size)
    //     // setIsNextDisable(props.page >= pages)
    //   })

    useEffect(() => {
        const defaultViews = createPageNumber(props.total, props.size);
        setViews(defaultViews);
    }, [props.total, props.size]);

    const handlePage = (page: number) => {
        const pages = getPages(props.total, props.size);
        if (page < 1 || page > pages) {
            return;
        }
        props.onPage && props.onPage(page);
    };

    const handlePrev = () => {
        !isPrevDisable && handlePage(props.page - 1);
    };

    const handleNext = () => {
        !isNextDisable && handlePage(props.page + 1);
    };

    return (
        <div className={styles.container}>
            <Left
                theme="outline"
                size="20"
                fill={isPrevDisable ? '#ccc' : '#333'}
                onClick={handlePrev}
            />
            {views.map((item) => (
                <span
                    key={item}
                    className={item === props.page ? styles.active : ''}
                    onClick={() => handlePage(item)}>
                    {item}
                </span>
            ))}
            <Right
                theme="outline"
                size="20"
                fill={isNextDisable ? '#ccc' : '#333'}
                onClick={handleNext}
            />
        </div>
    );
};
