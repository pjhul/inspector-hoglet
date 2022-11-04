import { useState, useEffect } from "preact/hooks";
import { FunctionComponent } from "preact";

import expand from "../assets/expand.svg";
import collapse from "../assets/collapse.svg";

import FeatureFlags, { FeatureFlagsData } from "./FeatureFlags";
import Section from "./Section";
import Header from "./Header";
import List from "./List";

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

export type Event = {
  distinct_id: string;
  event: string;
  id: string;
  properties: Record<string, any>;
};

const Person: FunctionComponent<{ person: PersonData }> = ({ person }) => {
  const user = useUser();

  const [expanded, setExpanded] = useState(false);

  const [featureFlags, setFeatureFlags] = useState<
    FeatureFlagsData | undefined
  >(undefined);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (expanded) {
      if (!recordings.length) {
        fetch(
          `${user.url}/api/projects/@current/session_recordings?person_uuid=${person.uuid}&limit=5`,
          { headers: { Authorization: `Bearer ${user.apiKey}` } }
        )
          .then((res) => res.json())
          .then((data) => setRecordings(data.results));
      }

      if (!featureFlags) {
        fetch(
          `${user.url}/api/projects/@current/feature_flags/evaluation_reasons?distinct_id=${person.distinct_ids[0]}`,
          { headers: { Authorization: `Bearer ${user.apiKey}` } }
        )
          .then((res) => res.json())
          .then((data) => setFeatureFlags(data));
      }

      if (!events.length) {
        fetch(
          `${user.url}/api/projects/@current/events?person_id=${person.id}&orderBy=["-timestamp"]&limit=10`,
          { headers: { Authorization: `Bearer ${user.apiKey}` } }
        )
          .then((res) => res.json())
          .then((data) => setEvents(data.results));
      }
    }
  }, [expanded]);

  return (
    <div key={person.id}>
      <div class="flex items-center space-x-2 py-2 px-3">
        <button
          class="shrink-0"
          onClick={() => setExpanded((expanded) => !expanded)}
        >
          <img src={expanded ? collapse : expand} class="w-6 h-6" />
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
        <div class="space-y-2">
          <Section>
            <Header>Properties (temp hidden)</Header>
            <List classes="hidden">
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
            </List>
          </Section>

          <FeatureFlags featureFlags={featureFlags} />

          <Section>
            <Header>Recordings</Header>
            {recordings.length ? (
              <List>
                {recordings.map((recording) => {
                  return (
                    <li class="flex items-center justify-between">
                      <a
                        class="text-blue-500 bold"
                        target="_blank"
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
              </List>
            ) : null}
          </Section>

          <Section>
            <Header>Events</Header>
            {events.length ? (
              <List>
                {events.map((event) => {
                  return (
                    <li class="flex items-center justify-between">
                      <a class="text-blue-500 bold" target="_blank">
                        {event.event}
                      </a>
                    </li>
                  );
                })}
              </List>
            ) : null}
          </Section>
        </div>
      )}
    </div>
  );
};

export default Person;
