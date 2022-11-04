import cntl from "cntl";

const rowStyles = cntl`
  flex 
  items-center 
  justify-between 
  mt-[1px]
  border-t 
  border-solid 
  border-light-gray 
  py-1
`;
const ListItem: React.FC<any> = ({
  children,
  classes,
  property,
  flag,
  recording,
  event,
}) => {
  return property ? (
    <li className={`${rowStyles} ${classes}`}>{children}</li>
  ) : flag ? (
    <li className="flex items-center justify-between mt-[1px]">{children}</li>
  ) : recording ? (
    <li className="flex items-center justify-between mt-[1px]">{children}</li>
  ) : event ? (
    <li className="flex items-center justify-between mt-[1px] font-code text-sm border-t border-solid border-light-gray">
      {children}
    </li>
  ) : (
    <li className="flex items-center justify-between mt-[1px]">{children}</li>
  );
};

export default ListItem;
