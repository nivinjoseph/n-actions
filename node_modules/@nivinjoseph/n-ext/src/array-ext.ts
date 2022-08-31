class ArrayExt
{
    public static contains<T>(array: Array<T>, value: T): boolean
    {
        return array.some(t => t === value);
    }

    public static orderBy<T>(array: Array<T>): Array<T>;
    public static orderBy<T>(array: Array<T>, compareFunc: (value: T) => any): Array<T>;
    public static orderBy<T>(array: Array<T>, compareFunc?: (value: T) => any): Array<T>
    {
        const internalArray: Array<T> = [];
        for (let i = 0; i < array.length; i++)
            internalArray.push(array[i]);

        if (compareFunc == null)
            compareFunc = (value: T): T => value;

        internalArray.sort((a, b) =>
        {
            const valA = compareFunc!(a);
            const valB = compareFunc!(b);
            if (valA < valB) return -1;
            if (valA > valB) return 1;
            return 0;
        });

        return internalArray;
    }

    public static orderByDesc<T>(array: Array<T>): Array<T>;
    public static orderByDesc<T>(array: Array<T>, compareFunc: (value: T) => any): Array<T>;
    public static orderByDesc<T>(array: Array<T>, compareFunc?: (value: T) => any): Array<T>
    {
        const internalArray: Array<T> = [];
        for (let i = 0; i < array.length; i++)
            internalArray.push(array[i]);

        if (compareFunc == null)
            compareFunc = (value: T): T => value;

        internalArray.sort((a, b) =>
        {
            const valA = compareFunc!(a);
            const valB = compareFunc!(b);
            if (valB < valA) return -1;
            if (valB > valA) return 1;
            return 0;
        });

        return internalArray;
    }

    // public static groupBy<T>(array: T[], keyFunc: (value: T) => string): { [index: string]: T[] }
    // {
    //     return  array.reduce((acc: { [index: string]: T[] }, t) =>
    //     {
    //         const key = keyFunc(t);
    //         if (!acc[key])
    //             acc[key] = [];

    //         acc[key].push(t);
    //         return acc;
    //     }, {});
    // }

    public static groupBy<T>(array: Array<T>, keyFunc: (value: T) => string): Array<{ key: string; values: Array<T>; }>
    {
        const result = new Array<{ key: string; values: Array<T>; }>();

        array.reduce<Record<string, Array<T>>>((acc, t) =>
        {
            const key = keyFunc(t);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (!acc[key])
            {
                acc[key] = [];
                result.push({ key, values: acc[key] });
            }

            acc[key].push(t);
            return acc;
        }, {});

        return result;
    }

    public static distinct<T>(array: Array<T>): Array<T>;
    public static distinct<T>(array: Array<T>, compareFunc: (value: T) => any): Array<T>;
    public static distinct<T>(array: Array<T>, compareFunc?: (value: T) => any): Array<T>
    {
        // if (compareFunc == null)
        //     compareFunc = (value: T) => value;

        // let internalArray: T[] = [];

        // for (let i = 0; i < array.length; i++)
        // {
        //     let item = array[i];
        //     if (internalArray.some(t => compareFunc(t) === compareFunc(item)))
        //         continue;
        //     internalArray.push(item);
        // }

        // return internalArray;


        // BECAUSE WE USE SETS
        const setLimit = 16777216;
        if (array.length > setLimit)
            throw new Error(`Array has ${array.length} items (exceeds set limit of ${setLimit}). Calling distinct is prohibited.`);

        if (compareFunc == null)
            return [...new Set(array)];

        const set = new Set();
        const internalArray: Array<T> = [];
        let item: T;
        let distinguished: any;
        for (let i = 0; i < array.length; i++)
        {
            item = array[i];
            distinguished = compareFunc(item);
            if (!set.has(distinguished))
            {
                set.add(distinguished);
                internalArray.push(item);
            }
        }

        return internalArray;
    }

    public static skip<T>(array: Array<T>, count: number): Array<T>
    {
        if (count <= 0) count = 0;

        // let result = new Array<T>();
        // for (let i = count; i < array.length; i++)
        // {
        //     result.push(array[i]);
        // }
        // return result;

        return array.slice(count);
    }

    public static take<T>(array: Array<T>, count: number): Array<T>
    {
        if (count <= 0) count = 0;
        else if (count > array.length) count = array.length;

        // let result = new Array<T>();
        // for (let i = 0; i < count; i++)
        // {
        //     result.push(array[i]);
        // }
        // return result;

        if (count === 0) return [];
        return array.slice(0, count);
    }

    public static count<T>(array: Array<T>): number;
    public static count<T>(array: Array<T>, predicate: (value: T) => boolean): number;
    public static count<T>(array: Array<T>, predicate?: (value: T) => boolean): number
    {
        if (predicate == null)
        {
            return array.length;
        }
        else
        {
            let count = 0;
            for (let i = 0; i < array.length; i++)
            {
                if (predicate(array[i])) count++;
            }
            return count;
        }
    }

    public static remove<T>(array: Array<T>, value: T): boolean
    {
        const index = array.indexOf(value);
        if (index < 0) return false;

        array.splice(index, 1);
        return true;
    }

    public static clear<T>(array: Array<T>): void
    {
        while (array.length > 0)
        {
            array.pop();
        }
    }

    public static equals<T>(array: Array<T>, compareArray: Array<T>): boolean;
    public static equals<T>(array: Array<T>, compareArray: Array<T>, compareFunc: (t1: T, t2: T) => boolean): boolean;
    public static equals<T>(array: Array<T>, compareArray: Array<T>, compareFunc?: (t1: T, t2: T) => boolean): boolean
    {
        if (array === compareArray)
            return true;

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (array === null || compareArray === null)
            return false;

        if (!(array instanceof Array) || !(compareArray instanceof Array))
            return false;

        if (array.length !== compareArray.length)
            return false;

        if (compareFunc)
        {
            for (let i = 0; i < array.length; i++)
            {
                if (compareFunc(array[i], compareArray[i]))
                    continue;

                return false;
            }
        }
        else
        {
            for (let i = 0; i < array.length; i++)
            {
                if (array[i] === compareArray[i])
                    continue;

                return false;
            }
        }

        return true;
    }

    // public static async forEachAsync<T>(array: T[], asyncFunc: (input: T) => Promise<void>, degreesOfParallelism?: number): Promise<void>
    // {
    //     let taskManager = new TaskManager(array, asyncFunc, degreesOfParallelism, false);
    //     await taskManager.execute();
    // }

    public static async forEachAsync<T>(array: Array<T>, asyncFunc: (input: T) => Promise<void>, degreesOfParallelism?: number): Promise<void>
    {
        if (array.length === 0)
            return;

        const bte = new BatchTaskExec(array, asyncFunc, false, degreesOfParallelism);
        await bte.process();
    }

    // public static async mapAsync<T, U>(array: T[], asyncFunc: (input: T) => Promise<U>, degreesOfParallelism?: number): Promise<U[]>
    // {
    //     let taskManager = new TaskManager(array, asyncFunc, degreesOfParallelism, true);
    //     await taskManager.execute();
    //     return taskManager.getResults();
    // }

    public static async mapAsync<T, U>(array: Array<T>, asyncFunc: (input: T) => Promise<U>, degreesOfParallelism?: number): Promise<Array<U>>
    {
        if (array.length === 0)
            return new Array<U>();

        const bte = new BatchTaskExec(array, asyncFunc, true, degreesOfParallelism);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return bte.process();
    }

    public static async reduceAsync<T, U>(array: Array<T>, asyncFunc: (acc: U, input: T) => Promise<U>, accumulator?: U): Promise<U>
    {
        let index = 0;
        if (accumulator == null)
        {
            accumulator = <any>array[0];
            index = 1;
        }

        for (let i = index; i < array.length; i++)
            accumulator = await asyncFunc(accumulator!, array[i]);

        return accumulator!;
    }
}

