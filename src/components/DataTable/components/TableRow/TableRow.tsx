import {memo, PropsWithChildren} from 'react';

export const TableRow = memo(({children}: PropsWithChildren) => {
    return (
        <tr className="border-b bg-blue-50 border-gray-400">
            {children}
        </tr>
    );
})
TableRow.displayName = 'TableRow'
