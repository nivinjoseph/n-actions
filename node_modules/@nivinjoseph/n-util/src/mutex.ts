import { Deferred } from "./deferred";


export class Mutex
{
    private readonly _deferreds: Array<Deferred<void>>;
    private _currentDeferred: Deferred<void> | null;


    public constructor()
    {
        this._deferreds = new Array<Deferred<void>>();
        this._currentDeferred = null;
    }


    public lock(): Promise<void>
    {
        const deferred = new Deferred<void>();
        this._deferreds.push(deferred);
        if (this._deferreds.length === 1)
        {
            this._currentDeferred = deferred;
            this._currentDeferred.resolve();
        }

        return deferred.promise;
    }

    public release(): void
    {
        if (this._currentDeferred == null)
            return;
        
        this._deferreds.remove(this._currentDeferred);
        this._currentDeferred = this._deferreds[0] || null;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (this._currentDeferred != null)
            this._currentDeferred.resolve();
    }
}