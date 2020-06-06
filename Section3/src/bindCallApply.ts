//car is a simple object
let car = {
  registrationNumber: "GA12345",
  brand: "Toyota",

  displayDetails: function () {
    console.log("this refers to ", this);
    console.log(this.registrationNumber + " " + this.brand);
  },
  displayDetails1: function (owner: string, color: string) {
    console.log("this refers to ", this);
    console.log(
      this.registrationNumber +
        " " +
        this.brand +
        " is owned by " +
        owner +
        "and is " +
        color +
        " in color"
    );
  },
  returnDetails: function (owner: string, color: string): string {
    console.log("this refers to ", this);
    return (
      this.registrationNumber +
      " " +
      this.brand +
      " is owned by " +
      owner +
      "and is " +
      color +
      " in color"
    );
  },
};
//this code works fine as the method is called on car object
//so this reference inside the displayDetails refers to car
//and car has a registrationNumber and brand property
//which is refered to inside the function using this keyword
car.displayDetails();

//ts/js has a feature that we can borrow methods from another object lets use that

let myCarDetails = car.displayDetails;
console.log("-------------call before using bind------------------");
console.log(myCarDetails);
//below code will give an error because
//since the method is called on myCarDetails
//my car details is now a function defined in global scope and
//since strict usage is true this refers to undefined
// even if strict was false this would refer to window and the properties
//registrationNumber and brand would not be found

//myCarDetails();

//Now to solve above issues we  can use ECMAScript 5 bind() method of
//the Function.prototype property.
//This means bind() can be used by every single function.
myCarDetails = car.displayDetails.bind(car);
//the argument that bind takes is the object which should be used in place of this
//It returns a copy of the function with this keyword bound to the argument passed
//This way the bind() method enables calling a function with a specified “this” value.
console.log("-------------call after using bind------------------");
console.log(myCarDetails);
console.log("return type of myCarDetails is " + typeof myCarDetails);
myCarDetails();
console.log("");
//What if we would like to pass a parameter(s) to the displayDetails function?
//We can use the bind method again by passing multiple arguments
//the first argument will be used as this reference
//the subsequent arguments will be used as method arguments in order
myCarDetails = car.displayDetails1.bind(car, "rudhra", "black");
console.log(
  "-------------call after using bind with parameters------------------"
);
console.log(myCarDetails);
console.log("return type of myCarDetails is " + typeof myCarDetails);
myCarDetails();
console.log("");

//es3 apply method can also be used to achieve the same result
//the apply method gets called immediately
//the apply method does not create a new function
//it uses the existing one just changes the this reference
let bike = { registrationNumber: "DL2SP9193", brand: "Bajaj" };
console.log("-------------call after using apply------------------");
console.log(
  "return type using apply is " + typeof car.displayDetails.apply(bike)
);
car.displayDetails.apply(bike);
console.log("");
console.log(
  "-------------call after using apply with parameters no return type------------------"
);
//the parameters are passed as an array
console.log(
  "return type using apply is " +
    typeof car.displayDetails1.apply(bike, ["Rudhra", "kaala re"])
);
car.displayDetails1.apply(bike, ["Rudhra", "kaala re"]);

console.log(
  "-------------call after using apply with parameters and return type------------------"
);
//the parameters are passed as an array
// the return type depend upon what actually is returned from the method being called
let details = car.returnDetails.apply(bike, ["Rudhra", "kaala re"]);
console.log("return type using apply is " + typeof details);
console.log(details);
console.log("");
//es3 call method can also be used to achieve the same result
//the call method gets called immediately
//the call method does not create a new function
//it uses the existing one just changes the this reference
console.log("-------------call after using call------------------");
console.log(
  "return type using call is " + typeof car.displayDetails.call(bike)
);
car.displayDetails.call(bike);

console.log(
  "-------------call after using call with parameters no return type------------------"
);
//the parameters are passed normally the first parameter is used for this reference
// the only difference between call and apply is the way parameters are passed
console.log(
  "return type using apply is " +
    typeof car.displayDetails1.call(bike, "Rudhra", "kaala re")
);
car.displayDetails1.call(bike, "Rudhra", "kaala re");

console.log(
  "-------------call after using call with parameters and return type------------------"
);

// the return type depend upon what actually is returned from the method being called
details = car.returnDetails.call(bike, "Rudhra", "kaala re");
console.log("return type using call is " + typeof details);
console.log(details);
