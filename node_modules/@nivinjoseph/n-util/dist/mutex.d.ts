export declare class Mutex {
    private readonly _deferreds;
    private _currentDeferred;
    constructor();
    lock(): Promise<void>;
    release(): void;
}
