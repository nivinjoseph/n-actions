import { given } from "@nivinjoseph/n-defensive";

// public
export abstract class Delay // static class
{
    public static async hours(value: number, canceller?: DelayCanceller): Promise<void>
    {
        given(value, "value").ensureHasValue().ensureIsNumber().ensure(t => t >= 0, "value has to be 0 or greater");
        await Delay.minutes(value * 60, canceller);
    }
    
    public static async minutes(value: number, canceller?: DelayCanceller): Promise<void>
    {
        given(value, "value").ensureHasValue().ensureIsNumber().ensure(t => t >= 0, "value has to be 0 or greater");
        await Delay.seconds(value * 60, canceller);
    }
    
    public static async seconds(value: number, canceller?: DelayCanceller): Promise<void>
    {
        given(value, "value").ensureHasValue().ensureIsNumber().ensure(t => t >= 0, "value has to be 0 or greater");
        await Delay.milliseconds(value * 1000, canceller);
    }
    
    public static milliseconds(value: number, canceller?: DelayCanceller): Promise<void>
    {
        return new Promise<void>((resolve, reject) =>
        {
            try 
            {
                given(value, "value").ensureHasValue().ensureIsNumber().ensure(t => t >= 0, "value has to be 0 or greater");
                given(canceller, "canceller").ensureIsObject();
                const timer = setTimeout(() => resolve(), value);
                if (canceller)
                    canceller.cancel = (): void =>
                    {
                        clearTimeout(timer);
                        resolve();
                    };
            }
            catch (error)
            {
                reject(error);
            }
        });
    }
}

export type DelayCanceller = { cancel?(): void; };