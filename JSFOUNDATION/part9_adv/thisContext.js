const Person = {
  name: "ansh",
  greet() {
    console.log(`Hii, I am ${this.name}`);
  },
};

Person.greet();

// context is lost when transferring from one function to another function
const greetFunction = Person.greet;
greetFunction();

// binding of the context
const boundGreet = Person.greet.bind({ name: "john" });
boundGreet();

const Greet = Person.greet.bind(Person);
Greet();

// bind,call and apply
