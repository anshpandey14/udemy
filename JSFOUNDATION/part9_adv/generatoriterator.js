function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
  //   this is the generator eith whole generator function
}

let gen = numberGenerator();
let genTwo = numberGenerator();
console.log(gen);
// console.log(gen());
console.log(numberGenerator());
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);

// here next() is an iterator which keeps track of how many times the generator function is used

console.log(genTwo.next().value);
console.log(genTwo.next().value);
console.log(genTwo.next().value);
console.log(genTwo.next().value);
