import React from "react";
import Tabs from "./Tabs";
import Tab from "./Tab";
import "./styles.css";

const tabs = [
  {
    url: "#",
    text: "Все",
    active: true
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
        <Tabs>
          {tabs.map((item, index) => (
            <Tab key={`tab-index-${index}`} {...item} />
          ))}
        </Tabs>
      </div>
    </div>
  );
}
