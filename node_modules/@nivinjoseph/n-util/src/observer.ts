import { given } from "@nivinjoseph/n-defensive";
import { Uuid } from "./uuid";


export interface Observable<T>
{
    subscribe(callback: (eventData: T) => void): Subscription;
}


export interface Subscription
{
    readonly event: string;
    readonly isUnsubscribed: boolean;
    unsubscribe(): void;
}


export class Observer<T> implements Observable<T>
{
    private readonly _event: string;
    private readonly _subMap = new Map<string, SubInfo<T>>();


    public get event(): string { return this._event; }
    public get hasSubscriptions(): boolean { return this._subMap.size > 0; }


    public constructor(event: string)
    {
        given(event, "event").ensureHasValue().ensureIsString();
        this._event = event.trim();
    }
    
    
    public subscribe(callback: (eventData: T) => void): Subscription
    {
        given(callback, "callback").ensureHasValue().ensureIsFunction();
        
        const key = Uuid.create();
        
        const subscription = {
            event: this._event,
            isUnsubscribed: false,
            unsubscribe: () => this._cancel(key)
        };
        
        this._subMap.set(key, {
            subscription,
            callback
        });
        
        return subscription;
    }

    public notify(eventData: T): void
    {
        // no defensive check cuz eventData can be void

        if (!this.hasSubscriptions)
            return;
        
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (process && process.nextTick)
        {
            for (const entry of this._subMap.values())
            {
                // eslint-disable-next-line @typescript-eslint/unbound-method
                process.nextTick(entry.callback, eventData);
            }
        }
        else
        {
            for (const entry of this._subMap.values())
            {
                // eslint-disable-next-line @typescript-eslint/unbound-method
                setTimeout(entry.callback, 0, eventData);
            }
        }
    }
    
    public cancel(): void
    {
        for (const key of this._subMap.keys())
            this._cancel(key);
    }

    private _cancel(key: string): void
    {
        const subInfo = this._subMap.get(key);
        if (subInfo == null)
            return;
        
        // @ts-expect-error: deliberately setting readonly property
        subInfo.subscription.isUnsubscribed = true;
        subInfo.subscription.unsubscribe = (): void => { /** deliberately empty */};
        this._subMap.delete(key);
    }
}

interface SubInfo<T>
{
    subscription: Subscription;
    callback(eventData: T): void;
}