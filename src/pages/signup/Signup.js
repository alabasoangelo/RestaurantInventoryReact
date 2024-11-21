import {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'

import {create_user} from "../../services/authService";

// styles
import styles from './Signup.module.css'

export default function Signup() {
  const emailRef = useRef()
  const usernameRef = useRef()
  const roleRef = useRef()
  const passwordRef = useRef()

  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) =>  {
    e.preventDefault()
    setIsPending(true)
    try{
      await create_user(
        emailRef.current.value,
        usernameRef.current.value,
        roleRef.current.value, 
        passwordRef.current.value)
      navigate('/admin_home')
      setIsPending(false)
    }catch(err){
      setError(err.message)
      setIsPending(false)
    }
  }

  return (
      <form onSubmit={handleSubmit} className={styles['signup-form']}>
        <h2>Create User Account</h2>
        <label>
          <span>E-mail:</span>
          <input
              type="email"
              ref={emailRef}
          />
        </label>

        <label>
          <span>Full Name:</span>
          <input
              type="text"
              ref={usernameRef}
          />
        </label>

        <label>
          <span>Role</span>
          <select ref={roleRef} required>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <label>
          <span>Password:</span>
          <input
              type="password"
              ref={passwordRef}
          />
        </label>

        { !isPending && <button className="btn">Create</button> }
        { isPending && <button className="btn" disabled>loading</button> }
        { error && <p>{error}</p> }
      </form>
  )
}