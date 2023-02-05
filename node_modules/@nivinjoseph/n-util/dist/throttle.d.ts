import { Duration } from "./duration";
/**
 * @description Only apply to methods that return void or Promise<void>; Cares about first and last states including intermediary
 */
export declare function throttle(delay: Duration): Function;
export declare function throttle(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
