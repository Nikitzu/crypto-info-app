import {DebounceFunction, DebounceOperation} from '@/types';

export const debounce = <T extends (...args: never[]) => never | void>(
    func: T,
    delay: number
): DebounceOperation<T> => {
    let timeoutId: NodeJS.Timeout;

    const debouncedFunction: DebounceFunction<T> = function (...args: Parameters<T>): void {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };

    const cancel = (): void => {
        clearTimeout(timeoutId);
    };

    return {
        debouncedFunction,
        cancel,
    };
}