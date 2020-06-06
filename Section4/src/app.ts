console.log("works  anna");
//-----------------------let const and var-------------------------
//comment out strict and noEmitOnerror before demo also change target to es6
//global scoped variables created with let and var
let globalScopedLet = 22;
var globalScopedVar = 33;
//unassigned global scoped variables created with let and var

function useGlobalVars() {
  //use global scoped variable created with var inside a function
  console.log(globalScopedVar);
  //use global scoped variable created with let inside a function
  console.log(globalScopedLet);
}
useGlobalVars();

//use of var befor initialization gives undefined as they are hoisted
//Hoisting in simple terms means - decleration is automatically moved before use
{
  console.log(globalScopedVar2);

  var globalScopedVar2;
}
//use of let befor initialization gives reference error
//let vars are not hoisted
{
  //try catch added so that rest of the script works
  //otherwise since this error is not caught the script breaks
  try {
    // @ts-ignore
    console.log(globalScopedLet2);
    let globalScopedLet2;
  } catch (error) {
    console.log(error);
  }
}

function useLocalVars() {
  //declaring local viarables with let and var
  let localScopedLet = 22;
  var localScopedVar = 33;
  //redeclaring/overriding global variables with let and var
  let globalScopedLet = 99;
  var globalScopedVar = 100;
  console.log(localScopedLet);
  console.log(localScopedVar);
  //the values defined in this function will be printed
  //if we use same names as global vars for local vars
  //local ones will be used inside that function
  console.log(globalScopedLet);
  console.log(globalScopedVar);

  //re decleration of a blocked scope variable ie let var is not allowed
  //so below line gives an error
  try {
    let localScopedLet = 22;
  } catch (error) {
    console.log(error);
  }
  //variables created with var are not block scoped and hence can be redeclared
  var localScopedVar = 85;
  console.log(localScopedVar);
}
useLocalVars();

//variables with let and var declared in a block
{
  let blockScopedVarWithLet = 54;
  var blockedScopedVarwithVarIsNotPossible = 43;
  //both vars can be used inside this block
  console.log(blockedScopedVarwithVarIsNotPossible);
  console.log(blockScopedVarWithLet);
}
//can acces var variable even outside the block
//as variables declared withar dont have a block scope
console.log(blockedScopedVarwithVarIsNotPossible);
//below line will give an error as let are block scoped
//so if declared in  a block cant be accessed outside it
try {
  //try catch added so that rest of the script works
  //otherwise since this error is not caught the script breaks
  // @ts-ignore
  console.log(blockScopedVarWithLet);
} catch (error) {
  console.log(error);
}

//global variables created with var are bound to top level object in this case window
console.log(window.globalScopedVar);
//global variables created with let  are not bound to top level object in this case window

// @ts-ignore
console.log(window.globalScopedLet);

//-----------------------let const and var Ends-------------------------

//-----------------------Arrow Function---------------------------------
console.log("");
console.log("----------------Arrow Function----------------------------");

//simple arrow function
const func1 = () => {
  console.log("hiiiiiii");
};

func1();

//simple arrow function with parameters
const func2 = (num1: number) => {
  console.log("user entered " + num1);
};
func2(223);
//simple arrow function with parameters and return
const func3 = (num1: number, num2: number) => {
  return num1 + num2;
};
console.log(func3(223, 33));

//simple if body has only one line curly braces and are optional
const func4 = (num1: number, num2: number) => console.log(num1 + num2);
func4(223, 33);

//simple if body has only one line return keyword can be removed
const func5 = (num1: number, num2: number) => num1 + num2;
console.log(func5(223, 33));

//simple if we have only a single parameter paranthesis are optional
//but we need to remove the data type too
const func6 = num1 => console.log(num1);
func6(223);

//we can although specify data type as below
const func7: (num1: number) => void = num1 => console.log(num1);
func7(223);

//we can although specify data type as below
const func8: (num1: number) => number = num1 => Math.max(num1);
console.log(func8(223.57));

//to return an object literal paranthesize the body
const func9: (num1: number) => {} = num1 => ({ abc: num1 });
console.log(func9(223.57));

let elements = ["Hydrogen", "Helium", "Lithium", "Beryllium"];

// This statement returns the array: [8, 6, 7, 9]
//by calculating lengths of each element of  elements array
let lengths = elements.map(function (element) {
  return element.length;
});

console.log(lengths);

// The regular function above can be written as the arrow function below
lengths = elements.map(element => element.length); // [8, 6, 7, 9]
console.log(lengths);

// use of this with arrow functions
let p = function Person() {
  // The Person() constructor defines `this` as an instance of itself.
  this.age = 0;

  /* setInterval(function growUp() {
    // In non-strict mode, the growUp() function defines `this`
    // as the global object (because it's where growUp() is executed.),
    // which is different from the `this`
    // defined by the Person() constructor.
    this.age++;
    console.log(this);
    console.log(this.age);
  }, 1000); */
};

