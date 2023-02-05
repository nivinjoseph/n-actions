import { Duration } from "./duration";
/**
 * @description Only apply to methods that return void or Promise<void>; Only cares about last state including intermediary
 */
export declare function debounce(delay: Duration): Function;
export declare function debounce(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
