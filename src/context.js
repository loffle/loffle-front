import React, { createContext } from "react";
import { useState } from "react";

//context를 만들어준다
export const Context = createContext();

//App 전체를 감싸줄 Provider
const UserProvider = ({ children }) => {
  const [state, setState] = useState(undefined);

  return (
    //위에서 만든 state 주입
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default UserProvider;
