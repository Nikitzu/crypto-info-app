import {memo} from 'react';

type VolumeCellProps = {
    volumeQuote: string;
}

export const VolumeCell = memo(({volumeQuote}: VolumeCellProps) => {
    return (
        <td className="px-6 py-4">
            {new Intl.NumberFormat().format(parseFloat(volumeQuote))}
        </td>
    );
})
VolumeCell.displayName = 'VolumeCell'
