import {render, screen} from '@testing-library/react';
import {TableRow} from './TableRow';

jest.mock('@/assets/market-icons.svg', () => 'svg-test-file');

describe('TableRow', () => {
    test('renders table row with children', () => {
        render(
            <table>
                <tbody>
                    <TableRow>
                        <td>Cell 1</td>
                        <td>Cell 2</td>
                    </TableRow>
                </tbody>
            </table>
        );

        const cell1 = screen.getByText('Cell 1');
        const cell2 = screen.getByText('Cell 2');

        expect(cell1).toBeInTheDocument();
        expect(cell2).toBeInTheDocument();
    });
});

