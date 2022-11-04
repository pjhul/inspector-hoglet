import { useState, useEffect } from "react";

import TaxonomicFilter from "./TaxonomicFilter";
import { useUser } from "./UserProvider";

type ConfigureProps = {
  next: () => void
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

const Configure: React.FC<ConfigureProps> = ({ next }) => {
  const [personProperties, setPersonProperties] = useState<PersonProperty[]>(
    []
  );
  const [definitions, setDefinitions] = useState<PersonProperty[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  const { user, updateUser } = useUser();

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    updateUser({
      personProps: personProperties.map(prop => prop.name)
    } as any)

    next()
  }

  return (
    <div className="h-full pt-32 flex flex-col space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">
          Which properties are important to you?
        </h1>
        <p>
          Just choose the ones with helpful context when talking to customers.
        </p>
        <p className="text-gray-600">You can change these later</p>
      </div>

      <form onSubmit={handleSubmit}>
        <TaxonomicFilter
          values={definitions}
          selected={personProperties}
          onChange={setPersonProperties}
          displayValue={(def) => def.name}
          placeholder="Search person properties..."
          filter={(query, value) =>
            value.name.toLowerCase().includes(query.toLocaleLowerCase())
          }
        />

        <button
          type="submit"
          className="bg-blue-500 rounded w-full py-2 text-white disabled:bg-blue-200"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Configure;
