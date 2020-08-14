console.log('when you have to shoot you shoot you dont talk');
console.log('');
console.log('---------------- Decorators --------------------');
console.log('');
//Simple Decorator to log the constructor function
//it takes in a function as an argument which is the constructor  function in our case
function Logger(constructor: Function) {
  console.log('Logging ');
  //log the constructor details
  console.log(constructor);
}

// Use the simple decorator at class level
//this only points to the function doesnt execute it

@Logger
class Person {
  name = 'Rudhra';
  constructor() {
    console.log('Creating a person ');
  }
}

const person = new Person();
console.log(person);

console.log('');
console.log('---------------- Decorator Factory --------------------');
console.log('');
//Decorator Factories
//decorator using decorator factory
//Outer function which is used as a factory
function LoggerFactory(logString: string) {
  console.log('Creating Logger');
  //inner function that is the real decorator
  return function (constructor: Function) {
    //arguments from outer factory used in decorator function
    console.log(logString);
    console.log(constructor);
  };
}

//Using Decorator returned from a decorator factory
//This executes the LoggerFactory function and the function returned from it is the real decorator
@LoggerFactory('Logging - Human')
class Human {
  name = 'Rudhra';
  constructor() {
    console.log('Creating a Human ');
  }
}

const human = new Human();
console.log(human);

//More useful decorator example
console.log('');
console.log(
  '----------------Multiple Decorators with execution order --------------------'
);
console.log('');
function withTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    console.log('template rendering');
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  };
}

@LoggerFactory('Logging - HumanBeing')
@withTemplate('<h1> My Human Being</h1>', 'app')
class HumanBeing {
  name = 'Rudhra';
  constructor() {
    console.log('Creating a HumanBeing ');
  }
}

const humanBeing = new HumanBeing();
console.log(human);

console.log('');
console.log('---------------- Property Decorators --------------------');
console.log('');

function PropertyDecorator(target: any, propertyName: string | Symbol) {
  console.log('Property Decorator');
  console.log(target, propertyName);
}

class Product {
  @PropertyDecorator
  title: string;
  private _price: number;
  set price(val: number) {
    if (val > 0) {
      this.price = val;
    } else {
      throw new Error('Invalid price -should be greater than 0');
    }
  }
  constructor(title: string, _price: number) {
    this.title = title;
    this._price = _price;
  }

  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}

console.log('');
console.log('---------------- Accessor Decorators --------------------');
console.log('');

function AccessorDecorator(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  console.log('Accessor Decorator ');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

class Item {
  title: string;
  private _price: number;
  @AccessorDecorator
  set price(val: number) {
    if (val > 0) {
      this.price = val;
    } else {
      throw new Error('Invalid price -should be greater than 0');
    }
  }
  constructor(title: string, _price: number) {
    this.title = title;
    this._price = _price;
  }

  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}

console.log('');
console.log('---------------- Method Decorators --------------------');
console.log('');

function MethodDecorator(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method Decorator ');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

class Commodity {
  title: string;
  private _price: number;
  set price(val: number) {
    if (val > 0) {
      this.price = val;
    } else {
      throw new Error('Invalid price -should be greater than 0');
    }
  }
  constructor(title: string, _price: number) {
    this.title = title;
    this._price = _price;
  }

  @MethodDecorator
  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}

console.log('');
console.log('---------------- Parameter Decorators --------------------');
console.log('');

function ParameterDecorator(
  target: any,
  name: string | Symbol,
  position: number
) {
  console.log('Parameter Decorator ');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Goods {
  title: string;
  private _price: number;
  set price(val: number) {
    if (val > 0) {
      this.price = val;
    } else {
      throw new Error('Invalid price -should be greater than 0');
    }
  }
  constructor(title: string, _price: number) {
    this.title = title;
    this._price = _price;
  }

  getPriceWithTax(@ParameterDecorator tax: number) {
    return this._price * (1 + tax);
  }
}

console.log('');
console.log('----------------  Decorators with returns--------------------');
console.log('');

function withTemplateReturn(template: string, hookId: string) {
  //This decorator function uses generics to specify that the constructor function
  //assed as an argument will be of Type T
  //where T is defined as an Object whose instance can be created with new Keyword
  //it accepts any no of arguments in new call
  //and returns an object that has a name property
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    //return a new constructor function or class that
    //that extends the original constructor to preserve the existing properties

    return class extends originalConstructor {
      //The class being returned has a constructor
      //which takes in any no of arguments
      //the name for arguments is given as _
      //to let ts know that we are expecting arguments but we are
      //not using it here so dont give unuded error

      constructor(..._: any[]) {
        //call super because of inheritance
        super();
        console.log('template with return  rendering');
        //get element with id =hookId
        const hookEl = document.getElementById(hookId);
        //if such an elemt exists
        if (hookEl) {
          //set its innerHtml to the template passed from decorator usage
          hookEl.innerHTML = template;
          //find an 1 tag on the hookElement and change its text content to the value of name variable
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}
//The below decorator will modify the constructor function when class is loaded
@withTemplateReturn('<h1> My Human Being</h1>', 'app1')
class HomoSapien {
  name = 'RudhraKoul';
  constructor() {
    console.log('Creating a HomoSapien ');
  }
}

//The new constructor function is called only once the class is instantiated
//so if we comment below lines we will see no output on the console
const homoSapien = new HomoSapien();
console.log(homoSapien);
