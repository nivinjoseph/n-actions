import { given } from "@nivinjoseph/n-defensive";
import { Buffer } from "buffer";


export class ImageHelper
{
    /**
     * @static
     */
    private constructor() { }
    
    
    public static dataUrlToBuffer(dataUrl: string): Buffer
    {
        given(dataUrl, "dataUrl").ensureHasValue().ensureIsString();
        dataUrl = dataUrl.trim();
        
        const splitted: Array<string> = dataUrl.split(",");
        // fi.fileMime = splitted[0].trim().split(";")[0].substr(5);
        // fi.fileData = splitted[1];
        
        return Buffer.from(splitted[1], "base64");
        
        
        
        // alternative from https://stackoverflow.com/questions/11335460/how-do-i-parse-a-data-url-in-node
        // var fs = require('fs');
        // var string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
        // var regex = /^data:.+\/(.+);base64,(.*)$/;

        // var matches = string.match(regex);
        // var ext = matches[1];
        // var data = matches[2];
        // var buffer = new Buffer(data, 'base64');
    }
}