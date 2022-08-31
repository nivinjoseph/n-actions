import { Exception, ApplicationException } from "../src/index";

// Not a proper test
suite.skip("Exception", () =>
{
    // @ts-expect-error: not used atm
    class MyCustomException extends ApplicationException
    { }

    class Foo
    {
        public doFoo(): void
        {
            console.log("fooing");
            // @ts-expect-error: not used atm
            const baz = new Bar().createBaz();
        }
    }

    class Bar
    {
        public createBaz(): Baz
        {
            try
            {
                return this._createBazInternal();
            }
            catch (err)
            {
                throw new ApplicationException("Caught some exception", err as Error);
            }
        }

        private _createBazInternal(): Baz
        {
            return new Baz();
        }
    }

    class Baz
    {
        public constructor()
        {
            console.log("creating exception");
            const exp = new Error("this is a test");
            console.log("throwing exception");
            throw exp;
        }
    }
    // @ts-expect-error: not used atm
    function foo(): never
    {
        throw new ApplicationException("waa");
    }
    
    test("StackTracing", () =>
    {
        // throw new Error("waa");
        
        // foo();
        
        try
        {
            const foo = new Foo();
            foo.doFoo();
        }
        catch (err)
        {
            const exp = err as Exception;

            console.log("stackTrace", exp.stack);
            console.log("toString()", exp.toString());
        }
    });
});