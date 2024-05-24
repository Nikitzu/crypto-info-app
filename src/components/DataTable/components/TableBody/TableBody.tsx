import {MappedAssetWithChange} from '@/types';
import {EmptyRow} from '../EmptyRow/EmptyRow';
import {TableRow} from '../TableRow/TableRow';
import {AssetCell} from '../AssetCell/AssetCell';
import {LastPriceCell} from '../LastPriceCell/LastPriceCell';
import {VolumeCell} from '../VolumeCell/VolumeCell';
import {ChangeCell} from '../ChangeCell/ChangeCell';

interface TableBodyProps {
    assetsToRender: MappedAssetWithChange[],
    isRetrying: boolean;
    isError: boolean;
}

export const TableBody = ({assetsToRender, isRetrying, isError}: TableBodyProps) => {
    if (isRetrying) {
        return (
            <tbody className="animate-pulse divide-y">
                {Array(50).fill(1).map((_, index) => {
                    return <EmptyRow key={index}/>
                })}
            </tbody>
        )
    }
    if (isError) {
        return (
            <tbody className="divide-y">
                <EmptyRow isError={isError} />
            </tbody>
        )
    }
    if (!assetsToRender.length) {
        return (
            <tbody className="divide-y">
                <EmptyRow isSearchAction={true} />
            </tbody>
        )
    }
    return (
        <tbody className="divide-y">
            {assetsToRender.map((asset) => {
                return (
                    <TableRow key={asset.market}>
                        <AssetCell market={asset.market}/>
                        <LastPriceCell lastPrice={asset.last} />
                        <VolumeCell volumeQuote={asset.volumeQuote} />
                        <ChangeCell change={asset.change} />
                    </TableRow>
                )
            })}
        </tbody>
    )
}
