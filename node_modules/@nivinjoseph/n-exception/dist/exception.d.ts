export declare abstract class Exception extends Error {
    private readonly _name;
    private readonly _innerException;
    get name(): string;
    get innerException(): Error | null;
    constructor(message: string, innerException?: Error);
}