class TaskExec<T, TResult>
{
    private readonly _array: Array<T>;
    private readonly _taskFunc: (input: T) => Promise<TResult>;
    private readonly _captureResults: boolean;
    private readonly _results = new Array<TResult>();
    private _executionPromise: Promise<Array<TResult>> | null = null;


    public constructor(array: Array<T>, taskFunc: (input: T) => Promise<TResult>, captureResults: boolean)
    {
        this._array = array;
        this._taskFunc = taskFunc;
        this._captureResults = captureResults;
    }


    public execute(): Promise<Array<TResult>>
    {
        if (this._executionPromise != null)
            return this._executionPromise;

        this._executionPromise = this._execute().then(() => this._results);
        return this._executionPromise;
    }

    private async _execute(): Promise<void>
    {
        for (const item of this._array)
        {
            const result = await this._taskFunc(item);
            if (this._captureResults)
                this._results.push(result);
        }
    }
}

class BatchTaskExec<T, TResult>
{
    private readonly _array: Array<T>;
    private readonly _taskFunc: (input: T) => Promise<TResult>;
    private readonly _captureResults: boolean;
    private readonly _taskCount: number;


    public constructor(array: Array<T>, taskFunc: (input: T) => Promise<TResult>, captureResults: boolean, taskCount?: number)
    {
        this._array = array;
        this._taskFunc = taskFunc;
        this._captureResults = captureResults;

        taskCount = taskCount ?? array.length;
        taskCount = Math.max(taskCount, 1);
        taskCount = Math.min(taskCount, array.length);
        this._taskCount = taskCount;
    }

