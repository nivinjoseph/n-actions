import * as assert from "assert";
import "../src/string-ext";

suite("StringExt", () =>
{
    suite("isEmptyOrWhiteSpace", () =>
    {
        test("should return true when called on an empty string", () =>
        {
            const target = "";
            const result = target.isEmptyOrWhiteSpace();
            assert.strictEqual(result, true);
        });
        
        test("should return true when called on a non-empty string with space characters", () =>
        {
            const target = "   ";
            const result = target.isEmptyOrWhiteSpace();
            assert.strictEqual(result, true);
        });
        
        test("should return false when called on a non-empty string", () =>
        {
            const target = "foo";    
            const result = target.isEmptyOrWhiteSpace();
            assert.strictEqual(result, false);
        });
        
        test("should return false when called on a non-empty string with space and regular characters", () =>
        {
            const target = "  foo bar  ";    
            const result = target.isEmptyOrWhiteSpace();
            assert.strictEqual(result, false);
        });
    });
    
    suite("isNotEmptyOrWhiteSpace", () =>
    {
        test("should return false when called on an empty string", () =>
        {
            const target = "";
            const result = target.isNotEmptyOrWhiteSpace();
            assert.strictEqual(result, false);
        });

        test("should return false when called on a non-empty string with space characters", () =>
        {
            const target = "   ";
            const result = target.isNotEmptyOrWhiteSpace();
            assert.strictEqual(result, false);
        });

        test("should return true when called on a non-empty string", () =>
        {
            const target = "foo";
            const result = target.isNotEmptyOrWhiteSpace();
            assert.strictEqual(result, true);
        });

        test("should return true when called on a non-empty string with space and regular characters", () =>
        {
            const target = "  foo bar  ";
            const result = target.isNotEmptyOrWhiteSpace();
            assert.strictEqual(result, true);
        });
    });
    
    suite("contains", () =>
    {
        test("should return true if argument is a substring of the target string", () =>
        {
            const target = "foo bar";
            const arg = "bar";
            const result = target.contains(arg);
            assert.strictEqual(result, true);
        });
        
        test("should return false if argument is not a substring of the target string", () =>
        {
            const target = "foo bar";
            const arg = "baz";
            const result = target.contains(arg);
            assert.strictEqual(result, false);
        });
        
        test("should return false if argument is partially of the target string", () =>
        {
            const target = "foo bar";
            const arg = "foo baz";
            const result = target.contains(arg);
            assert.strictEqual(result, false);
        });
        
        test("should return true if argument is a space character in the target string", () =>
        {
            const target = "foo bar";
            const arg = " ";
            const result = target.contains(arg);
            assert.strictEqual(result, true);
        });
        
        test("should return true if argument is an empty string of the target string", () =>
        {
            const target = "foo bar";
            const arg = "";
            const result = target.contains(arg);
            assert.strictEqual(result, true);
        });
        
        test("should return true if argument and target string are both empty", () =>
        {
            const target = "";
            const arg = "";
            const result = target.contains(arg);
            assert.strictEqual(result, true);
        });
    });
    
    suite("startsWith", () =>
    {
        test("should return true if the first character in the target string matches the argument", () =>
        {
            const target = "Foo";
            const arg = "F";
            const result = target.startsWith(arg);
            assert.strictEqual(result, true);
        });
        
        test("should return false if the first character in the target string does not match the argument", () =>
        {
            const target = "Foo";
            const arg = "A"; 
            const result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });
        
        test("should return false if the the first character in the target string is not the same capitalization as the argument", () =>
        {
            const target = "Foo";
            const arg = "f";
            const result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });
        
        test("should return true if first character in the target string does not match the argument that is an empty string", () =>
        {
            const target = "Foo";
            const arg = "";
            const result = target.startsWith(arg);
            assert.strictEqual(result, true);
        });
        
        test("should return false if the first character in the target string does not match the argument that is a space character", () =>
        {
            const target = "Foo";
            const arg = " ";
            const result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });
        
        test("should return false if the target string is an empty string and the argument has a single character", () =>
        {
            const target = "";
            const arg = "a";
            const result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });

        test("should return false if target string is a space character and the argument is a non space character", () =>
        {
            const target = " ";
            const arg = "a";
            const result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });

        test("should return true if all characters in the target string start with all the characters in the argument string", () =>
        {
            const target = "Foo";
            const arg = "Foo";
            const result = target.startsWith(arg);
            assert.strictEqual(result, true);
        });
        
        test("should return false if target string starts with a space character and the argument has a non space character", () =>
        {
            const target = " Foo";
            const arg = "F";
            const result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });
        
        test("should return true if target string is a space character and the argument is a non space character", () =>
        {
            const target = " ";
            const arg = "";
            const result = target.startsWith(arg);
            assert.strictEqual(result, true);
        });
        
        test("should return false if target is an empty string and the argument is a space character", () =>
        {
            const target = "";
            const arg = " ";
            const result = target.startsWith(arg);
            assert.strictEqual(result, false);
        });
    });
    
    suite("endsWith", () =>
    {
        test("should return true if the last character in the target string matches the argument", () =>
        {
            const target = "Foo";
            const arg = "o";
            const result = target.endsWith(arg);
            assert.strictEqual(result, true);
        });

        test("should return false if the last character in the target string does not match the argument", () =>
        {
            const target = "Foo";
            const arg = "a";
            const result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });

        test("should return false if the the last character in the target string is not the same capitalization as the argument", () =>
        {
            const target = "Foo";
            const arg = "O";
            const result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });

        test("should return true if last character in the target string does not match the argument that is an empty string", () =>
        {
            const target = "Foo";
            const arg = "";
            const result = target.endsWith(arg);
            assert.strictEqual(result, true);
        });

        test("should return false if the last character in the target string does not match the argument that is a space character", () =>
        {
            const target = "Foo";
            const arg = " ";
            const result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });

        test("should return false if the target string is an empty string and the argument has a single character", () =>
        {
            const target = "";
            const arg = "a";
            const result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });

        test("should return false if target string is a space character and the argument is a non space character", () =>
        {
            const target = " ";
            const arg = "a";
            const result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });

        test("should return true if all characters in the target string end with all the characters in the argument string", () =>
        {
            const target = "Foo";
            const arg = "Foo";
            const result = target.endsWith(arg);
            assert.strictEqual(result, true);
        });

        test("should return false if target string ends with a space character and the argument has a non space character", () =>
        {
            const target = "Foo ";
            const arg = "o";
            const result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });

        test("should return true if target string is a space character and the argument is a non space character", () =>
        {
            const target = " ";
            const arg = "";
            const result = target.endsWith(arg);
            assert.strictEqual(result, true);
        });

        test("should return false if target is an empty string and the argument is a space character", () =>
        {
            const target = "";
            const arg = " ";
            const result = target.endsWith(arg);
            assert.strictEqual(result, false);
        });
    });
    
    suite("extractNumbers", () =>
    {
        test("should return empty string when target string contains no numbers", () =>
        {
            const target = "abc";        
            const result = target.extractNumbers();
            assert.strictEqual(result, "");
        });
        
        test("should return numbers when target string has numbers at the beginning", () =>
        {
            const target = "123abc";
            const result = target.extractNumbers();
            assert.strictEqual(result, "123");
        });
        
        test("should return numbers when target string has numbers at the end", () =>
        {
            const target = "abc123";
            const result = target.extractNumbers();
            assert.strictEqual(result, "123");
        });
        
        test("should return numbers when target string has numbers in the middle", () =>
        {
            const target = "abc123abc";
            const result = target.extractNumbers();
            assert.strictEqual(result, "123");
        });
        
        test("should return all numbers when target string has numbers scattered through out", () =>
        {
            const target = "1a24-b34__89c/78l";
            const result = target.extractNumbers();
            assert.strictEqual(result, "124348978");
        });
    });
    
    suite("extractCharacters", () =>
    {
        test("should return empty string when target string contains no characters", () =>
        {
            const target = "123";
            const result = target.extractCharacters();
            assert.strictEqual(result, "");
        });

        test("should return characters when target string has characters at the beginning", () =>
        {
            const target = "ab c 123";
            const result = target.extractCharacters();
            assert.strictEqual(result, "ab c ");
        });

        test("should return characters when target string has characters at the end", () =>
        {
            const target = "123ab c";
            const result = target.extractCharacters();
            assert.strictEqual(result, "ab c");
        });

        test("should return characters when target string has characters in the middle", () =>
        {
            const target = "123abc345 ";
            const result = target.extractCharacters();
            assert.strictEqual(result, "abc ");
        });

        test("should return all characters when target string has characters scattered through out", () =>
        {
            const target = "1a24bk-jf348 9c  78l ";
            const result = target.extractCharacters();
            assert.strictEqual(result, "abkjf c  l ");
        });
    });
    
    suite("format", () =>
    {
        test("should return formated string with arguments in order", () =>
        {
            const target = "my name is {0} {1}";  
            const result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "my name is Viola Deluca");
        });
        
        test("should return formated string containing only first argument twice", () =>
        {
            const target = "my name is {0} {0}";
            const result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "my name is Viola Viola");
        });

        test("should return formated string with arguments in reverse order", () =>
        {
            const target = "my name is {1} {0}";
            const result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "my name is Deluca Viola");
        });

        test("should return formated string containing only first argument, leaving {2} unchanged", () =>
        {
            const target = "my name is {0} {2}";
            const result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "my name is Viola {2}");
        });
        
        test("should return an empty string if target is an empty string and argument has value", () =>
        {
            const target = "";
            const result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "");
        });
        
        test("should return original target unformated when target provides no placeholders", () =>
        {
            const target = "my name is";
            const result = target.format("Viola", "Deluca");
            assert.strictEqual(result, "my name is");
        });
        
        test("should return formated string with placeholder replaced by empty string if target has placeholders and argument provided is an empty string", () =>
        {
            const target = "my name is {0} {1}";
            const result = target.format("");
            assert.strictEqual(result, "my name is  {1}");
        });
        
        test("should return original string if target has placeholders but no arguments are provided", () =>
        {
            const target = "my name is {0} {1}";
            const result = target.format();
            assert.strictEqual(result, "my name is {0} {1}");
        });
        
        test("should return formated string with first two arguments when there are more arguments than placeholders", () =>
        {
            const target = "my name is {0} {1}";
            const result = target.format("Viola", "Deluca", "Nivin", "Joseph");
            assert.strictEqual(result, "my name is Viola Deluca");
        });
        
        test("should return formated string with only first placeholder changed given a single argument", () =>
        {
            const target = "my name is {0} {1}";
            const result = target.format("Viola");
            assert.strictEqual(result, "my name is Viola {1}");
        });
    });
    
    suite("replaceAll", () =>
    {
        test("should not change anything if search value is not found", () =>
        {
            const target = "Mr Blue has a blue house and a blue car";
            const searchValue = "red";
            const replaceValue = "green";
            
            const result = target.replaceAll(searchValue, replaceValue);
            
            assert.strictEqual(result, target);
        });
        
        test("should replace all occurances of search value if it is found", () =>
        {
            const target = "Mr Blue has a blue house and a blue car";
            const searchValue = "blue";
            const replaceValue = "red";

            const result = target.replaceAll(searchValue, replaceValue);

            assert.strictEqual(result, "Mr Blue has a red house and a red car");
        });
        
        // test("should replace all occurances of search value case insensitive if found", () =>
        // {
        //     let target = "Mr Blue has a blue house and a blue car";
        //     let searchValue = "blue";
        //     let replaceValue = "red";

        //     let result = target.replaceAll(searchValue, replaceValue, true);

        //     assert.strictEqual(result, "Mr red has a red house and a red car");
        // });
        
        test("should replace all occurances of search value when original value contains special characters", () =>
        {
            const target = "http://localhost:4002/pim-api/getProducts?$pageNumber=1&$pageSize=500";
            const searchValue = "Products";
            const replaceValue = "Assets";

            const result = target.replaceAll(searchValue, replaceValue);

            assert.strictEqual(result, "http://localhost:4002/pim-api/getAssets?$pageNumber=1&$pageSize=500");
        });
        
        // test.only("Regex ddos attack", () =>
        // {
        //     const target = "{0}";
        //     // const searchValue = "{0}";
        //     // const replaceValue = "Assets";
        //     const replaceValue = "A$&ets";
        //     // const replaceValue = "YQAt3TPI7s1YXyClbQ2$&JdHOKZJ@z4!";
            
        //     // const result = target.replaceAll(searchValue, replaceValue);
            
        //     const result = target.format(replaceValue);
        //     console.log(result);
            
        //     assert.strictEqual(result, "A$&ets");
        // });
    });
    
    suite("base64Encode and base64Decode", () =>
    {
        test("should successfully encode and decode", () =>
        {
            const value = "sdjhfbe326t3rguy78hy^T^%R*uq9321we183et++==hgdedrt^%$#@!)(*";
            const encoded = value.base64Encode();
            // console.log(encoded);
            assert.notStrictEqual(encoded, value);
            const decoded = encoded.base64Decode();
            assert.strictEqual(decoded, value);
        });
    });
    
    suite("base64UrlEncode and base64UrlDecode", () =>
    {
        test("should successfully encode and decode", () =>
        {
            const value = "sdjhfbe326t3rguy78hy^T^%R*uq9321we183et++==hgdedrt^%$#@!)(*";
            const encoded = value.base64UrlEncode();
            // console.log(encoded);
            assert.notStrictEqual(encoded, value);
            const decoded = encoded.base64UrlDecode();
            assert.strictEqual(decoded, value);
        });
    });
    
    suite("hexEncode and hexDecode", () =>
    {
        test("should successfully encode and decode", () =>
        {
            const value = "sdjhfbe326t3rguy78hy^T^%R*uq9321we183et++==hgdedrt^%$#@!)(*";
            const encoded = value.hexEncode();
            // console.log(encoded);
            assert.notStrictEqual(encoded, value);
            const decoded = encoded.hexDecode();
            assert.strictEqual(decoded, value);
        });
    });

    suite("matchesFormat", () =>
    {
        suite("basic", () =>
        {
            test(`Given value "" and format "##" when matchesFormat is called then it should return false`, () =>
            {
                const value = "";
                const format = "##";

                assert.strictEqual(value.matchesFormat(format), false);
            });
            

            test(`Given value "1234" and format "####" when matchesFormat is called then it should return true`, () =>
            {
                const value = "1234";
                const format = "####";

                assert.strictEqual(value.matchesFormat(format), true);
            });

            test(`Given value "abcd" and format "@@@@" when matchesFormat is called then it should return true`, () =>
            {
                const value = "abcd";
                const format = "@@@@";

                assert.strictEqual(value.matchesFormat(format), true);
            });

            test(`Given value "a" and format "@" when matchesFormat is called then it should return true`, () =>
            {
                const value = "a";
                const format = "@";

                assert.strictEqual(value.matchesFormat(format), true);
            });

            test(`Given value "1" and format "#" when matchesFormat is called then it should return true`, () =>
            {
                const value = "1";
                const format = "#";

                assert.strictEqual(value.matchesFormat(format), true);
            });

            test(`Given value "aAzZ09" and format "@@@@##" when matchesFormat is called then it should return true`, () =>
            {
                const value = "aAzZ09";
                const format = "@@@@##";

                assert.strictEqual(value.matchesFormat(format), true);
            });

            test(`Given value "123" and format "####" when matchesFormat is called then it should return false`, () =>
            {
                const value = "123";
                const format = "####";

                assert.strictEqual(value.matchesFormat(format), false);
            });

            test(`Given value "12323456" and format "####" when matchesFormat is called then it should return false`, () =>
            {
                const value = "12323456";
                const format = "####";

                assert.strictEqual(value.matchesFormat(format), false);
            });

            test(`Given value "123a" and format "####" when matchesFormat is called then it should return false`, () =>
            {
                const value = "123a";
                const format = "####";

                assert.strictEqual(value.matchesFormat(format), false);
            });

            test(`Given value "qw1" and format "#@#" when matchesFormat is called then it should return false`, () =>
            {
                const value = "qw1";
                const format = "#@#";

                assert.strictEqual(value.matchesFormat(format), false);
            });
        });
        
        suite("with constants", () =>
        {
            test(`Given value "hello1" and format "hello1" when matchesFormat is called then it should return true`, () =>
            {
                const value = "hello1";
                const format = "hello1";

                assert.strictEqual(value.matchesFormat(format), true);
            });

            test(`Given value "hello3" and format "hello1" when matchesFormat is called then it should return false`, () =>
            {
                const value = "hello3";
                const format = "hello1";

                assert.strictEqual(value.matchesFormat(format), false);
            });
            
            test(`Given value "12(34)" and format "##(##)" when matchesFormat is called then it should return true`, () =>
            {
                const value = "12(34)";
                const format = "##(##)";

                assert.strictEqual(value.matchesFormat(format), true);
            });

            test(`Given value "12(34" and format "##(##)" when matchesFormat is called then it should return false`, () =>
            {
                const value = "12(34";
                const format = "##(##)";

                assert.strictEqual(value.matchesFormat(format), false);
            });

            test(`Given value "12testing" and format "##test@@@" when matchesFormat is called then it should return true`, () =>
            {
                const value = "12testing";
                const format = "##test@@@";

                assert.strictEqual(value.matchesFormat(format), true);
            });
        });
    
        suite("with escape sequence", () =>
        {
            test(`Given value "32@co" and format "##\\@@@" when matchesFormat is called then it should return true`, () =>
            {
                const value = "32@co";
                const format = "##\\@@@";

                assert.strictEqual(value.matchesFormat(format), true);
            });

            test(`Given value "32Aco" and format "##\\@@@" when matchesFormat is called then it should return false`, () =>
            {
                const value = "32Aco";
                const format = "##\\@@@";

                assert.strictEqual(value.matchesFormat(format), false);
            });

            test(`Given value "11\\#2\\@bc" and format "##\\\\\\##\\\\\\@@@" when matchesFormat is called then it should return true`, () =>
            {
                const value = "11\\#2\\@bc";
                const format = "##\\\\\\##\\\\\\@@@";

                assert.strictEqual(value.matchesFormat(format), true);
            });

            test(`Given value "32\\dco" and format "##\\d@@" when matchesFormat is called then it should return true`, () =>
            {
                const value = "32\\dco";
                const format = "##\\d@@";

                assert.strictEqual(value.matchesFormat(format), true);
            });
            
            test(`Given value "01\\01\\2020" and format "##\\\\##\\\\####" when matchesFormat is called then it should return true`, () =>
            {
                const value = "01\\01\\2020";
                const format = "##\\\\##\\\\####";

                assert.strictEqual(value.matchesFormat(format), true);
            });
            
            test(`Given value "01\\#1\\2020" and format "##\\\\##\\\\####" when matchesFormat is called then it should return false`, () =>
            {
                const value = "01\\#1\\2020";
                const format = "##\\\\##\\\\####";

                assert.strictEqual(value.matchesFormat(format), false);
            });
            
            test(`Given value "01\\31\\20##" and format "##\\\\##\\\\##\\#\\#" when matchesFormat is called then it should return true`, () =>
            {
                const value = "01\\31\\20##";
                const format = "##\\\\##\\\\##\\#\\#";

                assert.strictEqual(value.matchesFormat(format), true);
            });

            test(`Given value "01\\31\\2020" and format "##\\\\##\\\\##\\#@" when matchesFormat is called then it should return false`, () =>
            {
                const value = "01\\31\\2020";
                const format = "##\\\\##\\\\##\\#@";

                assert.strictEqual(value.matchesFormat(format), false);
            });
        });
        
        suite("with *", () =>
        {
            test(`Given value "Hello World" and format "*" when matchesFormat is called then it should return true`, () =>
            {
                const value = "Hello World";
                const format = "*";

                assert.strictEqual(value.matchesFormat(format), true);
            });
            
            test(`Given value "" and format "*" when matchesFormat is called then it should return true`, () =>
            {
                const value = "";
                const format = "*";

                assert.strictEqual(value.matchesFormat(format), true);
            });
            
            test(`Given value "Hello World" and format "Hello*" when matchesFormat is called then it should return true`, () =>
            {
                const value = "Hello World";
                const format = "Hello*";

                assert.strictEqual(value.matchesFormat(format), true);
            });
            
            test(`Given value "Hello" and format "Hello*" when matchesFormat is called then it should return true`, () =>
            {
                const value = "Hello";
                const format = "Hello*";

                assert.strictEqual(value.matchesFormat(format), true);
            });

            test(`Given value "hello World llo" and format "he*llo" when matchesFormat is called then it should return true`, () =>
            {
                const value = "hello World llo";
                const format = "he*llo";

                assert.strictEqual(value.matchesFormat(format), true);
            });
            
            test(`Given value "hello" and format "he*llo" when matchesFormat is called then it should return true`, () =>
            {
                const value = "hello";
                const format = "he*llo";

                assert.strictEqual(value.matchesFormat(format), true);
            });

            test(`Given value "working hello" and format "*hello" when matchesFormat is called then it should return true`, () =>
            {
                const value = "working hello";
                const format = "*hello";

                assert.strictEqual(value.matchesFormat(format), true);
            }); 
            
            test(`Given value "hello" and format "*hello" when matchesFormat is called then it should return true`, () =>
            {
                const value = "hello";
                const format = "*hello";

                assert.strictEqual(value.matchesFormat(format), true);
            }); 
            
            test(`Given value "hello" and format "*@@" when matchesFormat is called then it should return true`, () =>
            {
                const value = "hello";
                const format = "*@@";

                assert.strictEqual(value.matchesFormat(format), true);
            }); 
            
            test(`Given value "hellos1" and format "*@@" when matchesFormat is called then it should return false`, () =>
            {
                const value = "hellos1";
                const format = "*@@";

                assert.strictEqual(value.matchesFormat(format), false);
            }); 
            
            test(`Given value "*hello*" and format "\\**\\*" when matchesFormat is called then it should return true`, () =>
            {
                const value = "*hello*";
                const format = "\\**\\*";

                assert.strictEqual(value.matchesFormat(format), true);
            }); 
            
            test(`Given value "**" and format "\\**\\*" when matchesFormat is called then it should return true`, () =>
            {
                const value = "**";
                const format = "\\**\\*";

                assert.strictEqual(value.matchesFormat(format), true);
            });

            test(`Given value "*hello" and format "\\**\\*" when matchesFormat is called then it should return false`, () =>
            {
                const value = "*hellos1";
                const format = "\\**\\*";

                assert.strictEqual(value.matchesFormat(format), false);
            }); 
        });
    });
});