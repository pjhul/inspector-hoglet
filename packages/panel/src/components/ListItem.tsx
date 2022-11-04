const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <li className="flex items-center justify-between mt-[1px]">{children}</li>;
};

export default ListItem;
