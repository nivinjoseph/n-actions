import * as Assert from "assert";
import { BackgroundProcessor, Delay } from "../src/index";


suite("BackgroundProcessor tests", () =>
{
    test("Should work fine (check console output)", async () =>
    {
        const bp = new BackgroundProcessor((e) =>
        {
            if ((<any>e) === 4)
                throw new Error("4 is bad");
            console.log(e, "default error handler");
            return Promise.resolve();
        }, 1000, false);


        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((t) =>
        {
            bp.processAction(() =>
            {
                if ((t % 2) === 0)
                    // eslint-disable-next-line @typescript-eslint/no-throw-literal
                    throw t;
                console.log(t);
                return Promise.resolve();
            }, t > 5 ? async (e): Promise<void> =>
            {
                if ((<any>e) === 8)
                    throw new Error("8 is also bad");
                console.log(e, "custom error handler");
            } : undefined);
        });
        
        console.log("delaying 5000ms");
        await Delay.milliseconds(5000);
        console.log("disposing");
        await bp.dispose();

        await Delay.seconds(8);
        Assert.ok(true);
    });
});