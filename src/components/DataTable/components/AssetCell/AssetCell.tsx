import {memo} from 'react';
import marketIcons from '@/assets/market-icons.svg';

type AssetCellProps = {
    market: string;
}

export const AssetCell = memo(({market}: AssetCellProps) => {
    return (
        <th
            scope="row"
            className="flex justify-center px-6 py-4 font-medium text-gray-950 whitespace-nowrap">
            <span><svg viewBox="0 0 24 24" width="24" height="24">
                <use
                    data-testid='svg-icon-use'
                    xlinkHref={`${marketIcons}#${market.toLowerCase()}`}
                    href={`${marketIcons}#${market?.toLowerCase()}`}
                ></use>
            </svg></span>
            <div className='ml-4'>{market}</div>
        </th>
    );
})
AssetCell.displayName = 'AssetCell'
