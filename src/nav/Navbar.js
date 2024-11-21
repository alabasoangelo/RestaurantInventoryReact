import { NavLink} from 'react-router-dom'
import React, {useContext} from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'
import {logout} from "../services/authService";

export default function Navbar() {
    const {user, userName, userRole, loading} = useContext(UserContext);
    const navigate = useNavigate()

    const handleLogout = async () =>  {
      await logout();
      navigate('/login')
    }

    if (loading) {
      return <p>Loading...</p>; // Show loading indicator while fetching user role
    }
    console.log("userRole:", userRole);
    return (
        <nav>
          <h1>Restaurant Inventory</h1>        
          {user &&(
            <>
            {userRole === "admin" && (
            <>
              <NavLink to="/admin_home">Inventory</NavLink>
              <NavLink to="/view_employees">Employees</NavLink>
            </>
            )}
            </>
          )}

          {user &&(
            <>
            {userRole === "employee" && (
            <>
              <NavLink to="/employee_home">Inventory</NavLink>
            </>
            )}
            </>
          )}    

          {!user && (
            <>
              <NavLink to="/login">Login</NavLink>

              {/* Function was moved to Admin Dashboard Employees Page */}
              {/* <NavLink to="/signup">Signup</NavLink> */}
            </>
          )
          
          }          

          {user && (
              <>
              Hello, {userName}
              <button className="btn" onClick={handleLogout}>Logout</button>
              </>
          )}

        </nav>    
    )
}
