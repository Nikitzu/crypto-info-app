import {SortFields, SortOrder} from '@/enums';
import {MappedAssetWithChange} from '@/types';
import {processAssets} from './processAssets';

describe('processAssets', () => {
    const testAssets: MappedAssetWithChange[] = [
        { ask: '51000', last: '50000', volumeQuote: '1000', bid: '49500', open: '49000', market: 'BTC', change: '5%' },
        { ask: '2050', last: '2000', volumeQuote: '500', bid: '1980', open: '2100', market: 'ETH', change: '-3%' },
        { ask: '1.52', last: '1.5', volumeQuote: '200', bid: '1.48', open: '1.55', market: 'XRP', change: '2%' },
    ];

    test('should return assets sorted by numeric field in ascending order', () => {
        const processedAssets = processAssets(testAssets, SortOrder.ASC, SortFields.Price);

        expect(processedAssets).toHaveLength(3);
        expect(processedAssets[0].market).toBe('XRP');
        expect(processedAssets[1].market).toBe('ETH');
        expect(processedAssets[2].market).toBe('BTC');
    });

    test('should return assets sorted by numeric field in descending order', () => {
        const processedAssets = processAssets(testAssets, SortOrder.DESC, SortFields.Price);

        expect(processedAssets).toHaveLength(3);
        expect(processedAssets[0].market).toBe('BTC');
        expect(processedAssets[1].market).toBe('ETH');
        expect(processedAssets[2].market).toBe('XRP');
    });

    test('should return assets unchanged when no sorting field is provided', () => {
        const processedAssets = processAssets(testAssets, SortOrder.ASC, null);

        expect(processedAssets).toEqual(testAssets);
    });

    test('should return assets unchanged when sortOrder is empty', () => {
        const processedAssets = processAssets(testAssets, '', SortFields.Price);

        expect(processedAssets[0].market).toEqual(testAssets[0].market);
    });

    test('should return assets unchanged when assets array is empty', () => {
        const processedAssets = processAssets([], SortOrder.ASC, SortFields.Price);

        expect(processedAssets).toEqual([]);
    });

    test('should return assets sorted by Asset field in ascending order', () => {
        const processedAssets = processAssets(testAssets, SortOrder.ASC, SortFields.Asset);

        expect(processedAssets).toHaveLength(3);
        expect(processedAssets[0].market).toBe('BTC');
        expect(processedAssets[1].market).toBe('ETH');
        expect(processedAssets[2].market).toBe('XRP');
    });

    test('should return assets sorted by Asset field in descending order', () => {
        const processedAssets = processAssets(testAssets, SortOrder.DESC, SortFields.Asset);

        expect(processedAssets).toHaveLength(3);
        expect(processedAssets[0].market).toBe('XRP');
        expect(processedAssets[1].market).toBe('ETH');
        expect(processedAssets[2].market).toBe('BTC');
    });

    test('should return assets filtered by searchTerm', () => {
        const searchTerm = 'eth';
        const filteredAssets = processAssets(testAssets, SortOrder.ASC, SortFields.Asset, searchTerm);

        expect(filteredAssets).toHaveLength(1);
        expect(filteredAssets[0].market).toBe('ETH');
    });

    test('should return assets filtered and sorted by non-Asset field in ascending order', () => {
        const searchTerm = 'eth';
        const processedAssets = processAssets(testAssets, SortOrder.ASC, SortFields.Change, searchTerm);

        expect(processedAssets).toHaveLength(1);
        expect(processedAssets[0].market).toBe('ETH');
        expect(processedAssets[0].change).toBe('-3%');
    });

    test('should return assets filtered and sorted by non-Asset field in descending order', () => {
        const searchTerm = 'eth';
        const processedAssets = processAssets(testAssets, SortOrder.DESC, SortFields.Change, searchTerm);

        expect(processedAssets).toHaveLength(1);
        expect(processedAssets[0].market).toBe('ETH');
        expect(processedAssets[0].change).toBe('-3%');
    });

    test('should return assets sorted by market in ascending order when sortField is Asset', () => {
        const processedAssets = processAssets(testAssets, SortOrder.ASC, SortFields.Asset);

        expect(processedAssets).toHaveLength(3);
        expect(processedAssets[0].market).toBe('BTC');
        expect(processedAssets[1].market).toBe('ETH');
        expect(processedAssets[2].market).toBe('XRP');
    });

    test('should return assets sorted by market in descending order when sortField is Asset', () => {
        const processedAssets = processAssets(testAssets, SortOrder.DESC, SortFields.Asset);

        expect(processedAssets).toHaveLength(3);
        expect(processedAssets[0].market).toBe('XRP');
        expect(processedAssets[1].market).toBe('ETH');
        expect(processedAssets[2].market).toBe('BTC');
    });

    test('should return assets sorted by market in ascending order when sortField is Asset (additional case)', () => {
        const additionalTestAssets: MappedAssetWithChange[] = [
            { ask: '400', last: '410', volumeQuote: '1000', bid: '390', open: '395', market: 'DEF', change: '5%' },
            { ask: '300', last: '290', volumeQuote: '500', bid: '310', open: '305', market: 'ABC', change: '-3%' },
            { ask: '200', last: '210', volumeQuote: '200', bid: '190', open: '195', market: 'XYZ', change: '2%' },
        ];

        const processedAssets = processAssets(additionalTestAssets, SortOrder.ASC, SortFields.Asset);

        expect(processedAssets).toHaveLength(3);
        expect(processedAssets[0].market).toBe('ABC');
        expect(processedAssets[1].market).toBe('DEF');
        expect(processedAssets[2].market).toBe('XYZ');
    });

    test('should return assets unchanged when searchTerm is empty', () => {
        const searchTerm = '';
        const unchangedAssets = processAssets(testAssets, SortOrder.ASC, SortFields.Asset, searchTerm);

        expect(unchangedAssets).toEqual(testAssets);
    });
});
