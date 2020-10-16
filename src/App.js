import React from "react";
import Tabs from "./Tabs";
import "./styles.css";

const tabs = [
  {
    url: "#",
    text: "Все"
  },
  {
    url: "#",
    text: "Кухня и столовая"
  },
  {
    url: "#",
    text: "Гостиная и спальня"
  },
  {
    url: "#",
    text: "Столовая"
  },
  {
    url: "#",
    text: "Микростудия"
  },
  {
    url: "#",
    text: "Загородный дом"
  },
  {
    url: "#",
    text: "Гардеробная"
  },
  {
    url: "#",
    text: "Кандибоберная"
  }
];

export default function App() {
  return (
    <div className="App">
      <h1>Hello Tabs</h1>
      <div className="container">
        <Tabs items={tabs} />
      </div>
    </div>
  );
}
