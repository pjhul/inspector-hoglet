const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <header className="border-b border-solid border-light-gray">
      <h3 className="bg-light-gray rounded-sm text-sm px-2 py-1 font-medium">{children}</h3>
    </header>
  );
};

export default Header;
