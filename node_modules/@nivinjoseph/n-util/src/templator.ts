import * as Mustache from "mustache";
import { given } from "@nivinjoseph/n-defensive";


export class Templator
{
    private readonly _template: string;
    private readonly _tokens: ReadonlyArray<string>;
    
    
    public get template(): string { return this._template; }
    public get tokens(): ReadonlyArray<string> { return this._tokens; }
       
    
    public constructor(template: string)
    {
        given(template, "template").ensureHasValue().ensureIsString();
        this._template = template;
        
        const tokens = Mustache.parse(this._template);
        this._tokens = tokens.filter(t => t[0] === "name").map(t => t[1]);
    }
    
    
    public render(data: Object): string
    {
        given(data, "data").ensureHasValue().ensureIsObject();
        
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return Mustache.render(this._template, data, null as any, { escape: (t) => t });
    }
}