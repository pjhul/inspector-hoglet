type ListProps = {
  className?: string;
  children: React.ReactNode;
};

const List: React.FC<ListProps> = ({ className = "", children }) => {
  return <ul className={`mx-2 ${className}`}>{children}</ul>;
};

export default List;
