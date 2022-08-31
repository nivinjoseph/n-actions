import { Exception } from "./exception";


export class ObjectDisposedException extends Exception
{
    public constructor(disposed: object | string)
    {
        const type = typeof disposed === "string" ? disposed : (<Object>disposed).getTypeName();
        
        super(`Object of type '${type ? type : "UNKNOWN"}' has been disposed.`);
    }
}