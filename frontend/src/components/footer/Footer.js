import classes from "./Footer.module.scss";

/**Basic Footer Component
 *
 * @returns Footer
 */
export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div>© TU Darmstadt - V1.0.0</div>
    </footer>
  );
}
