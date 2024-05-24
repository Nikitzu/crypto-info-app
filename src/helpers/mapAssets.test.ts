import {Ticker24hUpdate} from '@/types';
import {mapAssets} from './mapAssets';

describe('mapAssets', () => {
    const validAsset: Ticker24hUpdate = {
        ask: '10',
        askSize: '100',
        market: 'BTC/USD-EUR',
        timestamp: 1642200000,
        bid: '9',
        bidSize: '90',
        high: '12',
        last: '11',
        low: '8',
        open: '10',
        volume: '500',
        volumeQuote: '5000',
    };

    const nullValuesAsset: Ticker24hUpdate = {
        ask: '',
        askSize: '',
        market: 'LTC/USD-EUR',
        timestamp: 1642200000,
        bid: null,
        bidSize: null,
        high: null,
        last: null,
        low: null,
        open: null,
        volume: null,
        volumeQuote: null,
    };

    test('maps assets correctly with valid data', () => {
        const result = mapAssets([validAsset]);

        expect(result).toEqual([
            {
                ask: '10',
                last: '11',
                volumeQuote: '5000',
                bid: '9',
                open: '10',
                market: 'BTC/USD',
            },
        ]);
    });

    test('handles assets with null values', () => {
        const result = mapAssets([nullValuesAsset]);

        expect(result).toEqual([
            {
                ask: '',
                last: '',
                volumeQuote: '',
                bid: '',
                open: '',
                market: 'LTC/USD',
            },
        ]);
    });
});
