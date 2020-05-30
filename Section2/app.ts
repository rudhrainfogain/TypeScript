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

//-------------------------------Objects ----------------------
console.log("");
console.log("-------------------------------Objects ----------------------");

//js style object
const person = {
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
const homosapien: object = {
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
const human: {
  name: string;
  age: number;
} = {
  name: "chetna",
  age: 500,
};

//accesing object
console.log(human);

//accessing its properties
console.log(human.name);
console.log(human.age);

//only declaring the object
let humanbeing: {
  name: string;
  age: number;
};

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

const man = {
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
console.log(
  "-------------------------------Arrays-----------------------------"
);
//Object with an array type of property
//ts infers it to be array of strings can be verified by hovering over women
const women = {
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
for (const hobby of women.hobbies) {
  //can use string functions as ts detects hobbies to be string array
  //and hobby to be string
  console.log(hobby.toUpperCase());
}

//declare an array of strings
let favouriteActivities: string[];

favouriteActivities = ["swimming", "dancing", "killing", "drugs"];
//below line will give an error as cant save 1 in string array
//favouriteActivities = ["swimming", 1, "killing", "drugs"];
//this can be solved by specifying type to be any[]
//but we loose benifits offered by ts
for (const activity of favouriteActivities) {
  //can use string functions as ts detects favouriteActivities to be string array
  //and activity to be string
  console.log(activity.toUpperCase());
}

//-------------------------------Arrays Ends-----------------------------

//-------------------------------Types added by Ts-----------------------------
console.log("");
console.log(
  "-------------------------Types added by Ts------------------------"
);
//-------------------------------Tuples-----------------------------
console.log("");
console.log(
  "-------------------------------Tuples-----------------------------"
);

const employee = {
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

const developer: {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
    state: string;
  };
  hobbies: string[];
  role: [number, string];
} = {
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
console.log(
  "-------------------------------Enums-----------------------------"
);
// enum with default values starting with 0
enum Role {
  ADMIN,
  USER,
  MANAGER,
}
// enum with custom numeric values with no sequence
enum Hobbies {
  SINGING = 22,
  DANCING = 28,
}
// enum with mixed values
enum FavouriteActivities {
  KILLING = "BULLETS",
  DRUGS = "29",
  ROBBERY = "theft",
}
//use of enums in objects
const tester = {
  name: "vrinda",
  age: 29,
  address: {
    street: "street1",
    city: "New Delhi",
    state: "Delhi",
  },
  hobbies: [Hobbies.DANCING,Hobbies.SINGING],
  role: Role.ADMIN,
  favouriteActivity:FavouriteActivities.DRUGS;
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
if(tester.role ===Role.ADMIN) {
  console.log('this tester is an ADMIN');
}
//values of enum can be used for direct comparison
if(tester.role === 0) {
  console.log('this tester is an ADMIN');
}

//printed as an object which has constant: value and value:constant as properties
console.log(Role);

//-------------------------------Enums ends-----------------------------