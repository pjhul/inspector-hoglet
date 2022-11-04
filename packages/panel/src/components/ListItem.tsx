import { FunctionComponent } from "preact";

const ListItem: FunctionComponent = ({ children }) => {
  return <li class="flex items-center justify-between mt-[1px]">{children}</li>;
};

export default ListItem;
