import { ArgumentException } from "./argument-exception";
    

export class InvalidArgumentException extends ArgumentException
{
    public constructor(argName: string, innerException?: Error)
    {   
        super(argName, "is invalid", innerException);
    }
}