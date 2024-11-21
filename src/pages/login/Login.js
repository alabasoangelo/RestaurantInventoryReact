import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFirestore, doc, getDoc } from "firebase/firestore";

import { login } from "../../services/authService";

import styles from './Login.module.css'

export default function Login() {
  const email = useRef();
  const password = useRef();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const db = getFirestore();

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    setIsPending(true);

    try {
      const userCredentials = await login(email.current.value, password.current.value);
      const user = userCredentials.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userRole = userDoc.data().role; // Retrieve role from Firestore
        
        // Navigate based on the user's role
        if (userRole === "admin") {
          navigate('/admin_home');

        } else if (userRole === "employee") {
          navigate('/employee_home');

        } else {
          setError("Invalid role. Please contact admin.");

        }
      } else {
        setError("User data not found in Firestore.");

      }
    } catch (err) {
      setError(err.message); // Handle errors (e.g., invalid credentials)

    } finally {
      setIsPending(false); // Reset pending state

    }

  }
  
  return (              
      <form onSubmit={handleSubmit} className={styles['login-form']}>
        <h2>Login</h2>
        <label>
          <span>E-mail:</span>
          <input 
            type="email"
            ref={email}
          />
        </label>
        <label>
          <span>Password:</span>
          <input 
            type="password"
            ref={password}
          />
        </label>
        { !isPending && <button className="btn">Login</button> }
        { isPending && <button className="btn" disabled>loading</button> }
        { error && <p>{error}</p> }      
      </form>
  )
}
