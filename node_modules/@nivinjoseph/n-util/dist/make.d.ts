export declare abstract class Make {
    private constructor();
    static retry<T>(func: (...params: Array<any>) => Promise<T>, numberOfRetries: number, errorPredicate?: (error: any) => boolean): (...params: Array<any>) => Promise<T>;
    static retryWithDelay<T>(func: (...params: Array<any>) => Promise<T>, numberOfRetries: number, delayMS: number, errorPredicate?: (error: any) => boolean): (...params: Array<any>) => Promise<T>;
    static retryWithExponentialBackoff<T>(func: (...params: Array<any>) => Promise<T>, numberOfRetries: number, errorPredicate?: (error: any) => boolean): (...params: Array<any>) => Promise<T>;
    static syncToAsync<T>(func: (...params: Array<any>) => T): (...params: Array<any>) => Promise<T>;
    static callbackToPromise<T>(func: (...params: Array<any>) => void): (...params: Array<any>) => Promise<T>;
    static loop(func: (index: number) => void, numberOfTimes: number): void;
    static loopAsync(asyncFunc: (index: number) => Promise<void>, numberOfTimes: number, degreesOfParallelism?: number): Promise<void>;
    static errorSuppressed<T extends (...params: Array<any>) => U, U>(func: T, defaultValue?: U | null): T;
    static errorSuppressedAsync<T extends (...params: Array<any>) => Promise<U>, U>(asyncFunc: T, defaultValue?: U | null): T;
    /**
     *
     * @param min inclusive
     * @param max exclusive
     */
    static randomInt(min: number, max: number): number;
    static randomCode(numChars: number): string;
    static randomTextCode(numChars: number, caseInsensitive?: boolean): string;
    static randomNumericCode(numChars: number): string;
}