    // BROKEN
    // public async process(): Promise<Array<TResult>>
    // {
    //     if (this._taskCount === this._array.length)
    //         return await Promise.all(this._array.map(t => this._taskFunc(t)));

    //     const batchSize = Math.floor(this._array.length / this._taskCount);
    //     console.log("BATCH SIZE", batchSize);
    //     const promises = new Array<Promise<TResult[]>>();

    //     for (let i = 0; i < this._taskCount; i++)
    //     {
    //         const isLast = i === (this._taskCount - 1);
    //         const taskExec = new TaskExec(this._array.skip(i * batchSize).take(isLast ? this._array.length : batchSize),
    //             this._taskFunc, this._captureResults);

    //         promises.push(taskExec.execute());
    //     }

    //     const results = await Promise.all(promises);

    //     if (!this._captureResults)
    //         return new Array<TResult>();

    //     return results.reduce((acc, items) =>
    //     {
    //         acc.push(...items);
    //         return acc;
    //     }, new Array<TResult>());
    // }

    // Round robin
    // public async process(): Promise<Array<TResult>>
    // {
    //     if (this._taskCount === this._array.length)
    //         return await Promise.all(this._array.map(t => this._taskFunc(t)));

    //     const pools = new Array<Array<T>>();
    //     for (let i = 0; i < this._taskCount; i++)
    //         pools.push([]);

    //     let poolIndex = 0;
    //     for (let i = 0; i < this._array.length; i++)
    //     {
    //         if (poolIndex >= pools.length)
    //             poolIndex = 0;

    //         const pool = pools[poolIndex];
    //         pool.push(this._array[i]);
    //         poolIndex++;
    //     }

    //     const promises = new Array<Promise<TResult[]>>();

    //     for (let i = 0; i < this._taskCount; i++)
    //     {
    //         const taskExec = new TaskExec(pools[i], this._taskFunc, this._captureResults);

    //         promises.push(taskExec.execute());
    //     }

    //     const results = await Promise.all(promises);

    //     if (!this._captureResults)
    //         return new Array<TResult>();

    //     const maxLength = Math.max(...results.map(t => t.length));
    //     const finalResults = new Array<TResult>();
    //     for (let i = 0; i < maxLength; i++)
    //     {
    //         for (let j = 0; j < pools.length; j++)
    //         {
    //             const value = results[j][i];
    //             if (value !== undefined)
    //                 finalResults.push(value);
    //         }
    //     }
    //     return finalResults;
    // }

    // Remainder Round Robin
    public async process(): Promise<Array<TResult>>
    {
        if (this._taskCount === this._array.length)
            return Promise.all(this._array.map(t => this._taskFunc(t)));

        const remainder = this._array.length % this._taskCount;
        const batchSize = (this._array.length - remainder) / this._taskCount;

        // console.log("BATCH SIZE", batchSize);
        // console.log("REMAINDER", remainder);

        const promises = new Array<Promise<Array<TResult>>>();

        const hasRemainder = remainder > 0;

        const pools = new Array<Array<T>>();
        for (let i = 0; i < this._taskCount; i++)
            pools.push(ArrayExt.take(ArrayExt.skip(this._array, i * batchSize), batchSize));

        if (hasRemainder)
        {
            const baseLength = this._array.length - remainder;
            let arrayIndex, poolIndex;
            for (arrayIndex = baseLength, poolIndex = 0; arrayIndex < this._array.length; arrayIndex++, poolIndex++)
            {
                pools[poolIndex].push(this._array[arrayIndex]);
            }
        }

        // console.log("POOLS", pools);

        for (let i = 0; i < this._taskCount; i++)
        {
            const taskExec = new TaskExec(pools[i], this._taskFunc, this._captureResults);
            promises.push(taskExec.execute());
        }

        const results = await Promise.all(promises);

        if (!this._captureResults)
            return new Array<TResult>();

        if (hasRemainder)
        {
            const remaining = new Array<TResult>();
            const baseLength = this._array.length - remainder;
            let arrayIndex, poolIndex;
            for (arrayIndex = baseLength, poolIndex = 0; arrayIndex < this._array.length; arrayIndex++, poolIndex++)
            {
                pools[poolIndex].push(this._array[arrayIndex]);

                const poolResults = results[poolIndex];
                remaining.push(poolResults[poolResults.length - 1]);
                poolResults.splice(results[poolIndex].length - 1, 1);
            }

            const actualResults = results.reduce((acc, items) =>
            {
                acc.push(...items);
                return acc;
            }, new Array<TResult>());

            actualResults.push(...remaining);
            return actualResults;
        }
        else
        {
            return results.reduce((acc, items) =>
            {
                acc.push(...items);
                return acc;
            }, new Array<TResult>());
        }
    }
}

