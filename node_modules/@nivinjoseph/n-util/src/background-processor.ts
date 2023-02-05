import { given } from "@nivinjoseph/n-defensive";
import { Delay } from "./delay";
import { Disposable } from "./disposable";
import { ObjectDisposedException } from "@nivinjoseph/n-exception";

// public
export class BackgroundProcessor implements Disposable
{
    private readonly _defaultErrorHandler: (e: Error) => Promise<void>;
    private readonly _breakIntervalMilliseconds: number;
    private readonly _breakOnlyWhenNoWork: boolean;
    private readonly _actionsToProcess: Array<Action> = new Array<Action>();
    private readonly _actionsExecuting: Array<Action> = new Array<Action>();
    private _isDisposed = false;
    private _timeout: any = null;


    public get queueLength(): number { return this._actionsToProcess.length; }


    public constructor(defaultErrorHandler: (e: Error) => Promise<void>, breakIntervalMilliseconds = 1000, breakOnlyWhenNoWork = true)
    {
        given(defaultErrorHandler, "defaultErrorHandler").ensureHasValue().ensureIsFunction();
        given(breakIntervalMilliseconds, "breakIntervalMilliseconds").ensureHasValue().ensureIsNumber().ensure(t => t >= 0);
        given(breakOnlyWhenNoWork, "breakOnlyWhenNoWork").ensureHasValue().ensureIsBoolean();

        this._defaultErrorHandler = defaultErrorHandler;
        this._breakIntervalMilliseconds = breakIntervalMilliseconds || 0;
        this._breakOnlyWhenNoWork = breakOnlyWhenNoWork;

        this._initiateBackgroundProcessing();
    }


    public processAction(action: () => Promise<void>, errorHandler?: (e: Error) => Promise<void>): void
    {
        if (this._isDisposed)
            throw new ObjectDisposedException(this);
        
        given(action, "action").ensureHasValue().ensureIsFunction();
        given(errorHandler as Function, "errorHandler").ensureIsFunction();

        this._actionsToProcess.push(new Action(action, errorHandler || this._defaultErrorHandler));
    }

    public async dispose(killQueue = false): Promise<void>
    {
        if (this._isDisposed)
            return;
        
        this._isDisposed = true;
        
        if (this._timeout)
            clearTimeout(this._timeout);

        if (!killQueue)
        {
            while (this._actionsToProcess.length > 0)
            {
                const action = this._actionsToProcess.shift()!;
                this._actionsExecuting.push(action);
                action.execute(() => this._actionsExecuting.remove(action));
            }
        }

        while (this._actionsExecuting.length > 0)
            await Delay.seconds(3);
    }


    private _initiateBackgroundProcessing(): void
    {
        if (this._isDisposed)
            return;

        let timeout = this._breakIntervalMilliseconds;
        if (this._breakOnlyWhenNoWork && this._actionsToProcess.length > 0)
            timeout = 0;

        this._timeout = setTimeout(() =>
        {
            if (this._actionsToProcess.length > 0)
            {
                const action = this._actionsToProcess.shift()!;
                this._actionsExecuting.push(action);
                action.execute(() =>
                {
                    this._actionsExecuting.remove(action);
                    this._initiateBackgroundProcessing();
                });
            }
            else
            {
                this._initiateBackgroundProcessing();
            }
        }, timeout);
    }
}


class Action
{
    private readonly _action: () => Promise<void>;
    private readonly _errorHandler: (e: Error) => Promise<void>;


    public constructor(action: () => Promise<void>, errorHandler: (e: Error) => Promise<void>)
    {
        given(action, "action").ensureHasValue().ensureIsFunction();
        given(errorHandler, "errorHandler").ensureHasValue().ensureIsFunction();

        this._action = action;
        this._errorHandler = errorHandler;
    }


    public execute(postExecuteCallback: () => void): void
    {
        given(postExecuteCallback, "postExecuteCallback").ensureHasValue().ensureIsFunction();

        try 
        {
            this._action()
                .then(() =>
                {
                    postExecuteCallback();
                })
                .catch((error) =>
                {
                    try 
                    {
                        this._errorHandler(error)
                            .then(() => postExecuteCallback())
                            .catch((error) =>
                            {
                                console.error(error);
                                postExecuteCallback();
                            });
                    }
                    catch (error)
                    {
                        console.error(error);
                        postExecuteCallback();
                    }
                });
        }
        catch (error)
        {
            try 
            {
                this._errorHandler(error as Error)
                    .then(() => postExecuteCallback())
                    .catch((error) =>
                    {
                        console.error(error);
                        postExecuteCallback();
                    });
            }
            catch (error)
            {
                console.error(error);
                postExecuteCallback();
            }
        }
    }
}