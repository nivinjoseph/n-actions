import * as Assert from "assert";
import { debounce, dedupe, Delay, Duration, Make, synchronize, throttle } from "../src";


class Sensitive
{
    public syncDebounceCounts = new Array<number>();
    public asyncDebounceCounts = new Array<number>();
    
    public syncDebounceWithDelayCounts = new Array<number>();
    public asyncDebounceWithDelayCounts = new Array<number>();
    
    
    public syncThrottleCounts = new Array<number>();
    public asyncThrottleCounts = new Array<number>();

    public syncThrottleWithDelayCounts = new Array<number>();
    public asyncThrottleWithDelayCounts = new Array<number>();
    
    
    public syncDedupeCounts = new Array<number>();
    public asyncDedupeCounts = new Array<number>();
    
    public syncDedupeWithDelayCounts = new Array<number>();
    public asyncDedupeWithDelayCounts = new Array<number>();
    
    
    public syncSynchronizeCounts = new Array<number>();
    public asyncSynchronizeCounts = new Array<number>();
    
    public syncSynchronizeWithDelayCounts = new Array<number>();
    public asyncSynchronizeWithDelayCounts = new Array<number>();
    
    
    @debounce
    public syncDebounce(index: number): void
    {
        this.syncDebounceCounts.push(index);
    }
    
    @debounce
    public async asyncDebounce(index: number): Promise<void>
    {
        await Delay.milliseconds(500);
        this.asyncDebounceCounts.push(index);
    }
    
    @debounce(Duration.fromMilliSeconds(1000))
    public syncDebounceWithDelay(index: number): void
    {
        this.syncDebounceWithDelayCounts.push(index);
    }

    @debounce(Duration.fromMilliSeconds(1000))
    public async asyncDebounceWithDelay(index: number): Promise<void>
    {
        await Delay.milliseconds(500);
        this.asyncDebounceWithDelayCounts.push(index);
    }
    
    
    @throttle
    public syncThrottle(index: number): void
    {
        this.syncThrottleCounts.push(index);
    }

    @throttle
    public async asyncThrottle(index: number): Promise<void>
    {
        await Delay.milliseconds(500);
        this.asyncThrottleCounts.push(index);
    }

    @throttle(Duration.fromMilliSeconds(1000))
    public syncThrottleWithDelay(index: number): void
    {
        this.syncThrottleWithDelayCounts.push(index);
    }

    @throttle(Duration.fromMilliSeconds(1000))
    public async asyncThrottleWithDelay(index: number): Promise<void>
    {
        await Delay.milliseconds(500);
        this.asyncThrottleWithDelayCounts.push(index);
    }
    
    
    @dedupe
    public syncDedupe(index: number): void
    {
        this.syncDedupeCounts.push(index);
    }
    
    @dedupe
    public async asyncDedupe(index: number): Promise<void>
    {
        await Delay.milliseconds(500);
        this.asyncDedupeCounts.push(index);
    }
    
    @dedupe(Duration.fromMilliSeconds(1000))
    public syncDedupeWithDelay(index: number): void
    {
        this.syncDedupeWithDelayCounts.push(index);
    }

    @dedupe(Duration.fromMilliSeconds(1000))
    public async asyncDedupeWithDelay(index: number): Promise<void>
    {
        await Delay.milliseconds(500);
        this.asyncDedupeWithDelayCounts.push(index);
    }
    
    
    @synchronize
    public syncSynchronize(index: number): void
    {
        this.syncSynchronizeCounts.push(index);
    }
    
    @synchronize
    public async asyncSynchronize(index: number): Promise<void>
    {
        await Delay.milliseconds(500);
        this.asyncSynchronizeCounts.push(index);
    }
    
    @synchronize(Duration.fromMilliSeconds(1000))
    public syncSynchronizeWithDelay(index: number): void
    {
        this.syncSynchronizeWithDelayCounts.push(index);
    }

