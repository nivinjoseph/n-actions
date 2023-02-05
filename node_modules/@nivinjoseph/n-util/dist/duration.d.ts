export declare class Duration {
    private readonly _ms;
    private constructor();
    static fromMilliSeconds(milliSeconds: number): Duration;
    static fromSeconds(seconds: number): Duration;
    static fromMinutes(minutes: number): Duration;
    static fromHours(hours: number): Duration;
    static fromDays(days: number): Duration;
    static fromWeeks(weeks: number): Duration;
    toMilliSeconds(round?: boolean): number;
    toSeconds(round?: boolean): number;
    toMinutes(round?: boolean): number;
    toHours(round?: boolean): number;
    toDays(round?: boolean): number;
    toWeeks(round?: boolean): number;
}
