import { Exception } from "./exception";


export class NotImplementedException extends Exception
{
    public constructor()
    {
        super("Not implemented.");
    }
}