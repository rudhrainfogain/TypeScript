const button = document.querySelector("button");
const input1 = document.getElementById("num1");
const input2 = document.getElementById("num2");

function add(num1, num2) {
    //This method was logically designed to add numbers 
    //but if strings are passed it concatinates them
    // this is syntactically valid but can result in logically unwanted behaviour
    return num1 + num2;
}

button.addEventListener("click", function() {
    console.log(add(input1.value, input2.value));
    //whenever we fetch values in js using.value it always returns a string no matter what the type is
});