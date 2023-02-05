import { given } from "@nivinjoseph/n-defensive";
import { ArgumentException, InvalidArgumentException } from "@nivinjoseph/n-exception";
import { TypeHelper } from "./type-helper";


export class Version
{
    private readonly _major: number;
    private readonly _minor: number;
    private readonly _patch: number;
    
    
    public get major(): number { return this._major; }
    public get minor(): number { return this._minor; }
    public get patch(): number { return this._patch; }
    
    public get full(): string { return `${this._major}.${this._minor}.${this._patch}`; }
    
    
    public constructor(semanticVersion: string)
    {
        given(semanticVersion, "semanticVersion").ensureHasValue().ensureIsString();
        semanticVersion = semanticVersion.trim();
        
        const split = semanticVersion.split(".");
        if (split.length !== 3)
            throw new InvalidArgumentException("semanticVersion");
        
        const major = TypeHelper.parseNumber(split[0]);
        if (major == null)
            throw new ArgumentException("semanticVersion", "invalid major");
        this._major = major;
        
        const minor = TypeHelper.parseNumber(split[1]);
        if (minor == null)
            throw new ArgumentException("semanticVersion", "invalid minor");
        this._minor = minor;
        
        const patch = TypeHelper.parseNumber(split[2]);
        if (patch == null)
            throw new ArgumentException("semanticVersion", "invalid patch");
        this._patch = patch;
    }
    
    
    public equals(version: Version): boolean
    {
        given(version, "version").ensureHasValue().ensureIsObject().ensureIsInstanceOf(Version);
        
        return version.major === this.major && version.minor === this.minor && version.patch === this.patch;
    }
    
    public compareTo(version: Version): number
    {
        given(version, "version").ensureHasValue().ensureIsObject().ensureIsInstanceOf(Version);
        
        const majorCompare = this._compare(this.major, version.major);
        if (majorCompare !== 0)
            return majorCompare;
        
        const minorCompare = this._compare(this.minor, version.minor);
        if (minorCompare !== 0)
            return minorCompare;
        
        return this._compare(this.patch, version.patch);
    }
    
    public toString(): string
    {
        return this.full;
    }
    
    private _compare(v1: number, v2: number): number
    {
        given(v1, "v1").ensureHasValue().ensureIsNumber();
        given(v2, "v2").ensureHasValue().ensureIsNumber();
        
        if (v1 > v2)
            return 1;
        if (v1 < v2)
            return -1;
        else
            return 0;
    }
}