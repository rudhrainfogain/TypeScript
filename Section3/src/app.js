"use strict";
//remove exclimation mark for demo
var button1 = document.querySelector("button");
//ts would give an error here that button might be null to solve it temporarily
//we add an ! in above line to tell ts that a button will exist
button1.addEventListener("click", function () {
    console.log("clicked!!!");
});
//but how does ts know that document will exist and it has a method querySelector()
//we can argue that vanilla js knows this
//but we can write nodejs code in ts and document doesnt exist there
//ts knows about it by the lib option in tsconfig
//it is commented by default
//lets uncomment it and leave it blank we will notice ts no longer knows a lot of stuff now like document
//# sourceMappingURL=app.js.map