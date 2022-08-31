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
});