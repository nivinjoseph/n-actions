import { ArgumentException } from "./argument-exception";


export class ArgumentNullException extends ArgumentException
{
    public constructor(argName: string, innerException?: Error)
    {    
        super(argName, "is NULL", innerException);
    }
}