import { NavLink } from "react-router-dom";
import {useEffect} from 'react'
import axios from 'axios'
import {useContext} from "react"
import {StoreContext} from "../tools/context.js"

const Nav = (props) => {
    
    useEffect(() => {
    if(!axios.defaults.headers.common['Authorization']){
      const token = localStorage.getItem("jwtToken")
      if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token
      }
    }
  },[])
  
  const [{user}, dispatch] = useContext(StoreContext)
  return (
    <header>
      <img src="../images/Logo-Ayaco.jpg" alt="logo artiste" className="header-logo"/>
      <h1>AYACO </h1>
      <nav role="navigation">

          <div className="menuToggle">
          <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
              <ul  className="menu">
                <li>
                  <NavLink to="/" className="NavLink">
                    Accueil
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="NavLink">
                    Login
                  </NavLink>
                </li>
                {user.isAdmin &&
                <li>
                  <NavLink to="/addProducts" className="NavLink">
                    Ajout de produits
                  </NavLink>
                </li>
                }
                {user.isAdmin &&
                <li>
                  <NavLink to="/getAllProducts" className="NavLink">
                    Liste des produits
                  </NavLink>
                </li>  
                }
                <li>
                  <NavLink to="/registerUser" className="NavLink">
                    S'enregistrer
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products" className="NavLink">
                    Broches et Tableaux
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/cart" className="NavLink">
                    Panier
                  </NavLink>
                </li>
                {user.id &&
                <li>
                  <NavLink to="/createMessage" className="NavLink">
                    Formulaire de contact
                  </NavLink>
                </li>
                }
                {user.id &&
                  <li>
                    <NavLink to={`/editUser/${user.id}`} className="NavLink">
                     Profil
                    </NavLink>
                  </li>
                  
                }
                
                </ul>
          </div>
      </nav>
    </header>
  );
};

export default Nav;