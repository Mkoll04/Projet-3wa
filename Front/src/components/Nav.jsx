import { NavLink } from "react-router-dom";
import {useEffect} from 'react'
import axios from 'axios'
import {useContext,useState} from "react"
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
  const [menuOpen, setMenuOpen] = useState(false);
  
  function handleMenuToggle() {
    setMenuOpen((prevState) => !prevState);
  }
  
  return (
    <header>
      <img src="../images/Logo-Ayaco.jpg" alt="logo artiste" className="header-logo"/>
      <h1>AYACO </h1>
      <nav role="navigation">
          <div className="menuToggle">
          <input type="checkbox" checked={menuOpen} onChange={handleMenuToggle} />
            <span></span>
            <span></span>
            <span></span>
              <ul className={`menu ${menuOpen ? "open" : ""}`}>
                <li>
                  <NavLink  to="/" className="NavLink" onClick={handleMenuToggle}>
                     Accueil
                  </NavLink>
                </li>
                {!user.isLogged &&
                <li>
                  <NavLink to="/login" className="NavLink" onClick={handleMenuToggle}>
                    Login
                  </NavLink>
                </li>
                }
                {user.isLogged &&
                <li>
                  <NavLink to="/login" className="NavLink" onClick={handleMenuToggle}>
                    Logout
                  </NavLink>
                </li>
                }
                {user.isAdmin &&
                <li>
                  <NavLink to="/getAllProducts" className="NavLink" onClick={handleMenuToggle}>
                    Gestion
                  </NavLink>
                </li>  
                }
                {!user.id &&
                <li>
                  <NavLink to="/registerUser" className="NavLink" onClick={handleMenuToggle}>
                    S'enregistrer
                  </NavLink>
                </li>
                }
                <li>
                  <NavLink to="/products" className="NavLink" onClick={handleMenuToggle}>
                    Broches 
                  </NavLink>
                </li>
                {user.id &&
                <li>
                  <NavLink to="/cart" className="NavLink" onClick={handleMenuToggle}>
                    Panier
                  </NavLink>
                </li>
                }
                {user.id &&
                <li>
                  <NavLink to="/createMessage" className="NavLink" onClick={handleMenuToggle}>
                     Contact
                  </NavLink>
                </li>
                }
                {user.id &&
                  <li>
                    <NavLink to={`/editUser/${user.id}`} className="NavLink" onClick={handleMenuToggle}>
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