import {memo} from 'react';

type EmptyRowProps = {
    isSearchAction?: boolean;
    isError?: boolean;
}

export const EmptyRow = memo(({isSearchAction, isError}: EmptyRowProps) => {
    return (
        <tr data-testid='empty-row' className="border-b bg-blue-50 border-gray-400">
            {Array(4).fill(1).map((_, index) => {
                return <td key={index} className="px-6 py-7">
                    {index === 0 && isSearchAction ?
                        (<>
                            <span className="font-medium">We found nothing, sorry!</span> Change your input and try again.
                        </>) : index === 0 && isError ?
                        (<>
                            <span className="font-medium">We run into an error, sorry!</span>
                        </>) : <></>
                    }
                </td>
            })}
        </tr>
    );
})
EmptyRow.displayName = 'EmptyRow'
