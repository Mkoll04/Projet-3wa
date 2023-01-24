import { NavLink } from "react-router-dom";

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            HOME
          </NavLink>
        </li>
     
      </ul>
    </nav>
  );
};

export default Nav;