import React from "react";
import { Context } from "../typescript/interfaces";
const MyContext = React.createContext<Context>({});
export const MyProvider = MyContext.Provider;
export default MyContext;
