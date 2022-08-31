import { Exception } from "./exception";
export declare class ObjectDisposedException extends Exception {
    constructor(disposed: object | string);
}
