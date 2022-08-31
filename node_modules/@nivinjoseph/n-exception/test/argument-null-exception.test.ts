import * as assert from "assert";
import "@nivinjoseph/n-ext";
import  
{
    // ApplicationException,
    // ArgumentException,
    ArgumentNullException
    // InvalidArgumentException,
    // InvalidOperationException
} from "../src/index";

suite("ArgumentNullException", () =>
{
    suite("name property", () =>
    {
        test("should have the right name", () =>
        {
            const exp = new ArgumentNullException("test exception");
            
            assert.strictEqual(exp.name, "ArgumentNullException");
        });
    });
    
    suite("message property", () =>
    {
        test("should be formated with provided value when argName is provided", () =>
        {
            const exp = new ArgumentNullException("i");
            
            assert.strictEqual(exp.message, "Argument 'i' is NULL.");
        });
        
        test("should be formated with default value when argName is null", () =>
        {
            const exp = new ArgumentNullException(null as any);
            
            assert.strictEqual(exp.message, "Argument '<UNKNOWN>' is NULL.");
        });

        test("should be formated with default value when argName is an empty string", () =>
        {
            const exp = new ArgumentNullException("");
            
            assert.strictEqual(exp.message, "Argument '<UNKNOWN>' is NULL.");
        });

        test("should be formated with default value when argName is a space character", () =>
        {
            const exp = new ArgumentNullException(" ");
            
            assert.strictEqual(exp.message, "Argument '<UNKNOWN>' is NULL.");
        });
    });
    
    suite("base class reason property", () =>
    {
        test("should be 'is NULL'", () =>
        {
            const exp = new ArgumentNullException("i");
            
            assert.strictEqual(exp.reason, "is NULL");
        });
    });
    
    suite("argName property", () =>
    {
        test("should be value that is provided when argName argument is provided", () =>
        {
            const exp = new ArgumentNullException("i");
            
            assert.strictEqual(exp.argName, "i");
        });
        
        test("should be default value when argName is null", () =>
        {
            const exp = new ArgumentNullException(null as any);
            
            assert.strictEqual(exp.argName, "<UNKNOWN>");
        });
        
        test("should be default value when argName is a space character", () =>
        {
            const exp = new ArgumentNullException(" ");
            
            assert.strictEqual(exp.argName, "<UNKNOWN>");
        });
        
        test("should be default value when argName is an empty string", () =>
        {
            const exp = new ArgumentNullException("");
            
            assert.strictEqual(exp.argName, "<UNKNOWN>");
        });
    });
    
    suite("innerException property", () =>
    {
        test("should be null when no innerException argument is provided", () =>
        {
            const exp = new ArgumentNullException("404");
            
            assert.strictEqual(exp.innerException, null);
        });
        
        test("should be the same object that was provided as the innerException argument", () =>
        {
            const innerExp = new ArgumentNullException("401");
            const exp = new ArgumentNullException("404", innerExp);
            
            assert.strictEqual(exp.innerException, innerExp);
        });
    });
    
    suite("stack property", () =>
    {
        test("should have value", () =>
        {
            const exp = new ArgumentNullException("404");
            
            assert.ok(exp.stack != null && !exp.stack.isEmptyOrWhiteSpace());
        });
    });
});