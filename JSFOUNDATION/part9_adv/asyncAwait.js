function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //   resolve({ name: "chaicode", url: "https://chaicode.com" });
      reject({ name: "chaicode", url: "https://chaicode.com" });
    }, 3000);
  });
}

// fetchUserData.then().catch();

async function getUserData() {
  try {
    console.log("fetching user Data");
    const userdata = await fetchUserData();
    console.log("user data fetched successfully");
    console.log("User data: ", userdata);
  } catch (error) {
    console.log("Error fetching Data", error);
  }
}

getUserData();

// can use await with async only
