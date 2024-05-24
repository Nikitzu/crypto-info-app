export type DebounceFunction<T extends (...args: never[]) => never | void> = (...args: Parameters<T>) => void;
