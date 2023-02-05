import * as Assert from "assert";
import { Profiler } from "../src/profiler";
import { Delay } from "../src";


suite("Profiler tests", () =>
{
    test("Basics", async () =>
    {
        const profiler = new Profiler("test");
        
        for (let i = 1; i <= 5; i++)
        {
            await Delay.seconds(i);
            
            profiler.trace(`Step ${i}`);
        }
        
        profiler.traces.forEach(t =>
        {
            console.log(`${new Date(t.dateTime).toISOString()} ${t.message}; ${t.diffMs}MS`);
        });
        
        Assert.strictEqual(profiler.traces.length, 6);
    });
});