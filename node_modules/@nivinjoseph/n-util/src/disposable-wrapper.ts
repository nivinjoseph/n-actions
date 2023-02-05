import { given } from "@nivinjoseph/n-defensive";
import { Disposable } from "./disposable";

// public
export class DisposableWrapper implements Disposable
{
    private readonly _disposeFunc: () => Promise<void>;
    private _isDisposed = false;
    private _disposePromise: Promise<void> | null = null;
    
    
    public constructor(disposeFunc: () => Promise<void>)
    {
        given(disposeFunc, "disposeFunc").ensureHasValue().ensureIsFunction();
        this._disposeFunc = disposeFunc;
    }
    
    
    public dispose(): Promise<void>
    {
        if (!this._isDisposed)
        {
            this._isDisposed = true;
            this._disposePromise = this._disposeFunc();
        }
        
        return this._disposePromise!;
    }
}