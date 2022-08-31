import { Exception } from "@nivinjoseph/n-exception";
import * as assert from "assert";
import { given } from "../src/index";

suite("ensureHasStructure", () =>
{
    // in* = invalid type
    // ne* = null || undefined
    // op* = optional
    // nes* = nested

    const obj: object = {
        strVal: "foo", // good
        inStrVal: true, // bad
        neStrVal: null, // bad

        opStrVal: "bar", // good
        opInStrVal: 5, // bad
        opNeStrVal: null, // good

        numVal: 5, // good
        inNumVal: "7", // bad
        neNumVal: null, // bad

        opNumVal: 6, // good
        opInNumVal: "6", // bad
        opNeNumVal: null, // good

        boolVal: false, // good
        inBoolVal: "true", // bad
        neBoolVal: null, // bad

        opBoolVal: true, // good
        opInBoolVal: "false", // bad
        opNeBoolVal: null, // good

        objVal: {}, // good
        inObjVal: "true", // bad
        neObjVal: null, // bad

        opObjVal: {}, // good
        opInObjVal: "false", // bad
        opNeObjVal: null, // good

        arrayVal: [1, 2, 3], // good
        inArrayVal: true, // bad
        neArrayVal: null, // bad

        opArrayVal: ["trey", "charlene"], // good
        opInArrayVal: {}, // bad
        opNeArrayVal: null, // good

        typedArrayVal: [1, 2, 3], // good
        inTypedArrayVal: [1, 2, 3], // bad
        neTypedArrayVal: null, // bad

        opTypedArrayVal: ["trey", "charlene"], // good
        opInTypedArrayVal: [{}, {}], // bad
        opNeTypedArrayVal: null, // good

        nesObjVal: { // good at top level
            strVal: "foo",
            inStrVal: true,
            neStrVal: null,

            opStrVal: "bar",
            opInStrVal: 5,
            opNeStrVal: null,

            numVal: 5,
            inNumVal: "7",
            neNumVal: null,

            opNumVal: 6,
            opInNumVal: "6",
            opNeNumVal: null,

            boolVal: false,
            inBoolVal: "true",
            neBoolVal: null,

            opBoolVal: true,
            opInBoolVal: "false",
            opNeBoolVal: null,

            objVal: {},
            inObjVal: "true",
            neObjVal: null,

            opObjVal: {},
            opInObjVal: "false",
            opNeObjVal: null,

            arrayVal: [1, 2, 3],
            inArrayVal: true,
            neArrayVal: null,

            opArrayVal: ["trey", "charlene"],
            opInArrayVal: {},
            opNeArrayVal: null
        }
    };

    test("pushing limits", () =>
    {
        // const arg = { foo: [null]};
        // const structure = { "foo?": ["Function"]};

        // const arg = { foo: new Zax() };
        // const structure = { "foo?": Foo};

        const arg = { foo: {} };
        // const structure = { "foo?": "object" };

        given(arg, "arg").ensureHasStructure({ "foo?": "object" });

        assert.ok(true);
    });

    test("should be fine if arg is null", () =>
    {
        const arg: object = null as any;
        const structure = {};

        given(arg, "arg").ensureHasStructure(structure);

        assert.ok(true);
    });

    test("should be fine if arg is undefined", () =>
    {
        const arg: object = undefined as any;
        const structure = {};

        given(arg, "arg").ensureHasStructure(structure);

        assert.ok(true);
    });

    test("should throw ArgumentNullException if structure is null", () =>
    {
        const structure: any = null;

        assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
            (exp: Exception) => exp.name === "ArgumentNullException");
    });

    test("should throw ArgumentNullException if structure is undefined", () =>
    {
        const structure: any = undefined;

        assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
            (exp: Exception) => exp.name === "ArgumentNullException");
    });

    test("should throw ArgumentException if structure has invalid type information", () =>
    {
        // const structure = { strVal: "sting" };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ strVal: "sting" } as any),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    // string
    test("should be fine given valid string value", () =>
    {
        // const structure = { strVal: "string" };

        given(obj, "obj").ensureHasStructure({ strVal: "string" });

        assert.ok(true);
    });

    test("should throw ArgumentException given invalid string value", () =>
    {
        // const structure = { inStrVal: "string" };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ inStrVal: "string" }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should throw ArgumentException given non-existant string value", () =>
    {
        // const structure = { neStrVal: "string" };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ neStrVal: "string" }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    // optional string
    test("should be fine given optional valid string value", () =>
    {
        // const structure = { "opStrVal?": "string" };

        given(obj, "obj").ensureHasStructure({ "opStrVal?": "string" });

        assert.ok(true);
    });

    test("should throw ArgumentException given optional invalid string value", () =>
    {
        // const structure = { "opInStrVal?": "string" };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ "opInStrVal?": "string" }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should be fine given optional non-existant string value", () =>
    {
        // const structure = { "opNeStrVal?": "string" };

        given(obj, "obj").ensureHasStructure({ "opNeStrVal?": "string" });

        assert.ok(true);
    });

    // number
    test("should be fine given valid number value", () =>
    {
        // const structure = { numVal: "number" };

        given(obj, "obj").ensureHasStructure({ numVal: "number" });

        assert.ok(true);
    });

    test("should throw ArgumentException given invalid number value", () =>
    {
        // const structure = { inNumVal: "number" };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ inNumVal: "number" }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should throw ArgumentException given non-existant number value", () =>
    {
        // const structure = { neNumVal: "number" };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ neNumVal: "number" }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    // optional number
    test("should be fine given optional valid number value", () =>
    {
        // const structure = { "opNumVal?": "number" };

        given(obj, "obj").ensureHasStructure({ "opNumVal?": "number" });

        assert.ok(true);
    });

    test("should throw ArgumentException given optional invalid number value", () =>
    {
        // const structure = { "opInNumVal?": "number" };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ "opInNumVal?": "number" }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should be fine given optional non-existant number value", () =>
    {
        // const structure = { "opNeNumVal?": "number" };

        given(obj, "obj").ensureHasStructure({ "opNeNumVal?": "number" });

        assert.ok(true);
    });

    // boolean
    test("should be fine given valid boolean value", () =>
    {
        // const structure = { boolVal: "boolean" };

        given(obj, "obj").ensureHasStructure({ boolVal: "boolean" });

        assert.ok(true);
    });

    test("should throw ArgumentException given invalid boolean value", () =>
    {
        // const structure = { inBoolVal: "boolean" };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ inBoolVal: "boolean" }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should throw ArgumentException given non-existant boolean value", () =>
    {
        // const structure = { neBoolVal: "boolean" };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ neBoolVal: "boolean" }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    // optional boolean
    test("should be fine given optional valid boolean value", () =>
    {
        // const structure = { "opBoolVal?": "boolean" };

        given(obj, "obj").ensureHasStructure({ "opBoolVal?": "boolean" });

        assert.ok(true);
    });

    test("should throw ArgumentException given optional invalid boolean value", () =>
    {
        // const structure = { "opInBoolVal?": "boolean" };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ "opInBoolVal?": "boolean" }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should be fine given optional non-existant boolean value", () =>
    {
        // const structure = { "opNeBoolVal?": "boolean" };

        given(obj, "obj").ensureHasStructure({ "opNeBoolVal?": "boolean" });

        assert.ok(true);
    });

    // array
    test("should be fine given valid array value", () =>
    {
        // const structure = { arrayVal: "array" };

        given(obj, "obj").ensureHasStructure({ arrayVal: "array" });

        assert.ok(true);
    });

    test("should throw ArgumentException given invalid array value", () =>
    {
        // const structure = { inArrayVal: "array" };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ inArrayVal: "array" }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should throw ArgumentException given non-existant array value", () =>
    {
        // const structure = { neArrayVal: "array" };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ neArrayVal: "array" }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    // optional array
    test("should be fine given optional valid array value", () =>
    {
        // const structure = { "opArrayVal?": "array" };

        given(obj, "obj").ensureHasStructure({ "opArrayVal?": "array" });

        assert.ok(true);
    });

    test("should throw ArgumentException given optional invalid array value", () =>
    {
        // const structure = { "opInArrayVal?": "array" };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ "opInArrayVal?": "array" }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should be fine given optional non-existant array value", () =>
    {
        // const structure = { "opNeArrayVal?": "array" };

        given(obj, "obj").ensureHasStructure({ "opNeArrayVal?": "array" });

        assert.ok(true);
    });

    // typed array
    test("should be fine given valid typed array value", () =>
    {
        // const structure = { typedArrayVal: ["number"] };

        given(obj, "obj").ensureHasStructure({ typedArrayVal: ["number"] });

        assert.ok(true);
    });

    test("should be fine given array with different types and type is any", () =>
    {
        const obj = {
            arr: ["1", 2, { a: 12 }]
        };
        
        given(obj, "obj").ensureHasStructure({ "arr": ["any"] });
        
        assert.ok(true);   
    });

        
    test("should throw ArgumentException given invalid typed array value", () =>
    {
        // const structure = { inTypedArrayVal: ["boolean"] };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ inTypedArrayVal: ["boolean"] }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should throw ArgumentException given non-existant typed array value", () =>
    {
        // const structure = { neTypedArrayVal: ["object"] };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ neTypedArrayVal: ["object"] }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    // optional array
    test("should be fine given optional valid typed array value", () =>
    {
        // const structure = { "opTypedArrayVal?": ["string"] };

        given(obj, "obj").ensureHasStructure({ "opTypedArrayVal?": ["string"] });

        assert.ok(true);
    });

    test("should throw ArgumentException given optional invalid typed array value", () =>
    {
        // const structure = { "opInTypedArrayVal?": ["number"] };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ "opInTypedArrayVal?": ["number"] }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should be fine given optional non-existant typed array value", () =>
    {
        // const structure = { "opNeTypedArrayVal?": ["array"] };

        given(obj, "obj").ensureHasStructure({ "opNeTypedArrayVal?": ["array"] });

        assert.ok(true);
    });

    // object
    test("should be fine given valid object value", () =>
    {
        // const structure = { objVal: "object" };

        given(obj, "obj").ensureHasStructure({ objVal: "object" });

        assert.ok(true);
    });

    test("should be fine given valid object value and object literal notation", () =>
    {
        const structure = { objVal: {} };

        given(obj, "obj").ensureHasStructure(structure);

        assert.ok(true);
    });

    test("should throw ArgumentException given invalid object value", () =>
    {
        // const structure = { inObjVal: "object" };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ inObjVal: "object" }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should throw ArgumentException given non-existant object value", () =>
    {
        // const structure = { neObjVal: "object" };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ neObjVal: "object" }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    // optional object
    test("should be fine given optional valid object value", () =>
    {
        // const structure = { "opObjVal?": "object" };

        given(obj, "obj").ensureHasStructure({ "opObjVal?": "object" });

        assert.ok(true);
    });

    test("should be fine given optional valid object value and object literal notation", () =>
    {
        const structure = { "opObjVal?": {} };

        given(obj, "obj").ensureHasStructure(structure);

        assert.ok(true);
    });

    test("should throw ArgumentException given optional invalid object value", () =>
    {
        // const structure = { "opInObjVal?": "object" };

        assert.throws(() => given(obj, "obj").ensureHasStructure({ "opInObjVal?": "object" }),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should be fine given optional non-existant object value", () =>
    {
        const structure: any = {
            "opNeObjVal?": "object"
        };

        given(obj, "obj").ensureHasStructure(structure);

        assert.ok(true);
    });

    // any
    test("should be fine given type is any and value is string", () =>
    {
        const obj = {
            a: "hello"
        };

        given(obj, "obj").ensureHasStructure({
            a: "any"
        });
        
        assert.ok(true);
    });

    test("should be fine given type is any and value is array", () =>
    {
        const obj = {
            a: ["hello"]
        };

        given(obj, "obj").ensureHasStructure({
            a: "any"
        });
        
        assert.ok(true);
    });

    test("should be fine given type is any and value is non-existant", () =>
    {
        const obj = {
            a: null
        };

        given(obj, "obj").ensureHasStructure({
            a: "any"
        });
        
        assert.ok(true);
    });

    // nested
    test("should throw ArgumentException if structure has invalid type information", () =>
    {
        // const structure = {
        //     nesObjVal: {
        //         strVal: "sting"
        //     }
        // };

        assert.throws(() => given(obj, "obj").ensureHasStructure({
            nesObjVal: {
                strVal: "sting"
            }
        } as any),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    // nested string
    test("should be fine given valid nested string value", () =>
    {
        let structure: any = {
            strVal: "string"
        };

        structure = {
            nesObjVal: structure
        };

        given(obj, "obj").ensureHasStructure(structure);

        assert.ok(true);
    });

    test("should throw ArgumentException given nested invalid string value", () =>
    {
        let structure: any = {
            inStrVal: "string"
        };

        structure = {
            nesObjVal: structure
        };

        assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should throw ArgumentException given nested non-existant string value", () =>
    {
        let structure: any = {
            neStrVal: "string"
        };

        structure = {
            nesObjVal: structure
        };

        assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    // optional string
    test("should be fine given nested optional valid string value", () =>
    {
        let structure: any = {
            "opStrVal?": "string"
        };

        structure = {
            nesObjVal: structure
        };

        given(obj, "obj").ensureHasStructure(structure);

        assert.ok(true);
    });

    test("should throw ArgumentException given nested optional invalid string value", () =>
    {
        let structure: any = {
            "opInStrVal?": "string"
        };

        structure = {
            nesObjVal: structure
        };

        assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should be fine given nested optional non-existant string value", () =>
    {
        let structure: any = {
            "opNeStrVal?": "string"
        };

        structure = {
            nesObjVal: structure
        };

        given(obj, "obj").ensureHasStructure(structure);

        assert.ok(true);
    });

    // number
    test("should be fine given nested valid number value", () =>
    {
        let structure: any = {
            numVal: "number"
        };

        structure = {
            nesObjVal: structure
        };

        given(obj, "obj").ensureHasStructure(structure);

        assert.ok(true);
    });

    test("should throw ArgumentException given nested invalid number value", () =>
    {
        let structure: any = {
            inNumVal: "number"
        };

        structure = {
            nesObjVal: structure
        };

        assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should throw ArgumentException given nested non-existant number value", () =>
    {
        let structure: any = {
            neNumVal: "number"
        };

        structure = {
            nesObjVal: structure
        };

        assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    // optional number
    test("should be fine given nested optional valid number value", () =>
    {
        let structure: any = {
            "opNumVal?": "number"
        };

        structure = {
            nesObjVal: structure
        };

        given(obj, "obj").ensureHasStructure(structure);

        assert.ok(true);
    });

    test("should throw ArgumentException given nested optional invalid number value", () =>
    {
        let structure: any = {
            "opInNumVal?": "number"
        };

        structure = {
            nesObjVal: structure
        };

        assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should be fine given nested optional non-existant number value", () =>
    {
        let structure: any = {
            "opNeNumVal?": "number"
        };

        structure = {
            nesObjVal: structure
        };

        given(obj, "obj").ensureHasStructure(structure);

        assert.ok(true);
    });

    // boolean
    test("should be fine given nested valid boolean value", () =>
    {
        let structure: any = {
            boolVal: "boolean"
        };

        structure = {
            nesObjVal: structure
        };

        given(obj, "obj").ensureHasStructure(structure);

        assert.ok(true);
    });

    test("should throw ArgumentException given nested invalid boolean value", () =>
    {
        let structure: any = {
            inBoolVal: "boolean"
        };

        structure = {
            nesObjVal: structure
        };

        assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should throw ArgumentException given nested non-existant boolean value", () =>
    {
        let structure: any = {
            neBoolVal: "boolean"
        };

        structure = {
            nesObjVal: structure
        };

        assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    // optional boolean
    test("should be fine given nested optional valid boolean value", () =>
    {
        let structure: any = {
            "opBoolVal?": "boolean"
        };

        structure = {
            nesObjVal: structure
        };

        given(obj, "obj").ensureHasStructure(structure);

        assert.ok(true);
    });

    test("should throw ArgumentException given nested optional invalid boolean value", () =>
    {
        let structure: any = {
            "opInBoolVal?": "boolean"
        };

        structure = {
            nesObjVal: structure
        };

        assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should be fine given nested optional non-existant boolean value", () =>
    {
        let structure: any = {
            "opNeBoolVal?": "boolean"
        };

        structure = {
            nesObjVal: structure
        };

        given(obj, "obj").ensureHasStructure(structure);

        assert.ok(true);
    });

    // object
    test("should be fine given nested valid object value", () =>
    {
        let structure: any = {
            objVal: "object"
        };

        structure = {
            nesObjVal: structure
        };

        given(obj, "obj").ensureHasStructure(structure);

        assert.ok(true);
    });

    test("should be fine given nested valid object value and object literal notation", () =>
    {
        let structure: any = {
            objVal: {}
        };

        structure = {
            nesObjVal: structure
        };

        given(obj, "obj").ensureHasStructure(structure);

        assert.ok(true);
    });

    test("should throw ArgumentException given nested invalid object value", () =>
    {
        let structure: any = {
            inObjVal: "object"
        };

        structure = {
            nesObjVal: structure
        };

        assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should throw ArgumentException given nested non-existant object value", () =>
    {
        let structure: any = {
            neObjVal: "object"
        };

        structure = {
            nesObjVal: structure
        };

        assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    // optional object
    test("should be fine given nested optional valid object value", () =>
    {
        let structure: any = {
            "opObjVal?": "object"
        };

        structure = {
            nesObjVal: structure
        };

        given(obj, "obj").ensureHasStructure(structure);

        assert.ok(true);
    });

    test("should be fine given nested optional valid object value and object literal notation", () =>
    {
        let structure: any = {
            "opObjVal?": {}
        };

        structure = {
            nesObjVal: structure
        };

        given(obj, "obj").ensureHasStructure(structure);

        assert.ok(true);
    });

    test("should throw ArgumentException given nested optional invalid object value", () =>
    {
        let structure: any = {
            "opInObjVal?": "object"
        };

        structure = {
            nesObjVal: structure
        };

        assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
            (exp: Exception) => exp.name === "ArgumentException");
    });

    test("should be fine given nested optional non-existant object value", () =>
    {
        let structure: any = {
            "opNeObjVal?": "object"
        };

        structure = {
            nesObjVal: structure
        };

        given(obj, "obj").ensureHasStructure(structure);

        assert.ok(true);
    });
});