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
          <NavLink to="/newusers">
           NEW USERS
          </NavLink>
        </li>
        <li>
          <NavLink to="/users">
            USERS
          </NavLink>
        </li>
        <li>
          <NavLink to="/newArticles">
            NEW ARTICLES
          </NavLink>
        </li>
        <li>
          <NavLink to="/articles">
            ARTICLES
          </NavLink>
        </li>
        <li>
          <NavLink to="/commentaires">
            COMMENTAIRES
          </NavLink>
        </li>
        <li>
          <NavLink to="/postcommentaires">
            NEWCOMMENTAIRES
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/upload">
            Upload
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;