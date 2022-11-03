import { useState, useEffect } from "preact/hooks";

import { UserProvider, useUser } from "./components/UserProvider";
import Person, { PersonData } from "./components/Person";

import logo from "./assets/posthog.svg";

export function App() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [query, setQuery] = useState("james@posthog.com");
  const user = useUser();

  const [persons, setPersons] = useState<PersonData[]>([]);

  useEffect(() => {}, [user, query]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const res = await fetch(
      `${user.url}/api/projects/@current/persons?search=${query}`,
      { headers: { Authorization: `Bearer ${user.apiKey}` } }
    );

    const data = await res.json();

    setPersons(data.results);
  };

  return (
    <>
      <button
        class="fixed left-8 bottom-8"
        onClick={() => setPanelOpen((open) => !open)}
      >
        Open
      </button>

      <UserProvider>
        <div
          class={`w-full max-w-md fixed right-0 inset-y-0 flex flex-col border-l shadow-md transform transition-transform ${
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

          <ul class="divide-y overflow-y-scroll">
            {persons.map((person) => {
              return (
                <li>
                  <Person person={person} />
                </li>
              );
            })}
          </ul>
        </div>
      </UserProvider>
    </>
  );
}
