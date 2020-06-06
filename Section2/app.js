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
//-------------------------------Objects ----------------------
console.log("");
console.log("-------------------------------Objects ----------------------");
//js style object
var person = {
    name: "rudhra",
    age: 30,
};
//ts infers person to be a well defined object with a name and age key
//if we hover on the person we will see what ts infered
//it infers it to be an object with key name of type string and key age of type number
// ts infers the types of properties by the values assigned to them
//accesing whole object
console.log(person);
//accesing indivisual properties of objects
console.log(person.name);
console.log(person.age);
//below line gives an error as ts cant find nickname property
//console.log(person.nickname);
//here we are telling ts that we are creating an object and
//nothing specific about the object as we explicitly specify type object
var homosapien = {
    name: "rudhraa",
    age: 30,
};
console.log(homosapien);
//below line gives an error as ts only knows that homosapien is an object
//and knows nothing about the properties
//console.log(homosapien.name);
//Below is a well defined object
//ts infers it to be an object
//we explicitly tell ts about the properties and their types name string and age number
//we also create and assign an object to it which matches the requirements of human
//ie it has a name string(chetna) and age number(500)
var human = {
    name: "chetna",
    age: 500,
};
//accesing object
console.log(human);
//accessing its properties
console.log(human.name);
console.log(human.age);
//only declaring the object
var humanbeing;
//below line will give an error as Variable 'humanbeing' is used before being assigned
//console.log(humanbeing);
//assigning an actual object to it
humanbeing = {
    name: "namit",
    age: 3,
};
//accessing after being assigned
console.log(humanbeing);
//accesing properties in object after being assigned
console.log(humanbeing.name);
console.log(humanbeing.age);
//we can also have nested object types
var man = {
    name: "rudhra",
    age: 30,
    address: {
        street: "street1",
        city: "Noida",
        state: "up",
    },
};
//accesing object
console.log(man);
//accessing properties
console.log(man.name);
console.log(man.age);
//accessing nested object
console.log(man.address);
//acceesing properties of nested object
console.log(man.address.city);
console.log(man.address.street);
console.log(man.address.state);
//the first way is the prefferd way as it uses type inference and no redundant code
//-------------------------------Objects Ends----------------------
//-------------------------------Arrays-----------------------------
console.log("");
console.log("-------------------------------Arrays-----------------------------");
//Object with an array type of property
//ts infers it to be array of strings can be verified by hovering over women
var women = {
    name: "vrinda",
    age: 29,
    address: {
        street: "street1",
        city: "New Delhi",
        state: "Delhi",
    },
    hobbies: ["singing", "coding"],
};
//access whole array
console.log(women.hobbies);
//access individual elements of array
for (var _i = 0, _a = women.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    //can use string functions as ts detects hobbies to be string array
    //and hobby to be string
    console.log(hobby.toUpperCase());
}
//declare an array of strings
var favouriteActivities;
favouriteActivities = ["swimming", "dancing", "killing", "drugs"];
//below line will give an error as cant save 1 in string array
//favouriteActivities = ["swimming", 1, "killing", "drugs"];
//this can be solved by specifying type to be any[]
//but we loose benifits offered by ts
for (var _b = 0, favouriteActivities_1 = favouriteActivities; _b < favouriteActivities_1.length; _b++) {
    var activity = favouriteActivities_1[_b];
    //can use string functions as ts detects favouriteActivities to be string array
    //and activity to be string
    console.log(activity.toUpperCase());
}
//-------------------------------Arrays Ends-----------------------------
//-------------------------------Types added by Ts-----------------------------
console.log("");
console.log("-------------------------Types added by Ts------------------------");
//-------------------------------Tuples-----------------------------
console.log("");
console.log("-------------------------------Tuples-----------------------------");
var employee = {
    name: "vrinda",
    age: 29,
    address: {
        street: "street1",
        city: "New Delhi",
        state: "Delhi",
    },
    hobbies: ["singing", "coding"],
    role: [1, "developer"],
};
console.log(employee);
console.log(employee.role);
//ts infers role to be of union type role: (string | number)
//we will study union types later
// for now we can say that we can save number to position 1
employee.role[1] = 10;
console.log(employee);
console.log(employee.role);
//adds an extra element to roles
employee.role.push("consultant");
console.log(employee.role);
//can add an extra element
employee.role[2] = 10;
//cant add anything except string and number
//employee.role[1] = true;
//to use a tuple we need to explicitly declare it as below
var developer = {
    name: "vrinda",
    age: 29,
    address: {
        street: "street1",
        city: "New Delhi",
        state: "Delhi",
    },
    hobbies: ["singing", "coding"],
    role: [1, "developer"],
};
//now we explicitly say that role is a tuple with
//first value as number and second as string
//below line will now give an error
//as at position 1 it needs a string
//developer.role[1] = 10;
developer.role[0] = 22;
developer.role[1] = "manager";
//below line gives an error as tuple declared above can have only two values
//developer.role[2] = "manager";
console.log(developer);
console.log(developer.role);
//adds an extra element to roles
//this is still allowed as ts cant stop push as tuples are evaluated to arrays
// after ts compiles to js
//but still it helps with the other validsations given above
developer.role.push("consultant");
console.log(developer.role);
//-------------------------------Tuples ends-----------------------------
//-------------------------------Enums-----------------------------
console.log("");
console.log("-------------------------------Enums-----------------------------");
// enum with default values starting with 0
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["USER"] = 1] = "USER";
    Role[Role["MANAGER"] = 2] = "MANAGER";
})(Role || (Role = {}));
// enum with custom numeric values with no sequence
var Hobbies;
(function (Hobbies) {
    Hobbies[Hobbies["SINGING"] = 22] = "SINGING";
    Hobbies[Hobbies["DANCING"] = 28] = "DANCING";
})(Hobbies || (Hobbies = {}));
// enum with mixed values
var FavouriteActivities;
(function (FavouriteActivities) {
    FavouriteActivities["KILLING"] = "BULLETS";
    FavouriteActivities["DRUGS"] = "29";
    FavouriteActivities["ROBBERY"] = "theft";
})(FavouriteActivities || (FavouriteActivities = {}));
//use of enums in objects
var tester = {
    name: "vrinda",
    age: 29,
    address: {
        street: "street1",
        city: "New Delhi",
        state: "Delhi",
    },
    hobbies: [Hobbies.DANCING, Hobbies.SINGING],
    role: Role.ADMIN,
    favouriteActivity: FavouriteActivities.DRUGS,
};
//console the whole object
console.log(tester);
//console the indivisual enums from object
console.log(tester.role);
console.log(tester.hobbies);
//console use of enum values in array
console.log(tester.hobbies[1]);
console.log(tester.favouriteActivity);
//can be used in comparison
if (tester.role === Role.ADMIN) {
    console.log("this tester is an ADMIN");
}
//values of enum can be used for direct comparison
if (tester.role === 0) {
    console.log("this tester is an ADMIN");
}
//printed as an object which has constant: value and value:constant as properties
console.log(Role);
//-------------------------------Enums ends-----------------------------
//-------------------------------Any-----------------------------
console.log("");
console.log("-------------------------------Any-----------------------------");
//declare a variable of any type
var favouriteTask;
//declare an array of any type
var dailyTasks;
//set string value in any type of variable
favouriteTask = "running";
console.log(favouriteTask);
//set number value in any type of variable
favouriteTask = 22;
console.log(favouriteTask);
//set boolean value in any type of variable
favouriteTask = true;
console.log(favouriteTask);
//set array value in any type of variable
favouriteTask = ["coding", "developing"];
console.log(favouriteTask);
//set mix type array value in any type of variable
favouriteTask = ["coding", 22];
console.log(favouriteTask);
//set string array value in any array type of variable
dailyTasks = ["wake up", "eat", "code", "sleep", "repeat"];
console.log(dailyTasks);
//below line would give an error as ts expects it to be an array
//dailyTasks='sleep';
//set mix data type array value in any array type of variable
dailyTasks = ["eat", "sleep", 22, "33", true];
console.log(dailyTasks);
//-------------------------------Any Ends-----------------------------
//-------------------------------Union-----------------------------
console.log("");
console.log("//-------------------------------Union-----------------------------");
//declare method params as union type
function combine(input1, input2) {
    //the input validation given below should not be required in all cases
    //it depends on the logic of the method
    var result;
    if (typeof input1 === "number" && typeof input2 === "number") {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
//call with two strings
var combineNames = combine("rudhra ", "koul");
console.log(combineNames);
//call with two numbers
var combineAge = combine(22, 8);
console.log(combineAge);
var combineNameAndAge = combine("rudhra", 30);
console.log(combineNameAndAge);
//below line will give an error as  boolean cant be used only string and number can be
//const combineTest=combine('rudhra',true);
//union type variable
var abc;
abc = "heya";
console.log(abc);
abc = 55;
console.log(abc);
//below line will give an error as  boolean cant be used only string and number can be
//abc=true;
//-------------------------------Union Ends-----------------------------
//-------------------------------Literal Types-----------------------------
console.log("");
console.log("-------------------------------Literal Types-----------------------------");
//result type declared as literal type
function combineIt(input1, input2, resultType) {
    //the input validation given below should not be required in all cases
    //it depends on the logic of the method
    var result;
    if ((typeof input1 === "number" && typeof input2 === "number") ||
        resultType === "as-number") {
        //Now since this condition can also be satisfied
        // even if input 1 or input2 is not a number
        //we havo explicitly convert it to numbers
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
//call with two strings and return result as a string
var combineNames1 = combineIt("rudhra ", "koul", "as-string");
console.log(combineNames1);
//call with two numbers and return result as a number
var combineAge1 = combineIt(22, 8, "as-number");
console.log(combineAge1);
//call with two strings and return result as a number
var combineAge2 = combineIt("22", "8", "as-number");
console.log(combineAge2);
//call with two numbers and return result as a string
var combineAge3 = combineIt(22, 8, "as-string");
console.log(combineAge3);
//call with a string and a number and return result as a string
var combineNameAndAge1 = combineIt("rudhra", 30, "as-string");
console.log(combineNameAndAge1);
//following codee will result in NaN(Not A Number)
//as 'Rudhra' cant be converted to a number
var combineNameAndAge2 = combineIt("rudhra", 30, "as-number");
console.log(combineNameAndAge2);
//literal type with multiple types as allowed values
function printRoleOrRoleId(xyz) {
    console.log(xyz);
}
//call with allowed values
printRoleOrRoleId("Manager");
printRoleOrRoleId(1);
printRoleOrRoleId("developer");
printRoleOrRoleId(true);
//following lines will give an error
// as the value passed does not lie in allowed vaues for literal type xyz
//printRoleOrRoleId('Engineer');
//printRoleOrRoleId(2);
//printRoleOrRoleId(false);
//variable declared as a literal type
var pqr;
//assign allowed values to variable pqr
pqr = "Manager";
console.log(pqr);
pqr = 1;
console.log(pqr);
pqr = "developer";
console.log(pqr);
pqr = true;
console.log(pqr);
//following lines will give an error
// as the value assigned does not lie in allowed vaues for literal type pqr
//pqr='Engineer';
//pqr=2;
//pqr=false;
//-------------------------------Literal Types End-----------------------------
//-------------------------------Types Aliases-----------------------------
console.log("");
console.log("-------------------------------Types Aliases-----------------------------");
function combineItWithAlias(input1, input2, resultType) {
    //the input validation given below should not be required in all cases
    //it depends on the logic of the method
    var result;
    if ((typeof input1 === "number" && typeof input2 === "number") ||
        resultType === "as-number") {
        //Now since this condition can also be satisfied
        // even if input 1 or input2 is not a number
        //we havo explicitly convert it to numbers
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
//call with two strings and return result as a string
var combineNames2 = combineItWithAlias("rudhra ", "koul", "as-string");
console.log(combineNames2);
//call with two numbers and return result as a number
var combineAge22 = combineItWithAlias(22, 8, "as-number");
console.log(combineAge22);
//call with two strings and return result as a number
var combineAge23 = combineItWithAlias("22", "8", "as-number");
console.log(combineAge23);
//call with two numbers and return result as a string
var combineAge34 = combineItWithAlias(22, 8, "as-string");
console.log(combineAge34);
//call with a string and a number and return result as a string
var combineNameAndAge11 = combineItWithAlias("rudhra", 30, "as-string");
console.log(combineNameAndAge11);
//following codee will result in NaN(Not A Number)
//as 'Rudhra' cant be converted to a number
var combineNameAndAge21 = combineItWithAlias("rudhra", 30, "as-number");
console.log(combineNameAndAge21);
//constant with type as a type alias
var u1 = { name: "Rudhra", age: 30 };
//following two functions can be simplified using type aliases for objects
function greet(user) {
    console.log("Hi, I am " + user.name);
}
function isOlder(user, checkAge) {
    return checkAge > user.age;
}
function greet1(user) {
    console.log("Hi, I am " + user.name);
}
function isOlder1(user, checkAge) {
    return checkAge > user.age;
}
//call methods with params having type aliases
greet1(u1);
console.log(isOlder1(u1, 23));
console.log(isOlder1(u1, 33));
//assign a object to variable of type User1
var u3 = { name: "Rudhra" };
console.log(u3);
//assign a string to a variable of User1 type
u3 = "Hansa";
console.log(u3);
//Below code will give an error as boolean is not assignable to  the type User1
//only object and string is permitted
//u3=true;
//below code will give an error as property age is unknown
//to the type of obect assignable to u3
//u3 ={name:"Chetna",age:567};
//-------------------------------Types Aliases Ends-----------------------------
//-------------------------------Functions-----------------------------
console.log("");
console.log("-------------------------------Functions-----------------------------");
//no explicit return type and no parameteres
function greetUser() {
    console.log("heyaaaa");
}
//TS infers return type as number
function addAgain(num1, num2) {
    return num1 + num2;
}
//TS infers return type as string
function concat(txt1, txt2) {
    return txt1 + txt2;
}
//Explicitly specifying return type as number
function addIt(num1, num2) {
    return num1 + num2;
}
//Explicitly specifying return type as string
function concatIt(txt1, txt2) {
    return txt1 + txt2;
}
//Ts infers return type as void
function printSum(num1, num2) {
    console.log(num1 + num2);
}
//Explicitly specifying return type as void
function displaySum(num1, num2) {
    console.log(num1 + num2);
}
//Explicitly specifying return type as undefined
function concatinateIt(txt1, txt2) {
    console.log(txt1 + txt2);
    return;
}
var rrd;
console.log(greetUser());
console.log(addAgain(22, 33));
console.log(concat("yeah", "bro"));
console.log(addIt(55, 85));
console.log(concatIt("heya", "mister"));
console.log(printSum(55, 88));
console.log(displaySum(43, 67));
console.log(concatinateIt("heyyyyyyyy", "brother"));
console.log(rrd);
//-------------------------------Functions Ends -----------------------------
//-------------------------------Function As Type -----------------------------
console.log("");
console.log("-------------------------------Function As Type-----------------------------");
//simply saving a function to a var
var addFunc = addIt;
console.log(addFunc(22, 33));
//explicitly specifying variable to be a function type
var addFunc2;
addFunc2 = addIt;
console.log(addFunc2(22, 33));
//re assigning another function to addFunc2
addFunc2 = concatIt;
console.log(addFunc2("bro", " yeah!!!"));
addFunc2 = greet1;
addFunc2 = concatIt;
//but now below statementreturn Nan
//we assigned a function that takes in two strings
//js treats it as two any after compilation to js
//we call using one number
//so other param is undefined
//undefined +num is nan
console.log(addFunc2(11));
//to print the function definition
console.log(addFunc2.toString());
//we can be more specific by specifying exact signature
var adds;
adds = addIt;
console.log(adds(55, 63));
//below lines will give a compilation error as there is a signature mismatch
//adds = concatIt;
//adds(55);;
//assign function with no params and void retur type
var greets;
greets = greetUser;
greets();
//-------------------------------Function As Type Ends -----------------------------
//-------------------------------Function Types and Callbacks ------------------------
console.log("");
console.log("-------------------------------Function Types and Callbacks ------------------------");
//Function with a callback argument
//which takes in a number as a parameter and doesnt return anything
function addAndHandleResult(num1, num2, cb) {
    var result = num1 + num2;
    //using the callback inside the function
    cb(result);
}
//calling the function and passing an anonymous function as an argument for callback
addAndHandleResult(20, 30, function (result) {
    console.log(result);
});
//we can pass a callback function with no argument as ts
//treats the argument as optional by default
addAndHandleResult(20, 30, function () {
    console.log("result calculated");
});
addAndHandleResult(20, 30, function (result) {
    //we can call math.sqrt here because since we defined the input to callback as a number
    //ts is sure  result will be a number
    console.log("Square root of result is" + Math.sqrt(result));
});
//below code will give an error as we have specified that the
//callback will have only one argument
//and we are passing two arguments
/* addAndHandleResult(20, 30, (result,abc) => {
  console.log("Square root of result is" + Math.sqrt(result));
}); */
addAndHandleResult(20, 30, function (result) {
    console.log("Square root of result is" + Math.sqrt(result));
    //we can return somethineven though we specified the return type as void
    //because by specifying void we are establishing a contract that the return value
    //if any will not be used and thus ts ignores the return value
    return Math.sqrt(result);
});
//Function with a callback argument
//which takes in a number as a parameter and doesnt return anything
function addAndHandleResultAgain(num1, num2, cb) {
    var result = num1 + num2;
    //using the callback inside the function
    console.log("result is " + result);
    //ts gives a warg that the return should n be used as it is void
    console.log(cb(result));
}
addAndHandleResultAgain(40, 30, function (result) {
    console.log("Square root of result is" + Math.sqrt(result));
    //we can return something even though we specified the return type as void
    //because by specifying void we are establishing a contract that the return value
    //if any will not be used and thus ts ignores the return value
    //bwe can stll return a value and it can be used in the function
    return Math.sqrt(result);
});
//-------------------------------Function Types and Callbacks  Ends------------------------
//-------------------------------Unknown Type------------------------
console.log("");
console.log("-------------------------------Unknown Type ------------------------");
//create an unknown type
var userInput;
var userName;
var userInput2;
userInput2 = "chetna";
//assign anumber
userInput = 22;
userInput = "Rudhra";
//below line gives an error as we cant save an unknown type to a fix type
//without type check
//userName=userInput;
//for type any assignment to a fix type can be done
userName = userInput2;
//assignment to a fix type can be done after a type check for unknown types
if (typeof userInput === "string") {
    userName = userInput;
}
//-------------------------------Unknown Type Ends------------------------
//-------------------------------Never Type------------------------
console.log("");
console.log("-------------------------------Never Type------------------------");
//function that throws an error and never returns back
function throwError(errorMessage, code) {
    throw { message: errorMessage, errorCode: code };
}
throwError("An error occured", 500);
console.log("This never prints");
//-------------------------------Never Type Ends------------------------
//# sourceMappingURL=app.js.map