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
      <div className={classes.inputContainer}>
        <input
          type={props.type || "text"}
          ref={props.ref}
          value={props.value}
          name={props.name}
          placeholder={props.placeholder}
          onClick={props.onClick}
          onChange={props.onChange}
          className={`${classes.field} ${props.className}`}
        />
        {props.toggle && (
          <button
            type="button"
            className={classes.toggle}
            onClick={props.onToggle}
          >
            {props.toggle}
          </button>
        )}
      </div>
    </label>
  );
}