class TaskManager<T>
{
    private readonly _array: Array<T>;
    private readonly _taskFunc: (input: T) => Promise<any>;
    private readonly _taskCount: number;
    private readonly _captureResults: boolean;
    private readonly _tasks: Array<Task<T>>;
    private readonly _results: Array<any> = [];


    public constructor(array: Array<T>, taskFunc: (input: T) => Promise<any>, taskCount: number, captureResults: boolean)
    {
        this._array = array;
        this._taskFunc = taskFunc;
        this._taskCount = !taskCount || taskCount <= 0 ? this._array.length : taskCount;
        this._captureResults = captureResults;

        this._tasks = [];
        for (let i = 0; i < this._taskCount; i++)
            this._tasks.push(new Task<T>(this, i, this._taskFunc, captureResults));
    }


    public async execute(): Promise<void>
    {
        for (let i = 0; i < this._array.length; i++)
        {
            if (this._captureResults)
                this._results.push(null);
            await this._executeTaskForItem(this._array[i], i);
        }

        await this._finish();
    }

    public addResult(itemIndex: number, result: any): void
    {
        this._results[itemIndex] = result;
    }

    public getResults(): Array<any>
    {
        return this._results;
    }


    private async _executeTaskForItem(item: T, itemIndex: number): Promise<void>
    {
        let availableTask = this._tasks.find(t => t.isFree);
        if (!availableTask)
        {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            const task = await Promise.race(this._tasks.map(t => t.promise!));
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            task.free();
            availableTask = task;
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        availableTask.execute(item, itemIndex);
    }

    private _finish(): Promise<any>
    {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return Promise.all(this._tasks.filter(t => !t.isFree).map(t => t.promise));
    }
}

class Task<T>
{
    private readonly _manager: TaskManager<T>;
    // @ts-expect-error: not used atm
    private readonly _id: number;
    private readonly _taskFunc: (input: T) => Promise<any>;
    private readonly _captureResult: boolean;
    private _promise: Promise<Task<T>> | null;


    public get promise(): Promise<Task<T>> | null { return this._promise; }
    public get isFree(): boolean { return this._promise === null; }


    public constructor(manager: TaskManager<T>, id: number, taskFunc: (input: T) => Promise<any>, captureResult: boolean)
    {
        this._manager = manager;
        this._id = id;
        this._taskFunc = taskFunc;
        this._captureResult = captureResult;
        this._promise = null;
    }


    public execute(item: T, itemIndex: number): void
    {
        this._promise = new Promise((resolve, reject) =>
        {
            this._taskFunc(item)
                .then((result) =>
                {
                    if (this._captureResult)
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        this._manager.addResult(itemIndex, result);
                    resolve(this);
                })
                .catch((err) => reject(err));
        });
    }

