export declare class TypeHelper {
    /**
     * @static
     */
    private constructor();
    static parseBoolean(value: unknown): boolean | null;
    static parseNumber(value: unknown): number | null;
    static enumTypeToTuples<T extends string | number>(enumClass: object): Array<[string, T]>;
    static impossible(_value: never, message?: string): never;
    private static _getEnumTuples;
    private static _isNumber;
}
