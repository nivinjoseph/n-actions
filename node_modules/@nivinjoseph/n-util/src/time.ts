import { given } from "@nivinjoseph/n-defensive";

/**
 * @static
 */
export class Time
{
    private constructor() { }
    
    
    public static isPast(time: number): boolean
    {
        given(time, "time").ensureHasValue().ensureIsNumber();
        
        return time < Date.now();
    }
    
    public static isFuture(time: number): boolean
    {
        given(time, "time").ensureHasValue().ensureIsNumber();

        return time > Date.now();
    }
}