declare global
{
    interface String
    {
        /**
         * @description Checks if the string is either empty or whitespace.
         * 
         * @returns True if it is empty or only contains whitespace.
         * 
         */
        isEmptyOrWhiteSpace(): boolean;
        /**
         * @description Checks if the string is neither empty or whitespace.
         * 
         * @returns True if it is not empty or does not only contains whitespace.
         */
        isNotEmptyOrWhiteSpace(): boolean;
        /**
         * @description Checks if the string contains a substring, `search`.
         * 
         * @param search - The substring being checked for inside the string.
         * @returns True if the string contains the search substring.
         */
        contains(search: string): boolean; // native implementation includes
        // startsWith(value: string): boolean; // native implementation exists
        // endsWith(value: string): boolean; // native implementation exists
        /**
         * @description Extracts all the numbers from a string.
         * 
         * @returns The numbers inside the given string.
         */
        extractNumbers(): string;
        /**
         * @description Extracts all the alphabetical characters from a string.
         * 
         * @returns The alphabetical characters inside the given string.
         */
        extractCharacters(): string;
        /**
         * @description Format the given string by replacing "{#}". In "{#}", "#" is an integer; this integer corresponds to the index of the parameter.
         * 
         * @example
         * ```ts
         * // Prints "My name is Viola Deluca"
         * console.log("my name is {0} {1}".format("Viola", "Deluca"));
         * ```
         * 
         * @returns The formatted string.
         */
        format(...params: any[]): string;
        /**
         * @description Replaces all instances of `searchValue` substring inside the string with the `replaceValue` string.
         * 
         * @param searchValue - The substring being searched for.
         * @param replaceValue - The string replacing the search value.
         * @returns The string with the values replaced.
         */
        replaceAll(searchValue: string, replaceValue: string): string;
        /**
         * @description Base64 encodes the string.
         * 
         * @returns The based64 encoded string.
         */
        base64Encode(): string;
        /**
         * @description Decodes a Base64 encoded string.
         * 
         * @returns The decoded string.
         */
        base64Decode(): string;
        /**
         * @description Base64 Url encodes the string.
         * 
         * @returns The based64 Url encoded string.
         */
        base64UrlEncode(): string;
        /**
         * @description Decodes a Base64Url encoded string.
         * 
         * @returns The decoded string.
         */
        base64UrlDecode(): string;
        /**
         * @description Hex encodes the string.
         * 
         * @returns The hex encoded string.
         */
        hexEncode(): string;
        /**
         * @description Decodes a Hex encoded string.
         * 
         * @returns The decoded string.
         */
        hexDecode(): string;
        /**
         * @description Checks to see if the string uses the follows the `format`. The `format` uses the follow syntax. 
         * `@` represents an alphabetical character.
         * `#` represents a numerical character.
         * `\` represents an escape character.
         * `*` represents a wildcard, (any length alphanumeric character).
         * 
         * @example
         * ```ts
         * // Prints true
         * console.log("aAzZ09".matchesFormat("@@@@##"));
         * // Prints false
         * console.log("a1zZ09".matchesFormat("@@@@##"));
         * // Prints true
         * console.log("12testing".matchesFormat("##test@@@"));
         * // Prints false
         * console.log("12tester".matchesFormat("##test@@@"));
         *  // Prints true
         * console.log("01\\31\\20##".matchesFormat("##\\\\##\\\\##\\#\\#")); // # need to be escaped in the format 
         * Print true
         * console.log("working hello".matchesFormat("*hello"));
         * ```
         * 
         * @param format - The format of the string to check for.
         * @returns true if the string matches the format.
         */
        matchesFormat(format: string): boolean;
    }

    interface Object
    {
        // mapToObject(factoryFunc: () => any): any;
        // merge(value: object): void;
        /**
         * @description Gets the type name of the object.
         * 
         * @returns The type name.
         */
        getTypeName(): string;
        /**
         * 
         * @description Gets the value inside of an object given a `key`
         * Key can be in the format `parentObjKey.nestedObjKey`
         * 
         * @example 
         * a = { a: "a", b : { x: 12 } }
         * // Returns "a"
         * a.getValue("a")
         * 
         * // Returns 12
         * a.getValue("b.x")
         * 
         * @param key - The key to locate the value.
         * @returns The value.
         */
        getValue(key: string): any;
        /**
         * @description Sets a `value` on the object with the specified `key`. Add the key if not present
         * Key can be in the format `parentObjKey.nestedObjKey`
         * 
         * @example
         * a = {};
         * // Prints { a: 1 }
         * a.setValue("a", 1);
         * console.log(a);
         * 
         * // Prints { a: 1, b: { x: 1 }}
         * a.setValue("b.x", 1);
         * console.log(a);
         * 
         * @param key - The key.
         * @param value - The value to set to the `key`.
         */
        setValue(key: string, value: any): void;
        /**
         * @deprecated
         */
        serializeObject(...keys: Array<string>): object; // FIXME: Skeleton Code
        /**
         * @deprecated
         */
        deserializeObject(targetClassOrObject: Function | object, ...keysOrValues: Array<any>): object; // FIXME: Skeleton Code
    }

    interface Array<T>
    {
        readonly isEmpty: boolean;
        readonly isNotEmpty: boolean;
        // readonly first: T;
        // readonly last: T;
        /**
         * @description returns the element at index 0. Throws an exception if the array is empty
         */
        takeFirst(): T;

        /**
         * @description returns the last element of the array. Throws an exception if the array is empty
         */
        takeLast(): T;
        /**
         * @description Checks to see if the array contains a value.
         * 
         * @param value - The value being checked for.
         * @returns True if the value is inside the array.
         */
        contains(value: T): boolean;
        /**
         * @description Filters the array for only true values after checking it against the `filterFunc`.
         * 
         * @param filterFunc - The method that's executed on each element of the array, if it returns true then the element is included and not included if array it returns false.
         * @returns The filtered array where each element of the array is true from filter function.
         */
        where(filterFunc: (value: T) => boolean): Array<T>;
        /**
         * @description Sorts the array by ascending order.
         * 
         * @returns The sorted array.
         */
        orderBy(): Array<T>;
        /**
         * @description Sorts the array by ascending order of the value returned by the `compareFunc`.
         * 
         * @example
         * // Prints  [ { name: "a" }, { name: "f" }, { name: "z" } ]
         * array = [ { name: "f" }, { name: "a" }, { name: "z" } ]
         * console.log(array.orderBy(t => t.name));
         * 
         * @param compareFunc - The compareFunc being applied to each index in the array.
         * @returns The sorted array.
         */
        orderBy(compareFunc: (value: T) => any): Array<T>;
        /**
         * @description Sorts the array by descending order.
         * 
         * @returns The sorted array.
         */
        orderByDesc(): Array<T>;
        /**
         * @description  Sorts the array by descending order of the value returned by the `compareFunc`.
         * 
         * @param compareFunc - The compareFunc being applied to each index in the array.
         * @returns The sorted array.
         */
        orderByDesc(compareFunc: (value: T) => any): Array<T>;
        /**
         * @description Iterates through an array of objects and uses `keyFunc` to determine what keys will be
         * used to create a new array grouped by those keys.
         * 
         * @param keyFunc - The function which contains the keys to be grouped.
         * @returns The grouped array of object.
         */
        groupBy(keyFunc: (value: T) => string): Array<{ key: string, values: Array<T> }>
        /**
         * @description Checks for duplicates value within an array and creates a new array with only unique values.
         * 
         * @returns The array with no distinct values.
         */
        distinct(): Array<T>;
        /**
         * @description Checks for duplicates value returned by the `compareFunc` for each element
         * inside the array and creates a new array with only unique values.
         * 
         * @returns The array with no distinct values.
         */
        distinct(compareFunc: (value: T) => any): Array<T>;
        /**
         * @description Creates a new array based on `count` being the initial amount of element being skipped.
         * 
         * @param count - The number of elements to skip.
         * @returns The array with initial count elements removed.
         */
        skip(count: number): Array<T>;
        /**
         * @description Creates a new array with the initial elements of the array up till `count`.
         * 
         * @param count - The number of elements to include.
         * @returns The array with only the initial elements up till count.
         */
        take(count: number): Array<T>;
        /**
         * @description Finds the length of the array.
         * 
         * @returns The length of the array.
         */
        count(): number;
        /**
         * @description Finds the number of the array that satisfies the `predicate`.
         * 
         * @param predicate - The predicate function to check each value.
         * @returns The amount of the array which satisfies the predicate.
         */
        count(predicate: (value: T) => boolean): number;
        /**
         * @description Removes first instance of `value` from the array. 
         * 
         * @param value - The specified value being removed from an array.
         * @returns True, if a value has been removed.
         */
        remove(value: T): boolean;
        /**
         * @description Remove all elements from an array.
         */
        clear(): void;
        /**
         * 
         * @description Checks if the array equals the `compareArray` for all indices.
         * 
         * @param compareArray - The comparison array being checked for equality.
         * @returns True if the the array exactly matches.
         */
        equals(compareArray: ReadonlyArray<T>): boolean;
        /**
         * @description Checks if the array equals the `compareArray` while applying a `compareFunc` to each elements.
         * 
         * @param compareArray - The comparison array being checked for equality.
         * @param compareFunc - The comparison function which compares a transformed value from both array index. 
         * `t1` is the value from `array`. `t2` is the value from the `compareArray`.
         * @returns True if the array matches with the compareFunc.
         */
        equals(compareArray: ReadonlyArray<T>, compareFunc: (t1: T, t2: T) => boolean): boolean;
        /**
         * @description Has the same functionality as `Array.prototype.forEach` while applying `asyncFunc` to each element of the array
         * with the specification of the `degreeOfParallelism` to be applied.
         * 
         * @param asyncFunc - The async function to be provided to each elements inside the array.
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        forEachAsync(asyncFunc: (input: T) => Promise<void>, degreesOfParallelism?: number): Promise<void>;
        /**
         * @description Has the same functionality as `Array.prototype.map` while applying `asyncFunc` to each element of the array
         * with the specification of the `degreeOfParallelism` to be applied.
         * 
         * @param asyncFunc - The async function to be provided to each elements inside the array.
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        mapAsync<U>(asyncFunc: (input: T) => Promise<U>, degreesOfParallelism?: number): Promise<Array<U>>;
        /**
         * @description Has the same functionality as `Array.prototype.reduce` while applying `asyncFunc` to each element of the array
         * with the specification of the `degreeOfParallelism` to be applied.
         * 
         * @param asyncFunc - The async function to be provided to each elements inside the array.
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        reduceAsync<U>(asyncFunc: (acc: U, input: T) => Promise<U>, accumulator?: U): Promise<U>;
    }

    interface ReadonlyArray<T>
    {
        readonly isEmpty: boolean;
        readonly isNotEmpty: boolean;
        // readonly first: T;
        // readonly last: T;
        /**
         * @description returns the element at index 0. Throws an exception if the array is empty
         */
        takeFirst(): T;

        /**
         * @description returns the last element of the array. Throws an exception if the array is empty
         */
        takeLast(): T;
        /**
         * @description Checks to see if the array contains a value.
         * 
         * @param value - The value being checked for.
         * @returns True if the value is inside the array.
         */
        contains(value: T): boolean;
        /**
         * @description Filters the array for only true values after checking it against the `filterFunc`.
         * 
         * @param filterFunc - The method that's executed on each element of the array, if it returns true then the element is included and not included if array it returns false.
         * @returns The filtered array where each element of the array is true from filter function.
         */
        where(filterFunc: (value: T) => boolean): Array<T>;
        /**
         * @description Sorts the array by ascending order.
         * 
         * @returns The sorted array.
         */
        orderBy(): Array<T>;
        /**
         * @description Sorts the array by ascending order of the value returned by the `compareFunc`.
         * 
         * @example
         * // Prints  [ { name: "a" }, { name: "f" }, { name: "z" } ]
         * array = [ { name: "f" }, { name: "a" }, { name: "z" } ]
         * console.log(array.orderBy(t => t.name));
         * 
         * @param compareFunc - The compareFunc being applied to each index in the array.
         * @returns The sorted array.
         */
        orderBy(compareFunc: (value: T) => any): Array<T>;
        /**
         * @description Sorts the array by descending order.
         * 
         * @returns The sorted array.
         */
        orderByDesc(): Array<T>;
        /**
         * @description  Sorts the array by descending order of the value returned by the `compareFunc`.
         * 
         * @param compareFunc - The compareFunc being applied to each index in the array.
         * @returns The sorted array.
         */
        orderByDesc(compareFunc: (value: T) => any): Array<T>;
        /**
         * @description Iterates through an array of objects and uses `keyFunc` to determine what keys will be
         * used to create a new array grouped by those keys.
         * 
         * @param keyFunc - The function which contains the keys to be grouped.
         * @returns The grouped array of object.
         */
        groupBy(keyFunc: (value: T) => string): Array<{ key: string, values: Array<T> }>
        /**
         * @description Checks for duplicates value within an array and creates a new array with only unique values.
         * 
         * @returns The array with no distinct values.
         */
        distinct(): Array<T>;
        /**
         * @description Checks for duplicates value returned by the `compareFunc` for each element
         * inside the array and creates a new array with only unique values.
         * 
         * @returns The array with no distinct values.
         */
        distinct(compareFunc: (value: T) => any): Array<T>;
        /**
         * @description Creates a new array based on `count` being the initial amount of element being skipped.
         * 
         * @param count - The number of elements to skip.
         * @returns The array with initial count elements removed.
         */
        skip(count: number): Array<T>;
        /**
         * @description Creates a new array with the initial elements of the array up till `count`.
         * 
         * @param count - The number of elements to include.
         * @returns The array with only the initial elements up till count.
         */
        take(count: number): Array<T>;
        /**
         * @description Finds the length of the array.
         * 
         * @returns The length of the array.
         */
        count(): number;
        /**
         * @description Finds the number of the array that satisfies the `predicate`.
         * 
         * @param predicate - The predicate function to check each value.
         * @returns The amount of the array which satisfies the predicate.
         */
        count(predicate: (value: T) => boolean): number;
        /**
         * @description Removes first instance of `value` from the array. 
         * 
         * @param value - The specified value being removed from an array.
         * @returns True, if a value has been removed.
         */
        remove(value: T): boolean;
        /**
         * @description Remove all elements from an array.
         */
        clear(): void;
        /**
         * 
         * @description Checks if the array equals the `compareArray` for all indices.
         * 
         * @param compareArray - The comparison array being checked for equality.
         * @returns True if the the array exactly matches.
         */
        equals(compareArray: ReadonlyArray<T>): boolean;
        /**
         * @description Checks if the array equals the `compareArray` while applying a `compareFunc` to each elements.
         * 
         * @param compareArray - The comparison array being checked for equality.
         * @param compareFunc - The comparison function which compares a transformed value from both array index. 
         * `t1` is the value from `array`. `t2` is the value from the `compareArray`.
         * @returns True if the array matches with the compareFunc.
         */
        equals(compareArray: ReadonlyArray<T>, compareFunc: (t1: T, t2: T) => boolean): boolean;
        /**
         * @description Has the same functionality as `Array.prototype.forEach` while applying `asyncFunc` to each element of the array
         * with the specification of the `degreeOfParallelism` to be applied.
         * 
         * @param asyncFunc - The async function to be provided to each elements inside the array.
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        forEachAsync(asyncFunc: (input: T) => Promise<void>, degreesOfParallelism?: number): Promise<void>;
        /**
         * @description Has the same functionality as `Array.prototype.map` while applying `asyncFunc` to each element of the array
         * with the specification of the `degreeOfParallelism` to be applied.
         * 
         * @param asyncFunc - The async function to be provided to each elements inside the array.
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        mapAsync<U>(asyncFunc: (input: T) => Promise<U>, degreesOfParallelism?: number): Promise<Array<U>>;
        /**
         * @description Has the same functionality as `Array.prototype.reduce` while applying `asyncFunc` to each element of the array
         * with the specification of the `degreeOfParallelism` to be applied.
         * 
         * @param asyncFunc - The async function to be provided to each elements inside the array.
         * @param degreesOfParallelism - Optional: The amount of calls executed in parallel. Defaults to all.
         */
        reduceAsync<U>(asyncFunc: (acc: U, input: T) => Promise<U>, accumulator?: U): Promise<U>;
    }

    interface Math
    {
        /**
         * @description Calculates the percentage given the `partialValue` and `wholeNumber`.
         * 
         * @param partialValue - The partial value.
         * @param wholeValue - The whole value.
         * @returns The percentage value.
         */
        percentage(partialValue: number, wholeValue: number): number;
        /**
         * @description Calculates the partial value given the `percentage` and the `wholeValue`.
         * 
         * @param percentage - The percentage calculated for a partial value.
         * @param wholeValue - The whole value.
         * @returns The partial value.
         */
        percentagePartial(percentage: number, wholeValue: number): number;
        /**
         * @description Calculates the whole value given the `percentage` and the `partialValue`.
         * 
         * @param percentage - The percentage calculated for a whole value. 
         * @param partialValue - The partial value.
         * @returns The whole value.
         */
        percentageWhole(percentage: number, partialValue: number): number;
        /**
         * @description Returns value clamped to be in the range `min` (lowerLimit) - `max` (upperLimit).
         * 
         * @param value - The value being clamped.
         * @param min - The minimum value.
         * @param max - The maximum value.
         * @returns The clamped value.
         */
        clamp(value: number, min: number, max: number): number;
        /**
         * @description Calculates the median value given an array of `values`.
         * 
         * @param values - The readonly array being checked.
         * @returns The median.
         */
        median(values: ReadonlyArray<number>): number | null;

        /**
         * @description Returns an array of length `count` of numbers that are evenly spaced between `start` and `end`
         * @param start - Start value of linear space sequence (Inclusive)
         * @param end - End value of the linear space sequence (Inclusive)
         * @param count - Number of samples to generate
         */
        linearSpace(start: number, end: number, count: number): Array<number>;
    }
}

export { }