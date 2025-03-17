import { useState } from "react";

import { get, auth, useDatabase } from "../../../../database/database";
import Cookies from "js-cookie";

import { Input, Button, AccesabilityButton } from "../../../../components";

import { useTranslation } from "react-i18next";
import classes from "./Login.module.scss";

/**Login Panel for Dashboard
 *
 * @param onLogin will be called with a user object that has name and role when login is succesful.
 * @returns LoginPanel JSX.Element
 */
export default function LoginPanel({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  // if logged in? skip login.
  useDatabase(() => {
    get("auth/profile")
      .then((response) => onLogin(response))
      .catch((error) => console.log(error));
  }, -1);

  return (
    <div className={classes.login}>
      <div className={classes.box}>
        <div>{t("login.title")}</div>
        <Input
          text={t("login.username")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          text={t("login.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={() =>
            auth({
              username: username,
              password: password,
            })
              .then((response) => {
                Cookies.set("token", response, {
                  expires: 7,
                  path: "/",
                  secure: false,
                  sameSite: "Strict",
                });
                get("auth/profile")
                  .then((response) => onLogin(response))
                  .catch((error) => {
                    console.error(error);
                    alert(
                      "Cookies are not allowed in the browser! please allow cookies!"
                    );
                  });
              })
              .catch(() => alert("Username or password is false."))
          }
          text={t("login.next")}
        />
        <AccesabilityButton type="language" />
      </div>
    </div>
  );
}
