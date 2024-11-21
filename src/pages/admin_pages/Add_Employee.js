import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from "../../services/employeeService";

export default function AddEmployee() {
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const roleRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const users = {
      email: emailRef.current.value, 
      username: usernameRef.current.value,
      role: roleRef.current.value,
    };

    try {
      await addEmployee(
        emailRef.current.value, 
        usernameRef.current.value,
        roleRef.current.value,
        passwordRef.current.value,
        users
      );
      
      navigate('/admin_home');

    } catch (error) {
      throw error;

    }
  } 

  return (
    <div className="create">
      <h2 className="page-title"> Create New Employee Account </h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Email</span>
          <input 
            type="email" 
            ref = {emailRef}
            required
          />
        </label>
        
        <label>
          <span>Username</span>
          <input 
            type = "text" 
            ref = {usernameRef}
            required
          />
        </label>

        <label>
          <span>Role</span>
          <select ref={roleRef} required>
            <option value="employee">Employee</option>
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

        <button className="btn">Submit</button>
      </form>
    </div>
  )
}
