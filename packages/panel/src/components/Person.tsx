import { useState, useEffect } from "preact/hooks";
import { FunctionComponent } from "preact";

import expand from "../assets/expand.svg";

import { useUser } from "./UserProvider";
import { humanFriendlyDetailedTime } from "../utils";

export type PersonData = {
  id: string;
  uuid: string;
  name: string;

  distinct_ids: string[];

  properties: Record<string, any>;

  created_at: string;
};

export type Recording = {
  id: string;
  viewed: boolean;
  recording_duration: string;
  distinct_id: string;
  start_time: string;
  end_time: string;
};

const Person: FunctionComponent<{ person: PersonData }> = ({ person }) => {
  const user = useUser();

  const [expanded, setExpanded] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);

  useEffect(() => {
    if (expanded && !recordings.length) {
      fetch(
        `${user.url}/api/projects/@current/session_recordings?person_uuid=${person.uuid}&limit=5`,
        { headers: { Authorization: `Bearer ${user.apiKey}` } }
      )
        .then((res) => res.json())
        .then((data) => setRecordings(data.results));
    }
  }, [expanded]);

  return (
    <div key={person.id}>
      <div class="flex items-center space-x-2 py-2 px-3">
        <button onClick={() => setExpanded((expanded) => !expanded)}>
          <img src={expand} class="w-6 h-6" />
          <span class="sr-only">Expand person</span>
        </button>
        <div>
          <a href={`${user.url}/person/${person.distinct_ids[0]}`}>
            {person.name}
          </a>
          <p>{person.distinct_ids[0]}</p>
        </div>
      </div>

      {expanded && (
        <>
          <div>
            <span>Properties</span>
            <ul class="pl-10 pr-3 py-2 bg-gray-100 border-t">
              {Object.entries(person.properties).map(([key, value]) => {
                if (typeof value !== "object") {
                  return (
                    <li class="flex items-center justify-between">
                      <p>{key}</p>
                      <p>{value}</p>
                    </li>
                  );
                }
              })}
            </ul>
          </div>

          {recordings.length && (
            <div>
              <span>Recordings</span>
              <ul class="pl-10 pr-3 py-2 bg-gray-100 border-t">
                {recordings.map((recording) => {
                  return (
                    <li class="flex items-center justify-between">
                      <a
                        class="text-blue-500 bold"
                        href={`${user.url}/person/${person.distinct_ids[0]}#activeTab=sessionRecordings&sessionRecordingId=${recording.id}`}
                      >
                        {humanFriendlyDetailedTime(
                          recording.start_time,
                          "MMMM DD, YYYY",
                          "h:mm A"
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Person;
