"use strict";
class MathExt {
    static percentage(partialValue, wholeValue) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (partialValue == null || typeof partialValue !== "number" || partialValue < 0)
            throw new Error("Argument partialValue must be a valid non-negative number.");
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (wholeValue == null || typeof wholeValue !== "number" || wholeValue <= 0)
            throw new Error("Argument wholeValue must be a valid number > 0.");
        return (partialValue / wholeValue) * 100;
    }
    static percentagePartial(percentage, wholeValue) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (percentage == null || typeof percentage !== "number" || percentage < 0)
            throw new Error("Argument percentage must be a valid non-negative number.");
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (wholeValue == null || typeof wholeValue !== "number" || wholeValue <= 0)
            throw new Error("Argument wholeValue must be a valid number > 0.");
        return (percentage * wholeValue) / 100;
    }
    static percentageWhole(percentage, partialValue) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (percentage == null || typeof percentage !== "number" || percentage < 0)
            throw new Error("Argument percentage must be a valid non-negative number.");
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (partialValue == null || typeof partialValue !== "number" || partialValue < 0)
            throw new Error("Argument partialValue must be a valid non-negative number.");
        return (partialValue / percentage) * 100;
    }
    static clamp(value, min, max) {
        if (value < min)
            return min;
        if (value > max)
            return max;
        return value;
    }
    static median(values) {
        const sorted = MathExt._sortNumbersEliminateNulls(values);
        if (sorted.length === 0)
            return null;
        if (sorted.length === 1)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return sorted[0];
        if ((sorted.length % 2) === 0) {
            const midish = sorted.length / 2;
            const first = sorted[midish - 1];
            const second = sorted[midish];
            return (first + second) / 2;
        }
        else {
            const mid = Math.floor(sorted.length / 2);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return sorted[mid];
        }
    }
    static linearSpace(start, end, count) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (start == null || typeof start !== "number")
            throw new Error("Argument start is not a valid number");
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (end == null || typeof end !== "number")
            throw new Error("Argument end is not a valid number");
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (count == null || typeof count !== "number")
            throw new Error("Argument count is not a valid number");
        if (count === 0)
            return [];
        if (count === 1)
            return [start];
        const step = (end - start) / (count - 1);
        const space = new Array();
        for (let i = 0; i < count; i++)
            space.push(start + (step * i));
        return space;
    }
    static _sortNumbersEliminateNulls(values) {
        const internalArray = [];
        for (let i = 0; i < values.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (values[i] != null)
                internalArray.push(values[i]);
        }
        internalArray.sort((a, b) => {
            if (a < b)
                return -1;
            if (a > b)
                return 1;
            return 0;
        });
        return internalArray;
    }
}
function defineMathExtProperties() {
    if (Math.percentage === undefined)
        Math.percentage = function (partialValue, wholeValue) {
            return MathExt.percentage(partialValue, wholeValue);
        };
    if (Math.percentagePartial === undefined)
        Math.percentagePartial = function (percentage, wholeValue) {
            return MathExt.percentagePartial(percentage, wholeValue);
        };
    if (Math.percentageWhole === undefined)
        Math.percentageWhole = function (percentage, partialValue) {
            return MathExt.percentageWhole(percentage, partialValue);
        };
    if (Math.clamp === undefined)
        Math.clamp = function (value, min, max) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return MathExt.clamp(value, min, max);
        };
    if (Math.median === undefined)
        Math.median = function (values) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return MathExt.median(values);
        };
    if (Math.linearSpace === undefined)
        Math.linearSpace = function (start, end, count) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return MathExt.linearSpace(start, end, count);
        };
}
defineMathExtProperties();
//# sourceMappingURL=math-ext.js.map