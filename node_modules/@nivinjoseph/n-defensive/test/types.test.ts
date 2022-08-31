import * as Assert from "assert";
import { given } from "../src/index";
import { ArgumentException } from "@nivinjoseph/n-exception";
import { Bar, Foo, Zax } from "./helpers";


suite("Types", () =>
{
    suite("ensureIsString", () =>
    {
        test("should be fine if the value is string", () =>
        {
            [null, undefined, "", "  ", " bar ", "foo"]
                .forEach(value =>
                {
                    Assert.doesNotThrow(() =>
                    {
                        given(value, "value").ensureIsString();
                    }, value as string);
                });

        });

        test("should throw ArgumentException if the value is not string", () =>
        {
            [1, 2.2, true, false, {}, new Object(), new Bar(), (): void => console.log("none")]
                .forEach(value =>
                {
                    Assert.throws(() =>
                    {
                        given(value as string, "value").ensureIsString();
                    }, ArgumentException, typeof value);
                });
        });
    });

    suite("ensureIsNumber", () =>
    {
        test("should be fine if the value is number", () =>
        {
            [null, undefined, -5, -6.70, 0, 1, 2.6783]
                .forEach(value =>
                {
                    Assert.doesNotThrow(() =>
                    {
                        given(value, "value").ensureIsNumber();
                    }, value as unknown as string);
                });
        });

        test("should throw ArgumentException if the value is not number", () =>
        {
            ["", "  ", "dd ", true, false, {}, new Object(), new Bar(), (): void => console.log("none")]
                .forEach((value) =>
                {
                    Assert.throws(() =>
                    {
                        given(value as number, "value").ensureIsNumber();
                    }, ArgumentException, typeof value);
                });
        });

        test("should throw ArgumentException if the value evaluates to NaN", () =>
        {
            const value: number = (undefined as any) + 1;
            if (!isNaN(value))
                Assert.ok(false, "not nan");

            Assert.throws(() =>
            {
                given(value, "value").ensureIsNumber();
            }, ArgumentException);
        });
    });

    suite("ensureIsEnum", () =>
    {
        enum Foo
        {
            bar = 0,
            baz = 2,
            maa = "something",
            ano = 3
        }

        enum Bar
        {
            foo = "my foo",
            baz = "my baz"
        }

        test("Valid num arg should not throw exception", () =>
        {
            [null, undefined, Foo.bar]
                .forEach(value =>
                {
                    Assert.doesNotThrow(() =>
                    {
                        given(value, "value").ensureIsEnum(Foo);
                    }, value as string); 
                });
        });

        test("Invalid num arg should throw exception", () =>
        {
            [5, "foo", Number.NaN]
                .forEach(value =>
                {
                    Assert.throws(() =>
                    {
                        given(value, "value").ensureIsEnum(Foo);
                    }, ArgumentException, typeof value);
                });
            
        });

        test("Valid string arg should not throw exception", () =>
        {
            [null, undefined, "my foo"].forEach(value =>
            {
                Assert.doesNotThrow(() =>
                {
                    given(value, "value").ensureIsEnum(Bar);
                });
            });
        });

        test("Invalid string arg should throw exception", () =>
        {
            ["my bruh", "", "  ", 5].forEach(value =>
            {
                Assert.throws(() =>
                {
                    given(value, "value").ensureIsEnum(Bar);
                }, ArgumentException);
            });
        });
    });

    suite("ensureIsBoolean", () =>
    {
        test("should be fine if the value is boolean", () =>
        {
            [null, undefined, true, false]
                .forEach(value =>
                {
                    Assert.doesNotThrow(() =>
                    {
                        given(value, "value").ensureIsBoolean();
                    }, value as unknown as string);
                });
        });

        test("should throw ArgumentException if the value is not boolean", () =>
        {
            ["", "  ", "dd ", -5, -6.78, 0, 1, 3, 4.500, {}, new Object(), (): void => console.log("none")]
                .forEach(value =>
                {
                    Assert.throws(() =>
                    {
                        given(value as boolean, "value").ensureIsBoolean();
                    }, ArgumentException, typeof value);
                });
        });
    });

    suite("ensureIsObject", () =>
    {
        test("should be fine if the value is object", () =>
        {
            [null, undefined, {}, new Object(), new Number(), new String(), new Foo(), new Bar(), new Zax()]
                .forEach(value =>
                {
                    Assert.doesNotThrow(() =>
                    {
                        given(value, "value").ensureIsObject();
                    }, value as string);
                });
        });

        test("should throw ArgumentException if the value is not object", () =>
        {
            ["", "  ", "dd ", -1, -2.5, 0, 3, 4.500, true, false, (): void => console.log("none")]
                .forEach(value =>
                {
                    Assert.throws(() =>
                    {
                        given(value as object, "value").ensureIsObject();
                    }, typeof value);
                });
        });
    });

    suite("ensureIsFunction", () =>
    {
        test("should be fine if the value is function", () =>
        {
            [null, undefined, (): void => console.log("none"), function (): void { console.log("none"); }, function foo(): void { console.log("none"); }]
                .forEach(value =>
                {
                    Assert.doesNotThrow(() =>
                    {
                        given(value, "value").ensureIsFunction();
                    });
                });
        });

        test("should throw ArgumentException if the value is not function", () =>
        {
            ["", "  ", "dd ", -5, -6.78, 0, 1, 3, 4.500, {}, new Object(), new Bar(), new Zax()]
                .forEach(value =>
                {
                    Assert.throws(() =>
                    {
                        given(value as Function, "value").ensureIsFunction();
                    }, typeof value);
                });
        });
    });

    suite("ensureIsArray", () =>
    {
        test("should be fine if the value is array", () =>
        {
            [null, undefined, ["foo", "bar"], [], [0], [""], [1, new Foo()]]
                .forEach(value =>
                {
                    Assert.doesNotThrow(() =>
                    {
                        given(value, "value").ensureIsArray();
                    });
                });
        });

        test("should throw ArgumentException if the value is not array", () =>
        {
            ["", "  ", "dd ", -5, -6.78, 0, 1, 3, 4.500, {}, new Object(), new Bar(), new Zax(), (): void => console.log("none")]
                .forEach(value =>
                {
                    Assert.throws(() =>
                    {
                        given(value as Array<any>, "value").ensureIsArray();
                    }, ArgumentException);
                });
        });
    });
    
    suite("ensureIsNotEmpty [Array]", () =>
    {
        test("should be fine if the array is not empty", () =>
        {
            Assert.doesNotThrow(() =>
            {
                const value = [0];
                given(value, "value").ensureIsNotEmpty();
            });
        });
        
        test("should throw ArgumentException if the array is empty", () =>
        {
            Assert.throws(() =>
            {
                const value = new Array<any>();
                given(value, "value").ensureIsNotEmpty();
            }, ArgumentException);
        });
    });

    suite("ensureIsType", () =>
    {
        test("should be fine if the value is of correct type", () =>
        {
            const value = new Bar();
            given(value, "value").ensureIsType(Bar);
            Assert.ok(true);
        });

        test("should throw exception if value is subclass of type", () =>
        {
            Assert.throws(() =>
            {
                const value = new Bar();
                given(value, "value").ensureIsType(Foo);
            }, ArgumentException);
        });

        test("should throw ArgumentException if the value is not of correct type", () =>
        {
            Assert.throws(() =>
            {
                const value = new Bar();
                given(value, "value").ensureIsType(Zax);
            }, ArgumentException);
        });

        test("should throw ArgumentException if the value is superclass of type", () =>
        {
            Assert.throws(() =>
            {
                const value = new Foo();
                given(value, "value").ensureIsType(Bar);
            }, ArgumentException);
        });
    });

    suite("ensureIsInstanceOf", () =>
    {
        test("should be fine if the value is of correct type", () =>
        {
            Assert.doesNotThrow(() =>
            {
                const value = new Foo();
                given(value, "value").ensureIsInstanceOf(Foo);
            });
        });

        test("should be fine if value is subclass of type", () =>
        {
            Assert.doesNotThrow(() =>
            {
                const value = new Bar();
                given(value, "value").ensureIsInstanceOf(Foo);
            });
        });

        test("should throw ArgumentException if the value is not of correct type", () =>
        {
            Assert.throws(() =>
            {
                const value = new Bar();
                given(value, "value").ensureIsInstanceOf(Zax);
            }, ArgumentException);
        });

        test("should throw ArgumentException if the value is superclass of type", () =>
        {
            Assert.throws(() =>
            {
                const value = new Foo();
                given(value, "value").ensureIsInstanceOf(Bar);
            }, ArgumentException);
        });
    });
});