import { useEffect } from "react";
import Cookies from "js-cookie";

// CRUD Functions

// react useEffect hook wrapper for periodic database queries
export function useDatabase(fn, ms = 0) {
  useEffect(() => {
    fn(); // fire instantly
    if (ms > -1) {
      const id = setInterval(() => fn(), ms | 6000); // fire after x ms in loop
      return () => clearInterval(id);
    }
  }, []);
}

// database url e.g. 10.42.0.1:8080
export const db =
  "http://" + process.env.REACT_APP_DATABASE_IP_AND_PORT + "/api/";

// authantication function that interfaces with  db + auth/login
export function auth(obj = {}) {
  return new Promise(
    async (response, error) =>
      // native js fetch function
      await fetch(db + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        // if response ok get data from response else pipe everything to error
        .then(async (r) => (r.ok ? response((await r.json()).data) : error(r)))
        .catch((e) => error(e))
  );
}

// POST request wrapper
export function push(ref = "", obj = {}, authNeeded = true) {
  return new Promise(async (response, error) => {
    // do you even need auth? depends on database api implementation.
    if (authNeeded)
      if (Cookies.get("token"))
        // check for existence of auth token
        await fetch(db + ref, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("token"), // pass auth token in header
          },
          body: JSON.stringify(obj),
        })
          .then(async (r) =>
            r.ok ? response((await r.json()).data) : error(r)
          )
          .catch((e) => error(e));
      else
        error(
          "Couldn't find token in cookies! log in to get an auth token or set authNeeded to false in code."
        );
    else
      await fetch(db + ref, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then(async (r) => (r.ok ? response((await r.json()).data) : error(r)))
        .catch((e) => error(e));
  });
}

// SET request wrapper
export function set(ref = "", obj = {}, authNeeded = true) {
  return new Promise(async (response, error) => {
    if (authNeeded)
      if (Cookies.get("token"))
        await fetch(db + ref, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("token"),
          },
          body: JSON.stringify(obj),
        })
          .then(async (r) =>
            r.ok ? response((await r.json()).data) : error(r)
          )
          .catch((e) => error(e));
      else
        error(
          "Couldn't find token in cookies! log in to get an auth token or set authNeeded to false in code."
        );
    else
      await fetch(db + ref, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then(async (r) => (r.ok ? response((await r.json()).data) : error(r)))
        .catch((e) => error(e));
  });
}

// GET request wrapper
export function get(ref = "", authNeeded = true) {
  return new Promise(async (response, error) => {
    if (authNeeded)
      if (Cookies.get("token"))
        fetch(db + ref, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("token"),
          },
        })
          .then(async (r) =>
            r.ok ? response((await r.json()).data) : error(r)
          )
          .catch((e) => error(e));
      else
        error(
          "Couldn't find token in cookies! log in to get an auth token or set authNeeded to false in code.."
        );
    else
      fetch(db + ref, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (r) => (r.ok ? response((await r.json()).data) : error(r)))
        .catch((e) => error(e));
  });
}

// DELETE request wrapper
export function remove(ref = "", authNeeded = true) {
  return new Promise(async (response, error) => {
    if (authNeeded)
      if (Cookies.get("token"))
        fetch(db + ref, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("token"),
          },
        })
          .then(async (r) =>
            r.ok ? response((await r.json()).data) : error(r)
          )
          .catch((e) => error(e));
      else
        error(
          "Couldn't find token in cookies! log in to get an auth token or set authNeeded to false in code."
        );
    else
      fetch(db + ref, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then(async (r) => (r.ok ? response((await r.json()).data) : error(r)))
        .catch((e) => error(e));
  });
}
