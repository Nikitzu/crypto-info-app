import {ChangeEvent, useCallback, useState} from 'react';
import {SortFields, SortOrder} from '@/enums';
import {MappedAssetWithChange} from '@/types';
import {processAssets} from '@/helpers';
import {SearchBar} from '@/components';
import {TableHeader, TableBody} from './components';

type CustomTableProps = {
    assets: MappedAssetWithChange[];
    isRetrying: boolean;
    isError: boolean;
}

export const DataTable = ({assets, isRetrying, isError}: CustomTableProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<SortFields | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder | ''>('');

    const assetsToRender = processAssets(assets, sortOrder, sortField, searchTerm);

    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    const sortingHandler = useCallback(
        (field: SortFields) => {
            const newSortOrder =
                field === sortField && sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
            setSortField(field);
            setSortOrder(newSortOrder);
        },
        [sortField, sortOrder]
    );

    return (
        <>
            <div className="my-5 mx-5 relative overflow-x-auto">
                <SearchBar onInputChange={onInputChange} />
                <table className="rounded-b-lg table-fixed w-full text-sm text-left rtl:text-right text-gray-950">
                    <TableHeader
                        sortField={sortField}
                        sortOrder={sortOrder}
                        sortingHandler={sortingHandler}
                    />
                    <TableBody
                        assetsToRender={assetsToRender}
                        isError={isError}
                        isRetrying={isRetrying}
                    />
                </table>
            </div>
        </>
    )
}

