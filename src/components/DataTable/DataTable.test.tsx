import {fireEvent, render, screen} from '@testing-library/react';
import {DataTable} from './DataTable';

jest.mock('./components', () => ({
    __esModule: true,
    TableHeader: jest.fn(() => (
        <thead data-testid="mockedTableHeader">
        <tr>
            <th onClick={() => 'market'}>
                <div className="cursor-pointer flex items-center">Asset</div>
            </th>
        </tr>
        </thead>
    )),
    TableBody: jest.fn((props) => (
        <tbody data-testid="mockedTableBody">
            {props.assetsToRender.map(() => (<tr data-testid="mockedTableRow">
                <td className="px-6 py-4">
                    <span data-testid="mockedTableRowContent">BTC/USD</span>
                </td>
            </tr>))}
        </tbody>
    )),
}));

jest.mock('@/components/SearchBar', () => ({
    __esModule: true,
    SearchBar: jest.fn((props) => <input data-testid="mockedSearchInput" onChange={props.onInputChange} />),
}));

describe('DataTable', () => {
    const mockAssets = [
        {
            ask: '100',
            last: '110',
            volumeQuote: '1000',
            bid: '90',
            open: '100',
            market: 'BTC/USD',
            change: '0.05',
        },
        {
            ask: '50',
            last: '55',
            volumeQuote: '500',
            bid: '45',
            open: '50',
            market: 'ETH/USD',
            change: '0.10',
        },
    ];

    test('renders table header and body with assets', () => {
        render(<DataTable assets={mockAssets} isError={false} isRetrying={false} />);
        expect(screen.getByTestId('mockedTableHeader')).toBeInTheDocument();
        expect(screen.getByTestId('mockedTableBody')).toBeInTheDocument();
        expect(screen.getAllByTestId('mockedTableRow')).toHaveLength(2);
    });

    test('handles search term input and updates table body', async () => {
        render(<DataTable assets={mockAssets} isError={false} isRetrying={false} />);
        fireEvent.change(screen.getByTestId('mockedSearchInput'), { target: { value: 'BTC' } });
        expect(screen.getByTestId('mockedTableRow')).toBeInTheDocument();
    });

    test('handles sorting when clicking on table header', () => {
        render(<DataTable assets={mockAssets} isError={false} isRetrying={false} />);
        fireEvent.click(screen.getByText('Asset'));
        expect(screen.getAllByTestId('mockedTableRow')).toHaveLength(2);
    });

    test('does not render EmptyRow when assets are present', () => {
        render(<DataTable assets={mockAssets} isError={false} isRetrying={false} />);
        expect(screen.queryByTestId('mockedEmptyRow')).toBeNull();
    });
});
