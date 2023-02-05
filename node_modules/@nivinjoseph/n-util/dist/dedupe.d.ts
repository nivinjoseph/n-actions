import { Duration } from "./duration";
/**
 * @description Only apply to methods that return void or Promise<void>; Only cares about first state
 */
export declare function dedupe(delay: Duration): Function;
export declare function dedupe(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
