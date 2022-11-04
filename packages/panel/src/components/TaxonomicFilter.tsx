import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type TaxonomicFilterProps<T> = {
  values: T[];
  selected: T[];
  placeholder?: string;
  onChange: (values: T[]) => void;
  filter: (query: string, value: T) => boolean;
  displayValue: (value: T) => string;
};

function TaxonomicFilter<T>(props: TaxonomicFilterProps<T>) {
  const [query, setQuery] = useState("");

  const filteredValues =
    query === ""
      ? props.values
      : props.values.filter((value) => props.filter(query, value));

  return (
    <>
      <Combobox
        as="div"
        value={props.selected}
        onChange={(selected) => props.onChange(selected)}
        multiple
      >
        <Combobox.Label className="block text-sm font-medium text-gray-700">
          Key Person Properties
        </Combobox.Label>
        <ul className="border border-accent border-solid bg-light-gray rounded p-2 h-[80px] overflow-auto relative before:absolute before:left-0 before:top-0 empty:before:content-['Search_for_properties_below...'] before:text-black/50 before:text-sm before:p-2 before:italic">
          {props.selected.map((value) => {
            return (
              <li key={props.displayValue(value)} className="font-code text-xs">{props.displayValue(value)}</li>
            );
          })}
        </ul>
        <div className="relative mt-1">
          <Combobox.Button className="w-full">
            <Combobox.Input
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              onChange={(event) => setQuery(event.target.value)}
              placeholder={props.placeholder}
              displayValue={props.displayValue}
            />
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400 absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
              aria-hidden="true"
            />
          </Combobox.Button>

          {props.values.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredValues.map((value) => (
                <Combobox.Option
                  key={props.displayValue(value)}
                  value={value}
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
                        {props.displayValue(value)}
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
    </>
  );
}

export default TaxonomicFilter;
