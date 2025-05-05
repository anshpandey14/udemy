function fetchData() {
  // promise callback
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //   let success = true;
      let success = false;
      if (success) {
        resolve("Data fetched successfully");
      } else {
        reject("Error fetching data");
      }
    }, 3000);
  });
}

// consuming the promise ->showing output

// let response = fetchData();
// console.log(response);

// promises chaining -> catching output of the promise
fetchData()
  .then((data) => console.log(data))
  //   .then(() => {})
  .catch((error) => {
    console.error(error);
    // return `ansh`;
    return error.toLowerCase();
  })
  .then((value) => {
    console.log(value);
  });
