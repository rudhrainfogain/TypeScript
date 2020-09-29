"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
console.log('when you have to shoot you shoot you dont talk');
console.log('');
console.log('---------------- Decorators --------------------');
console.log('');
//Simple Decorator to log the constructor function
//it takes in a function as an argument which is the constructor  function in our case
function Logger(constructor) {
    console.log('Logging ');
    //log the constructor details
    console.log(constructor);
}
// Use the simple decorator at class level
//this only points to the function doesnt execute it
let Person = class Person {
    constructor() {
        this.name = 'Rudhra';
        console.log('Creating a person ');
    }
};
Person = __decorate([
    Logger
], Person);
const person = new Person();
console.log(person);
console.log('');
console.log('---------------- Decorator Factory --------------------');
console.log('');
//Decorator Factories
//decorator using decorator factory
//Outer function which is used as a factory
function LoggerFactory(logString) {
    console.log('Creating Logger');
    //inner function that is the real decorator
    return function (constructor) {
        //arguments from outer factory used in decorator function
        console.log(logString);
        console.log(constructor);
    };
}
//Using Decorator returned from a decorator factory
//This executes the LoggerFactory function and the function returned from it is the real decorator
let Human = class Human {
    constructor() {
        this.name = 'Rudhra';
        console.log('Creating a Human ');
    }
};
Human = __decorate([
    LoggerFactory('Logging - Human')
], Human);
const human = new Human();
console.log(human);
//More useful decorator example
console.log('');
console.log('----------------Multiple Decorators with execution order --------------------');
console.log('');
function withTemplate(template, hookId) {
    return function (constructor) {
        console.log('template rendering');
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1').textContent = p.name;
        }
    };
}
let HumanBeing = class HumanBeing {
    constructor() {
        this.name = 'Rudhra';
        console.log('Creating a HumanBeing ');
    }
};
HumanBeing = __decorate([
    LoggerFactory('Logging - HumanBeing'),
    withTemplate('<h1> My Human Being</h1>', 'app')
], HumanBeing);
const humanBeing = new HumanBeing();
console.log(human);
console.log('');
console.log('---------------- Property Decorators --------------------');
console.log('');
function PropertyDecorator(target, propertyName) {
    console.log('Property Decorator');
    console.log(target, propertyName);
}
class Product {
    constructor(title, _price) {
        this.title = title;
        this._price = _price;
    }
    set price(val) {
        if (val > 0) {
            this.price = val;
        }
        else {
            throw new Error('Invalid price -should be greater than 0');
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    PropertyDecorator
], Product.prototype, "title", void 0);
console.log('');
console.log('---------------- Accessor Decorators --------------------');
console.log('');
function AccessorDecorator(target, name, descriptor) {
    console.log('Accessor Decorator ');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
class Item {
    constructor(title, _price) {
        this.title = title;
        this._price = _price;
    }
    set price(val) {
        if (val > 0) {
            this.price = val;
        }
        else {
            throw new Error('Invalid price -should be greater than 0');
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    AccessorDecorator
], Item.prototype, "price", null);
console.log('');
console.log('---------------- Method Decorators --------------------');
console.log('');
function MethodDecorator(target, name, descriptor) {
    console.log('Method Decorator ');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
class Commodity {
    constructor(title, _price) {
        this.title = title;
        this._price = _price;
    }
    set price(val) {
        if (val > 0) {
            this.price = val;
        }
        else {
            throw new Error('Invalid price -should be greater than 0');
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    MethodDecorator
], Commodity.prototype, "getPriceWithTax", null);
console.log('');
console.log('---------------- Parameter Decorators --------------------');
console.log('');
function ParameterDecorator(target, name, position) {
    console.log('Parameter Decorator ');
    console.log(target);
    console.log(name);
    console.log(position);
}
class Goods {
    constructor(title, _price) {
        this.title = title;
        this._price = _price;
    }
    set price(val) {
        if (val > 0) {
            this.price = val;
        }
        else {
            throw new Error('Invalid price -should be greater than 0');
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    __param(0, ParameterDecorator)
], Goods.prototype, "getPriceWithTax", null);
console.log('');
console.log('----------------  Decorators with returns--------------------');
console.log('');
function withTemplateReturn(template, hookId) {
    //This decorator function uses generics to specify that the constructor function
    //assed as an argument will be of Type T
    //where T is defined as an Object whose instance can be created with new Keyword
    //it accepts any no of arguments in new call
    //and returns an object that has a name property
    return function (originalConstructor) {
        //return a new constructor function or class that
        //that extends the original constructor to preserve the existing properties
        return class extends originalConstructor {
            //The class being returned has a constructor
            //which takes in any no of arguments
            //the name for arguments is given as _
            //to let ts know that we are expecting arguments but we are
            //not using it here so dont give unuded error
            constructor(..._) {
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
                    hookEl.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
}
//The below decorator will modify the constructor function when class is loaded
let HomoSapien = class HomoSapien {
    constructor() {
        this.name = 'RudhraKoul';
        console.log('Creating a HomoSapien ');
    }
};
HomoSapien = __decorate([
    withTemplateReturn('<h1> My Human Being</h1>', 'app1')
], HomoSapien);
//The new constructor function is called only once the class is instantiated
//so if we comment below lines we will see no output on the console
const homoSapien = new HomoSapien();
console.log(homoSapien);
console.log('');
console.log('----------------  Example Creating an AutoBind Decorator--------------------');
console.log('');
function Autobind(
//the taget will be prototype of method since we are using it on instance methods
//but since we dont need the target we will use an _ in the name
//to tell ts that we will get this but wont use it
_target, _name, descriptor) {
    //The value property in PropertyDescriptor points to the method itself
    //so we can use the value property to get a reference to the method
    const originalMethod = descriptor.value;
    //Lets create a new custom Property descriptor
    const customDescriptor = {
        configurable: true,
        enumerable: false,
        //Lets add a getter
        //A getter acts as a property that holds the function
        //Inside this getter we can run some logic before the actual value is returned
        //the value in this case will be the function itself
        //so we dont add a value property instead add a getter
        get() {
            //this here refercs to whatever is responsible to trigger this get method
            // This will not be overridden by event listener as getter is kind of an extra layer in between
            //Therefore this will refer to the object in which method was defined
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    };
    //since we are returning a new descriptor ts will replace the method descriptor thus overriding its configuration
    return customDescriptor;
}
class Printer {
    constructor() {
        this.message = 'This works bro';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector('button');
//In a normal scenario ie without autobind decorator
//The this keyword inside the showMessage method refers to the target of the event
//ie the button not p so it will show undefined
//but since we have the autobind decorator that calls the bind method and sets correct this reference it will work
button.addEventListener('click', p.showMessage);
console.log('');
console.log('----------------  Example Validation with Decorator--------------------');
console.log('');
const registeredValidators = {};
function Required(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['required'] });
}
function PositiveNumber(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['positive'] });
}
function validate(obj) {
    const ObjValidatorConfig = registeredValidators[obj.constructor.name];
    if (!ObjValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in ObjValidatorConfig) {
        for (const validator of ObjValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
class course {
    constructor(t, pr) {
        this.title = t;
        this.price = pr;
    }
}
__decorate([
    Required
], course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new course(title, price);
    if (!validate(createdCourse)) {
        alert('Invalid input,please try again');
        return;
    }
    console.log(createdCourse);
});
//# sourceMappingURL=app.js.map