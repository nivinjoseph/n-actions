export declare abstract class Delay {
    static hours(value: number, canceller?: DelayCanceller): Promise<void>;
    static minutes(value: number, canceller?: DelayCanceller): Promise<void>;
    static seconds(value: number, canceller?: DelayCanceller): Promise<void>;
    static milliseconds(value: number, canceller?: DelayCanceller): Promise<void>;
}
export declare type DelayCanceller = {
    cancel?(): void;
};
