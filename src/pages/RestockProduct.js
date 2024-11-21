import { useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// styles
import './create.css'
import {addProduct, getProduct, updateProduct} from "../services/productService";

export default function RestockProduct() {
  
  const prodNameRef = useRef(null);
  const qtyRef = useRef(null);
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);
  const navigate = useNavigate()
  
  const { urlId } = useParams();

  useEffect(() => {
    if(urlId){
      getProduct(urlId).then((snapshot)=>{
        const products = snapshot.data();
        if(products){
          prodNameRef.current.value = products.prodName;
          qtyRef.current.value = products.qty;
          descriptionRef.current.value = products.description;
          statusRef.current.value = products.status;
        }else{
          navigate('/admin_home')
        }
        
      })     
    }
  },[]);

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const products = {prodName: prodNameRef.current.value, qty: qtyRef.current.value, description: descriptionRef.current.value,status: statusRef.current.value};
    if(urlId){
      await updateProduct(urlId,products)
    }else{
      await addProduct(products)
    }

    navigate('/admin_home')
  } 


  return (
    <div className="create">
      <h2 className="page-title">Restock Product</h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Product Name:</span>
          <input 
            type="text" 
            ref = {prodNameRef}
            readOnly
            disabled
          />
        </label>
        
        <label>
            <span>Quantity:</span>
            <input 
                type="number" 
                ref={qtyRef}
                required
                min="0"  
                step="1" 
            />
        </label>

        <label>
          <span>Description:</span>
          <textarea 
            ref={descriptionRef}
            readOnly
            disabled
          />
        </label>

        <label>
          <span>Status:</span>
          <select ref={statusRef} disabled>
            <option value="in stock">In Stock</option>
            <option value="need restocking">Need Restocking</option>
            <option value="out of stock">Out of Stock</option>
          </select>
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  )
}