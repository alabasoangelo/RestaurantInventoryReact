import { Link, useNavigate } from 'react-router-dom'
import { useEffect,useState } from 'react';
import DeleteIcon from '../assets/delete.svg'
import EditIcon from '../assets/edit.svg'

// styles
import './Home.css'
import {deleteProduct, getProducts} from "../services/productService";

export default function Home() {

  const [products, setProduct] = useState(null);
  const [search, setSearch] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
      const unsubscribe = getProducts(setProduct)
      return ()=> unsubscribe();
   },[])
  
  const handleDelete = async (id) => {
    await deleteProduct(id);
  }

  const handleEdit = async (id) => {
    navigate(`/edit/${id}`)
  }

  return (
    <div className="home">
      <h2>Products</h2>      
      {products && products.map(products => (
        <div key={products.id} className="card">
          <h3>{products.prodName}</h3>
          <p>Quantity {products.qty}</p>
          <Link to={`/product/${products.id}`}>Read More...</Link>
          <img 
            className="icon"
            onClick={() => handleDelete(products.id)}
            src={DeleteIcon} alt="delete icon" 
          />
          <img 
            className="icon"
            onClick={() => handleEdit(products.id)}
            src={EditIcon} alt="edit icon" 
          />
        </div>
      ))}
    </div>
  )
}
