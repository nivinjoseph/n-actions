import * as assert from "assert";
import { ConfigurationManager } from "./../src/index";

suite("Basic tests", () =>
{
    test("when reading existing value, value should be returned", () =>
    {
        const value = ConfigurationManager.getConfig<number>("test");
        assert.strictEqual(value, 23);
    });
    
    test("when reading null value, null should be returned", () =>
    {
        const value = ConfigurationManager.getConfig("test1");
        assert.strictEqual(value, null);
    });
    
    test("when reading non-existing (undefined) value, null should be returned", () =>
    {
        const value = ConfigurationManager.getConfig("test2");
        assert.strictEqual(value, null);
    });
    
    // test.only("object assign", () =>
    // {
    //     let some = Object.assign({ foo: "blah" }, null, undefined, { foo1: "foo", bar: "buzz" });
    //     assert.deepStrictEqual(some, { foo: "blah", foo1: "foo", bar: "buzz" });
    //     console.log(JSON.stringify(some));
    // });
    
    test("Given the key '*', then all configs must be returned", () =>
    {
        const value = ConfigurationManager.getConfig<object>("*");
        
        assert.ok(Object.entries(value).length > 1);
    });
    
    test("Given the key 'test1*', then all configs that start with 'test1' must be returned", () =>
    {
        const value = ConfigurationManager.getConfig<object>("test1*");

        assert.strictEqual(Object.entries(value).length, 2);
    });
    
    test("Given the key '*Value', then all configs that end with 'Value' must be returned", () =>
    {
        const value = ConfigurationManager.getConfig<object>("*Value");

        assert.strictEqual(Object.entries(value).length, 2);
    });
    
    test("Given the key '*1*', then all configs that contain '1' must be returned", () =>
    {
        const value = ConfigurationManager.getConfig<object>("*1*");

        assert.strictEqual(Object.entries(value).length, 2);
    });
});