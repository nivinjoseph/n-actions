import * as Assert from "assert";
import "@nivinjoseph/n-ext";
import { Duration } from "../src/duration";


suite("Duration", () =>
{
    suite("fromSeconds", () =>
    {
        test("Should work", () =>
        {
            Assert.strictEqual(Duration.fromSeconds(1).toMilliSeconds(), 1000);
        });
    });

    suite("fromMinutes", () =>
    {
        test("should work", () =>
        {
            Assert.strictEqual(Duration.fromMinutes(1).toMilliSeconds(), 60000);
        });
    });

    suite("fromHours", () =>
    {
        test("should work", () =>
        {
            Assert.strictEqual(Duration.fromHours(1).toMilliSeconds(), 3600000);
        });
    });
    
    suite("fromDays", () =>
    {
        test("should work", () =>
        {
            Assert.strictEqual(Duration.fromDays(1).toMilliSeconds(), 86400000);
        });
    });
});