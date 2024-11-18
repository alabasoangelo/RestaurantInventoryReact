import { useParams } from "react-router-dom"
import { useEffect,useState } from 'react';
import {getProduct} from "../services/productService";

export default function Product() {
  const { urlId } = useParams()
  const [products, setProduct] = useState(null);

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
          <p>{products.description}</p>
        </div>
      )}
    </div>
  )
}
