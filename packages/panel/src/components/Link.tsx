import cntl from "cntl";

const baseLinkStyles = cntl`
  text-blue-500
`;

const rowLinkStyles = cntl`
  flex
  w-full
  p-1
  rounded-sm
  hover:bg-light-gray
`;

type Props = {
  to: string;
  className?: string;
  external?: boolean;
  children: React.ReactNode;
} & any;

const Link: React.FC<Props> = ({
  to,
  external,
  className,
  flag,
  recording,
  event,
  children,
}) => {
  return flag ? (
    <a
      href={to}
      target={external ? "_blank" : undefined}
      className={`${rowLinkStyles} ${baseLinkStyles} ${className}`}
    >
      {children}
    </a>
  ) : recording ? (
    <a
      href={to}
      target={external ? "_blank" : undefined}
      className={`${rowLinkStyles} ${baseLinkStyles} ${className}`}
    >
      {children}
    </a>
  ) : event ? (
    <a
      href={to}
      target={external ? "_blank" : undefined}
      className={`${rowLinkStyles} ${baseLinkStyles} ${className}`}
    >
      {children}
    </a>
  ) : (
    <a
      href={to}
      target={external ? "_blank" : undefined}
      className={`${baseLinkStyles} ${className}`}
    >
      {children}
    </a>
  );
};

export default Link;
