// 1.Declare an array named `teaFlavours` that contains the strings `"green tea"`, `"black tea"`, and `"oolong tea"`. Access the first element of the array and store it in a variable named `firstTea`.

let teaFlavours = ["green tea", "black tea", "oolong tea"];
// let teaFl = new Array("green tea", "black tea", "oolong tea");
let firstTea = teaFlavours[0];

// 2.Declare an array named `cities` containing `"London"`,`"Tokyo"`,`"Paris"`, and `"New York"`. Access the thord element in the array and store it in a variable named `favouriteCity`.

let cities = ["London", "Tokyo", "Paris", "New York"];
let favouriteCity = cities[2];

// 3. you have an array named 'teatypes' containing `"herbal tea"`,`"white tea"`, and `"masala chai"`. change the second element of the array to `"jasmine tea"`.

let teaTypes = ["herbal tea", "white tea", "masala chai"];
teaTypes[1] = "masala chai";

// 4.Declare an array named 'cititesVisited' containing `"Mumbai"` and `"Sydney"`. Add `"Berlin"` to the array using the `push` method.

let cititesVisited = ["Mumbai", "Sydney"];
// cititesVisited[2] = "Berlin";
cititesVisited[cititesVisited.length] = "Berlin";
// console.log(cititesVisited);
cititesVisited.push("Berlin");

// 5.you have an array named `teaOrders` with `"chai"`, `"iced tea"`,`"matcha"`,and `"earl grey"`. Remove th elast element of the array using the `pop` method and store it in a variable named `lastOrder`.

let teaOrders = ["chai", "iced tea", "matcha", "earl grey"];
const lastOrder = teaOrders.pop();
// console.log(lastOrder);
// console.log(teaOrders);

// 6.you have an array named `popularTeas` containing `"green tea"`,`"oolong tea"`,and`"chai"`. Create a soft copy of this array named `softCopyTeas`.

let popularTeas = ["green tea", "oolong tea", "chai"];
let softCopyTeas = popularTeas;
popularTeas.pop();
// console.log(softCopyTeas);
// console.log(popularTeas);

// let var1 = 5;
// let var2 = var1;
// var1 = 9;
// console.log(var2);

// 7.you have an array named `topCitites` containing `"Berlin"`,`"Singapore"`, and `"New York"`. Create a hard copy of this array named `hardCopyCitites`.

let topCities = ["Berlin", "Singapore", "New York"];
// let hardCopyCities = [...topCities];
let hardCopyCities = topCities.slice();
topCities.pop();
// console.log(topCities);
// console.log(hardCopyCities);

// 8.you have two arryas: `europeanCitites` containing `"Paris"` and `"Rome"` and `asianCities` containing `"Tokyo"` and `"Bangkok"`. Merge these teo arrays into a new array named `worldCitites`.

let europeanCitites = ["Paris", "Rome"];
let asianCities = ["Tokyo", "Bangkok"];
// let worldCitites = europeanCitites + asianCities;
// console.log(typeof worldCitites);
// let worldCitites = [europeanCitites, asianCities];
let worldCitites = europeanCitites.concat(asianCities);
// console.log(worldCitites);

// 9. you have an array named `teaMenu` containing `"masala chai","oolong tea"`,`"green tea"`, and `"earl grey"`. Find the length of the array and store it in a variable named `menuLength`.

let teaMenu = ["masala chai", "oolong tea", "grey tea", "earl tea"];
let menuLength = teaMenu.length;
// console.log(menuLength);

// 10. you have an array named `cityBucketList` containing `"Kyoto"` , `"London"`,`"Cape Town", and `"Vancouver"`. Check if `"London"` id is in the array and store the result in a variable named `isLondonInList`.

let cityBucketList = ["Kyoto", "London", "Cape Town", "Vancouver"];
let isLondonInList = cityBucketList.includes("London");
console.log(isLondonInList);
