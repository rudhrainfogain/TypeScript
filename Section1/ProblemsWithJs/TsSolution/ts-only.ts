const button = document.querySelector("button")!;
//Using ! we tell TS that we are sure id num1 exists and will not return a null
const input1 = document.getElementById("num1")! as HTMLInputElement;
//using as HTMLInputElement is a typecasting syntax to cast the input to an HTMLInputElement
const input2 = document.getElementById("num2")! as HTMLInputElement;

function add(num1: Number, num2: Number) {
  //Ts automatically checks the types so no need of explicit checking
  return +num1 + +num2;
}

button.addEventListener("click", function () {
  console.log(add(+input1.value, +input2.value));
  //whenever we fetch values in js using.value it always returns a string no matter what the type is
});