    public free(): void
    {
        this._promise = null;
    }
}

function defineArrayExtProperties(): void
{
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["isEmpty"] === undefined)
        Object.defineProperty(Array.prototype, "isEmpty", {
            configurable: false,
            enumerable: false,
            get: function ()
            {
                return this.length === 0;
            }
        });

    
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["isNotEmpty"] === undefined)
        Object.defineProperty(Array.prototype, "isNotEmpty", {
            configurable: false,
            enumerable: false,
            get: function ()
            {
                return this.length > 0;
            }
        });

    // // @ts-ignore
    // if (Array.prototype["first"] === undefined)
    //     Object.defineProperty(Array.prototype, "first", {
    //         configurable: false,
    //         enumerable: false,
    //         get: function ()
    //         {
    //             // if (this.length === 0)
    //             //     throw new Error("Invalid Operation: Array is empty");

    //             if (this.length === 0)
    //                 return undefined;

    //             return this[0];
    //         }
    //     });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["takeFirst"] === undefined)
        Object.defineProperty(Array.prototype, "takeFirst", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (): any
            {
                if (this.length === 0)
                    throw new Error("Invalid Operation: Array is empty");

                // if (this.length === 0)
                //     return undefined;

                return this[0];
            }
        });

    // // @ts-ignore
    // if (Array.prototype["last"] === undefined)
    //     Object.defineProperty(Array.prototype, "last", {
    //         configurable: false,
    //         enumerable: false,
    //         get: function ()
    //         {
    //             if (this.length === 0)
    //                 throw new Error("Invalid Operation: Array is empty");

    //             // if (this.length === 0)
    //             //     return undefined;

    //             return this[this.length - 1];
    //         }
    //     });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["takeLast"] === undefined)
        Object.defineProperty(Array.prototype, "takeLast", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (): any
            {
                if (this.length === 0)
                    throw new Error("Invalid Operation: Array is empty");

                // if (this.length === 0)
                //     return undefined;

                return this[this.length - 1];
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["contains"] === undefined)
        Object.defineProperty(Array.prototype, "contains", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (value: any): boolean
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return ArrayExt.contains(this, value);
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["where"] === undefined)
        Object.defineProperty(Array.prototype, "where", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (filterFunc: (value: any) => boolean): Array<any>
            {
                return (<Array<any>>this).filter(filterFunc);
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["orderBy"] === undefined)
        Object.defineProperty(Array.prototype, "orderBy", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (compareFunc?: (value: any) => any): Array<any>
            {
                return ArrayExt.orderBy(this, compareFunc!);
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["orderByDesc"] === undefined)
        Object.defineProperty(Array.prototype, "orderByDesc", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (compareFunc?: (value: any) => any): Array<any>
            {
                return ArrayExt.orderByDesc(this, compareFunc!);
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["groupBy"] === undefined)
        Object.defineProperty(Array.prototype, "groupBy", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (keyFunc: (value: any) => string): Array<{ key: string; values: Array<any>; }>
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return ArrayExt.groupBy(this, keyFunc);
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["distinct"] === undefined)
        Object.defineProperty(Array.prototype, "distinct", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (compareFunc?: (value: any) => any): Array<any>
            {
                return ArrayExt.distinct(this, compareFunc!);
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["skip"] === undefined)
        Object.defineProperty(Array.prototype, "skip", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (count: number): Array<any>
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return ArrayExt.skip(this, count);
            }
        });
    
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["take"] === undefined)
        Object.defineProperty(Array.prototype, "take", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (count: number): Array<any>
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return ArrayExt.take(this, count);
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["count"] === undefined)
        Object.defineProperty(Array.prototype, "count", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (predicate?: (value: any) => boolean): number
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return ArrayExt.count(this, predicate!);
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["remove"] === undefined)
        Object.defineProperty(Array.prototype, "remove", {
            configurable: false,
            enumerable: false,
            writable: true, // for spread.js compatibility
            value: function (value: any): boolean
            {
                return ArrayExt.remove(this, value);
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["clear"] === undefined)
        Object.defineProperty(Array.prototype, "clear", {
            configurable: false,
            enumerable: false,
            writable: true, // for spread.js compatibility
            value: function (): void
            {
                ArrayExt.clear(this);
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["equals"] === undefined)
        Object.defineProperty(Array.prototype, "equals", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (compareArray: Array<any>, compareFunc?: (t1: any, t2: any) => boolean): boolean
            {
                return ArrayExt.equals(this, compareArray, compareFunc!);
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["forEachAsync"] === undefined)
        Object.defineProperty(Array.prototype, "forEachAsync", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (asyncFunc: (input: any) => Promise<void>, degreesOfParallelism?: number): Promise<void>
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return ArrayExt.forEachAsync(this, asyncFunc, degreesOfParallelism);
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["mapAsync"] === undefined)
        Object.defineProperty(Array.prototype, "mapAsync", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (asyncFunc: (input: any) => Promise<any>, degreesOfParallelism?: number): Promise<Array<any>>
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return ArrayExt.mapAsync(this, asyncFunc, degreesOfParallelism);
            }
        });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Array.prototype["reduceAsync"] === undefined)
        Object.defineProperty(Array.prototype, "reduceAsync", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (asyncFunc: (acc: any, input: any) => Promise<any>, accumulator?: any): Promise<any>
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return ArrayExt.reduceAsync(this, asyncFunc, accumulator);
            }
        });
}

defineArrayExtProperties();