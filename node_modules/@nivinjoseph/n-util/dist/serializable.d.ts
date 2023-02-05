export declare abstract class Serializable<TData extends object = {}> {
    constructor(data: TData);
    serialize(): TData;
}
export declare class Deserializer {
    private static readonly _typeCache;
    /**
     * @static
     */
    private constructor();
    static hasType(typeName: string): boolean;
    static registerType(type: object | Function): void;
    static deserialize<T>(serialized: object): T;
    private static _getType;
}
export declare function serialize(key: string): Function;
export declare function serialize(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
export declare function deserialize(target: Function): void;
