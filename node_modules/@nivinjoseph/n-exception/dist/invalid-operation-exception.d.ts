import { Exception } from "./exception";
export declare class InvalidOperationException extends Exception {
    private readonly _reason;
    get reason(): string;
    constructor(reason: string, innerException?: Error);
}
