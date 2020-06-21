console.log('Wanakam anna');
//----------------Intersection Types -------------------

console.log('');
console.log('----------------Intersection Types -------------------');

type Employee = {
  name: string;
  age: number;
};
type Admin = {
  name: string;
  previledges: string[];
};
//intersection of Employee & Admin
type ElevatedEmpoyee = Employee & Admin;
const adminEmp: ElevatedEmpoyee = {
  name: 'Rudhra',
  age: 30,
  previledges: ['system']
};
console.log(adminEmp);
type Numeric = string | number;
type Combinable = number | boolean;
type Universal = Numeric & Combinable;
//intersection of Combinable ans numeric is number
const uni: Universal = 22;
//will give an error as intersection of Combinable and numeric is number not string
//const uni1:Universal='Rudhra';

interface EmployeeType {
  name: string;
  age: number;
}
interface AdminType {
  name: string;
  previledges: string[];
}

//combine interface t a type using intersection
type ElevatedEmpoyeeType = EmployeeType & AdminType;
let adminEmp1: ElevatedEmpoyeeType = {
  name: 'Rudhra',
  age: 30,
  previledges: ['system']
};

console.log(adminEmp1);

//We cant combine primitive property types with the same property name:
interface X {
  c: string;
  d: string;
}

interface Y {
  c: number;
  e: string;
}
//c from x and c from y have different types so there intersection is never
type XY = X & Y;
type YX = Y & X;
let s = () => {
  throw new Error('');
};
let p: XY;
try {
  p = { c: s(), d: 'ddd', e: 'eeeee' };
} catch (error) {
  console.log('never returned');
}

let q: XY;
//c from x and c from y have different types so there intersection is never so neither string nor number can be assigned
//p.c = s; // Error: Type '4' is not assignable to type 'string & number'
//q.c = 3; // Error: Type '3' is not assignable to type 'string & number'

//p.c = 'text'; // Error: Type 'text' is not assignable to type 'string & number'
//q.c = 'text'; // Error: Type 'text' is not assignable to type 'string & number'

//We can combine non primitive property types with the same property name:
interface AdminInter {
  isAdmin: boolean;
}
interface NameInter {
  name: string;
}
interface AgeInter {
  age: number;
}

interface IAdminInter {
  x: AdminInter;
}
interface INameInter {
  x: NameInter;
}
interface IAgeInter {
  x: AgeInter;
}

type AdminAgeNameIntref = IAdminInter & INameInter & IAgeInter;
// we got interfaces IAdminInter , INameInter, IAgeInter and all have same property name – x.
// However, type of the property x is different for those interfaces .
let ageOldAdminWithName: AdminAgeNameIntref = {
  x: {
    isAdmin: true,
    name: 'Rudhra',
    age: 3
  }
};

console.log('ageOldAdminWithName:', ageOldAdminWithName);
//----------------Intersection Types Ends -------------------

//----------------Type Guards -------------------

console.log('');
console.log('----------------Type Guards -------------------');

function add(a: Numeric, b: Numeric) {
  // type guards with typeOf
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

console.log(add(10, 20));
console.log(add('77', '20'));
type UnknownEmployee = Admin | Employee;
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name : ', emp.name);
  //type guard with in
  if ('previledges' in emp) {
    console.log('Previledges : ', emp.previledges);
  }
  //type guard with in
  if ('age' in emp) {
    console.log('Age : ', emp.age);
  }
}
printEmployeeInformation(adminEmp);
printEmployeeInformation({ name: 'Rudhra', age: 30 });

class Car {
  drive() {
    console.log('Driving a car');
  }
}

class Truck {
  drive() {
    console.log('Driving a Truck');
  }

  loadCargo(cargo: number) {
    console.log(`Loading cargo total : ${cargo} Kg's`);
  }
}

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  //Type guard with instance of
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(500);
  }
}

useVehicle(v1);
useVehicle(v2);

//----------------Type Guards Ends -------------------

//----------------Discriminated Unions -------------------

console.log('');
console.log('----------------Discriminated Unions -------------------');

interface Bird {
  //Discriminating property
  type: 'Bird';
  flyingSpeed: number;
}

interface Horse {
  //Discriminating property
  type: 'Horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed: number;
  switch (animal.type) {
    case 'Bird':
      speed = animal.flyingSpeed;
      break;
    case 'Horse':
      speed = animal.runningSpeed;
      break;
  }
  console.log(`Moving at speed  ${speed} km/hr`);
}
class MockingBird implements Bird {
  type: 'Bird';
  flyingSpeed: number;
  constructor(flyingSpeed: number) {
    this.flyingSpeed = flyingSpeed;
    this.type = 'Bird';
  }
}
moveAnimal(new MockingBird(57));
moveAnimal({ type: 'Horse', runningSpeed: 200 });

//---------------- Discriminated Unions Ends -------------------

//---------------- Type Casting -------------------

console.log('');
console.log('---------------- Type Casting -------------------');

