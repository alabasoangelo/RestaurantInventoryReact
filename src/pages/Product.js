import { useParams, useNavigate } from "react-router-dom"
import { useEffect,useState } from 'react';
import {getProduct} from "../services/productService";

export default function Product() {
  const navigate = useNavigate();
  const { urlId } = useParams()
  const [products, setProduct] = useState(null);
  const handleEdit = async (id) => {
    navigate(`/edit/${urlId}`);
  };
  useEffect(() => {
    getProduct(urlId)
      .then((snapshot)=>{        
        setProduct(snapshot.data());
      })
  },[])

  return (
    <div>
      {!products && <p>No records found!</p>}
      {products && (
        <div key={products.id}>
          <h2>{products.prodName}</h2>
          <p>Status: {products.status}</p>
          <p>{products.qty}</p>
          <button  onClick={() => handleEdit(products.id)}>Restock</button>
        </div>
      )}
    </div>
  )
}
