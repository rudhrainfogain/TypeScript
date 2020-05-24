const button = document.querySelector("button");
const input1 = document.getElementById("num1");
const input2 = document.getElementById("num2");

function add(num1, num2) {
    if (num1 === typeof number && num2 === typeof number) {
        //we can check the  type here before processing
        return num1 + num2;
    } else {
        //if the two parameters are not numbers we can first convert them to numbers and then add them
        return +num1 + +num2;
    }
    //Although above implementation might help to solve our problem
    //Actually we may want this function to just act on numbers
    //This should actually not support passing anything but numbers.
    //This is where TS comes to rescue
}

button.addEventListener("click", function() {
    console.log(add(input1.value, input2.value));
    //whenever we fetch values in js using.value it always returns a string no matter what the type is
});