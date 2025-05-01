// Number

let balance = 120;
let anotherBalance = new Number(120);
// console.log(anotherBalance);
// console.log(anotherBalance.valueOf());
// console.log(balance);
// console.log(typeof balance);
// console.log(typeof anotherBalance);

//boolean

let isActive = true;
let isReallyActive = new Boolean(true); //not recommended
// console.log(typeof isActive);
// console.log(typeof isReallyActive);
// console.log(isActive);
// console.log(isReallyActive);
// console.log(isReallyActive.valueOf());

// null and undefined

let firstname = null;
let lastname = undefined;
// console.log(firstname);
// console.log(lastname);

// string

let myString = "hello";
let myStringOne = "How are you ?";
let username = "ansh";

let oldGreet = myString + "ansh";
// console.log(oldGreet);

let greetMessage = `hello ${username} !`;
let demoOne = `value is ${2 * 2}`;
// console.log(demoOne);
// console.log(greetMessage);

// symbol

let sm1 = Symbol("ansh");
let sm2 = Symbol("ansh");
console.log(sm1 == sm2);
console.log(sm1);
