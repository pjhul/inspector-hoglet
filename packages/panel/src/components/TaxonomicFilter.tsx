import { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { useUser } from "./UserProvider";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type PersonProperty = {
  name: string;
  count: number;
};

type Group = {
  group_type: string;
  group_type_index: number;
  name_singular: string | null;
  name_plural: string;
  properties: {
    name: string;
    count: number;
  }[];
};

const TaxonomicFilter = () => {
  const { user } = useUser();

  const [query, setQuery] = useState("");
  const [personProperties, setPersonProperties] = useState<PersonProperty[]>(
    []
  );
  const [definitions, setDefinitions] = useState<PersonProperty[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    if (user) {
      fetch(`${user.url}/api/projects/@current/persons/properties`, {
        headers: { Authorization: `Bearer ${user.apiKey}` },
      })
        .then((res) => res.json())
        .then((data) => setDefinitions(data));

      fetch(`${user.url}/api/projects/@current/groups_types`, {
        headers: { Authorization: `Bearer ${user.apiKey}` },
      })
        .then((res) => res.json())
        .then((groupTypes) => {
          fetch(
            `${user.url}/api/projects/@current/groups/property_definitions`,
            {
              headers: { Authorization: `Bearer ${user.apiKey}` },
            }
          )
            .then((res) => res.json())
            .then((groupProps) => {
              setGroups(
                groupTypes.map((group: any) => {
                  return {
                    ...group,
                    properties: groupProps[group.group_type_index.toString()],
                  };
                })
              );
            });
        });
    }
  }, [user]);

  console.log(groups);

  const filteredDefinitions =
    query === ""
      ? definitions
      : definitions.filter((def) => {
          return def.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <Combobox
        as="div"
        value={personProperties}
        onChange={(selected) => setPersonProperties(selected)}
        multiple
      >
        <Combobox.Label className="block text-sm font-medium text-gray-700">
          Key Person Properties
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(def: PersonProperty) => def?.name || ""}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {definitions.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredDefinitions.map((person) => (
                <Combobox.Option
                  key={person.name}
                  value={person}
                  className={({ active }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={classNames(
                          "block truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {person.name}
                      </span>

                      {selected && (
                        <span
                          className={classNames(
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                            active ? "text-white" : "text-indigo-600"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>

      <ul>
        {personProperties.map((prop) => {
          return <li>{prop.name}</li>;
        })}
      </ul>
    </>
  );
};

export default TaxonomicFilter;
