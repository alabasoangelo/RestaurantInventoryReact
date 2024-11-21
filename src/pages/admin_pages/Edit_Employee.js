import { useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// styles
import '../create.css';
import { addEmployee, getEmployee, getEmployees, updateEmployee, setEmployee, deleteEmployee } from "../../services/employeeService";

export default function EditEmployee() {
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const roleRef = useRef(null);
  const navigate = useNavigate();

  const { urlId } = useParams();

  useEffect(() => {
    if (urlId) {
      getEmployee(urlId).then((snapshot) => {
        const users = snapshot.data();
        if (users) {
          emailRef.current.value = users.email;
          usernameRef.current.value = users.username;
          roleRef.current.value = users.role;
          passwordRef.current.value = users.password;
        } else {
          navigate('/admin_home');
        }
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show confirmation dialog before submitting
    const isConfirmed = window.confirm('Are you sure you want to submit this form?');

    if (isConfirmed) {
      // Proceed with form submission if confirmed
      const userInfo = {
        email: emailRef.current.value,
        username: usernameRef.current.value,
        role: roleRef.current.value, 
        password: passwordRef.current.value
      };
        await updateEmployee(urlId, userInfo);

      // Navigate to the admin home page after successful submission
      navigate('/view_employees');
    } else {
      // If not confirmed, log or handle cancellation if needed
      console.log('Form submission canceled');
    }
  };

  return (
    <div className="create">
      <h2 className="page-title">Edit Employee Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <label>
          <span>Email:</span>
          <input
            type="text"
            ref={emailRef}
            required
          />
        </label>

        {/* Product Description */}
        <label>
          <span>UserName:</span>
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
  );
}
