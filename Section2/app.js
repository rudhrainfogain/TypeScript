"use strict";
console.log("it works");
//-------------------------------Basic example of using types ----------------------
console.log("");
console.log("--------------Basic example of using types-------------");
//syntax to declare parameters as numbers
function addInTs(n1, n2) {
    return n1 + n2;
}
console.log("Rudhra");
var num1 = "5";
var num2 = 10;
var num3 = 6;
//syntax to declare a constant as a number
var num4 = 7;
//below line will give an error as string 7 cant be assigned to a number
// const num5:number='7';
//below line will give an error as add method accepts only numbers
// console.log(addInTs(num1, num2));
console.log(addInTs(num2, num3));
console.log();
//js styleimplementation of similar add function with validation
//might need to turn noImplicitAny option off in tsconfig if it shows error
//sometimes we can only validate input at runtime
//but most of the times it can be validated at compile/dev time
function addJs(n1, n2) {
    if (typeof n1 === "number" && typeof n2 === "number") {
        return n1 + n2;
    }
    else {
        throw new Error("Incorrect input !!!");
    }
}
//js is dynamically typed ie types can change at runtime
//ts is statically typed ie types are strictly defined and checked at compile/dev time
console.log(addJs(num2, num3));
//below line will throw an error as num1 is string
//console.log(addJs(num1, num2));
console.log("");
//-------------------------------Basic example of using types Ends ----------------------
//-------------------------------Numbers Strings and Boolean start ----------------------
console.log("--------------Numbers Strings and Boolean--------------");
//number is used to represent ints floats and numbers
var a = 22;
var b = 22.22;
var c = -3;
//example of strings
var d = "hi i am a text";
var e = "heyaaa i am a text too";
var f = "oopsy i am text";
var g = "i am a good boy ";
var h = "i am a 'pretty' good boy";
var i = 'i am a "damn" good boy';
var j = "i am a \"very\" 'good' boy";
var k = "i am a 'super' good boy";
var l = "my marks are : " + a + " out of " + b;
var m = "my marks are " + a + " out of  " + b;
var n = "i am a  string\nwith multiple\nlines and                   Indentation\n";
var o = "i am a  string\nwith multiple\nlines and\t\t\t\t\tIndentation";
var p = "i am a  string\nwith multiple\nlines and\t\t\t\t\tIndentation";
var q = true;
var r = false;
//implicitly boolean based on the value
var s = true;
var t = false;
// console.log() numbers
console.log(a);
console.log(b);
console.log(c);
// console.log() string
console.log(d);
console.log(e);
console.log(f);
console.log(g);
console.log(h);
console.log(i);
console.log(j);
console.log(k);
console.log(l);
console.log(m);
console.log(n);
console.log(o);
console.log(p);
// console.log() booleans
console.log(q);
console.log(r);
console.log(s);
console.log(t);
//Types in function parameters
function advancedAdd(num1, num2, printResult, resultPhrase) {
    var result = num1 + num2;
    if (printResult) {
        console.log(resultPhrase + result);
    }
    else {
        return result;
    }
}
var resultprefix = "Result is : ";
advancedAdd(a, b, q, resultprefix);
console.log(advancedAdd(a, b, t, resultprefix));
console.log("");
//-------------------------------Numbers Strings and Boolean Ends ----------------------
//-------------------------------Type assignment and inference Start ----------------------
console.log("--------------Type assignment and inference--------------");
//explicit type decleration for  a number const
var num5 = 22;
//implicit type inference for  a number const
var num6 = 22;
//explicit type decleration for  a number var
var num7 = 33;
//implicit type inference for  a number var
var num8 = 33;
//explicit type decleration for  a string const
var str1 = "abcdefg";
//implicit type inference for  a string const
var str2 = "hijkl";
//explicit type decleration for  a string var
var str3 = "mnopqrst";
//implicit type inference for  a string var
var str4 = "uvwxyz";
//explicit type decleration for  a boolean const
var bool1 = true;
//implicit type inference for  a boolean const
var bool2 = false;
//explicit type decleration for  a boolean var
var bool3 = true;
//implicit type inference for  a boolean var
var bool4 = false;
console.log(typeof num5);
console.log(typeof num6);
console.log(typeof num7);
console.log(typeof num8);
console.log(typeof str1);
console.log(typeof str2);
console.log(typeof str3);
console.log(typeof str4);
console.log(typeof bool1);
console.log(typeof bool2);
console.log(typeof bool3);
console.log(typeof bool4);
console.log("");
//-------------------------------Type assignment and inference Ends ----------------------
