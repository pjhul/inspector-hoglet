type ListProps = {
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
};

const List: React.FC<ListProps> = ({ className = "", children, loading }) => {
  return loading ? (
    <ul className="space-y-2 mx-2">
      {new Array(5).fill(1).map(() => {
        return <li className="py-2 w-full bg-gray-200 animate-pulse rounded" />;
      })}
    </ul>
  ) : (
    <ul className={`mx-2 ${className}`}>{children}</ul>
  );
};

export default List;