    @synchronize(Duration.fromMilliSeconds(1000))
    public async asyncSynchronizeWithDelay(index: number): Promise<void>
    {
        await Delay.milliseconds(500);
        this.asyncSynchronizeWithDelayCounts.push(index);
    }
}


suite("Decorator Tests", () =>
{
    test(`syncDebounce`, async () =>
    {
        const instance1 = new Sensitive();
        const instance2 = new Sensitive();
        
        Make.loop((index) =>
        {
            index = index + 1;
            instance1.syncDebounce(index);
            instance2.syncDebounce(index);
        }, 5);
        
        await Delay.milliseconds(10);
        
        Make.loop((index) =>
        {
            index = index + 6;
            instance1.syncDebounce(index);
            instance2.syncDebounce(index);
        }, 5);
        
        await Delay.milliseconds(10);
        
        Assert.strictEqual(instance1.syncDebounceCounts.length, 4);
        Assert.deepStrictEqual(instance1.syncDebounceCounts, [1, 5, 6, 10]);
        Assert.strictEqual(instance2.syncDebounceCounts.length, 4);
        Assert.deepStrictEqual(instance2.syncDebounceCounts, [1, 5, 6, 10]);
    });

    test(`asyncDebounce`, async () =>
    {
        const instance1 = new Sensitive();
        const instance2 = new Sensitive();
        
        const promises = new Array<Promise<void>>();
        
        Make.loop((index) =>
        {
            index = index + 1;
            promises.push(instance1.asyncDebounce(index));
            promises.push(instance2.asyncDebounce(index));
        }, 5);
        
        await Delay.milliseconds(10);
        
        Make.loop((index) =>
        {
            index = index + 6;
            promises.push(instance1.asyncDebounce(index));
            promises.push(instance2.asyncDebounce(index));
        }, 5);
        
        await Promise.all(promises);

        Assert.strictEqual(instance1.asyncDebounceCounts.length, 2);
        Assert.deepStrictEqual(instance1.asyncDebounceCounts, [1, 10]);
        Assert.strictEqual(instance2.asyncDebounceCounts.length, 2);
        Assert.deepStrictEqual(instance2.asyncDebounceCounts, [1, 10]);
    });
    
    test(`syncDebounceWithDelay`, async () =>
    {
        const instance1 = new Sensitive();
        const instance2 = new Sensitive();

        Make.loop((index) =>
        {
            index = index + 1;
            instance1.syncDebounceWithDelay(index);
            instance2.syncDebounceWithDelay(index);
        }, 5);

        await Delay.milliseconds(10);

        Make.loop((index) =>
        {
            index = index + 6;
            instance1.syncDebounceWithDelay(index);
            instance2.syncDebounceWithDelay(index);
        }, 5);

        await Delay.milliseconds(5000);

        Assert.strictEqual(instance1.syncDebounceWithDelayCounts.length, 1);
        Assert.deepStrictEqual(instance1.syncDebounceWithDelayCounts, [10]);
        Assert.strictEqual(instance2.syncDebounceWithDelayCounts.length, 1);
        Assert.deepStrictEqual(instance2.syncDebounceWithDelayCounts, [10]);
    });
    
    test(`asyncDebounceWithDelay`, async () =>
    {
        const instance1 = new Sensitive();
        const instance2 = new Sensitive();

        const promises = new Array<Promise<void>>();

        Make.loop((index) =>
        {
            index = index + 1;
            promises.push(instance1.asyncDebounceWithDelay(index));
            promises.push(instance2.asyncDebounceWithDelay(index));
        }, 5);

        await Delay.milliseconds(10);

        Make.loop((index) =>
        {
            index = index + 6;
            promises.push(instance1.asyncDebounceWithDelay(index));
            promises.push(instance2.asyncDebounceWithDelay(index));
        }, 5);

        await Promise.all(promises);

        Assert.strictEqual(instance1.asyncDebounceWithDelayCounts.length, 1);
        Assert.deepStrictEqual(instance1.asyncDebounceWithDelayCounts, [10]);
        Assert.strictEqual(instance2.asyncDebounceWithDelayCounts.length, 1);
        Assert.deepStrictEqual(instance2.asyncDebounceWithDelayCounts, [10]);
    });
    
    
    test(`syncThrottle`, async () =>
    {
        const instance1 = new Sensitive();
        const instance2 = new Sensitive();

        Make.loop((index) =>
        {
            index = index + 1;
            instance1.syncThrottle(index);
            instance2.syncThrottle(index);
        }, 5);

        await Delay.milliseconds(10);

        Make.loop((index) =>
        {
            index = index + 6;
            instance1.syncThrottle(index);
            instance2.syncThrottle(index);
        }, 5);

        await Delay.milliseconds(10);

        Assert.strictEqual(instance1.syncThrottleCounts.length, 4);
        Assert.deepStrictEqual(instance1.syncThrottleCounts, [1, 5, 6, 10]);
        Assert.strictEqual(instance2.syncThrottleCounts.length, 4);
        Assert.deepStrictEqual(instance2.syncThrottleCounts, [1, 5, 6, 10]);
    });

    test(`asyncThrottle`, async () =>
    {
        const instance1 = new Sensitive();
        const instance2 = new Sensitive();

        const promises = new Array<Promise<void>>();

        Make.loop((index) =>
        {
            index = index + 1;
            promises.push(instance1.asyncThrottle(index));
            promises.push(instance2.asyncThrottle(index));
        }, 5);

        await Delay.milliseconds(10);

        Make.loop((index) =>
        {
            index = index + 6;
            promises.push(instance1.asyncThrottle(index));
            promises.push(instance2.asyncThrottle(index));
        }, 5);

        await Promise.all(promises);

        Assert.strictEqual(instance1.asyncThrottleCounts.length, 2);
        Assert.deepStrictEqual(instance1.asyncThrottleCounts, [1, 10]);
        Assert.strictEqual(instance2.asyncThrottleCounts.length, 2);
        Assert.deepStrictEqual(instance2.asyncThrottleCounts, [1, 10]);
    });

    test(`syncThrottleWithDelay`, async () =>
    {
        const instance1 = new Sensitive();
        const instance2 = new Sensitive();

        Make.loop((index) =>
        {
            index = index + 1;
            instance1.syncThrottleWithDelay(index);
            instance2.syncThrottleWithDelay(index);
        }, 5);

        await Delay.milliseconds(10);

        Make.loop((index) =>
        {
            index = index + 6;
            instance1.syncThrottleWithDelay(index);
            instance2.syncThrottleWithDelay(index);
        }, 5);

        await Delay.milliseconds(5000);

        Assert.strictEqual(instance1.syncThrottleWithDelayCounts.length, 2);
        Assert.deepStrictEqual(instance1.syncThrottleWithDelayCounts, [1, 10]);
        Assert.strictEqual(instance2.syncThrottleWithDelayCounts.length, 2);
        Assert.deepStrictEqual(instance2.syncThrottleWithDelayCounts, [1, 10]);
    });

    test(`asyncThrottleWithDelay`, async () =>
    {
        const instance1 = new Sensitive();
        const instance2 = new Sensitive();

        const promises = new Array<Promise<void>>();

        Make.loop((index) =>
        {
            index = index + 1;
            promises.push(instance1.asyncThrottleWithDelay(index));
            promises.push(instance2.asyncThrottleWithDelay(index));
        }, 5);

        await Delay.milliseconds(10);

        Make.loop((index) =>
        {
            index = index + 6;
            promises.push(instance1.asyncThrottleWithDelay(index));
            promises.push(instance2.asyncThrottleWithDelay(index));
        }, 5);

        await Promise.all(promises);

        Assert.strictEqual(instance1.asyncThrottleWithDelayCounts.length, 2);
        Assert.deepStrictEqual(instance1.asyncThrottleWithDelayCounts, [1, 10]);
        Assert.strictEqual(instance2.asyncThrottleWithDelayCounts.length, 2);
        Assert.deepStrictEqual(instance2.asyncThrottleWithDelayCounts, [1, 10]);
    });
    
    
    test(`syncDedupe`, async () =>
    {
        const instance1 = new Sensitive();
        const instance2 = new Sensitive();

        Make.loop((index) =>
        {
            index = index + 1;
            instance1.syncDedupe(index);
            instance2.syncDedupe(index);
        }, 5);

        await Delay.milliseconds(10);

        Make.loop((index) =>
        {
            index = index + 6;
            instance1.syncDedupe(index);
            instance2.syncDedupe(index);
        }, 5);

        await Delay.milliseconds(10);

        Assert.strictEqual(instance1.syncDedupeCounts.length, 2);
        Assert.deepStrictEqual(instance1.syncDedupeCounts, [1, 6]);
        Assert.strictEqual(instance2.syncDedupeCounts.length, 2);
        Assert.deepStrictEqual(instance2.syncDedupeCounts, [1, 6]);
    });
    
    test(`asyncDedupe`, async () =>
    {
        const instance1 = new Sensitive();
        const instance2 = new Sensitive();

        const promises = new Array<Promise<void>>();

        Make.loop((index) =>
        {
            index = index + 1;
            promises.push(instance1.asyncDedupe(index));
            promises.push(instance2.asyncDedupe(index));
        }, 5);

        await Delay.milliseconds(10);

        Make.loop((index) =>
        {
            index = index + 6;
            promises.push(instance1.asyncDedupe(index));
            promises.push(instance2.asyncDedupe(index));
        }, 5);

        await Promise.all(promises);

        Assert.strictEqual(instance1.asyncDedupeCounts.length, 1);
        Assert.deepStrictEqual(instance1.asyncDedupeCounts, [1]);
        Assert.strictEqual(instance2.asyncDedupeCounts.length, 1);
        Assert.deepStrictEqual(instance2.asyncDedupeCounts, [1]);
    });
    
    test(`syncDedupeWithDelay`, async () =>
    {
        const instance1 = new Sensitive();
        const instance2 = new Sensitive();

        Make.loop((index) =>
        {
            index = index + 1;
            instance1.syncDedupeWithDelay(index);
            instance2.syncDedupeWithDelay(index);
        }, 5);

        await Delay.milliseconds(10);

        Make.loop((index) =>
        {
            index = index + 6;
            instance1.syncDedupeWithDelay(index);
            instance2.syncDedupeWithDelay(index);
        }, 5);

        await Delay.milliseconds(5000);

        Assert.strictEqual(instance1.syncDedupeWithDelayCounts.length, 1);
        Assert.deepStrictEqual(instance1.syncDedupeWithDelayCounts, [1]);
        Assert.strictEqual(instance2.syncDedupeWithDelayCounts.length, 1);
        Assert.deepStrictEqual(instance2.syncDedupeWithDelayCounts, [1]);
    });
    
    test(`asyncDedupeWithDelay`, async () =>
    {
        const instance1 = new Sensitive();
        const instance2 = new Sensitive();

        const promises = new Array<Promise<void>>();

        Make.loop((index) =>
        {
            index = index + 1;
            promises.push(instance1.asyncDedupeWithDelay(index));
            promises.push(instance2.asyncDedupeWithDelay(index));
        }, 5);

        await Delay.milliseconds(10);

        Make.loop((index) =>
        {
            index = index + 6;
            promises.push(instance1.asyncDedupeWithDelay(index));
            promises.push(instance2.asyncDedupeWithDelay(index));
        }, 5);

        await Promise.all(promises);

        Assert.strictEqual(instance1.asyncDedupeWithDelayCounts.length, 1);
        Assert.deepStrictEqual(instance1.asyncDedupeWithDelayCounts, [1]);
        Assert.strictEqual(instance2.asyncDedupeWithDelayCounts.length, 1);
        Assert.deepStrictEqual(instance2.asyncDedupeWithDelayCounts, [1]);
    });
    
    
    test(`syncSynchronize`, async () =>
    {
        const instance1 = new Sensitive();
        const instance2 = new Sensitive();

        Make.loop((index) =>
        {
            index = index + 1;
            instance1.syncSynchronize(index);
            instance2.syncSynchronize(index);
        }, 5);

        await Delay.milliseconds(10);

        Make.loop((index) =>
        {
            index = index + 6;
            instance1.syncSynchronize(index);
            instance2.syncSynchronize(index);
        }, 5);

        await Delay.milliseconds(10);

        Assert.strictEqual(instance1.syncSynchronizeCounts.length, 10);
        Assert.deepStrictEqual(instance1.syncSynchronizeCounts, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        Assert.strictEqual(instance2.syncSynchronizeCounts.length, 10);
        Assert.deepStrictEqual(instance2.syncSynchronizeCounts, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
    
    test(`asyncSynchronize`, async () =>
    {
        const instance1 = new Sensitive();
        const instance2 = new Sensitive();

        const promises = new Array<Promise<void>>();

        Make.loop((index) =>
        {
            index = index + 1;
            promises.push(instance1.asyncSynchronize(index));
            promises.push(instance2.asyncSynchronize(index));
        }, 5);

        await Delay.milliseconds(10);

        Make.loop((index) =>
        {
            index = index + 6;
            promises.push(instance1.asyncSynchronize(index));
            promises.push(instance2.asyncSynchronize(index));
        }, 5);

        await Promise.all(promises);

        Assert.strictEqual(instance1.asyncSynchronizeCounts.length, 10);
        Assert.deepStrictEqual(instance1.asyncSynchronizeCounts, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        Assert.strictEqual(instance2.asyncSynchronizeCounts.length, 10);
        Assert.deepStrictEqual(instance2.asyncSynchronizeCounts, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
    
    test(`syncSynchronizeWithDelay`, async () =>
    {
        const instance1 = new Sensitive();
        const instance2 = new Sensitive();

        Make.loop((index) =>
        {
            index = index + 1;
            instance1.syncSynchronizeWithDelay(index);
            instance2.syncSynchronizeWithDelay(index);
        }, 5);

        await Delay.milliseconds(10);

        Make.loop((index) =>
        {
            index = index + 6;
            instance1.syncSynchronizeWithDelay(index);
            instance2.syncSynchronizeWithDelay(index);
        }, 5);

        await Delay.milliseconds(10000);

        Assert.strictEqual(instance1.syncSynchronizeWithDelayCounts.length, 10);
        Assert.deepStrictEqual(instance1.syncSynchronizeWithDelayCounts, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        Assert.strictEqual(instance2.syncSynchronizeWithDelayCounts.length, 10);
        Assert.deepStrictEqual(instance2.syncSynchronizeWithDelayCounts, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
    
    test(`asyncSynchronizeWithDelay`, async () =>
    {
        const instance1 = new Sensitive();
        const instance2 = new Sensitive();

        const promises = new Array<Promise<void>>();

        Make.loop((index) =>
        {
            index = index + 1;
            promises.push(instance1.asyncSynchronizeWithDelay(index));
            promises.push(instance2.asyncSynchronizeWithDelay(index));
        }, 5);

        await Delay.milliseconds(10);

        Make.loop((index) =>
        {
            index = index + 6;
            promises.push(instance1.asyncSynchronizeWithDelay(index));
            promises.push(instance2.asyncSynchronizeWithDelay(index));
        }, 5);

        await Promise.all(promises);

        Assert.strictEqual(instance1.asyncSynchronizeWithDelayCounts.length, 10);
        Assert.deepStrictEqual(instance1.asyncSynchronizeWithDelayCounts, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        Assert.strictEqual(instance2.asyncSynchronizeWithDelayCounts.length, 10);
        Assert.deepStrictEqual(instance2.asyncSynchronizeWithDelayCounts, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
});