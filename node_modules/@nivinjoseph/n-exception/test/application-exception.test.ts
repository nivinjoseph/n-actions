import * as assert from "assert";
import "@nivinjoseph/n-ext";
import  
{
    ApplicationException
    // ArgumentException,
    // ArgumentNullException,
    // InvalidArgumentException,
    // InvalidOperationException
} from "../src/index";

suite("ApplicationException", () =>
{
    suite("name property", () =>
    {
        test("should have the right name", () =>
        {
            const exp = new ApplicationException("test exception");
            assert.strictEqual(exp.name, "ApplicationException");
        });
    });

    suite("message property", () =>
    {
        test("should be default value when message arg is null", () =>
        {
            const exp = new ApplicationException(null as any);
            assert.strictEqual(exp.message, "<none>");
        });

        test("should be default value when message arg is a white space", () =>
        {
            const exp = new ApplicationException(" ");
            assert.strictEqual(exp.message, "<none>");
        });

        test("should be default value when message arg is an empty string", () =>
        {
            const exp = new ApplicationException("");
            assert.strictEqual(exp.message, "<none>");
        });

        test("should be the same message as the argument provided", () =>
        {
            const exp = new ApplicationException("You have an error");
            assert.strictEqual(exp.message, "You have an error");
        });
    });
    
    suite("toString method", () =>
    {
        test("should be formated with provided value when message argument is provided", () =>
        {
            const exp = new ApplicationException("You have an error");
            
            assert.strictEqual(exp.toString().split("\n")[0], "ApplicationException: You have an error");
        });
        
        test("should be formated with default value for message when message is null", () =>
        {
            const exp = new ApplicationException(null as any);
            
            assert.strictEqual(exp.toString().split("\n")[0], "ApplicationException: <none>");
        });
        
        test("should be formated with default value for message when message is a space character", () =>
        {
            const exp = new ApplicationException(" ");
            
            assert.strictEqual(exp.toString().split("\n")[0], "ApplicationException: <none>");
        });
        
        test("should be formated with default value for message when message is an empty string", () =>
        {
            const exp = new ApplicationException("");
            
            assert.strictEqual(exp.toString().split("\n")[0], "ApplicationException: <none>");
        });
    });

    suite("innerException property", () =>
    {
        test("should be null when no innerException arg is provided", () =>
        {
            const exp = new ApplicationException("404");
            
            assert.strictEqual(exp.innerException, null);
        });

        test("should be the same object as the provided arg when the innerException arg is provided", () =>
        {
            const innerExp = new ApplicationException("401");
            const exp = new ApplicationException("404", innerExp);
            
            assert.strictEqual(exp.innerException, innerExp);
        });
    });

    suite("stack property", () =>
    {
        test("should have value", () =>
        {
            const exp = new ApplicationException("404");
            
            assert.ok(exp.stack != null && exp.stack.isNotEmptyOrWhiteSpace());
        });
    });
}); 