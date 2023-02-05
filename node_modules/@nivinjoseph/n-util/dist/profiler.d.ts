export declare class Profiler {
    private readonly _id;
    private readonly _traces;
    get id(): string;
    get traces(): ReadonlyArray<ProfilerTrace>;
    constructor(id: string);
    trace(message: string): void;
}
export interface ProfilerTrace {
    readonly dateTime: number;
    readonly message: string;
    readonly diffMs: number;
}
