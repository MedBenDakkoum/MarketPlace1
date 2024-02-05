import React from "react";
import "../components/Home/HomePage.css";

const storeData = [
  { id: 1, name: "Store 1", type: "Electronics" },
  { id: 2, name: "Store 2", type: "Clothing" },
  { id: 3, name: "Store 3", type: "Books" }

];

const HomePage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome</h1>
        <div>
          <h2>Available Stores</h2>
          <ul>
            {storeData.map((store) => (
              <li key={store.id}>
                {store.name} - {store.type}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
