import { given } from "@nivinjoseph/n-defensive";
import { Delay } from "./delay";
import { Duration } from "./duration";

// public
/**
 * @description Only apply to methods that return void or Promise<void>; Cares about first and last states including intermediary
 */
export function throttle(delay: Duration): Function;
export function throttle(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
export function throttle(delayOrTarget?: unknown, propertyKey?: string, descriptor?: PropertyDescriptor): any
{
    given(delayOrTarget as object, "delayMsOrTarget").ensureHasValue().ensureIsObject();
    if (delayOrTarget instanceof Duration)
    {
        const delayMs = delayOrTarget.toMilliSeconds();

        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor)
        {
            given(target as object, "target").ensureHasValue().ensureIsObject();
            given(propertyKey, "propertyKey").ensureHasValue().ensureIsString();
            given(descriptor, "descriptor").ensureHasValue().ensureIsObject();

            const original = descriptor.value;
            const activeKey = Symbol.for(`__$_${propertyKey}_throttleIsActive`);
            const scheduledCallKey = Symbol.for(`__$_${propertyKey}_throttleScheduledCall`);

            descriptor.value = async function (...params: Array<any>): Promise<void>
            {
                (<any>this)[scheduledCallKey] = async (): Promise<void> =>
                {
                    await (original as Function).call(this, ...params);
                };

                if ((<any>this)[activeKey])
                    return;

                while ((<any>this)[scheduledCallKey] != null && !(<any>this)[activeKey])
                {
                    (<any>this)[activeKey] = true;
                    const currentCall = (<any>this)[scheduledCallKey];
                    (<any>this)[scheduledCallKey] = null;
                    try
                    {
                        await (currentCall as Function)();
                    }
                    finally
                    {
                        await Delay.milliseconds(delayMs);
                        (<any>this)[activeKey] = false;
                    }
                }
            };
        };
    }
    else
    {
        given(propertyKey as string, "propertyKey").ensureHasValue().ensureIsString();
        given(descriptor as object, "descriptor").ensureHasValue().ensureIsObject();

        const original = descriptor!.value;
        const activeKey = Symbol.for(`__$_${propertyKey}_throttleIsActive`);
        const scheduledCallKey = Symbol.for(`__$_${propertyKey}_throttleScheduledCall`);

        descriptor!.value = async function (...params: Array<any>): Promise<void>
        {
            (<any>this)[scheduledCallKey] = async (): Promise<void> =>
            {
                await (original as Function).call(this, ...params);
            };

            if ((<any>this)[activeKey])
                return;

            while ((<any>this)[scheduledCallKey] != null && !(<any>this)[activeKey])
            {
                (<any>this)[activeKey] = true;
                const currentCall = (<any>this)[scheduledCallKey];
                (<any>this)[scheduledCallKey] = null;
                try
                {
                    await (currentCall as Function)();
                }
                finally
                {
                    (<any>this)[activeKey] = false;
                }
            }
        };
    }
}