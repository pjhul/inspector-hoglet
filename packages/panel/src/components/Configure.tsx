import { useState, useEffect } from "react"

import TaxonomicFilter from "./TaxonomicFilter";
import { useUser } from "./UserProvider"


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

const Configure: React.FC = () => {
  const [personProperties, setPersonProperties] = useState<PersonProperty[]>(
    []
  );
  const [definitions, setDefinitions] = useState<PersonProperty[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  const { user } = useUser();

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
  return (
    <div>
      <TaxonomicFilter values={definitions} selected={personProperties} onChange={setPersonProperties} displayValue={(def) => def.name} filter={(query, value) => value.name.toLowerCase().includes(query.toLocaleLowerCase())}/>
    </div>
  );
};

export default Configure;
