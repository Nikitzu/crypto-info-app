import {MappedAsset, MappedAssetWithChange} from '@/types';
import {calculateChange} from './calculateChange';
import {updateAssets} from './updateAssets';

jest.mock('./calculateChange', () => ({
    calculateChange: jest.fn(() => 'mockedChange'),
}));

describe('updateAssets', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('updates existing assets and adds new assets', () => {
        const previousAssets: MappedAssetWithChange[] = [
            {
                ask: '10',
                last: '11',
                volumeQuote: '100',
                bid: '9',
                open: '10',
                market: 'BTC/USD',
                change: '0.05',
            },
        ];

        const newAssets: MappedAsset[] = [
            {
                ask: '11',
                last: '12',
                volumeQuote: '120',
                bid: '10',
                open: '11',
                market: 'ETH/USD',
            },
        ];

        const result = updateAssets(previousAssets, newAssets);

        expect(result).toEqual([
            {
                ask: '10',
                last: '11',
                volumeQuote: '100',
                bid: '9',
                open: '10',
                market: 'BTC/USD',
                change: '0.05',
            },
            {
                ask: '11',
                last: '12',
                volumeQuote: '120',
                bid: '10',
                open: '11',
                market: 'ETH/USD',
                change: 'mockedChange',
            },
        ]);

        expect(calculateChange).toHaveBeenCalledWith({
            ask: '11',
            bid: '10',
            open: '11',
        });
    });

    test('updates existing assets with new change values', () => {
        const previousAssets: MappedAssetWithChange[] = [
            {
                ask: '10',
                last: '11',
                volumeQuote: '100',
                bid: '9',
                open: '10',
                market: 'BTC/USD',
                change: '0.05',
            },
        ];

        const newAssets: MappedAsset[] = [
            {
                ask: '10.5',
                last: '12',
                volumeQuote: '120',
                bid: '9.5',
                open: '10.2',
                market: 'BTC/USD',
            },
        ];

        const result = updateAssets(previousAssets, newAssets);

        expect(result).toEqual([
            {
                ask: '10.5',
                last: '12',
                volumeQuote: '120',
                bid: '9.5',
                open: '10.2',
                market: 'BTC/USD',
                change: 'mockedChange',
            },
        ]);

        expect(calculateChange).toHaveBeenCalledWith({
            ask: '10.5',
            bid: '9.5',
            open: '10.2',
        });
    });

    test('handles empty previous assets', () => {
        const previousAssets: MappedAssetWithChange[] = [];

        const newAssets: MappedAsset[] = [
            {
                ask: '11',
                last: '12',
                volumeQuote: '120',
                bid: '10',
                open: '11',
                market: 'ETH/USD',
            },
        ];

        const result = updateAssets(previousAssets, newAssets);

        expect(result).toEqual([
            {
                ask: '11',
                last: '12',
                volumeQuote: '120',
                bid: '10',
                open: '11',
                market: 'ETH/USD',
                change: 'mockedChange',
            },
        ]);

        expect(calculateChange).toHaveBeenCalledWith({
            ask: '11',
            bid: '10',
            open: '11',
        });
    });

    test('handles empty new assets', () => {
        const previousAssets: MappedAssetWithChange[] = [
            {
                ask: '10',
                last: '11',
                volumeQuote: '100',
                bid: '9',
                open: '10',
                market: 'BTC/USD',
                change: '0.05',
            },
        ];

        const newAssets: MappedAsset[] = [];

        const result = updateAssets(previousAssets, newAssets);

        expect(result).toEqual([
            {
                ask: '10',
                last: '11',
                volumeQuote: '100',
                bid: '9',
                open: '10',
                market: 'BTC/USD',
                change: '0.05',
            },
        ]);

        expect(calculateChange).not.toHaveBeenCalled();
    });

    test('handles empty new assets array', () => {
        const previousAssets: MappedAssetWithChange[] = [
            {
                ask: '10',
                last: '11',
                volumeQuote: '100',
                bid: '9',
                open: '10',
                market: 'BTC/USD',
                change: '0.05',
            },
        ];

        const newAssets: MappedAsset[] = [];

        const result = updateAssets(previousAssets, newAssets);

        expect(result).toEqual([
            {
                ask: '10',
                last: '11',
                volumeQuote: '100',
                bid: '9',
                open: '10',
                market: 'BTC/USD',
                change: '0.05',
            },
        ]);

        expect(calculateChange).not.toHaveBeenCalled();
    });

    test('handles empty previous assets array', () => {
        const previousAssets: MappedAssetWithChange[] = [];

        const newAssets: MappedAsset[] = [
            {
                ask: '11',
                last: '12',
                volumeQuote: '120',
                bid: '10',
                open: '11',
                market: 'ETH/USD',
            },
        ];

        const result = updateAssets(previousAssets, newAssets);

        expect(result).toEqual([
            {
                ask: '11',
                last: '12',
                volumeQuote: '120',
                bid: '10',
                open: '11',
                market: 'ETH/USD',
                change: 'mockedChange',
            },
        ]);

        expect(calculateChange).toHaveBeenCalledWith({
            ask: '11',
            bid: '10',
            open: '11',
        });
    });
});
