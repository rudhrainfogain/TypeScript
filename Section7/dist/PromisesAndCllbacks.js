'use strict';
const button = document.querySelector('button');

function trackUserLocation() {
    //these lines will run after  console.log('getting user location'); as they are offloaded to browser to run
    navigator.geolocation.getCurrentPosition(
        // success callback
        posData => {
            //we can have a callback insde a callback this will be run only after we get posData
            setTimeout(() => {
                console.log(posData);
            }, 2000);
        },
        //error callback
        error => {
            console.log(error);
        }
    );
    //This will run after  console.log('getting user location'); as it will be routed through event loop
    setTimeout(() => {
        console.log('hiiiiii');
        //0 here is the minimun time after which the code runs notguaranteed time browser will run it only once call stack is empty
    }, 0);
    // This line will always print first as it runs directly
    console.log('getting user location');
}

button.addEventListener('click', trackUserLocation);

//Promises
//Older functionalities like setTimeout and getCurrentPosition dont have promises they still work on callback syntax
//Although such functions can be wrapped into a promise supported code
//this will also help us to understand how a promise works internally
//creating anew promise based timer function
const setTimer = duration => {
    //create a new promise using the constructor function and new keyword
    //The constructor takes in a function with two arguments resolve and reject which are also functions
    //the function that we pass to a promise gets executed immmediately
    const promise = new Promise((resolve, reject) => {
        //we call the setTimeout function which will start a timer for duration seconds
        //and execute the resolve function as soon as the duration is complete
        setTimeout(() => {
            //passing resolve function as a callback to set timeout
            resolve('Done!!');
        }, duration);
    });
    //return the created function
    return promise;
};
const button2 = document.querySelector('button.button2');

function trackUserLocationAgainWithPromises() {
    //these lines will run after  console.log('getting user location'); as they are offloaded to browser to run
    navigator.geolocation.getCurrentPosition(
        // success callback
        posData => {
            //we can have a callback insde a callback this will be run only after we get posData
            //we call the setTimer method passing in the duration and it returns a promise
            //we call the then method on the promise which is called once the promise resolves
            //i.e when the resolve method is called which happens when the timer is done
            //we also get any data that has been resolved as a parameter is in this case the string 'Done'
            setTimer(2000).then(data => {
                console.log(data, posData);
            });
        },
        //error callback
        error => {
            console.log(error);
        }
    );
    //This will run after  console.log('getting user location'); as it will be routed through event loop
    setTimeout(() => {
        console.log('hiiiiii');
        //0 here is the minimun time after which the code runs notguaranteed time browser will run it only once call stack is empty
    }, 0);
    // This line will always print first as it runs directly
    console.log('getting user location');
}

button2.addEventListener('click', trackUserLocationAgainWithPromises);

//what we did above is called promisifying a built in api
//we promisified the setTimeout api

//lets promisify getCurrentPosition

const getPosition = options => {
    //create a new promise
    const promise = new Promise((resolve, reject) => {
        //call the navigator function to get position data
        navigator.geolocation.getCurrentPosition(
            success => {
                //pass the position data to resolve it
                resolve(success);
            },
            //error callback
            error => {
                //this marks the promise as failed
                reject(error);
            },
            options
        );
    });
    return promise;
};

const button3 = document.querySelector('button.button3');

function trackUserLocationAgainWithPromisesChaining() {
    let positionData;
    getPosition()
        .then(
            posData => {
                //save the position data to a variable to be accessed outside also
                positionData = posData;
                //the promise here was resolved as we got the positiondata
                console.log('Completed');
                //but now since we return a new promise it is again set to pending state
                //below line creates a new promise and returns this
                //we can also return any other data like string
                //in that case compiler automatically wraps that in a promise and returns it
                //below will be returned after the set timer promise is resolved
                return setTimer(2000);
            },
            err => {
                console.log('error occured', err);
            }
        )
        .then(data => {
            //this data is returned from the above set timer promise
            console.log(data, positionData);
        });
    //This will run after  console.log('getting user location'); as it will be routed through event loop
    setTimer(2000).then(() => {
        console.log('Timer Done');
    });
    // This line will always print first as it runs directly
    console.log('getting user location');
}

//above concept is called promise chaining
button3.addEventListener('click', trackUserLocationAgainWithPromisesChaining);

//promise with a catch in between

const button4 = document.querySelector('button.button4');

