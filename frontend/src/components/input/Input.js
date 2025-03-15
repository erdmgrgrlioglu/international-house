import React from "react";

import classes from "./Input.module.scss";

/**Default Input Component
 *
 * @param {*} props takes: name, onClick, className, children
 * @returns Input
 */
export default function Input(props) {
  return (
    <label className={classes.input}>
      {props.text}:
      <input
        ref={props.ref}
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
        onClick={props.onClick}
        onChange={props.onChange}
        className={`${classes.field} ${props.className}`}
      />
    </label>
  );
}
