import "@nivinjoseph/n-ext";
export interface Ensurer<T> {
    ensureHasValue(when?: boolean | (() => boolean)): this | never;
    ensure(func: (arg: T) => boolean): this | never;
    ensure(func: (arg: T) => boolean, reason: string): this | never;
    ensureWhen(when: boolean | (() => boolean), func: (arg: T) => boolean): this | never;
    ensureWhen(when: boolean | (() => boolean), func: (arg: T) => boolean, reason: string): this | never;
}
export interface StringEnsurer extends Ensurer<string> {
    ensureIsString(when?: boolean | (() => boolean)): this | never;
    ensureIsEnum(enumType: object, when?: boolean | (() => boolean)): this | never;
}
export interface NumberEnsurer extends Ensurer<number> {
    ensureIsNumber(when?: boolean | (() => boolean)): this | never;
    ensureIsEnum(enumType: object, when?: boolean | (() => boolean)): this | never;
}
export interface BooleanEnsurer extends Ensurer<boolean> {
    ensureIsBoolean(when?: boolean | (() => boolean)): this | never;
}
export interface ArrayEnsurer<TItem> extends Ensurer<ReadonlyArray<TItem>> {
    ensureIsArray(when?: boolean | (() => boolean)): this | never;
    ensureIsNotEmpty(when?: boolean | (() => boolean)): this | never;
}
export interface FunctionEnsurer extends Ensurer<Function> {
    ensureIsFunction(when?: boolean | (() => boolean)): this | never;
}
declare type PrimitiveTypeInfo = "string" | "boolean" | "number" | "function" | "array" | "object" | "any";
declare type ComplexTypeInfo = Record<string, PrimitiveTypeInfo | ArrayTypeInfo | NestedComplexTypeInfo>;
interface NestedComplexTypeInfo extends Record<string, PrimitiveTypeInfo | ArrayTypeInfo | ComplexTypeInfo> {
}
declare type ArrayTypeInfo = Array<PrimitiveTypeInfo | NestedComplexTypeInfo>;
export declare type TypeStructure = NestedComplexTypeInfo;
export interface ObjectEnsurer<T extends object> extends Ensurer<T> {
    ensureIsObject(when?: boolean | (() => boolean)): this | never;
    ensureIsType(type: new (...args: Array<any>) => T, when?: boolean | (() => boolean)): this | never;
    ensureIsInstanceOf(type: Function & {
        prototype: T;
    }, when?: boolean | (() => boolean)): this | never;
    ensureHasStructure(structure: TypeStructure, when?: boolean | (() => boolean)): this | never;
}
declare type Nullable<T> = T | null | undefined;
declare type CondUnionNullable<T> = NonNullable<Nullable<T>>;
declare function given<T>(arg: T, argName: string): T extends CondUnionNullable<string> ? StringEnsurer : T extends CondUnionNullable<number> ? NumberEnsurer : T extends CondUnionNullable<boolean> ? BooleanEnsurer : T extends CondUnionNullable<ReadonlyArray<infer U>> ? ArrayEnsurer<U> : T extends CondUnionNullable<Function> ? FunctionEnsurer : T extends CondUnionNullable<object> ? ObjectEnsurer<T> : never;
export { given };
