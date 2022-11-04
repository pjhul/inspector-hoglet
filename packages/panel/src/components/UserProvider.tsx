import { createContext, FunctionComponent } from "preact";
import { useState, useContext, useEffect } from "preact/hooks";

const USER_KEY = "posthog@@user";

type User = {
  apiKey: string;
  url: string;
  prefs?: any;
};

type ContextValue = {
  user: User | undefined;
  updateUser: (user: User) => void;
};

const readUser = () => {
  const userData = window.localStorage.getItem(USER_KEY);

  return userData ? JSON.parse(userData) : undefined;
};

export const UserContext = createContext<ContextValue>({
  user: readUser(),
  updateUser: () => {},
});

export const UserProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(readUser());

  const updateUser = (values: User) => {
    setUser((user) => {
      return {
        ...(user || {}),
        ...values,
      };
    });
  };

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }, [JSON.stringify(user)]);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
