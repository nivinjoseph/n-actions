import { Disposable } from "./disposable";
export declare class BackgroundProcessor implements Disposable {
    private readonly _defaultErrorHandler;
    private readonly _breakIntervalMilliseconds;
    private readonly _breakOnlyWhenNoWork;
    private readonly _actionsToProcess;
    private readonly _actionsExecuting;
    private _isDisposed;
    private _timeout;
    get queueLength(): number;
    constructor(defaultErrorHandler: (e: Error) => Promise<void>, breakIntervalMilliseconds?: number, breakOnlyWhenNoWork?: boolean);
    processAction(action: () => Promise<void>, errorHandler?: (e: Error) => Promise<void>): void;
    dispose(killQueue?: boolean): Promise<void>;
    private _initiateBackgroundProcessing;
}
