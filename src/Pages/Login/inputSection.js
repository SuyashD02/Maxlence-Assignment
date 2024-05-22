import React from "react";

import Classes from "./input.module.css";

function InputSection(props) {
  return (
    <div className={Classes.container}>
      {props.label && <label>{props.label}</label>}
      <input type="text" {...props} />
    </div>
  );
}

export default InputSection;