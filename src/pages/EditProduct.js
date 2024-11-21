import { useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// styles
import './create.css';
import { addProduct, getProduct, updateProduct } from "../services/productService";

export default function EditProduct() {
  const prodNameRef = useRef(null);
  const qtyRef = useRef(null);
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);
  const navigate = useNavigate();

  const { urlId } = useParams();

  useEffect(() => {
    if (urlId) {
      getProduct(urlId).then((snapshot) => {
        const products = snapshot.data();
        if (products) {
          prodNameRef.current.value = products.prodName;
          descriptionRef.current.value = products.description;
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
      const products = {
        prodName: prodNameRef.current.value,
        description: descriptionRef.current.value,
      };

      if (urlId) {
        await updateProduct(urlId, products);
      } else {
        await addProduct(products);
      }

      // Navigate to the admin home page after successful submission
      navigate('/admin_home');
    } else {
      // If not confirmed, log or handle cancellation if needed
      console.log('Form submission canceled');
    }
  };

  return (
    <div className="create">
      <h2 className="page-title">Edit Product Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <label>
          <span>Product Name:</span>
          <input
            type="text"
            ref={prodNameRef}
            required
          />
        </label>

        {/* Product Description */}
        <label>
          <span>Description:</span>
          <textarea
            ref={descriptionRef}
            required
          />
        </label>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
