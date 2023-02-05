export interface Observable<T> {
    subscribe(callback: (eventData: T) => void): Subscription;
}
export interface Subscription {
    readonly event: string;
    readonly isUnsubscribed: boolean;
    unsubscribe(): void;
}
export declare class Observer<T> implements Observable<T> {
    private readonly _event;
    private readonly _subMap;
    get event(): string;
    get hasSubscriptions(): boolean;
    constructor(event: string);
    subscribe(callback: (eventData: T) => void): Subscription;
    notify(eventData: T): void;
    cancel(): void;
    private _cancel;
}
