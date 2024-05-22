import React from "react";

import Classes from "./input.module.css";

function InputEmail(props) {
  return (
    <div className={Classes.container}>
      {props.label && <label>{props.label}</label>}
      <input type="password" {...props} />
    </div>
  );
}

export default InputEmail;