import classes from "./Navbar.module.scss";

/**Basic Navbar Component
 *
 * for displayin page name
 *
 * @returns Navbar
 */
export default function Navbar(props) {
  return (
    <header>
      <div className={classes.banner} />
      <div className={classes.bar}>
        <div></div>
        <div className={classes.text}>{props.text}</div>
        <div className={classes.logo}>
          <img alt="" src={require("../../images/tuda_logo.png")} />
        </div>
      </div>
    </header>
  );
}
