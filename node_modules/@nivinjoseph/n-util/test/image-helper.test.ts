import * as Assert from "assert";
import "@nivinjoseph/n-ext";
import { ImageHelper } from "../src";


suite("ImageHelper", () =>
{
    suite("dataUrlToBuffer", () =>
    {
        test("Should work", () =>
        {
            const dataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
            
            const buffer = ImageHelper.dataUrlToBuffer(dataUrl);
            
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            Assert.ok(buffer != null);
            Assert.ok(buffer.byteLength > 0);
            Assert.strictEqual(buffer.toString("base64"), "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==");
        });
    });
});