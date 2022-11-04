import { useState, useEffect } from "react";

import expand from "../assets/expand.svg";
import collapse from "../assets/collapse.svg";

import FeatureFlags, { FeatureFlagsData } from "./FeatureFlags";
import Section from "./Section";
import Header from "./Header";
import List from "./List";
import ListItem from "./ListItem";
import Link from "./Link";

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

const Person: React.FC<{ person: PersonData }> = ({ person }) => {
  const { user } = useUser();

  const personPropsToShow = user?.personProps
    ? new Set(user.personProps)
    : undefined;

  const [expanded, setExpanded] = useState(false);

  const [featureFlags, setFeatureFlags] = useState<
    FeatureFlagsData | undefined
  >(undefined);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (expanded && user) {
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

  return user ? (
    <div key={person.id}>
      <div className="flex items-center space-x-2 py-2 px-3">
        <button
          className="shrink-0"
          onClick={() => setExpanded((expanded) => !expanded)}
        >
          <img src={expanded ? collapse : expand} className="w-6 h-6" />
          <span className="sr-only">Expand person</span>
        </button>
        <div onClick={() => setExpanded((expanded) => !expanded)} className="cursor-pointer">
          <span className="text-[15px]">{person.name}</span>
          <a href={`${user.url}/person/${person.distinct_ids[0]}`} className="font-semibold text-sm ml-0.5 mt-1 text-black/30 hover:text-black/60 p-0.5 hover:bg-accent/20 rounded-sm">
            <span className="inline-block -rotate-45">→</span>
          </a>
          <p className="text-xs font-code opacity-60">
            {person.distinct_ids[0]}
          </p>
        </div>
      </div>

      {expanded && (
        <div className="space-y-2">
          <Section>
            <Header>Properties</Header>
            <List>
              {Object.entries(person.properties)
                .filter(([key]) =>
                  personPropsToShow ? personPropsToShow.has(key) : true
                )
                .map(([key, value]) => {
                  if (typeof value !== "object") {
                    return (
                      <ListItem property classes="space-x-2">
                        <p className="text-xs font-code opacity-70">{key}</p>
                        <p className="text-sm truncate">{value}</p>
                      </ListItem>
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
                    <ListItem recording>
                      <Link
                        to={`${user.url}/person/${person.distinct_ids[0]}#activeTab=sessionRecordings&sessionRecordingId=${recording.id}`}
                        recording
                        external
                      >
                        {humanFriendlyDetailedTime(
                          recording.start_time,
                          "MMMM DD, YYYY",
                          "h:mm A"
                        )}
                      </Link>
                    </ListItem>
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
                    <ListItem event>
                      <Link to="#" external event classes="text-xs">
                        {event.event}
                      </Link>
                    </ListItem>
                  );
                })}
              </List>
            ) : null}
          </Section>
        </div>
      )}
    </div>
  ) : null;
};

export default Person;
