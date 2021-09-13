import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
//API import 해야함.. ? 뭐 말하는 건지는 아직 모름
import { Context } from "../context";
//
//import { SESSION_ID, CSRF_TOKEN } from "../config";
import axios from "axios";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  //   setUser만 사용하기 때문에 user는 _표시를 해두었다 [객관적이지 않음]
  const [user, setUser] = useContext(Context); // eslint-disable-line no-unused-vars
  const navigate = useNavigate(); //Naviagte hook 사용

  // const setCookie = function setCookie_by_name_value_period_domain(
  //   name,
  //   value,
  //   period,
  //   domain
  // ) {
  //   let date = new Date();
  //   date.setDate(date.getDate() + period);
  //   //let Cookie = `${name}=${value};Expires=${date.toUTCString()};Domain=${domain}`;
  //   let Cookie = `${name}=${value};Expires=${date.toUTCString()};`;
  //   document.cookie = Cookie;
  // };

  const handleSubmit = async () => {
    setError(false);
    try {
      axios
        .post("/api-auth/login", null, {
          params: {
            username: username,
            password: password,
            submit: "Log in",
          },
        })
        .then((res) => console.log(res.data))
        .catch();

      // setUser({
      //   //임의로 hard coding 해버림
      //   sessionId: SESSION_ID,
      //   username: "seller",
      // });

      //navigate("/"); //login완료하면 index로 리다이렉트

      // setCookie("sessionid", SESSION_ID, "14", "loffle.cf");
      // setCookie("csrftoken", CSRF_TOKEN, "14", "loffle.cf");
    } catch (error) {
      setError(true);
    }
  };

  const handleInput = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  return (
    <div className="">
      {error && <div className="text-red">There was an error!</div>}
      <label>Username: </label>
      <input
        type="text"
        value={username}
        name="username"
        onChange={handleInput}
      />
      <label>Password: </label>
      <input
        type="password"
        value={password}
        name="password"
        onChange={handleInput}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
