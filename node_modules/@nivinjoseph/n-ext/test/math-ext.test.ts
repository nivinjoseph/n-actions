import * as Assert from "assert";
import "../src/math-ext";


suite("MathExt", () =>
{
    suite("percentage", () =>
    {
        test("percentage", () =>
        {
            Assert.strictEqual(Math.percentage(10, 200), 5);
        });

        test("percentagePartial", () =>
        {
            Assert.strictEqual(Math.percentagePartial(5, 200), 10);
        });

        test("percentageWhole", () =>
        {
            Assert.strictEqual(Math.percentageWhole(5, 10), 200);
        });
    });

    suite("clamp", () =>
    {
        test("below range", () =>
        {
            Assert.strictEqual(Math.clamp(5, 6, 10), 6);
        });

        test("within range", () =>
        {
            Assert.strictEqual(Math.clamp(8, 6, 10), 8);
        });

        test("above range", () =>
        {
            Assert.strictEqual(Math.clamp(14, 6, 10), 10);
        });
    });

    suite("median", () =>
    {
        test("median empty", () =>
        {
            Assert.strictEqual(Math.median([]), null);
        });

        test("median nulls", () =>
        {
            // @ts-expect-error: just testing
            Assert.strictEqual(Math.median([null, undefined, null, null]), null);
        });

        test("median one", () =>
        {
            Assert.strictEqual(Math.median([5]), 5);
        });

        test("median odd", () =>
        {
            Assert.strictEqual(Math.median([1, 6, 3, 3, 9, 7, 8]), 6);
        });

        test("median even", () =>
        {
            Assert.strictEqual(Math.median([4, 1, 2, 3, 9, 5, 8, 6]), 4.5);
        });
    });

    suite("linerSpace", () =>
    {
        const assertValueCloseEnough = (actual: number, expected: number): void =>
        {
            // checks if the value is correct till 8 decimal places.

            Assert.ok(Math.abs(actual - expected) < 1e-8, `expected: ${expected} actual ${actual}`);
        };


        test("given start = 1, end = 10 and count = 0; should return an empty array", () =>
        {
            Assert.deepStrictEqual(Math.linearSpace(1, 10, 0), []);
        });

        test("given start = 1, end = 10 and count = 1; should return an array with just the start value", () =>
        {
            Assert.deepStrictEqual(Math.linearSpace(1, 10, 1), [1]);
        });

        test("given start = 1, end = 10 and count = 2; should return an array with only start and end value", () =>
        {
            Assert.deepStrictEqual(Math.linearSpace(1, 10, 2), [1, 10]);
        });

        test("given start = 1, end = 10 and count = 10; should return an array with values from 1 to 10", () =>
        {
            Assert.deepStrictEqual(Math.linearSpace(1, 10, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        });

        test("given start = 10, end = 1 and count = 10; should return an array with values from 10 to 1", () =>
        {
            Assert.deepStrictEqual(Math.linearSpace(10, 1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse());
        });

        test("given start = 1, end = 3 and count = 5; should return an array with values [1, 1.5, 2, 2.5, 3]", () =>
        {
            Assert.deepStrictEqual(Math.linearSpace(1, 3, 5), [1, 1.5, 2, 2.5, 3]);
        });

        test("given start = 1, end = -10 and count = 10; should return an array with correct negative values up to 8 decimal places.", () =>
        {
            const expected = [1., -0.22222222, -1.44444444, -2.66666667,
                -3.88888889, -5.11111111, -6.33333333, -7.55555556,
                // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
                -8.77777778, -10.];

            const result = Math.linearSpace(1, -10, 10);

            Assert.strictEqual(result.length, expected.length, "length is incorrect");

            result.forEach((t, index) => assertValueCloseEnough(t, expected[index]));
        });

        test("given start = 1, end = 2 and count = 20; should return an array with values with correct positive values up to 8 decimal places", () =>
        {
            const expected = [1., 1.05263158, 1.10526316, 1.15789474, 1.21052632,
                1.26315789, 1.31578947, 1.36842105, 1.42105263, 1.47368421,
                1.52631579, 1.57894737, 1.63157895, 1.68421053, 1.73684211,
                1.78947368, 1.84210526, 1.89473684, 1.94736842, 2.];

            const result = Math.linearSpace(1, 2, 20);

            Assert.strictEqual(result.length, expected.length, "length is incorrect");

            result.forEach((t, index) => assertValueCloseEnough(t, expected[index]));
        });

        test("given start = 0.21331436, end = 0.23412421 and count = 20; should return an array with values with correct positive values up to 8 decimal places", () =>
        {
            const expected = [0.21331436, 0.21440962, 0.21550487, 0.21660013, 0.21769538,
                0.21879064, 0.21988589, 0.22098115, 0.2220764, 0.22317166,
                0.22426691, 0.22536217, 0.22645742, 0.22755268, 0.22864793,
                0.22974319, 0.23083844, 0.2319337, 0.23302895, 0.23412421];

            const result = Math.linearSpace(0.21331436, 0.23412421, 20);

            Assert.strictEqual(result.length, expected.length, "length is incorrect");

            result.forEach((t, index) => assertValueCloseEnough(t, expected[index]));
        });
    });
});