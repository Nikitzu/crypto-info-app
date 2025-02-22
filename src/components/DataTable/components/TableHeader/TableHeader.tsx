import {memo} from 'react';
import {SortFields, SortOrder} from '@/enums';
import {MappedAssetWithChange} from '@/types';

type TableHeaderProps = {
    sortingHandler: (field: SortFields) => void;
    sortField: keyof MappedAssetWithChange | null;
    sortOrder: SortOrder | '';
}

export const TableHeader = memo(({sortingHandler, sortField, sortOrder}: TableHeaderProps) => {
    const headerClassString = 'cursor-pointer px-6 py-3';
    const headerCellsFields = Object.values(SortFields);
    const headerCellsNames = Object.keys(SortFields);

    return (
        <thead className="text-sm uppercase bg-blue-300 text-black">
            <tr>
                {headerCellsFields.map((field, index) => {
                    return (
                        <th
                            key={field}
                            onClick={() => sortingHandler(field as SortFields)}
                            scope="col"
                            className={index === 0 ? headerClassString + ' flex justify-center' : headerClassString}
                        >
                            <div className="cursor-pointer flex items-center">
                                {headerCellsNames[index]}
                                {
                                    sortField === field && <svg className="text-black" data-testid="sortingIndicator" transform={sortOrder === SortOrder.DESC ? 'scale(1,-1)' : ''} height="12px" width="12px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M156.092,156.092l76.636-76.634v409.27C232.727,501.58,243.147,512,256,512 c12.853,0,23.273-10.42,23.273-23.273V79.458l76.636,76.634c4.543,4.546,10.499,6.817,16.455,6.817 c5.956,0,11.913-2.271,16.455-6.817c9.089-9.089,9.089-23.824,0-32.912L272.46,6.82c-0.545-0.545-1.117-1.058-1.713-1.547 c-0.261-0.216-0.538-0.402-0.807-0.604c-0.34-0.254-0.67-0.515-1.021-0.751c-0.327-0.219-0.667-0.408-1.001-0.608 c-0.316-0.189-0.625-0.388-0.953-0.562c-0.343-0.183-0.694-0.338-1.046-0.504c-0.338-0.16-0.67-0.329-1.016-0.472 c-0.341-0.141-0.689-0.256-1.035-0.379c-0.369-0.133-0.737-0.276-1.116-0.389c-0.346-0.104-0.694-0.18-1.043-0.268 c-0.388-0.098-0.771-0.206-1.167-0.285c-0.399-0.079-0.802-0.126-1.202-0.183c-0.349-0.051-0.694-0.116-1.049-0.152 c-0.738-0.073-1.482-0.11-2.225-0.112C256.045,0.003,256.025,0,256,0c-0.025,0-0.045,0.003-0.07,0.003 c-0.743,0.002-1.485,0.039-2.225,0.112c-0.354,0.036-0.7,0.101-1.049,0.152c-0.402,0.057-0.805,0.104-1.202,0.183 c-0.396,0.078-0.779,0.186-1.167,0.285c-0.349,0.088-0.697,0.163-1.043,0.268c-0.379,0.115-0.745,0.256-1.116,0.389 c-0.346,0.124-0.694,0.237-1.035,0.379c-0.348,0.143-0.68,0.312-1.016,0.472c-0.352,0.164-0.703,0.321-1.046,0.504 c-0.327,0.174-0.636,0.372-0.953,0.562c-0.335,0.2-0.675,0.389-1.001,0.608c-0.352,0.236-0.681,0.496-1.021,0.751 c-0.268,0.202-0.546,0.388-0.807,0.604c-0.596,0.489-1.168,1.004-1.713,1.547L123.181,123.181c-9.089,9.089-9.089,23.824,0,32.912 C132.268,165.18,147.005,165.18,156.092,156.092z"></path>
                                        </g>
                                    </svg>
                                }
                            </div>
                        </th>
                    )
                })}
            </tr>
        </thead>
    );
})
TableHeader.displayName = 'TableHeader'
