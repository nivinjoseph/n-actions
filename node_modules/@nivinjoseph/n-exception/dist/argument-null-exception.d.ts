import { ArgumentException } from "./argument-exception";
export declare class ArgumentNullException extends ArgumentException {
    constructor(argName: string, innerException?: Error);
}
