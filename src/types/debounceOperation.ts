import {DebounceFunction} from './debounceFunction.ts';

export type DebounceOperation<T extends (...args: never[]) => never | void> = {
    debouncedFunction: DebounceFunction<T>;
    cancel: () => void;
}