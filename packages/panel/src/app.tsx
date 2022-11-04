import { useState, useEffect } from "preact/hooks";

import Login from "./components/Login";
import { UserProvider, useUser } from "./components/UserProvider";
import Person, { PersonData } from "./components/Person";

import logo from "./assets/posthog.svg";

export function App() {
  const { user } = useUser();

  const [screen, setScreen] = useState<"login" /*| "configure"*/ | "main">(
    !user ? "login" : "main"
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
        ) : (
          <div
            class={`w-full h-full flex flex-col border-l shadow-md transform transition-transform bg-white ${
              panelOpen ? "" : "translate-x-full"
            }`}
          >
            <div class="px-2 py-3">
              <div class="flex items-center space-x-2">
                <img src={logo} class="w-6 h-6" />
                <span>PostHog App + Website</span>
              </div>

              <form onSubmit={handleSubmit}>
                <div class="flex items-center">
                  <input
                    type="text"
                    class="flex-grow border p-1"
                    value={query}
                    onChange={(event) =>
                      setQuery((event.target as HTMLInputElement).value)
                    }
                  />
                  <button>Submit</button>
                </div>
              </form>
            </div>

            <ul class="divide-y overflow-y-scroll flex-grow overscroll-y-contain">
              {persons.map((person) => {
                return (
                  <li>
                    <Person person={person} />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </UserProvider>
    </>
  );
}
