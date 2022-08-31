import * as assert from "assert";
import "@nivinjoseph/n-ext";
import  
{
    // ApplicationException,
    // ArgumentException,
    // ArgumentNullException,
    // InvalidArgumentException,
    InvalidOperationException
} from "../src/index";

suite("InvalidOperationException", () =>
{
    suite("name property", () =>
    {
        test("should be the right name", () =>
        {
            const exp = new InvalidOperationException("test exception");
            
            assert.strictEqual(exp.name, "InvalidOperationException");
        });
    });
    
    suite("message property", () =>
    {
        test("should be formated with provided value when operation is provided", () =>
        {
            const exp = new InvalidOperationException("i");
            
            assert.strictEqual(exp.message, "Operation is invalid due to reason 'i'.");
        });
        
        test("should be formated with default value when operation value is null", () =>
        {
            const exp = new InvalidOperationException(null as any);
            
            assert.strictEqual(exp.message, "Operation is invalid due to reason '<UNKNOWN>'.");
        });

        test("should be formated with default value when operation value is an empty string", () =>
        {
            const exp = new InvalidOperationException("");
            
            assert.strictEqual(exp.message, "Operation is invalid due to reason '<UNKNOWN>'.");
        });

        test("should be formated with default value when operation value is a space character", () =>
        {
            const exp = new InvalidOperationException(" ");
            
            assert.strictEqual(exp.message, "Operation is invalid due to reason '<UNKNOWN>'.");
        });
    });
    
    suite("operation property", () =>
    {
        test("should be the value provided when operation is provided", () =>
        {
            const exp = new InvalidOperationException("i");
            
            assert.strictEqual(exp.reason, "i");
        });
        
        test("should be default value when operation is null", () =>
        {
            const exp = new InvalidOperationException(null as any);
            
            assert.strictEqual(exp.reason, "<UNKNOWN>");
        });
        
        test("should be default value when operation is an empty string", () =>
        {
            const exp = new InvalidOperationException("");
            
            assert.strictEqual(exp.reason, "<UNKNOWN>");
        });
        
        test("should be default value when operation is a space character", () =>
        {
            const exp = new InvalidOperationException(" ");
            
            assert.strictEqual(exp.reason, "<UNKNOWN>");
        });
    });
    
    suite("innerException property", () =>
    {
        test("should be null when no innerException argument is provided", () =>
        {
            const exp = new InvalidOperationException("i");
            
            assert.strictEqual(exp.innerException, null);
        });
        
        test("should be same object as the innerException argument that is passed in", () =>
        {
            const innerExp = new InvalidOperationException("i");
            const exp = new InvalidOperationException("i", innerExp);
            
            assert.strictEqual(exp.innerException, innerExp);
        });
    });
    
    suite("stack property", () =>
    {
        test("should have value", () =>
        {
            const exp = new InvalidOperationException("404");
            
            assert.ok(exp.stack != null && exp.stack.isNotEmptyOrWhiteSpace());
        });
    });
});