export declare class Deferred<T> {
    private readonly _promise;
    private _resolve;
    private _reject;
    get promise(): Promise<T>;
    constructor();
    resolve(value: T): void;
    reject(reason?: any): void;
}
