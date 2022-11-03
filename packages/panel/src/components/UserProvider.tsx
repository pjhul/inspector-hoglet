import { createContext, FunctionComponent } from "preact";
import { useContext } from "preact/hooks";

const value = {
  apiKey: "phx_qUGN7IhKKIU2qO4vgUAHsSDB1c0uUxH1UPXlfvbCfiN",
  url: "https://app.posthog.com",
};

export const UserContext = createContext<typeof value>(value);

export const UserProvider: FunctionComponent = ({ children }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
