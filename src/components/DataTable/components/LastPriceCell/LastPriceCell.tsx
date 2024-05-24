import {memo} from 'react';
import {formatFloat} from '@/helpers';

type LastPriceCellProps = {
    lastPrice: string;
}

export const LastPriceCell = memo(({lastPrice}: LastPriceCellProps) => {
    return (
        <td className="px-6 py-4">
            €{formatFloat(lastPrice)}
        </td>
    );
})
LastPriceCell.displayName = 'LastPriceCell'
