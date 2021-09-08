import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
//API import 해야함.. ? 뭐 말하는 건지는 아직 모름
import { Context } from "../context";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  //   setUser만 사용하기 때문에 user는 _표시를 해두었다 [객관적이지 않음]
  const [_user, setUser] = useContext(Context);
  const navigate = useNavigate(); //Naviagte hook 사용

  const handleSubmit = async () => {
    setError(false);
    try {
      /* //6:47:20
        const requestToken = await API.getRequestToken();
        const sessionId = await API.authenticate(
           requestToken,
           username,
           password 
        );
        */
      //
      setUser({
        //임의로 hard coding 해버림
        sessionId: "3shon67npij42ss64st4xzu3jnfscznr",
        username: "seller",
      });
      navigate("/"); //login완료하면 index로 리다이렉트
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
