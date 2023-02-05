import * as Assert from "assert";
import { Mutex, Delay } from "../src";


class Synchronized
{
    private readonly _mutex = new Mutex();
    private readonly _values = new Array<number>();
    
    public get values(): ReadonlyArray<number> { return this._values; }
    
    
    public async execute(ms: number): Promise<void>
    {
        await this._mutex.lock();
        
        try 
        {
            // if (ms === 3000)
            //     throw new Error("boom");
            
            await Delay.milliseconds(ms);
            console.log(ms);    
            this._values.push(ms);
        } 
        finally
        {
            this._mutex.release();
        }
    }
}

suite("Mutex tests", () =>
{
    test(`Given a mutex, 
            when a bunch of async calls are made,
            then the calls must be synchronized`,
        async () =>
        {
            const synchronized = new Synchronized();
            
            const promises = new Array<Promise<void>>();
            
            for (let i = 5; i > 0; i--)
            {
                promises.push(synchronized.execute(i * 1000));
            }
            
            await Promise.all(promises);
            
            Assert.deepStrictEqual(synchronized.values, [5000, 4000, 3000, 2000, 1000]);
        });
});