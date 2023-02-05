import * as SanitizeHtml from "sanitize-html";
import { given } from "@nivinjoseph/n-defensive";


export class HtmlSanitizer
{
    /**
     * @static
     */
    private constructor() { }
    
    
    public static sanitize(html: string): string
    {
        given(html, "html").ensureHasValue().ensureIsString();

        const sanitized = SanitizeHtml(html, this._createOptions());

        return sanitized;
    }
    
    private static _createOptions(): SanitizeHtml.IOptions
    {
        return {
            allowedTags: SanitizeHtml.defaults.allowedTags.concat(["img"]),
            allowedAttributes: Object.assign(SanitizeHtml.defaults.allowedAttributes, {
                "*": ["style", "class"]
            }),
            allowedSchemesByTag: {
                "img": ["http", "https", "data"]
            }
        };
    }
}