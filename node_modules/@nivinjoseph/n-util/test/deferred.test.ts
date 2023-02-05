import * as Assert from "assert";
import { Deferred } from "../src";


suite("Deferred Tests", () =>
{
    test(`Given a deferred, 
            when a then callback is chained to its promise,
            then the deferred should be able to control the execution of the callback`,
        async () =>
        {
            const deferred = new Deferred<void>();
            
            let callbackExecuted = false;
            
            const p = deferred.promise
                .then(() =>
                {
                    callbackExecuted = true;
                })
                .catch();
            
            Assert.strictEqual(callbackExecuted, false, "callback has not executed");
            
            deferred.resolve();
            await p;
            
            Assert.strictEqual(callbackExecuted, true, "callback has executed");
        });
    
    test(`Given a deferred, 
            when a catch callback is chained to its promise,
            then the deferred should be able to control the execution of the callback`,
        async () =>
        {
            const deferred = new Deferred();

            let callbackExecuted = false;

            const p = deferred.promise
                .then()
                .catch(() =>
                {
                    callbackExecuted = true;
                });

            Assert.strictEqual(callbackExecuted, false, "callback has not executed");

            deferred.reject();
            await p; 

            Assert.strictEqual(callbackExecuted, true, "callback has executed");
        });
});