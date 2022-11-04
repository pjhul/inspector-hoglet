import { FunctionComponent } from "preact";
import Header from "./Header";
import Section from "./Section";
import List from "./List";

export type FeatureFlagsData = Record<
  string,
  {
    value: any;
    evaluation: {
      reason: string;
      condition_index: number;
    };
  }
>;

const FeatureFlags: FunctionComponent<{
  featureFlags: FeatureFlagsData | undefined;
}> = ({ featureFlags }) => {
  return (
    <Section>
      <Header>Feature flags</Header>
      {featureFlags ? (
        <List>
          {Object.entries(featureFlags)
            .slice(0, 5)
            .map(([key, value]) => {
              return (
                <li class="flex items-center justify-between">
                  <a class="text-blue-500 bold" target="_blank">
                    {key}
                  </a>
                </li>
              );
            })}
        </List>
      ) : null}
    </Section>
  );
};

export default FeatureFlags;
