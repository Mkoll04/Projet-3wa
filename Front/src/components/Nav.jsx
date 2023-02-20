import { NavLink } from "react-router-dom";
import {useEffect} from 'react'
import axios from 'axios'
const Nav = (props) => {
  
    useEffect(() => {
    if(!axios.defaults.headers.common['Authorization']){
      const token = localStorage.getItem("jwtToken")
      if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token
      }
    }
  },[])
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/addProducts">
            AddProducts
          </NavLink>
        </li>
         <li>
          <NavLink to="/getAllProducts">
            Products List
          </NavLink>
        </li>
        <li>
          <NavLink to="/registerUser">
            Sign Up
          </NavLink>
          </li>
          <li>
          <NavLink to="/products">
            Broches et Tableaux
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;