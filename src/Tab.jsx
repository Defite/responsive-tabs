import React from "react";
const Tab = (props) => {
  const tabClass = props.active ? "tab active" : "tab";
  return (
    <li className={tabClass} ref={props.forwardRef} data-id={props.id}>
      <a href={props.url}>{props.text}</a>
    </li>
  );
};

export default Tab;
