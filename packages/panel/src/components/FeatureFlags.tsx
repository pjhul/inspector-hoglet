import { FunctionComponent } from "preact";

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
    <div>
      <span>Feature Flags</span>
      {featureFlags ? (
        <ul class="pl-10 pr-3 py-2 bg-gray-100 border-t">
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
        </ul>
      ) : null}
    </div>
  );
};

export default FeatureFlags;
