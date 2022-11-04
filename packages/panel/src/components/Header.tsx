import { FunctionComponent } from "preact";

const Header: FunctionComponent = ({ children }) => {
  return (
    <header>
      <h3 class="bg-light-gray rounded-sm px-2 font-bold">{children}</h3>
    </header>
  );
};

export default Header;