//Type casting using <Type>
//We are explicitly telling ts that it will not be null using !
const userInput1 = <HTMLInputElement>document.getElementById('User-Input1')!;
//Type casting using as Type syntax
//We are explicitly telling ts that it will not be null using !
const userInput2 = document.getElementById('User-Input2')! as HTMLInputElement;
//Type casting here tells ts that we are sure that the element will not be null
const userInput3 = document.getElementById('User-Input3') as HTMLInputElement;
//In below case we are not sure if it is null or not so use an if check
const userInput4 = document.getElementById('User-Input4');
userInput1.value = `What's My Name?`;
userInput2.value = `What's My Name?`;
userInput3.value = 'My Name is ';

if (userInput4) {
  //Type casting at the time of usage
  (userInput4 as HTMLInputElement).value = 'Sheila!!!';
}

//---------------- Type Casting Ends-------------------

//---------------- Index Properties -------------------

console.log('');
console.log('---------------- Index Properties -------------------');

interface ErrorContainer {
  //index property
  [propName: string]: string;
  //well defined property name that follows signature of index property
  errorType: string;
  //below will give an error as it does not follow the signature of Index type
  //errorId:number;
}

interface ErrorMessageBuilder {
  //index property
  [propName: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Invalid email id entered',
  // this is mandatory
  errorType: 'Syntactical',
  name: 'Must start with a character',
  // can be used as it can be converted to a string
  1: 'Bad syntax Man'
};
const errorBag1: ErrorMessageBuilder = {
  //empty is valid nly if interface contains only index properties
};

const errorBag2: ErrorMessageBuilder = {
  email: 'Invalid email id entered',
  errorType: 'Syntactical',
  name: 'Must start with a character',
  // can be used as it can be converted to a string
  1: 'Bad syntax Man'
};

console.log(errorBag);
console.log(errorBag1);
console.log(errorBag2);

//---------------- Index Properties Ends-------------------

//---------------- Function Overloads -------------------

console.log('');
console.log('---------------- Function Overloads -------------------');

function advancedAdd(num1: number, num2?: number): number;
function advancedAdd(num1: number, num2?: string): string;
function advancedAdd(num1: number): number;
function advancedAdd(num1: string, num2?: string): string;
function advancedAdd(num1: string): string;
function advancedAdd(num1: string, num2?: number): string;
function advancedAdd(a: Numeric, b?: Numeric) {
  let result;
  if (typeof a === 'string') {
    result = a.toString();
    if (b) {
      result = result + b.toString();
    }
  } else if (typeof a === 'number') {
    result = a;
    if (b) {
      if (typeof b === 'string') {
        result = result + b.toString();
      } else {
        result = result + b;
      }
    }
  }
  return result;
}

console.log(advancedAdd(1, 2));
console.log(advancedAdd(1));
console.log(advancedAdd(1, ' Man Army'));
console.log(advancedAdd('Despacito '));
console.log(advancedAdd('hey', ' there Delilah'));
console.log(advancedAdd('i am Number ', 1));
//---------------- Functional Overloads-------------------

//---------------- Optional Chaining -------------------

console.log('');
console.log('---------------- Optional Chaining -------------------');

function getUserData(data: string) {
  if (data === 'a') {
    return {
      id: 'u001',
      name: 'Rudhra',
      age: 30
    };
  } else if (data === 'b') {
    return {
      id: 'u001',
      name: 'Rudhra',
      age: 30,
      job: {
        jobType: 'Developer'
      }
    };
  }
}
let fetchedUserData = getUserData('a');
//below is syntax for optional chaining
//it return undefined rather than giving a runtime exception
//as fetchedUserData doesnt have a job property
console.log(fetchedUserData?.job?.jobType);

fetchedUserData = getUserData('b');
//below is syntax for optional chaining
//this works fine as fetchedUserData now has job and job has job type
console.log(fetchedUserData?.job?.jobType);

//---------------- Optional Chaining Ends-------------------

//---------------- Nullish Coalescing -------------------

console.log('');
console.log('---------------- Nullish Coalescing -------------------');

const userInput6 = document.getElementById('Non-existingtId');
//since userInput6 is null it will default to Default
const UserInput7 = userInput6 ?? 'Default val';

console.log(UserInput7);
function processAndReturn(abc: string) {
  if (abc === 'hi') {
    return abc;
  } else if (abc === 'bye') {
    return '';
  } else {
    let xyz = undefined;
    return xyz;
  }
}
// function returns hi test contains hi
let test = processAndReturn('hi') || 'DefaultVal1';
console.log(test);
// function returns '' test contains DefaultVal2
test = processAndReturn('bye') || 'DefaultVal2';
console.log(test);
// function returns undefined test contains DefaultVal3
test = processAndReturn('tata') || 'DefaultVal3';
console.log(test);
// function returns hi test contains hi
test = processAndReturn('hi') ?? 'DefaultVal4';
console.log(test);
// function returns '' test contains ''
test = processAndReturn('bye') ?? 'DefaultVal5';
console.log(test);
// function returns '' test contains undefined
test = processAndReturn('tata') ?? 'DefaultVal6';
console.log(test);
