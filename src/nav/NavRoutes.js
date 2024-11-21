import React, {useContext} from "react";
import {UserContext} from "../context/UserContext";
import {Navigate, Route, Routes} from "react-router-dom";
import AdminHome from "../pages/admin_pages/Admin_Home";
import EmployeeHome from "../pages/employee_pages/Employee_Home";
import Login from "../pages/login/Login";
import ViewEmployees from "../pages/admin_pages/View_Employees";
import AddEmployee from "../pages/admin_pages/Add_Employee";
import EditEmployee from "../pages/admin_pages/Edit_Employee";
import Product from "../pages/Product";
import NewProduct from "../pages/NewProduct";
import Signup from "../pages/signup/Signup";
import EditProduct from "../pages/EditProduct";
import RestockProduct from "../pages/RestockProduct";

export default function NavRoutes() {
    const {user} = useContext(UserContext);
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login"/> }/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup /> }/>
            <Route path="/admin_home" element={user ? <AdminHome/> : <Login />}/>
            <Route path="/employee_home" element={user ? <EmployeeHome/> : <Login />}/>
            <Route path="/new" element={user ?<NewProduct /> : <Login />}/>
            <Route path="/product/:urlId" element={user ?<Product/> : <Login />}/>
            <Route path="/edit/:urlId" element={user ?<EditProduct /> : <Login />}/> 
            <Route path="/restock/:urlId" element={user ?<RestockProduct /> : <Login />}/> 
            <Route path="/view_employees" element={user ?<ViewEmployees />  : <Login />}/>
            <Route path="/add_employee" element={user ?<AddEmployee /> : <Login />}/>
            <Route path="/edit_employee" element={user ?<EditEmployee /> : <Login />}/>
            <Route path="/*" element={<Navigate to="/"/> }/>
            <Route path="*" element={<div>404 - Page Not Found</div>} />

            {/* Unused */}
            {/* <Route path="/view_inventory" element={user ?<ViewInventory />  : <Login />}/> */}
            
        </Routes>
    );
}