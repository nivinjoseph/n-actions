export class Deferred<T>
{
    private readonly _promise: Promise<T>;
    private _resolve!: (value: T) => void;
    private _reject!: (reason?: any) => void;


    public get promise(): Promise<T> { return this._promise; }


    public constructor()
    {
        this._promise = new Promise<T>((resolve, reject) =>
        {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    public resolve(value: T): void
    {
        this._resolve(value);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public reject(reason?: any): void
    {
        this._reject(reason);
    }
}