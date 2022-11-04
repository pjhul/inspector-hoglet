import { FunctionComponent } from "preact";

const ListItem: FunctionComponent = ({ children, event }) => {
  return event ? (
    <li class="flex items-center justify-between mt-[1px] font-code text-sm">{children}</li>
  ) : (
    <li class="flex items-center justify-between mt-[1px]">{children}</li>
  )
}

export default ListItem;