const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <header>
      <h3 className="bg-light-gray rounded-sm px-2 font-bold">{children}</h3>
    </header>
  );
};

export default Header;
