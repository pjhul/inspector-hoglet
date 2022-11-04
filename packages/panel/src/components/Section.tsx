import { FunctionComponent } from "preact";

const Section: FunctionComponent = ({ children }) => {
  return <section class="mx-4">{children}</section>;
};

export default Section;
