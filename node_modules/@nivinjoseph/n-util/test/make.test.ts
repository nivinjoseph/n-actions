import * as Assert from "assert";
import { Make } from "./../src/make";
import { ApplicationException, ArgumentException } from "@nivinjoseph/n-exception";
import { given } from "@nivinjoseph/n-defensive";
import { Delay } from "../src";


suite("Make", () =>
{        
    let numAttempts: number;   

    let failure: boolean;
    
    let delay: number;
    
    let time: number;
    
    let testInput: number;
    
    suite("retry", () =>
    {    
        test("should retry and not alter input parameter", async () =>
        {
            numAttempts = 0;   
            let value = null;
            
            const testFunc = (val: number): Promise<never> =>
            {                                
                numAttempts++;
                value = ++val;
                return Promise.reject(new ApplicationException("not working"));
            };
            
            // if (onErrors && onErrors.every(t => !(error instanceof t)))
            
            const modifiedFunc = Make.retry(testFunc, 4, err => err instanceof ApplicationException);
            testInput = 1;
            
            try 
            {
                await modifiedFunc(testInput);
            }
            catch (error)
            {
                failure = true;
            }

            Assert.strictEqual(failure, true);
            Assert.strictEqual(numAttempts, 5);
            Assert.strictEqual(value, 2);
        });
        
        test("should retry if exception is not specified with one type of exception", async () =>
        {
            numAttempts = 0;

            const testFunc = (): Promise<void> =>
            {
                numAttempts++;

                return Promise.reject(new ApplicationException("not working"));
            };

            const modifiedFunc = Make.retry(testFunc, 4, err => err instanceof Error);

            try 
            {
                await modifiedFunc();
            }
            catch (error)
            {
                failure = true;
            }

            Assert.strictEqual(failure, true);
            Assert.strictEqual(numAttempts, 5);
        });
        
        test("should retry if exception is not specified with more than one type of exception", async () =>
        {
            numAttempts = 0;

            const testFunc = (): Promise<void> =>
            {
                numAttempts++;
                if ((numAttempts % 2) === 0)
                    return Promise.reject(new ApplicationException("not working"));
                else
                    return Promise.reject(new ArgumentException("error", "some error"));
            };            
            
            const modifiedFunc = Make.retry(testFunc, 4, err => err instanceof Error);

            try 
            {
                await modifiedFunc();
            }
            catch (error)
            {
                failure = true;
            }

            Assert.strictEqual(failure, true);
            Assert.strictEqual(numAttempts, 5);
        });
        
        test("should only retry for one specified exception", async () =>
        {    
            numAttempts = 0;

            const testFunc = (): Promise<void> =>
            {
                numAttempts++;
                if ((numAttempts % 2) === 0)
                    return Promise.reject(new ApplicationException("not working"));
                else
                    return Promise.reject(new ArgumentException("error", "some error"));
            };          
            
            const modifiedFunc = Make.retry(testFunc, 3, err => err instanceof ArgumentException);

            try 
            {
                await modifiedFunc();
            }
            catch (error)
            {
                failure = true;
            }

            Assert.strictEqual(failure, true);
            Assert.strictEqual(numAttempts, 2);           
        });
        
        test("should retry for more than one specified exception", async () =>
        {
            numAttempts = 0;

            const testFunc = (): Promise<void> =>
            {
                numAttempts++;
                if ((numAttempts % 2) === 0)
                    return Promise.reject(new ApplicationException("not working"));
                else
                    return Promise.reject(new ArgumentException("error", "some error"));
            };

            const modifiedFunc = Make.retry(testFunc, 3,
                err => err instanceof ArgumentException || err instanceof ApplicationException);

            try 
            {
                await modifiedFunc();
            }
            catch (error)
            {
                failure = true;
            }

            Assert.strictEqual(failure, true);
            Assert.strictEqual(numAttempts, 4);
        });
        
        test("should not retry if promise resolves", async () =>
        {
            numAttempts = 0;

            const testFunc = (): Promise<void> =>
            {
                numAttempts++;
                return Promise.resolve();
            };

            const modifiedFunc = Make.retry(testFunc, 4, err => err instanceof Error);

            try 
            {
                await modifiedFunc();
                failure = false;
            }
            catch (error)
            {
                failure = true;
            }

            Assert.strictEqual(failure, false);
            Assert.strictEqual(numAttempts, 1);      
        });
        
    });

    suite("retryWithDelay", () =>
    {              
        failure = true;
        
        test("should retry with delay and not alter input parameter", async () =>
        {
            numAttempts = 0;   
            let value = null;
            
            time = Date.now();
            
            const testFunc = (val: number): Promise<void> =>
            {              
                numAttempts++; 
                value = ++val;
                return Promise.reject(new ApplicationException("not working"));
            };
            
            const modifiedFunc = Make.retryWithDelay(testFunc, 4, 300, err => err instanceof ApplicationException);  
            testInput = 1;
            
            try 
            {
                await modifiedFunc(testInput);
            }
            catch (error)
            {
                failure = true;
            }
            
            delay = Date.now() - time;
            
            Assert.strictEqual(failure, true);
            Assert.strictEqual(numAttempts, 5);
            Assert.strictEqual(value, 2);
            Assert.ok(delay >= 1200 && delay < 1300);
        });
        
        test("should retry with delay if exception is not specified", async () =>
        {
            numAttempts = 0;
            
            time = Date.now();

            const testFunc = (): Promise<void> =>
            {
                numAttempts++;
                if ((numAttempts % 2) === 0)
                    return Promise.reject(new ApplicationException("not working"));
                else
                    return Promise.reject(new ArgumentException("error", "some error"));
            };

            const modifiedFunc = Make.retryWithDelay(testFunc, 4, 300, err => err instanceof Error);

            try 
            {
                await modifiedFunc();
            }
            catch (error)
            {
                failure = true;
            }

            delay = Date.now() - time;

            Assert.strictEqual(failure, true);
            Assert.strictEqual(numAttempts, 5);
            Assert.ok(delay >= 1200 && delay < 1300);
        });
        
        test("should only retry with delay for specified exception", async () =>
        {
            numAttempts = 0;

            time = Date.now();            
            
            const testFunc = (): Promise<void> =>
            {
                numAttempts++;
                if ((numAttempts % 2) === 0)
                    return Promise.reject(new ApplicationException("not working"));
                else
                    return Promise.reject(new ArgumentException("error", "some error"));
            };

            const modifiedFunc = Make.retryWithDelay(testFunc, 4, 300, err => err instanceof ArgumentException);

            try 
            {
                await modifiedFunc();
            }
            catch (error)
            {
                failure = true;
            }
            
            delay = Date.now() - time;

            Assert.strictEqual(failure, true);
            Assert.strictEqual(numAttempts, 2);
            Assert.ok(delay >= 300 && delay < 400);
        });
        
        test("should retry with delay for more than one specified exception", async () =>
        {
            numAttempts = 0;

            time = Date.now();             
            
            const testFunc = (): Promise<void> =>
            {
                numAttempts++;
                if ((numAttempts % 2) === 0)
                    return Promise.reject(new ApplicationException("not working"));
                else
                    return Promise.reject(new ArgumentException("error", "some error"));
            };

            const modifiedFunc = Make.retryWithDelay(testFunc, 3, 300,
                err => err instanceof ArgumentException || err instanceof ApplicationException);

            try 
            {
                await modifiedFunc();
            }
            catch (error)
            {
                failure = true;
            }

            Assert.strictEqual(failure, true);
            Assert.strictEqual(numAttempts, 4);
            Assert.ok(delay >= 300 && delay < 400);
        });
        
        test("should not retry if promise resolves", async () =>
        {
            numAttempts = 0;
            
            time = Date.now(); 

            const testFunc = (): Promise<void> =>
            {
                numAttempts++;
                return Promise.resolve();
            };

            const modifiedFunc = Make.retryWithDelay(testFunc, 4, 300, err => err instanceof Error);

            try 
            {
                await modifiedFunc();
                failure = false;
            }
            catch (error)
            {
                failure = true;
            }
            
            delay = Date.now() - time;

            Assert.strictEqual(failure, false);
            Assert.strictEqual(numAttempts, 1); 
        });
    });

    suite("retryWithExponentialBackoff", () =>
    {
        failure = true;
        
        test("should retry with exponential backoff and not alter input parameter", async () =>
        {
            numAttempts = 0;
            let value = null;
            
            time = Date.now();
            
            const testFunc = (val: number): Promise<void> =>
            {
                numAttempts++;                
                value = ++val;
                return Promise.reject(new ApplicationException("not working"));
            };          
            
            const modifiedFunc = Make.retryWithExponentialBackoff(testFunc, 3, err => err instanceof ApplicationException);  
            testInput = 1;
            
            try 
            {
                await modifiedFunc(testInput);
            }
            catch (error)
            {
                failure = true;
            }
            
            delay = Date.now() - time;

            Assert.strictEqual(failure, true);
            Assert.strictEqual(numAttempts, 4);  
            Assert.strictEqual(value, 2);
            Assert.ok(delay < 9000);
        });
        
        test("should retry with exponential backoff if exception is not specified", async () =>
        {
            numAttempts = 0;

            time = Date.now();            
            
            const testFunc = (): Promise<void> =>
            {
                numAttempts++;
                if ((numAttempts % 2) === 0)
                    return Promise.reject(new ApplicationException("not working"));
                else
                    return Promise.reject(new ArgumentException("error", "some error"));
            };

            const modifiedFunc = Make.retryWithExponentialBackoff(testFunc, 3, err => err instanceof Error);

            try 
            {
                await modifiedFunc();
            }
            catch (error)
            {
                failure = true;
            }
            
            delay = Date.now() - time;

            Assert.strictEqual(failure, true);
            Assert.strictEqual(numAttempts, 4);    
            Assert.ok(delay < 9000);
        });
        
        test("should only retry with exponential backoff for specified exception", async () =>
        {
            numAttempts = 0;

            time = Date.now();

            const testFunc = (): Promise<void> =>
            {
                numAttempts++;
                if ((numAttempts % 2) === 0)
                    return Promise.reject(new ApplicationException("not working"));
                else
                    return Promise.reject(new ArgumentException("error", "some error"));
            };

            const modifiedFunc = Make.retryWithExponentialBackoff(testFunc, 3, err => err instanceof ArgumentException);

            try 
            {
                await modifiedFunc();
            }
            catch (error)
            {
                failure = true;
            }

            delay = Date.now() - time;

            Assert.strictEqual(failure, true);
            Assert.strictEqual(numAttempts, 2);
            // Assert.ok(delay < 600);    
        });
        
        test("should retry with exponential backoff for more than one specified exception", async () =>
        {
            numAttempts = 0;
            
            time = Date.now();

            const testFunc = (): Promise<void> =>
            {
                numAttempts++;
                if ((numAttempts % 2) === 0)
                    return Promise.reject(new ApplicationException("not working"));
                else
                    return Promise.reject(new ArgumentException("error", "some error"));
            };

            const modifiedFunc = Make.retryWithExponentialBackoff(testFunc, 3,
                err => err instanceof ArgumentException || err instanceof ApplicationException);

            try 
            {
                await modifiedFunc();
            }
            catch (error)
            {
                failure = true;
            }
            
            delay = Date.now() - time;

            Assert.strictEqual(failure, true);
            Assert.strictEqual(numAttempts, 4);
            Assert.ok(delay < 9000);
        });
        
        test("should not retry if promise resolves", async () =>
        {
            numAttempts = 0;

            time = Date.now();

            const testFunc = (): Promise<void> =>
            {
                numAttempts++;
                return Promise.resolve();
            };

            const modifiedFunc = Make.retryWithExponentialBackoff(testFunc, 4, err => err instanceof Error);

            try 
            {
                await modifiedFunc();
                failure = false;
            }
            catch (error)
            {
                failure = true;
            }

            delay = Date.now() - time;

            Assert.strictEqual(failure, false);
            Assert.strictEqual(numAttempts, 1);
        });
    });
    
    suite("loop", () =>
    {
        test("should loop 10 times", () =>
        {
            const indexes = new Array<number>();
            let count = 0;
            
            Make.loop((index) =>
            {
                count++;
                indexes.push(index);
                console.log(index);
            }, 10);
            
            Assert.strictEqual(count, 10);
            Assert.deepStrictEqual(indexes, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });
    });
    
    suite("loopAsync", () =>
    {
        test("should loop 10 times", async () =>
        {
            const indexes = new Array<number>();
            let count = 0;

            await Make.loopAsync(async (index) =>
            {
                await Delay.milliseconds(index * 100);
                count++;
                indexes.push(index);
                console.log(index);
            }, 10, 5);

            Assert.strictEqual(count, 10);
            Assert.deepStrictEqual(indexes.orderBy(), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });
        
        test("should loop 7 times", async () =>
        {
            const indexes = new Array<number>();
            let count = 0;

            await Make.loopAsync(async (index) =>
            {
                await Delay.milliseconds(index * 10 * Make.randomInt(1, 9));
                count++;
                indexes.push(index);
                console.log(index);
            }, 7, 3);

            Assert.strictEqual(count, 7);
            Assert.deepStrictEqual(indexes.orderBy(), [0, 1, 2, 3, 4, 5, 6]);
        });
        
        // test.only("should work", async () =>
        // {
        //     const indexes = new Array<number>();
        //     let count = 0;

        //     await Make.loopAsync(async (index) =>
        //     {
        //         await Delay.milliseconds(5000);
                
        //         indexes.push(index);
        //         // console.log("index", index);
        //         // console.log("count", count);
                
        //         for (let j = 0; j < 10; j++)
        //         {
        //             await Delay.milliseconds(10000);
        //             count++;
        //             console.log(index, count, j);
        //         }
        //     }, 5);

        //     // Assert.strictEqual(count, 7);
        //     // Assert.deepStrictEqual(indexes.orderBy(), [0, 1, 2, 3, 4, 5, 6]);
            
        //     Assert.ok(true);
        // });
    });
    
    suite("randomInt", () =>
    { 
        test("should be within range", () =>
        {       
            let hasError = false;
            try 
            {
                Make.loop(() =>
                {
                    const val = Make.randomInt(1, 1000);
                    given(val, "val").ensureHasValue().ensureIsNumber().ensure(t => t >= 1 && t < 1000);
                }, 1000);    
            }
            catch (error)
            {
                hasError = true;
            }
            
            Assert.strictEqual(hasError, false);
        });
    });
    
    suite("randomCode", () =>
    {
        test("should generate unique values", () =>
        {
            const results: Array<string> = [];
            
            Make.loop(() =>
            {
                const val = Make.randomCode(6);
                // console.log(val);
                results.push(val);
            }, 100000);

            Assert.strictEqual(results.distinct().length, results.length);
        });
    });
    
    suite("randomTextCode", () =>
    {
        test("should generate unique values", () =>
        {
            const results: Array<string> = [];

            Make.loop(() =>
            {
                const val = Make.randomTextCode(5, true);
                // console.log(val);
                results.push(val);
            }, 10000);

            Assert.strictEqual(results.distinct().length, results.length);
        });
    });
    
    suite("randomNumericCode", () =>
    {
        test("should generate unique values", () =>
        {
            const results: Array<string> = [];

            Make.loop(() =>
            {
                const val = Make.randomNumericCode(4);
                // console.log(val);
                results.push(val);
            }, 1000);

            Assert.strictEqual(results.distinct().length, results.length);
        });
    });
    
    // suite("async", () =>
    // { 
    //     let exists: boolean;
        
    //     test("should make synchronous function async and return a promise", async () =>
    //     {            
    //         let filePath = Path.join(process.cwd(), "package.json");
            
    //         let statPromise = Make.syncToAsync<Fs.Stats>(Fs.statSync)(filePath);
    //         let stat = await statPromise;
    //         Assert.ok(statPromise instanceof Promise);
    //         Assert.ok(stat !== null);
    //         Assert.strictEqual(stat.isFile(), true);
    //     });
        
    //     test("should handle error if file does not exist", async () =>
    //     {
    //         let filePath = Path.join(process.cwd(), "somePath");
            
    //         let statPromise = Make.syncToAsync<Fs.Stats>(Fs.statSync)(filePath);

    //         try 
    //         {
    //             let stat = await statPromise;                
    //             console.log(stat);
    //             exists = true;
    //         }
    //         catch (error)
    //         {
    //             exists = false;
    //         }

    //         Assert.strictEqual(exists, false);  
    //     });
        
    // });       
    
    // suite("promise", () =>
    // {
    //     let exists: boolean;
        
    //     test("should make function return a promise", async () =>
    //     {
    //         let filePath = Path.join(process.cwd(), "package.json");

    //         let stat = await Make.promise<Fs.Stats>(Fs.stat)(filePath);
    //         Assert.ok(stat !== null);
    //         Assert.strictEqual(stat.isFile(), true);
            
    //     });
        
    //     test("should handle error if file does not exist", async () =>
    //     {
    //         let filePath = Path.join(process.cwd(), "somePath");

    //         let stat = Make.promise<Fs.Stats>(Fs.stat)(filePath);
            
    //         try 
    //         {
    //             await stat;
    //             exists = true;
    //         }
    //         catch (error)
    //         {
    //             exists = false;
    //         }
          
    //         Assert.strictEqual(exists, false);  
    //     });        
        
    // });
});