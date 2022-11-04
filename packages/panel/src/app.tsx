import { useState, useEffect } from "react";

import Login from "./components/Login";
import Configure from "./components/Configure";
import { UserProvider, useUser } from "./components/UserProvider";
import Person, { PersonData } from "./components/Person";

import { Logomark } from "./components/Icons";

export function App() {
  const { user } = useUser();

  const [screen, setScreen] = useState<"login" | "configure" | "main">(
    user?.personProps ? "main" : user ? "configure" : "login"
  );
  const [panelOpen, setPanelOpen] = useState(true);
  const [query, setQuery] = useState("");

  const [persons, setPersons] = useState<PersonData[]>([]);

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);

    if (url.has("email") && user) {
      setQuery(url.get("email") as string);

      fetch(
        `${user.url}/api/projects/@current/persons?search=${url.get("email")}`,
        { headers: { Authorization: `Bearer ${user.apiKey}` } }
      )
        .then((res) => res.json())
        .then((data) => setPersons(data.results));
    }
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    const res = await fetch(
      `${user.url}/api/projects/@current/persons?search=${query}`,
      { headers: { Authorization: `Bearer ${user.apiKey}` } }
    );

    const data = await res.json();

    setPersons(data.results);
  };

  return (
    <>
      <UserProvider>
        {screen === "login" ? (
          <Login next={() => setScreen("configure")} />
        ) : screen === "configure" ? (
          <Configure next={() => setScreen("main")}/>
        ) : (
          <div
            className={`w-full h-full flex flex-col border-l shadow-md transform transition-transform bg-white ${
              panelOpen ? "" : "translate-x-full"
            }`}
          >
            <div className="px-2 pb-2">
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 flex items-center">
                  <Logomark />
                </span>
                <span className="font-bold opacity-75">
                  PostHog App + Website
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="flex-grow border p-1"
                    value={query}
                    onInput={(event) =>
                      setQuery((event.target as HTMLInputElement).value)
                    }
                  />
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>

            {persons.length === 1 ? (
              <Person person={persons[0]} />
            ) : (
              <ul className="divide-y overflow-y-scroll flex-grow overscroll-y-contain">
                {persons.map((person) => {
                  return (
                    <li>
                      <Person person={person} />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </UserProvider>
    </>
  );
}