p();

let p1 = function Person1() {
  // The Person() constructor defines `this` as an instance of itself.
  this.age = 0;
  //prior to es6 this is solvalble by assigning the value in this to a variable
  //and using that variable instead of this
  let that = this;

  /*  setInterval(function growUp() {
    // In non-strict mode, the growUp() function defines `this`
    // as the global object (because it's where growUp() is executed.),
    // which is different from the `this`
    // defined by the Person() constructor.
    that.age++;
    console.log(that);
    console.log(that.age);
  }, 1000); */
};

p1();
/* An arrow function does not have its own this.
 The this value of the enclosing lexical scope is used; 
 arrow functions follow the normal variable lookup rules. 
 So while searching for this which is not present in the current scope, 
 an arrow function ends up finding the this from its enclosing scope.
 Thus, in the following code, the this within the function
 that is passed to setInterval has the same value 
 as the this in the lexically enclosing function: */
let p2 = function Person2() {
  this.age = 0;

  /* setInterval(() => {
    this.age++; // |this| properly refers to the Person object
    console.log("this in p2 ", this);
    console.log(this.age);
  }, 1000); */
};

p2();

/*
Since arrow functions do not have their own this,
 the methods call() and apply() can only pass in parameters. 
 Any this argument is ignored.
*/

let adder = {
  base: 1,

  add: function (a) {
    let f = v => v + this.base;
    return f(a);
  },

  addThruCall: function (a) {
    let f = v => v + this.base;
    let b = {
      base: 2,
    };

    //b will not be assigned to this it will be ignored
    return f.call(b, a);
  },
};

console.log(adder.add(1)); // This would log 2
console.log(adder.addThruCall(1)); // This would log 2 still

/*arrow function expressions are best suited for non-method functions. 
Let's see what happens when we try to use them as methods: */

let obj = {
  // does not create a new scope
  i: 10,
  b: () => console.log(this.i, this),
  c: function () {
    console.log(this.i, this);
  },
};

obj.b(); // prints undefined, Window {...}
obj.c(); // prints 10, Object {...}

//Arrow functions cannot be used as constructors and will throw an error when used with new

let Foo = () => {};
console.log(Foo.prototype); // undefined

//-----------------------Arrow Function Ends ---------------------------------

//-----------------------Default function Parameters ---------------------------------
console.log("");
console.log(
  "----------------Default function Parameters----------------------------"
);
//function with default parameters
const add3 = (a: number, b: number = 2, c: number = 4) => a + b + c;

console.log(add3(22, 33, 44));
console.log(add3(44));
console.log(add3(55, 11));

//-----------------------Default function Parameters Ends ---------------------------------

//-----------------------Spread Operator ---------------------------------
console.log("");
console.log("---------------Spread Operator----------------------------");

const hobbies = ["sports", "Cooking"];
console.log(hobbies);
const activeHobbies = ["hiking"];
console.log(activeHobbies);
activeHobbies.push(...hobbies);
console.log(activeHobbies);
const activeHobbies2 = ["fishing", ...activeHobbies];
console.log(activeHobbies2);

const human = {
  firstName: "Rudhra",
  age: 30,
};
//great human and human refer to same object
const greatHuman = human;
//goodHuman is a copy of human but different objects
const goodHuman = { ...human };
console.log(goodHuman);
console.log(human);
console.log(greatHuman);
//change age of human
human.age = 32;
console.log(human);
//change in human changes greatHuman too as they refer same object
console.log(greatHuman);
//no change in goodHuman as it is a different object
console.log(goodHuman);

//-----------------------Spread Operator Ends ---------------------------------

//-----------------------Rest Parameters ---------------------------------
console.log("");
console.log("---------------Rest Parameters----------------------------");
//method with rest parameters
const add4 = (...nums: number[]) => {
  return nums.reduce((currResult, currValue) => {
    return currResult + currValue;
  }, 0);
};
console.log(add4(1, 2, 3));
console.log(add4(1, 4, 6, 7, 8, 9));

//-----------------------Rest Parameters Ends ---------------------------------

//-----------------------Array and Object Destructuring ---------------------------------
console.log("");
console.log(
  "---------------Array and Object Destructuring---------------------------"
);
//array destructuring
console.log(activeHobbies2);
const [hobby1, hobby2] = activeHobbies2;
console.log(hobby1);
console.log(hobby2);
const [hobby3, hobby4, ...remainingHobbies] = activeHobbies2;
console.log(hobby3);
console.log(hobby4);
console.log(remainingHobbies);

//object destructuring

const { firstName, age } = human;
console.log(firstName);
console.log(age);

//object destructuring with alias
const { firstName: actualName, age: howOld } = human;
console.log(actualName);
console.log(howOld);
