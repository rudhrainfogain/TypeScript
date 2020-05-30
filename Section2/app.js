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
    favouriteActivity: FavouriteActivities.DRUGS
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
    console.log('this tester is an ADMIN');
}
//values of enum can be used for direct comparison
if (tester.role === 0) {
    console.log('this tester is an ADMIN');
}
//printed as an object which has constant: value and value:constant as properties
console.log(Role);
//-------------------------------Enums ends-----------------------------
