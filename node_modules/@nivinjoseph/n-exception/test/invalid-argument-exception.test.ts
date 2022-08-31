import * as assert from "assert";
import "@nivinjoseph/n-ext";
import  
{
    // ApplicationException,
    // ArgumentException,
    // ArgumentNullException,
    InvalidArgumentException
    // InvalidOperationException
} from "../src/index";

suite("InvalidArgumentException", () =>
{
    suite("name property", () =>
    {
        test("should be the right name", () =>
        {
            const exp = new InvalidArgumentException("test exception");
            
            assert.strictEqual(exp.name, "InvalidArgumentException");
        });  
    });
    
    suite("message property", () =>
    {
        test("should be formated with value provided when argName is provided", () =>
        {
            const exp = new InvalidArgumentException("i");
            
            assert.strictEqual(exp.message, "Argument 'i' is invalid.");
        });
        
        test("should be formated with default value when argName is null", () =>
        {
            const exp = new InvalidArgumentException(null as any);
            
            assert.strictEqual(exp.message, "Argument '<UNKNOWN>' is invalid.");
        });

        test("should be formated with default value when argName is an empty string", () =>
        {
            const exp = new InvalidArgumentException("");
            
            assert.strictEqual(exp.message, "Argument '<UNKNOWN>' is invalid.");
        });

        test("should be formated with default value when argName is a space character", () =>
        {
            const exp = new InvalidArgumentException(" ");
            
            assert.strictEqual(exp.message, "Argument '<UNKNOWN>' is invalid.");
        });
    });
    
    suite("base classes reason property", () =>
    {
        test("should be 'is invalid'", () =>
        {
            const exp = new InvalidArgumentException("i");
            
            assert.strictEqual(exp.reason, "is invalid");
        });
    });
    
    suite("argName property", () =>
    {
        test("should be value that is provided when argName is provided", () =>
        {
            const exp = new InvalidArgumentException("i");
            
            assert.strictEqual(exp.argName, "i");
        });
        
        test("should be default value when argName is null", () =>
        {
            const exp = new InvalidArgumentException(null as any);
            
            assert.strictEqual(exp.argName, "<UNKNOWN>");
        });
        
        test("should be default value when argName is a space character", () =>
        {
            const exp = new InvalidArgumentException(" ");
            
            assert.strictEqual(exp.argName, "<UNKNOWN>");
        });
        
        test("should be default value when argName is an empty string", () =>
        {
            const exp = new InvalidArgumentException("");
            
            assert.strictEqual(exp.argName, "<UNKNOWN>");
        });
        
    });
    
    suite("innerException property", () =>
    {
        test("should be null when no innerException argument is provided", () =>
        {
            const exp = new InvalidArgumentException("401");
            
            assert.strictEqual(exp.innerException, null);
        });
        
        test("should be the same object as the innerException argument that is passed in", () =>
        {
            const innerExp = new InvalidArgumentException("404");
            const exp = new InvalidArgumentException("401", innerExp);
            
            assert.strictEqual(exp.innerException, innerExp);
        });
    });
    
    suite("stack property", () =>
    {
        test("should have value", () =>
        {
            const exp = new InvalidArgumentException("404");
            
            assert.ok(exp.stack != null && exp.stack.isNotEmptyOrWhiteSpace());
        });
    });
});