export declare class Templator {
    private readonly _template;
    private readonly _tokens;
    get template(): string;
    get tokens(): ReadonlyArray<string>;
    constructor(template: string);
    render(data: Object): string;
}
