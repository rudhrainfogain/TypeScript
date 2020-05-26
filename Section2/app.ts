console.log("it works");
//-------------------------------Basic example of using types ----------------------
console.log("");
console.log("--------------Basic example of using types-------------");
//syntax to declare parameters as numbers
function addInTs(n1: number, n2: number) {
  return n1 + n2;
}
console.log("Rudhra");
const num1 = "5";
const num2 = 10;
const num3 = 6;
//syntax to declare a constant as a number
const num4: number = 7;
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
  } else {
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
let a: number = 22;
let b: number = 22.22;
let c: number = -3;
//example of strings
let d: string = "hi i am a text";
let e: string = "heyaaa i am a text too";
let f: string = `oopsy i am text`;
let g: string = `i am a good boy `;
let h: string = "i am a 'pretty' good boy";
let i: string = 'i am a "damn" good boy';
let j: string = `i am a "very" 'good' boy`;
let k: string = "i am a 'super' good boy";
let l: string = "my marks are : " + a + " out of " + b;
let m: string = `my marks are ${a} out of  ${b}`;
let n: string = `i am a  string
with multiple
lines and                   Indentation
`;

let o: string = "i am a  string\nwith multiple\nlines and\t\t\t\t\tIndentation";
let p: string = "i am a  string\nwith multiple\nlines and\t\t\t\t\tIndentation";
let q: boolean = true;
let r: boolean = false;
//implicitly boolean based on the value
let s = true;
let t = false;
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

function advancedAdd(
  num1: number,
  num2: number,
  printResult: boolean,
  resultPhrase: string
) {
  const result = num1 + num2;
  if (printResult) {
    console.log(resultPhrase + result);
  } else {
    return result;
  }
}
const resultprefix: string = "Result is : ";
advancedAdd(a, b, q, resultprefix);
console.log(advancedAdd(a, b, t, resultprefix));
console.log("");

//-------------------------------Numbers Strings and Boolean Ends ----------------------

//-------------------------------Type assignment and inference Start ----------------------
console.log("--------------Type assignment and inference--------------");
//explicit type decleration for  a number const
const num5: number = 22;
//implicit type inference for  a number const
const num6 = 22;
//explicit type decleration for  a number var
let num7: number = 33;
//implicit type inference for  a number var
let num8 = 33;

//explicit type decleration for  a string const
const str1: string = "abcdefg";
//implicit type inference for  a string const
const str2 = "hijkl";
//explicit type decleration for  a string var
let str3: string = "mnopqrst";
//implicit type inference for  a string var
let str4 = "uvwxyz";

//explicit type decleration for  a boolean const
const bool1: boolean = true;
//implicit type inference for  a boolean const
const bool2 = false;
//explicit type decleration for  a boolean var
let bool3: boolean = true;
//implicit type inference for  a boolean var
let bool4 = false;

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
