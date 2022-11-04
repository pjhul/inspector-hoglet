import { FunctionComponent } from "preact"
import cntl from 'cntl';

const baseLinkStyles = cntl`
  text-blue-500
`

const rowLinkStyles = cntl`
  flex
  w-full
  p-1
  rounded-sm
  hover:bg-light-gray
`

interface Props {
  to: string
  classes?: string
  external?: boolean
}

const Link: FunctionComponent<Props> = ({ to, external, classes, flag, recording, event, children }) => {
  return flag ? (
    <a 
      href={to}
      target={external ? "_blank" : undefined}
      class={`${rowLinkStyles} ${baseLinkStyles} ${classes}`}
    >
      {children}
    </a>
  ) : recording ? (
    <a 
      href={to}
      target={external ? "_blank" : undefined}
      class={`${rowLinkStyles} ${baseLinkStyles} ${classes}`}
    >
      {children}
    </a>
  ) : event ? (
    <a 
      href={to}
      target={external ? "_blank" : undefined}
      class={`${rowLinkStyles} ${baseLinkStyles} ${classes}`}
    >
      {children}
    </a>
  ) : (
    <a 
      href={to}
      target={external ? "_blank" : undefined}
      class={`${baseLinkStyles} ${classes}`}
    >
      {children}
    </a>
  )
}

export default Link