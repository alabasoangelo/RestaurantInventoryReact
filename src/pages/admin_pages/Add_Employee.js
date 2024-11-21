import { useRef, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { addEmployee, updateEmployee } from "../../services/employeeService";

export default function AddEmployee() {
  const emailRef = useRef(null)
  const usernameRef = useRef(null);
  const roleRef = useRef(null);

  const navigate = useNavigate()
  
  const { urlId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const users = {
      email: emailRef.current.value, 
      username: usernameRef.current.value,
      role: roleRef.current.value
    };

    if(urlId){
      await updateEmployee(urlId,users)
    }else{
      await addEmployee(users)
    }

    navigate('/admin_home')

  } 


  return (
    <div className="create">
      <h2 className="page-title"> Create New Employee Account </h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Email</span>
          <input 
            type="email" 
            ref = {usernameRef}
            required
          />
        </label>
        
        <label>
          <span>Username</span>
          <input 
            type="text" 
            ref={usernameRef}
            required
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

        <button className="btn">submit</button>
      </form>
    </div>
  )
}
