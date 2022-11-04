import { FunctionComponent } from "preact";

type ListProps = {
  classes?: string;
};

const List: FunctionComponent<ListProps> = ({ classes = "", children }) => {
  return <ul class={`mx-2 ${classes}`}>{children}</ul>;
};

export default List;
