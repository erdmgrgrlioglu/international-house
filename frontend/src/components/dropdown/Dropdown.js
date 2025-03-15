import React from "react";

import { MdOutlineArrowDropDownCircle } from "react-icons/md";

import classes from "./Dropdown.module.scss";

export default function Dropdown(props) {
  return (
    <>
      <div className={classes.dropdown} tabIndex={0}>
        <div className={classes.text}>
          {props.text}
          <MdOutlineArrowDropDownCircle size={15} />
        </div>
        <div className={classes.content}>{props.options}</div>
      </div>
    </>
  );
}
