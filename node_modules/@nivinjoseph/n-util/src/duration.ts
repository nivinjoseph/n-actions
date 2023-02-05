import { given } from "@nivinjoseph/n-defensive";


export class Duration
{
    private readonly _ms: number;
    
    
    private constructor(ms: number)
    {
        given(ms, "ms").ensureHasValue().ensureIsNumber().ensure(t => t >= 0);
        this._ms = ms;
    }
    
    public static fromMilliSeconds(milliSeconds: number): Duration
    {
        return new Duration(milliSeconds);
    }
    
    public static fromSeconds(seconds: number): Duration
    {
        given(seconds, "seconds").ensureHasValue().ensureIsNumber();
        
        return this.fromMilliSeconds(seconds * 1000);
    }
    
    public static fromMinutes(minutes: number): Duration
    {
        given(minutes, "minutes").ensureHasValue().ensureIsNumber();
        
        return this.fromSeconds(minutes * 60);
    }
    
    public static fromHours(hours: number): Duration
    {
        given(hours, "hours").ensureHasValue().ensureIsNumber();
        
        return this.fromMinutes(hours * 60);
    }
    
    public static fromDays(days: number): Duration
    {
        given(days, "days").ensureHasValue().ensureIsNumber();
        
        return this.fromHours(days * 24);
    }
    
    public static fromWeeks(weeks: number): Duration
    {
        given(weeks, "weeks").ensureHasValue().ensureIsNumber();
        
        return this.fromDays(weeks * 7);
    }
    
    public toMilliSeconds(round = false): number
    {
        const result = this._ms;
        return round ? Math.round(result) : result;
    }
    
    public toSeconds(round = false): number
    {
        const result = this.toMilliSeconds() / 1000;
        return round ? Math.round(result) : result;
    }

    public toMinutes(round = false): number
    {
        const result = this.toSeconds() / 60;
        return round ? Math.round(result) : result;
    }

    public toHours(round = false): number
    {
        const result = this.toMinutes() / 60;
        return round ? Math.round(result) : result;
    }

    public toDays(round = false): number
    {
        const result = this.toHours() / 24;
        return round ? Math.round(result) : result;
    }
    
    public toWeeks(round = false): number
    {
        const result = this.toDays() / 7;
        return round ? Math.round(result) : result;
    }
}