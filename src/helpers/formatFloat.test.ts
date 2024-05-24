import {formatFloat} from './formatFloat';

describe('formatFloat', () => {
    it('truncates decimals to max 5', () => {
        expect(formatFloat('0.58421532')).toBe('0.58421');
        expect(formatFloat('0.430531892958')).toBe('0.43053');
    });

    it('truncates decimals with zeros at the beginning', () => {
        expect(formatFloat('0.00430531892958')).toBe('0.0043053');
        expect(formatFloat('0.000430531892958')).toBe('0.00043053');
        expect(formatFloat('0.0134263572357')).toBe('0.013426');
        expect(formatFloat('0.000005')).toBe('0.000005');
    });

    it('truncates decimals till zeros', () => {
        expect(formatFloat('0.0013004263572357')).toBe('0.0013');
        expect(formatFloat('0.0010004263572357')).toBe('0.001');
        expect(formatFloat('0.4305000')).toBe('0.4305');
    });

    it('truncates decimals with int part', () => {
        expect(formatFloat('123')).toBe('123.00');
        expect(formatFloat('1.24235')).toBe('1.2423');
        expect(formatFloat('123.450565')).toBe('123.45');
    });

    it('truncates 0 string', () => {
        expect(formatFloat('0')).toBe('0.00');
    });
});
