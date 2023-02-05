import { given } from "@nivinjoseph/n-defensive";
import { Delay } from "./delay";
import { Duration } from "./duration";

// public
/**
 * @description Only apply to methods that return void or Promise<void>; Only cares about first state
 */
export function dedupe(delay: Duration): Function;
export function dedupe(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
export function dedupe(delayOrTarget?: unknown, propertyKey?: string, descriptor?: PropertyDescriptor): any
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
            const activeKey = Symbol.for(`__$_${propertyKey}_dedupeIsActive`);

            descriptor.value = async function (...params: Array<any>): Promise<void>
            {
                if (!(<any>this)[activeKey])
                {
                    (<any>this)[activeKey] = true;

                    try
                    {
                        await (original as Function).call(this, ...params);
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
        const activeKey = Symbol.for(`__$_${propertyKey}_dedupeIsActive`);

        descriptor!.value = async function (...params: Array<any>): Promise<void>
        {
            if (!(<any>this)[activeKey])
            {
                (<any>this)[activeKey] = true;

                try
                {
                    await (original as Function).call(this, ...params);
                }
                finally
                {
                    (<any>this)[activeKey] = false;
                }
            }
        };
    }
}