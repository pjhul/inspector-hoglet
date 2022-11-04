import { useState, useEffect } from "react";

import Login from "./components/Login";
import Configure from "./components/Configure";
import { UserProvider, useUser } from "./components/UserProvider";
import Person, { PersonData } from "./components/Person";

import logo from "./assets/posthog.svg";

export function App() {
  const { user } = useUser();

  const [screen, setScreen] = useState<"login" | "configure" | "main">(
    !user ? "login" : "configure"
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
          <Login next={() => setScreen("main")} />
        ) : screen === "configure" ? (
          <Configure />
        ) : (
          <div
            className={`w-full h-full flex flex-col border-l shadow-md transform transition-transform bg-white ${
              panelOpen ? "" : "translate-x-full"
            }`}
          >
            <div className="px-2 py-3">
              <div className="flex items-center space-x-2">
                <img src={logo} className="w-6 h-6" />
                <span>PostHog App + Website</span>
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
