interface Props {
  to: string;
  className?: string;
  external?: boolean;
  children: React.ReactNode;
}

const Link: React.FC<Props> = ({ to, external, className, children }) => {
  return (
    <a
      href={to}
      target={external ? "_blank" : undefined}
      className={`text-blue-500 flex w-full p-1 rounded-sm hover:bg-light-gray ${className}`}
    >
      {children}
    </a>
  );
};

export default Link;
