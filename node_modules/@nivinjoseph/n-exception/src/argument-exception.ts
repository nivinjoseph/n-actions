import { Exception } from "./exception";


export class ArgumentException extends Exception
{
    private readonly _argName: string;
    private readonly _reason: string;
    
    
    public get argName(): string { return this._argName; }
    public get reason(): string { return this._reason; }
    
    
    public constructor(argName: string, reason: string, innerException?: Error)
    {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (argName == null || argName.isEmptyOrWhiteSpace())
            argName = "<UNKNOWN>";

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (reason == null || reason.isEmptyOrWhiteSpace())
            reason = "is not valid";
        
        const message = `Argument '${argName}' ${reason}.`;

        super(message, innerException);
        
        this._argName = argName;
        this._reason = reason;
    }
}