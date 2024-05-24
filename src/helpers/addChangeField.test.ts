import {MappedAsset, MappedAssetWithChange} from '@/types';
import {addChangeField} from './addChangeField';
import {calculateChange} from './calculateChange';

jest.mock('./calculateChange', () => ({
    calculateChange: jest.fn(() => 'mockedChange'),
}));

describe('addChangeField', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('adds change field to each asset', () => {
        const mockAssets: MappedAsset[] = [
            {ask: '10', bid: '9', open: '10', last: '11', volumeQuote: '100', market: 'BTC/USD'},
        ];

        const expectedMappedAssetsWithChange: MappedAssetWithChange[] = mockAssets.map((asset) => ({
            ...asset,
            change: 'mockedChange',
        }));

        const result = addChangeField(mockAssets);

        expect(result).toEqual(expectedMappedAssetsWithChange);
        expect(calculateChange).toHaveBeenCalledTimes(mockAssets.length);
    });

    test('handles empty array', () => {
        const result = addChangeField([]);
        expect(result).toEqual([]);
        expect(calculateChange).not.toHaveBeenCalled();
    });

    test('adds change field for assets with undefined bid and open', () => {
        const mockAssets: MappedAsset[] = [
            {ask: '10', bid: '', open: '', last: '11', volumeQuote: '100', market: 'BTC/USD'},
        ];

        const expectedMappedAssetsWithChange: MappedAssetWithChange[] = mockAssets.map((asset) => ({
            ...asset,
            change: 'mockedChange',
        }));

        const result = addChangeField(mockAssets);

        expect(result).toEqual(expectedMappedAssetsWithChange);
        expect(calculateChange).toHaveBeenCalledTimes(mockAssets.length);
    });

    test('handles null calculateChange result', () => {
        (calculateChange as jest.Mock).mockReturnValueOnce(null);

        const mockAssets: MappedAsset[] = [
            {ask: '10', bid: '9', open: '10', last: '11', volumeQuote: '100', market: 'BTC/USD'},
        ];

        const result = addChangeField(mockAssets);

        expect(result.every((asset) => asset.change === null)).toBe(true);
        expect(calculateChange).toHaveBeenCalledTimes(mockAssets.length);
    });
});
