import {memo} from 'react';

type ChangeCellProps = {
    change: string
}

export const ChangeCell = memo(({change}: ChangeCellProps) => {
    const color = parseFloat(change) > 0 ? 'text-green-600' : 'text-red-600'
    return (
        <td className={`${color} px-6 py-4`}>
            {change}
        </td>
    );
})
ChangeCell.displayName = 'ChangeCell'
