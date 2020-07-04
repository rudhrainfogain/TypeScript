console.log('Shoot to kill');
//----------------------Generics and Built in Generic types------------------------------
console.log();
console.log(
  '----------------------Generics and Built in Generic types------------------------------'
);
//array of stringsdeclared with generics
//now we can with surety use string functions on the array elements
const names: Array<string> = [];

const names1: string[] = [];

//this returns a promise that resolves to Promise<unknown> by default
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 2000);
});
//promise that does not give any specific type info
const promise: Promise<any> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 2000);
});

//Below line will give an error as data will be resolved to a number at runtime and we cant calll split on it
// promise.then(data=>{
//     data.split('');
// });

const promise1: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Done');
  }, 2000);
});

//below code would be fine as now ts has been provided additional info that the promise will resolve to a string
promise1.then(data => {
  console.log(data.split(''));
});

//----------------------Built in Generic types Ends------------------------------

//----------------------Custom Generics functions------------------------------
console.log();
console.log(
  '----------------------Custom Generics functions------------------------------'
);
//the following function takes two objects as an argument and combines them to a new Object
//the return Type here is also object
function mergeWithoutGenerics(objectA: object, objectB: object) {
  //assign is a static method of Object class that combines two objects and returns a new Object
  return Object.assign(objectA, objectB);
}

const mergedObject = mergeWithoutGenerics({ name: 'Rudhra' }, { age: 30 });
console.log(mergedObject);
//Below line will give an error as ts is not sure if age exists on mergedObject
//as the method mergeWithoutGenerics only says that it returns an object
//console.log(mergedObject.age);

//below method takes in two arguments of type T and U which are resolved when called
function mergeWithGenerics<T, U>(objectA: T, objectB: U) {
  //assign is a static method of Object class that combines two objects
  //and returns a new Object of the type intersection of T and U(T&U)
  return Object.assign(objectA, objectB);
}

const mergedObject1 = mergeWithGenerics({ name: 'Rudhra' }, { age: 30 });
console.log(mergedObject1);
//now ts is sure that age is a property as mergeWithGenerics returns T&U where
//T is an object with name property and U is an Object with age property
console.log(mergedObject1.age);

const mergedObject2 = mergeWithGenerics(
  { name: 'Rudhra', hobbies: ['Coding', 'party'] },
  { age: 30 }
);
console.log(mergedObject2);
//now ts is sure that age is a property as mergeWithGenerics returns T&U where
//T is an object with name and hobbies property and U is an Object with age property
console.log(mergedObject2.hobbies);

//----------------------End Custom Generics functions------------------------------

//----------------------Working with constraints------------------------------
console.log();
console.log('-----------------Working with constraints-------------------');

//below method takes in two arguments of type T and U which are resolved when called
function mergeWithGenericsAndConstraints<T extends object, U extends object>(
  objectA: T,
  objectB: U
) {
  //assign is a static method of Object class that combines two objects
  //and returns a new Object of the type intersection of T and U(T&U)
  return Object.assign(objectA, objectB);
}

const mergedObject3 = mergeWithGenerics({ name: 'Rudhra' }, 30);
// we will notice that since there are no type constraints on the method mergeWithGenerics
//we can pass 30 a number to type argument U
//But Object.assign cant add it to an Object as it violates json format
//so only name will be added
console.log(mergedObject3);

//below line will give an error as 30 is not an object
//const mergedObject4 = mergeWithGenericsAndConstraints({ name: 'Rudhra' }, 30 );

//now both arguments are objects constrainbts are satisfied so code will work fine
const mergedObject5 = mergeWithGenericsAndConstraints(
  { name: 'Rudhra' },
  { age: 30 }
);
console.log(mergedObject5);

//----------------------End Working with constraints------------------------------

//----------------------The "keyof" Constraint------------------------------
console.log();
console.log('-----------------The "keyof" Constraint-------------------');

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return 'value : ' + obj[key];
}

//below line will give an error as it replaces T iwth an object with a single key name
//it replaces U with age but age violates the keyof constraint as T doesnt
//contain a key age
//extractAndConvert({name:'rudhra'},age);

//Now u is replaced with name which is a keyof T
console.log(extractAndConvert({ name: 'rudhra' }, 'name'));

//----------------------End The "keyof" Constraint-----------------------------

//----------------------Generic Classes------------------------------
console.log();
console.log('-----------------Generic Classes-------------------');
//generic class that can work with numbers | strings | boolean
class DataStorage<T extends number | string | boolean> {
  //generic type used with variable
  data: T[] = [];

  //method that uses generic type as parameter
  addItem(element: T) {
    this.data.push(element);
  }

  removeItem(element: T) {
    this.data.splice(this.data.indexOf(element), 1);
  }

  getItems() {
    return [...this.data];
  }
  //method that defines new types
  extractAndConvert<U extends object, V extends keyof U>(obj: U, key: V) {
    return 'value : ' + obj[key];
  }
}

const numStorage = new DataStorage<number>();
numStorage.addItem(10);
numStorage.addItem(22);
numStorage.addItem(33);
console.log(numStorage.getItems());
numStorage.removeItem(22);

console.log(numStorage.getItems());
console.log(numStorage.extractAndConvert({ name: 'rudhra' }, 'name'));
//below line gives an error as num storage only works with numbers not strings as we defined its type to be number
//numStorage.addItem('Rudhra');
