import { FunctionComponent } from "preact";
import cntl from 'cntl';

const rowStyles = cntl`
  flex 
  items-center 
  justify-between 
  mt-[1px]
  border-t 
  border-solid 
  border-light-gray 
  py-1
`

const ListItem: FunctionComponent = ({ children, classes, property, flag, recording, event }) => {
  return property ? (
    <li class={`${rowStyles} ${classes}`}>
      {children}
    </li>
  ) : flag ? (
    <li class="flex items-center justify-between mt-[1px]">{children}</li>
  ) : recording ? ( 
    <li class="flex items-center justify-between mt-[1px]">{children}</li>
  ) : event ? (
    <li class="flex items-center justify-between mt-[1px] font-code text-sm border-t border-solid border-light-gray">{children}</li>
  ) : (
    <li class="flex items-center justify-between mt-[1px]">{children}</li>
  )
}

export default ListItem;