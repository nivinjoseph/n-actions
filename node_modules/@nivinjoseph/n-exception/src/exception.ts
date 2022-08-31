export abstract class Exception extends Error
{
    private readonly _name: string;
    // private readonly _message: string;
    // private readonly _stack: string;
    private readonly _innerException: Error | null;
    
    
    public override get name(): string { return this._name; }
    // public get message(): string { return this._message; }
    // public get stack(): string { return this._stack; }
    public get innerException(): Error | null { return this._innerException; }
    
    
    public constructor(message: string, innerException?: Error)
    {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (message == null || message.isEmptyOrWhiteSpace())
            message = "<none>";

        super(message);
        this.message = message;
        
        this._name = (<Object>this).getTypeName();
        this._innerException = innerException ?? null;
        
        // if ((<any>message) instanceof Error)
        // {
        //     let err = (<any>message) as Error;
        //     this._message = err.message;
        //     this._stack = err.stack;
        // }
        // else
        // {
        //     if (message == null || message.isEmptyOrWhiteSpace())
        //         message = "<none>";

        //     this._message = message;
        //     this._stack = this.generateStackTrace();
        //     this._innerException = innerException ? innerException : null;
        // }
    }
    
    // public static fromError(error: Error): Exception
    // {
    //     return new Exception(error as any);
    // }
    
    // public toString(): string
    // {
    //     // return "{0}: {1}".format(this._name, this.message);
        
    //     let log = this.stack;
    //     if (this.innerException != null)
    //         log = log + "\n" + "Inner Exception --> " + this.innerException.toString();

    //     return log;
    // }
    
    // public toLogString(): string
    // {
    //     let log = this.stack;
    //     if (this.innerException != null)
    //         log = log + "\n" + "Inner Exception --> " +
    //             (this.innerException instanceof Exception
    //                 ? (<Exception>this.innerException).toLogString()
    //                 : this.innerException.stack);
        
    //     return log;
    // }
    
    
    // private generateStackTrace(): string
    // {
    //     let err = new Error();
    //     let splitted = err.stack.split(/\r?\n/g);
    //     let mark = "at new {0}".format(this.name);
    //     let index = null;
    //     for (let i = 0; i < splitted.length; i++)
    //     {
    //         if (splitted[i].trim().startsWith(mark))
    //         {
    //             index = i + 1;
    //             break;
    //         }
    //     }
    //     splitted = index != null ? splitted.skip(index) : splitted.skip(1);
    //     splitted = [this.toString()].concat(splitted);
    //     return splitted.join("\n");
    // }
}