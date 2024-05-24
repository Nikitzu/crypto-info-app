import {TickerOpenVolumeLowHigh } from '@/types';
import {calculateChange} from './calculateChange';

describe('calculateChange', () => {
    test('calculates change correctly when ask, bid, and open are provided', () => {
        const update: TickerOpenVolumeLowHigh = {
            ask: '12.5',
            bid: '12',
            open: '12.2',
        };

        const result = calculateChange(update);

        expect(result).toEqual('0.41');
    });

    test('handles zero change when open is zero', () => {
        const update: TickerOpenVolumeLowHigh = {
            ask: '12.5',
            bid: '12',
            open: '0',
        };

        const result = calculateChange(update);

        expect(result).toEqual('Invalid data provided');
    });

    test('handles zero change when ask is zero', () => {
        const update: TickerOpenVolumeLowHigh = {
            ask: '0',
            bid: '12',
            open: '12.2',
        };

        const result = calculateChange(update);

        expect(result).toEqual('Invalid data provided');
    });

    test('handles zero change when bid is zero', () => {
        const update: TickerOpenVolumeLowHigh = {
            ask: '12.5',
            bid: '0',
            open: '12.2',
        };

        const result = calculateChange(update);

        expect(result).toEqual('Invalid data provided');
    });

    test('handles zero change when ask, bid, and open are zero', () => {
        const update: TickerOpenVolumeLowHigh = {
            ask: '0',
            bid: '0',
            open: '0',
        };

        const result = calculateChange(update);

        expect(result).toEqual('Invalid data provided');
    });

    test('handles zero change when ask or bid is not provided', () => {
        const update: TickerOpenVolumeLowHigh = {
            bid: '',
            ask: '12.5',
            open: '12.2',
        };

        const result = calculateChange(update);

        expect(result).toEqual('0.00');
    });

    test('handles zero change when open is not provided', () => {
        const update: TickerOpenVolumeLowHigh = {
            ask: '12.5',
            bid: '12',
            open: ''
        };

        const result = calculateChange(update);

        expect(result).toEqual('0.00');
    });

    test('handles zero change when ask, bid, and open are undefined', () => {
        const update: TickerOpenVolumeLowHigh = {
            ask: '',
            bid: '',
            open: ''
        };

        const result = calculateChange(update);

        expect(result).toEqual('0.00');
    });
});
