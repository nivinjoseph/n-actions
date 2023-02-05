import * as uuid from "uuid";


// public
export class Uuid
{
    private constructor() { }


    public static create(): string
    {
        return uuid.v4();
    }
}