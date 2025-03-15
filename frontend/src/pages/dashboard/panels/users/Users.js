import { useState } from "react";

import {
  useDatabase,
  push,
  get,
  set,
  remove,
} from "../../../../database/database";

import { Button, Modal, Input, Dropdown } from "../../../../components";

import classes from "./Users.module.scss";
import { useTranslation } from "react-i18next";

export default function UsersPanel() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [modal, setModal] = useState("");

  useDatabase(() => {
    get("employees")
      .then(setEmployees)
      .catch((error) => console.error("Error:", error));
  });

  const { t } = useTranslation(); // Use translation hook

  return (
    <div className={classes.page}>
      {modal && (
        <Modal
          title={t(modal === "Edit" ? "userPage.edit" : "userPage.add")}
          onClick={() => setModal("")}
          content={
            <>
              <Input
                text={t("userPage.userName")}
                value={selectedEmployee.name}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    name: e.target.value,
                  })
                }
              />
              <Input
                text={t("userPage.password")}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    password: e.target.value,
                  })
                }
              />
              <div>
                {t("userPage.role") + ": "}
                <Dropdown
                  text={
                    selectedEmployee.role === "ADMIN"
                      ? "Admin"
                      : t("userPage.employee")
                  }
                  options={
                    <>
                      <div
                        onClick={() =>
                          setSelectedEmployee({
                            ...selectedEmployee,
                            role: "ADMIN",
                          })
                        }
                      >
                        Admin
                      </div>
                      <div
                        onClick={() =>
                          setSelectedEmployee({
                            ...selectedEmployee,
                            role: "USER",
                          })
                        }
                      >
                        {t("userPage.employee")}
                      </div>
                    </>
                  }
                />
              </div>
            </>
          }
          buttons={
            modal === "Edit" ? (
              <>
                <Button
                  text={t("button.save")}
                  onClick={() =>
                    set("employees/" + selectedEmployee.id, selectedEmployee)
                      .then(() => setModal(""))
                      .catch((error) => alert("Something went wrong:", error))
                  }
                />
                <Button
                  text={t("button.delete")}
                  onClick={() =>
                    remove("employees/" + selectedEmployee.id)
                      .then(() => setModal(""))
                      .catch((error) => alert("Something went wrong:", error))
                  }
                />
              </>
            ) : (
              modal === "Add" && (
                <Button
                  onClick={() =>
                    push("employees", selectedEmployee)
                      .then(() => setModal(""))
                      .catch((error) => alert("Something went wrong:", error))
                  }
                  text={t("button.create")}
                />
              )
            )
          }
        />
      )}

      {employees.map((employee, index) => (
        <div
          className={classes.user}
          key={index}
          onClick={() => setSelectedEmployee(employee)}
        >
          <div>{index + 1}</div>
          <div className={classes.box}>
            <div>
              <div>
                {t("userPage.userName") + ": "} {employee.name}
              </div>
              <div>
                {t("userPage.role") + ": "}
                {employee.role === "ADMIN" ? "admin" : t("userPage.employee")}
              </div>
              <div>ID: {employee.id}</div>
            </div>
            <Button onClick={() => setModal("Edit")} text={t("button.edit")} />
          </div>
        </div>
      ))}
      <Button
        text="+"
        onClick={() => {
          setSelectedEmployee({});
          setModal("Add");
        }}
      />
    </div>
  );
}
