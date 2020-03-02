import { createContext } from "react";

const UserContext = createContext({ user: "", logHandler: () => {} });

export default UserContext;
