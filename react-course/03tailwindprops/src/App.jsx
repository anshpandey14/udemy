import "./App.css";
import Card from "./components/Card";

function App() {
  let myObj = {
    name: "hitesh",
    age: 25,
    address: {
      city: "jaipur",
      state: "rajasthan",
      country: "india",
    },
  };

  let newArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <h1 className="text-3xl bg-green-500 p-3 rounded-md">
        Vite with Tailwind
      </h1>
      <Card username="ansh" myArr={newArr[5]} />
      <Card username="ashirwad" post="staff engineer" />
      <Card />
    </>
  );
}

export default App;
