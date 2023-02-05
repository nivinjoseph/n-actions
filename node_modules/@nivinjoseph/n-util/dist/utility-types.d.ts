/**
 * From T, pick a set of properties as optional whose keys are in the union K
 */
export declare type PartialPick<T, K extends keyof T> = {
    [P in K]?: T[P];
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
export declare type Schema<T, K extends keyof T> = {
    -readonly [P in K]: T[P];
};
/**
 * From T, pick a set of properties as optional whose keys are in the union K
 */
export declare type PartialSchema<T, K extends keyof T> = {
    -readonly [P in K]?: T[P];
};
export declare type ClassDefinition<T extends {}> = new (...args: Array<any>) => T;
export declare type ClassHierarchy<T extends {}> = Function & {
    prototype: T;
};