function trackUserLocationAgainWithPromisesChainingAndCatchInBetween() {
    let positionData;
    getPosition()
        .then(posData => {
            //save the position data to a variable to be accessed outside also
            positionData = posData;
            //the promise here was resolved as we got the positiondata
            console.log('Completed');
            //but now since we return a new promise it is again set to pending state
            //below line creates a new promise and returns this
            //we can also return any other data like string
            //in that case compiler automatically wraps that in a promise and returns it
            //below will be returned after the set timer promise is resolved
            return setTimer(2000);
        })
        //add a catch block now if location is denied
        //we set a default location and data to be passed on
        //any errors befor this will be caught and rest of promise chain will run as-is
        .catch(error => {
            console.log(error);
            positionData = 'DefaultPosition';
            return 'on we go errors cant stop us';
        })
        .then(data => {
            //this data is returned from the above set timer promise
            console.log(data, positionData);
        });
    //This will run after  console.log('getting user location'); as it will be routed through event loop
    setTimer(2000).then(() => {
        console.log('Timer Done');
    });
    // This line will always print first as it runs directly
    console.log('getting user location');
}

//above concept is called promise chaining
button4.addEventListener(
    'click',
    trackUserLocationAgainWithPromisesChainingAndCatchInBetween
);

//promise with a catch at end

const button5 = document.querySelector('button.button5');

function trackUserLocationAgainWithPromisesChainingAndCatchAtTheEnd() {
    let positionData;
    getPosition()
        .then(posData => {
            //save the position data to a variable to be accessed outside also
            positionData = posData;
            //the promise here was resolved as we got the positiondata
            console.log('Completed');
            //but now since we return a new promise it is again set to pending state
            //below line creates a new promise and returns this
            //we can also return any other data like string
            //in that case compiler automatically wraps that in a promise and returns it
            //below will be returned after the set timer promise is resolved
            return setTimer(2000);
        })
        .then(data => {
            //this data is returned from the above set timer promise
            console.log(data, positionData);
        }) //add a catch block now if location is denied
        //any errors befor this will be caught and the whole chain will be skipped
        .catch(error => {
            console.log('error bro error', error);
        });
    //This will run after  console.log('getting user location'); as it will be routed through event loop
    setTimer(2000).then(() => {
        console.log('Timer Done');
    });
    // This line will always print first as it runs directly
    console.log('getting user location');
}

//above concept is called promise chaining
button5.addEventListener(
    'click',
    trackUserLocationAgainWithPromisesChainingAndCatchAtTheEnd
);

//async await

const button6 = document.querySelector('button.button6');

//async keyword forces the method to return a promise
async function trackUserLocationAgainWithAsyncAndAwait() {
    //save data returned from getPosition to a variable
    //await keyword forces to wait till the promise resolves or rejects
    const posData = await getPosition();
    //below line will run only after above line resolves or rejects
    const timerData = await setTimer(2000);
    //below line will run only after above line resolves or rejects
    console.log(timerData, posData);
}

button6.addEventListener('click', trackUserLocationAgainWithAsyncAndAwait);

//async await with error handling

const button7 = document.querySelector('button.button7');

//async keyword forces the method to return a promise
async function trackUserLocationAgainWithAsyncAndAwaitErrorHandling() {
    let posData;
    let timerData;
    try {
        //save data returned from getPosition to a variable
        //await keyword forces to wait till the promise resolves or rejects
        posData = await getPosition();
        //below line will run only after above line resolves or rejects
        timerData = await setTimer(2000);
    } catch (error) {
        console.log(error);
        posData = 'DefaultPosition';
        timerData = 'ManuallycompletedTimer';
    }
    //below line will run only after above line resolves or rejects
    console.log(timerData, posData);
}

//above concept is called promise chaining
button7.addEventListener(
    'click',
    trackUserLocationAgainWithAsyncAndAwaitErrorHandling
);

//race
const button8 = document.querySelector('button.button8');

//async keyword forces the method to return a promise
function trackUserLocationWithPromiseRace() {
    Promise.race([getPosition(), setTimer(2000)]).then(data => {
        console.log('data is ', data);
    });
}

button8.addEventListener('click', trackUserLocationWithPromiseRace);

//Promise.all()
const button9 = document.querySelector('button.button9');

//async keyword forces the method to return a promise
function trackUserLocationWithPromiseAll() {
    Promise.all([getPosition(), setTimer(2000)]).then(data => {
        console.log('data is ', data);
    });
}

button9.addEventListener('click', trackUserLocationWithPromiseAll);

//Promise.allSettled()
const button10 = document.querySelector('button.button10');

//async keyword forces the method to return a promise
function trackUserLocationWithPromiseAllSettled() {
    Promise.allSettled([getPosition(), setTimer(2000)]).then(data => {
        console.log('data is ', data);
    });
}

button10.addEventListener('click', trackUserLocationWithPromiseAllSettled);