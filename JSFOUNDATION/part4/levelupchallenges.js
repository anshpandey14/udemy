// 1. Write a `for` loop that loops through the array `["green tea","black tea","chai","oolong tea"]` and stops the loop when it finds `"chai"`. Store all teas before `"chai"` in a new array named `selectedTeas`.

let arr1 = ["green tea", "black tea", "chai", "oolong tea"];
let selectedTeas = [];
for (let i = 0; i < arr1.length; i++) {
  if (arr1[i] === "chai") {
    break;
  } else {
    selectedTeas.push(arr1[i]);
  }
}
// console.log(selectedTeas);

// 2.Write a `for` loop that loops through the array `["London","New York","Paris","Berlin"]` and skips `"Paris"`. Store the other cities in a new array named `visitedCities`.

let arr = ["London", "New York", "Paris", "Berlin"];
let visitedCities = [];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === "Paris") {
    continue;
  } else {
    visitedCities.push(arr[i]);
  }
}
// console.log(visitedCities);

// 3. Use a `for-of` loop to iterate through the array `[1,2,3,4,5]` and stop when the number `4` is found. Store the numbers before `4` in an array named `smallNumbers`.

let numbers = [1, 2, 3, 4, 5];
let smallNumbers = [];
for (const i of numbers) {
  if (i === 4) {
    break;
  }
  smallNumbers.push(i);
}
// console.log(smallNumbers);

// 4. Use a `for-of` loop to iterate through the array `["chai","green tea","herbal tea","black tea"]` and skip "herbal tea"`. Store the other teas in an array named `preferredTeas`.

let teaTypes = ["chai", "green tea", "herbal tea", "black tea"];
let preferredTeas = [];
for (const i of teaTypes) {
  if (i === "herbal tea") {
    continue;
  }
  preferredTeas.push(i);
}
// console.log(preferredTeas);

/* 5. Use a `for-in` loop to loop through an object containing city populations. Stop the loop when the population of `"Berlin"` is found ans store all previous cities populations in a new object named `cityPopulations`.

let citiesPopulation = {"London":8900000, "New York":8400000, "Paris":2200000, "Berlin":3500000
}
*/

let citiesPopulation = {
  London: 8900000,
  "New York": 8400000,
  Paris: 2200000,
  Berlin: 3500000,
};
let cityNewPopulations = {};

// console.log(Object.keys(citiesPopulation));
// console.log(Object.values(citiesPopulation));

// objects are not sequential like an array

for (const city in citiesPopulation) {
  // console.log(citiesPopulation[city]);
  // key = value
  if (city === "Berlin") {
    break;
  }
  cityNewPopulations[city] = citiesPopulation[city];
}
// console.log(cityNewPopulations);

// 6. Use a `for-in` loop to loop through an object containing city populations. Skip any city with a population below 3 million and store the rest in a new object named `largecities`.

/*
let worldCities = {
    Sydney : 5000000,
    Tokyo : 9000000,
    Berlin : 3500000,
    Paris : 2200000
};
*/

let worldCities = {
  Sydney: 5000000,
  Tokyo: 9000000,
  Berlin: 3500000,
  Paris: 2200000,
};
let largecities = {};
for (const city in worldCities) {
  if (worldCities[city] < 3000000) {
    continue;
  }
  //   if (Object.values(worldCities) < 3000000) {
  //     continue;
  //   }
  largecities[city] = worldCities[city];
}
// console.log(largecities);

// 7. Write a `ForEach` loop that iterates through the array `["earl grey","green tea","chai","oolong tea"]`. Stop the loop when `"chai"` is found, and store all previous tea types in an array named `availableTeas`.

let teatypes = ["earl grey", "green tea", "chai", "oolong tea"];
let availableTeas = [];

// teatypes.forEach((i) => {
//   // if(i === "chai"){
//   //     break;
//   // }
//   console.log(i);
//   availableTeas.push(i);
// });

teatypes.forEach(function (tea) {
  if (tea === "chai") {
    return;
  }
  availableTeas.push(tea);
});
// console.log(availableTeas);

/*function hello(){
    console.log("abc");
} 
() => {
    console.log("abc");
}
*/

// 8. Write a `ForEach` loop that iterates through the array `["Berlin","Tokyo","Sydney","Paris"]. Skip `"Sydney"` and store the other cities in anmew array named `traveledCities`.

let cities = ["Berlin", "Tokyo", "Sydney", "Paris"];
let traveledCities = [];

// cities.forEach(function (city) {
//   if (city === "Sydney") {
//     return;
//   }
//   traveledCities.push(city);
// });

cities.forEach((city) => {
  if (city === "Sydney") {
    return;
  }
  traveledCities.push(city);
});
// console.log(traveledCities);

// 9. Write a `for` loop that iterates through the array `[2,5,7,9]`. Skip the value `7` and multiply the rest by 2. Store the results in a new array named "doubledNumbers"

let num = [2, 5, 7, 9];
let doubledNumbers = [];
for (let l = 0; l < num.length; l++) {
  if (num[l] === 7) {
    continue;
  }
  doubledNumbers.push(num[l] * 2);
}
// console.log(doubledNumbers);

// 10. Use a `for-of` loop to iterate through the array `["chai" , "green tea","black tea","jasmine tea","herbal tea"]` and stop when the length of the current tea name is greater than 10. Store the iterates over in an array named `shortTeas`.

let teakinds = ["chai", "green tea", "black tea", "jasmine tea", "herbal tea"];
let shortTeas = [];
for (const tea of teakinds) {
  if (tea.length > 10) {
    break;
  }
  shortTeas.push(tea);
}
console.log(shortTeas);
