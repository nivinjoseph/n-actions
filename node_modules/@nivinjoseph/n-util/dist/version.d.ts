export declare class Version {
    private readonly _major;
    private readonly _minor;
    private readonly _patch;
    get major(): number;
    get minor(): number;
    get patch(): number;
    get full(): string;
    constructor(semanticVersion: string);
    equals(version: Version): boolean;
    compareTo(version: Version): number;
    toString(): string;
    private _compare;
}
