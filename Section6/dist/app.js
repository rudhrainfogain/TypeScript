"use strict";
var _a, _b, _c, _d, _e;
console.log('Wanakam anna');
//----------------Intersection Types -------------------
console.log('');
console.log('----------------Intersection Types -------------------');
const adminEmp = {
    name: 'Rudhra',
    age: 30,
    previledges: ['system']
};
console.log(adminEmp);
//intersection of Combinable ans numeric is number
const uni = 22;
let adminEmp1 = {
    name: 'Rudhra',
    age: 30,
    previledges: ['system']
};
console.log(adminEmp1);
let s = () => {
    throw new Error('');
};
let p;
try {
    p = { c: s(), d: 'ddd', e: 'eeeee' };
}
catch (error) {
    console.log('never returned');
}
let q;
// we got interfaces IAdminInter , INameInter, IAgeInter and all have same property name – x.
// However, type of the property x is different for those interfaces .
let ageOldAdminWithName = {
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
function add(a, b) {
    // type guards with typeOf
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
console.log(add(10, 20));
console.log(add('77', '20'));
function printEmployeeInformation(emp) {
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
    loadCargo(cargo) {
        console.log(`Loading cargo total : ${cargo} Kg's`);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
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
function moveAnimal(animal) {
    let speed;
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
class MockingBird {
    constructor(flyingSpeed) {
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
const userInput1 = document.getElementById('User-Input1');
//Type casting using as Type syntax
//We are explicitly telling ts that it will not be null using !
const userInput2 = document.getElementById('User-Input2');
//Type casting here tells ts that we are sure that the element will not be null
const userInput3 = document.getElementById('User-Input3');
//In below case we are not sure if it is null or not so use an if check
const userInput4 = document.getElementById('User-Input4');
userInput1.value = `What's My Name?`;
userInput2.value = `What's My Name?`;
userInput3.value = 'My Name is ';
if (userInput4) {
    //Type casting at the time of usage
    userInput4.value = 'Sheila!!!';
}
//---------------- Type Casting Ends-------------------
//---------------- Index Properties -------------------
console.log('');
console.log('---------------- Index Properties -------------------');
const errorBag = {
    email: 'Invalid email id entered',
    // this is mandatory
    errorType: 'Syntactical',
    name: 'Must start with a character',
    // can be used as it can be converted to a string
    1: 'Bad syntax Man'
};
const errorBag1 = {
//empty is valid nly if interface contains only index properties
};
const errorBag2 = {
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
function advancedAdd(a, b) {
    let result;
    if (typeof a === 'string') {
        result = a.toString();
        if (b) {
            result = result + b.toString();
        }
    }
    else if (typeof a === 'number') {
        result = a;
        if (b) {
            if (typeof b === 'string') {
                result = result + b.toString();
            }
            else {
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
function getUserData(data) {
    if (data === 'a') {
        return {
            id: 'u001',
            name: 'Rudhra',
            age: 30
        };
    }
    else if (data === 'b') {
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
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.jobType);
fetchedUserData = getUserData('b');
//below is syntax for optional chaining
//this works fine as fetchedUserData now has job and job has job type
console.log((_b = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _b === void 0 ? void 0 : _b.jobType);
//---------------- Optional Chaining Ends-------------------
//---------------- Nullish Coalescing -------------------
console.log('');
console.log('---------------- Nullish Coalescing -------------------');
const userInput6 = document.getElementById('Non-existingtId');
//since userInput6 is null it will default to Default
const UserInput7 = userInput6 !== null && userInput6 !== void 0 ? userInput6 : 'Default val';
console.log(UserInput7);
function processAndReturn(abc) {
    if (abc === 'hi') {
        return abc;
    }
    else if (abc === 'bye') {
        return '';
    }
    else {
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
test = (_c = processAndReturn('hi')) !== null && _c !== void 0 ? _c : 'DefaultVal4';
console.log(test);
// function returns '' test contains ''
test = (_d = processAndReturn('bye')) !== null && _d !== void 0 ? _d : 'DefaultVal5';
console.log(test);
// function returns '' test contains undefined
test = (_e = processAndReturn('tata')) !== null && _e !== void 0 ? _e : 'DefaultVal6';
console.log(test);
//# sourceMappingURL=app.js.map