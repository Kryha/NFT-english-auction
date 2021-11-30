export type Timestamp = number;

export type APIHook<T = void> = () => [() => Promise<T>, boolean];
