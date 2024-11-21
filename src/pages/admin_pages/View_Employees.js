import { useRef, useEffect, useState } from 'react';
import {  useLocation, useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '../../assets/delete.svg';
import EditIcon from '../../assets/edit.svg';
import { addEmployee, getEmployee, getEmployees, updateEmployee, setEmployee, deleteEmployee } from "../../services/employeeService";

// styles
import '../create.css';



export default function ViewEmployees() {
  const [users, setEmployee] = useState(null);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const { urlId } = useParams();

  useEffect(() => {
    const unsubscribe = getEmployees(setEmployee);
    return () => unsubscribe();
  }, []);

  const handleAddEmployee = async () => {
    navigate(`/add_employee`);
  };

  const handleDelete = async (id) => {
    // Show confirmation dialog before deletion
    const isConfirmed = window.confirm('Are you sure you want to delete this user account?');
    
    if (isConfirmed) {
      // Proceed with deletion if confirmed
      await deleteEmployee(id);
      // Optionally, you could show a success message or refresh products list
      alert('User Account deleted successfully!');
    } else {
      // Handle cancellation if needed (log or show feedback)
      console.log('Account deletion canceled');
    }
  };

  const handleEdit = async (id) => {
    navigate(`/edit_employee/${id}`);
  };

    // Filter products based on search query
  const filteredEmployees = users?.filter(employee =>
    employee.username.toLowerCase().includes(search.toLowerCase())
  );

    // Function to determine the status color
  const getRoleColor = (role) => {
    switch (role) {
      case 'Employee':
        return 'green';  // green for in stock
      case 'Manager':
        return 'orange'; // yellow for need restocking
      case 'Admin':
        return 'red';    // red for out of stock
      default:
        return 'gray';   // default to gray if status is unknown
    }
  };
  
  return (
    <div className="home">
      <h2>Employees</h2>

      {/* Search input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='addEmployee'>
        <button onClick={() => handleAddEmployee()}>Add Employee</button>
      </div>

      {/* Table for displaying products */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Employee Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees && filteredEmployees.length > 0 ? (
            filteredEmployees.map((users) => (
              <tr key={users.id}>
                <td>{users.email}</td>
                <td>{users.username}</td>
                <td
                  className="role"
                  style={{ color: getRoleColor(users.role) }}
                >
                  {users.role}
                </td>
                <td className="actions">
                  <img
                    className="icon edit-icon"
                    onClick={() => handleEdit(users.id)}
                    src={EditIcon}
                    alt="Edit Product Details"
                  />
                  <img
                    className="icon delete-icon"
                    onClick={() => handleDelete(users.id)}
                    src={DeleteIcon}
                    alt="delete icon"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}