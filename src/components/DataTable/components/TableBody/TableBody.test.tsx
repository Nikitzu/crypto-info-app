import {render, screen} from '@testing-library/react';
import {MappedAssetWithChange} from '@/types';
import {TableBody } from './TableBody';

jest.mock('../EmptyRow/EmptyRow', () => ({
    __esModule: true,
    EmptyRow: jest.fn(() => <tr data-testid="mockedEmptyRow" />),
}));

jest.mock('../TableRow/TableRow', () => ({
    __esModule: true,
    TableRow: jest.fn(({children}) => <tr data-testid="mockedTableRow">{children}</tr>),
}));

jest.mock('../AssetCell/AssetCell', () => ({
    __esModule: true,
    AssetCell: jest.fn(() => <td data-testid="mockedAssetCell" />),
}));

jest.mock('../LastPriceCell/LastPriceCell', () => ({
    __esModule: true,
    LastPriceCell: jest.fn(() => <td data-testid="mockedLastPriceCell" />),
}));

jest.mock('../VolumeCell/VolumeCell', () => ({
    __esModule: true,
    VolumeCell: jest.fn(() => <td data-testid="mockedVolumeCell" />),
}));

jest.mock('../ChangeCell/ChangeCell', () => ({
    __esModule: true,
    ChangeCell: jest.fn(() => <td data-testid="mockedChangeCell" />),
}));

describe('TableBody', () => {
    const mockAssets: MappedAssetWithChange[] = [
        {
            market: 'BTC-EUR',
            last: '50000.00',
            volumeQuote: '100000.00',
            change: '0.05',
            ask: '100',
            bid: '90',
            open: '100',
        },
        {
            market: 'ETH-USD',
            last: '2000.00',
            volumeQuote: '5000.00',
            change: '0.02',
            ask: '50',
            bid: '45',
            open: '50',
        },
    ];

    test('renders loading state when isRetrying is true', () => {
        render(<table><TableBody assetsToRender={[]} isRetrying={true} isError={false} /></table>);
        const emptyRows = screen.getAllByTestId('mockedEmptyRow');
        expect(emptyRows).toHaveLength(50);
    });

    test('renders error state when isError is true', () => {
        render(<table><TableBody assetsToRender={[]} isRetrying={false} isError={true} /></table>);
        expect(screen.getByTestId('mockedEmptyRow')).toBeInTheDocument();
    });

    test('renders search action state when no assets are present', () => {
        render(<table><TableBody assetsToRender={[]} isRetrying={false} isError={false} /></table>);
        expect(screen.getByTestId('mockedEmptyRow')).toBeInTheDocument();
    });

    test('renders assets in table rows', () => {
        render(<table><TableBody assetsToRender={mockAssets} isRetrying={false} isError={false} /></table>);
        const tableRows = screen.getAllByTestId('mockedTableRow');
        expect(tableRows).toHaveLength(2);
    });


    test('renders AssetCell for each asset', () => {
        render(<table><TableBody assetsToRender={mockAssets} isRetrying={false} isError={false} /></table>);
        const assetCells = screen.getAllByTestId('mockedAssetCell');
        expect(assetCells).toHaveLength(2);
    });

    test('renders LastPriceCell for each asset', () => {
        render(<table><TableBody assetsToRender={mockAssets} isRetrying={false} isError={false} /></table>);
        const lastPriceCells = screen.getAllByTestId('mockedLastPriceCell');
        expect(lastPriceCells).toHaveLength(2);
    });

    test('renders VolumeCell for each asset', () => {
        render(<table><TableBody assetsToRender={mockAssets} isRetrying={false} isError={false} /></table>);
        const volumeCells = screen.getAllByTestId('mockedVolumeCell');
        expect(volumeCells).toHaveLength(2);
    });

    test('renders ChangeCell for each asset', () => {
        render(<table><TableBody assetsToRender={mockAssets} isRetrying={false} isError={false} /></table>);
        const changeCells = screen.getAllByTestId('mockedChangeCell');
        expect(changeCells).toHaveLength(2);
    });
});
