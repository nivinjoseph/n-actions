/* eslint-disable @typescript-eslint/return-await */
import { given } from "@nivinjoseph/n-defensive";
import { Delay } from "./delay";
import { Duration } from "./duration";
import { Mutex } from "./mutex";

// public
export function synchronize(delay: Duration): Function;
export function synchronize(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
export function synchronize(delayOrTarget?: unknown, propertyKey?: string, descriptor?: PropertyDescriptor): any
{
    given(delayOrTarget as object, "delayOrTarget").ensureHasValue().ensureIsObject();
    if (delayOrTarget instanceof Duration)
    {
        const delayMs = delayOrTarget.toMilliSeconds();

        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor)
        {
            given(target as object, "target").ensureHasValue().ensureIsObject();
            given(propertyKey, "propertyKey").ensureHasValue().ensureIsString();
            given(descriptor, "descriptor").ensureHasValue().ensureIsObject();

            const original = descriptor.value;
            const mutexKey = Symbol.for(`__$_${propertyKey}_synchronizeMutex`);

            descriptor.value = async function (...params: Array<any>): Promise<any>
            {
                const mutex: Mutex = (<any>this)[mutexKey] ?? new Mutex();
                (<any>this)[mutexKey] = mutex;
                await mutex.lock();

                try
                {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    return await (original as Function).call(this, ...params);
                }
                finally
                {
                    await Delay.milliseconds(delayMs);
                    mutex.release();
                }
            };
        };
    }
    else
    {
        given(propertyKey as string, "propertyKey").ensureHasValue().ensureIsString();
        given(descriptor as object, "descriptor").ensureHasValue().ensureIsObject();

        const original = descriptor!.value;
        const mutexKey = Symbol.for(`__$_${propertyKey}_synchronizeMutex`);

        descriptor!.value = async function (...params: Array<any>): Promise<any>
        {
            const mutex: Mutex = (<any>this)[mutexKey] ?? new Mutex();
            (<any>this)[mutexKey] = mutex;
            await mutex.lock();

            try
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return await (original as Function).call(this, ...params);
            }
            finally
            {
                mutex.release();
            }
        };
    }
}