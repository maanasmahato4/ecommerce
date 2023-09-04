import {useState, useEffect} from 'react';
import { useStatsApi } from '../api/statistics.api';
import {Pagination} from "@mantine/core";

function PaginationComponent({page}: any) {
    const { getProductCount } = useStatsApi();
    const [pageCount, setPageCount] = useState<number>(0);
    const [activePage, setActivePage] = useState<number>(1);

    useEffect(() => {
        const fetchProductCount = async () => {
            try {
                const count = await getProductCount();

                console.log(count);
                setPageCount(Math.ceil(count / 5));
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductCount();
    }, [pageCount]);

    useEffect(() => {page(activePage)}, [activePage, page]);
    
    return (
        <Pagination total={pageCount} value={activePage} onChange={setActivePage} withEdges  />
    )
}

export default PaginationComponent;