import {debounce} from './debounce.ts';

jest.useFakeTimers();

describe('debounce function', () => {
    it('should debounce the function call', () => {
        const originalFunction = jest.fn();
        const { debouncedFunction } = debounce(originalFunction, 500);

        debouncedFunction();
        debouncedFunction();
        debouncedFunction();

        expect(originalFunction).not.toHaveBeenCalled();

        jest.advanceTimersByTime(500);

        expect(originalFunction).toHaveBeenCalledTimes(1);
    });

    it('should cancel the debounced function', () => {
        const originalFunction = jest.fn();
        const { debouncedFunction, cancel } = debounce(originalFunction, 500);

        debouncedFunction();

        cancel();

        jest.advanceTimersByTime(500);

        expect(originalFunction).not.toHaveBeenCalled();
    });

    it('should handle multiple calls with cancellation', () => {
        const originalFunction = jest.fn();
        const { debouncedFunction, cancel } = debounce(originalFunction, 500);

        debouncedFunction();

        cancel();

        debouncedFunction();

        jest.advanceTimersByTime(500);

        expect(originalFunction).toHaveBeenCalledTimes(1);
    });
});
