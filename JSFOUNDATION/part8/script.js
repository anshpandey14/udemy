// alert("Connected");

// example 1 : Accessing the DOM Elements

//let hold =  document.getElementById("changeTextButton")
// console.log(hold);

// document.getElementById("changeTextButton").addEventListener('click',() =>{
//     console.log(this);
// });

// arrow function "this" points to global "this" context

// function "this" points to the context in which it is

document
  .getElementById("changeTextButton")
  .addEventListener("click", function () {
    let paragraph = document.getElementById("myParagraph");
    // console.log(paragraph);
    // console.log(paragraph.textContent);
    paragraph.textContent = "the paragraph is changed";
  });

//   example 2

document
  .getElementById("highlightFirstCity")
  .addEventListener("click", function () {
    let cities = document.getElementById("citiesList");
    let city = cities.firstElementChild;
    city.classList.add("highlight");
    // console.log(city);
  });

//   example 3

document.getElementById("changeOrder").addEventListener("click", function () {
  document.getElementById("coffeeType").textContent = "Espresso";
  //   document.getElementById("coffeeType").style.backgroundColor = "brown";
  //   document.getElementById("coffeeType").style.padding = "5px";
});

// example 4

document.getElementById("addNewItem").addEventListener("click", function () {
  let newItem = document.createElement("li");
  newItem.textContent = "Tea";
  document.getElementById("shoppingList").appendChild(newItem);
});

// example 5

document
  .getElementById("removeLastTask")
  .addEventListener("click", function () {
    // let list = document.getElementById("taskList").children();
    document.getElementById("taskList").lastElementChild.remove();
  });

//   example 6

document
  .getElementById("clickMeButton")
  .addEventListener("dblclick", function () {
    alert("chaicode");
  });

// example 7

document.getElementById("teaList").addEventListener("click", function (event) {
  //   console.log(event.target);
  if (event.target && event.target.matches("#teaItem")) {
    alert("you selected: " + event.target.textContent);
  }
});

// example 8

document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (event) {
    // alert("submitted!")
    event.preventDefault();
    let feedbackLabel = document.querySelector(
      "label[for='feedbackInput'"
    ).textContent;
    let feedback = document.getElementById("feedbackInput").value;
    // console.log(feedback);

    document.getElementById(
      "feedbackDisplay"
    ).textContent = `${feedbackLabel}  ${feedback}`;
  });

// example 9

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("domStatus").textContent =
    "DOM fully loaded at this point";
});

// example 10

document
  .getElementById("toggleHighlight")
  .addEventListener("click", function () {
    let text = document.getElementById("descriptionText");
    text.classList.toggle('highlight')
  });
