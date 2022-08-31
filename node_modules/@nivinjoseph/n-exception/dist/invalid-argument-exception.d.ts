import { ArgumentException } from "./argument-exception";
export declare class InvalidArgumentException extends ArgumentException {
    constructor(argName: string, innerException?: Error);
}
