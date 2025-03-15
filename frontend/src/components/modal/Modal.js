import React from "react";
import { createPortal } from "react-dom";

import Button from "../button/Button";

import classes from "./Modal.module.scss";

/**Modal Component
 *
 * for displaying information
 *
 * @param {*} props takes: title, onClose, children
 * @returns Modal
 */
export default function Modal(props) {
  const mount = document.getElementById("modal");

  if (!mount) {
    console.error("Modal mount element not found in DOM");
    return null;
  }

  return createPortal(
    <div className={classes.backdrop}>
      <div className={classes.box}>
        <div className={classes.title}>
          {props.title}
          <Button onClick={props.onClick} text={"X"} />
        </div>
        <div className={classes.content}>{props.content}</div>
        <div className={classes.buttons}>{props.buttons}</div>
      </div>
    </div>,
    mount
  );
}
