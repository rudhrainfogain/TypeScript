"use strict";
var button = document.querySelector("button");
//Using ! we tell TS that we are sure id num1 exists and will not return a null
var input1 = document.getElementById("num1");
//using as HTMLInputElement is a typecasting syntax to cast the input to an HTMLInputElement
var input2 = document.getElementById("num2");
function add(num1, num2) {
    //Ts automatically checks the types so no need of explicit checking
    return +num1 + +num2;
}
button.addEventListener("click", function () {
    console.log(add(+input1.value, +input2.value));
    //whenever we fetch values in js using.value it always returns a string no matter what the type is
});
