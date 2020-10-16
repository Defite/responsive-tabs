import React from "react";
const Tab = (props) => {
  return (
    <li className="tab" ref={props.forwardRef} data-id={props.id}>
      <a href={props.url}>{props.text}</a>
    </li>
  );
};

export default Tab;
