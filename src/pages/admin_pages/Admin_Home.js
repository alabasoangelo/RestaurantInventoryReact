import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DeleteIcon from '../../assets/delete.svg';
import RestockIcon from '../../assets/restock.png';
import EditIcon from '../../assets/edit.svg';

// styles
import '../../components/css/Home.css';
import { deleteProduct, getProducts } from "../../services/productService";

export default function AdminHome() {
  const [products, setProduct] = useState(null);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = getProducts(setProduct);
    return () => unsubscribe();
  }, []);

  const handleAddProduct = async () => {
    navigate(`/new`);
  };

  const handleDelete = async (id) => {
    // Show confirmation dialog before deletion
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    
    if (isConfirmed) {
      // Proceed with deletion if confirmed
      await deleteProduct(id);
      // Optionally, you could show a success message or refresh products list
      alert('Product deleted successfully!');
    } else {
      // Handle cancellation if needed (log or show feedback)
      console.log('Product deletion canceled');
    }
  };

  const handleEdit = async (id) => {
    navigate(`/edit/${id}`);
  };

  const handleRestock = async (id) => {
    navigate(`/Restock/${id}`);
  };

  // Filter products based on search query
  const filteredProducts = products?.filter(product =>
    product.prodName.toLowerCase().includes(search.toLowerCase())
  );

  // Function to determine the status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'in stock':
        return 'green';  // green for in stock
      case 'need restocking':
        return 'orange'; // yellow for need restocking
      case 'out of stock':
        return 'red';    // red for out of stock
      default:
        return 'gray';   // default to gray if status is unknown
    }
  };

  return (
    <div className="home">
      <h2>Products</h2>

      {/* Search input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='addProduct'>
        <button onClick={() => handleAddProduct()}>Add Product</button>
      </div>

      {/* Table for displaying products */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.prodName}</td>
                <td>{product.qty}</td>
                <td>{product.description}</td>
                <td
                  className="status"
                  style={{ color: getStatusColor(product.status) }}
                >
                  {product.status}
                </td>
                <td className="actions">
                  <img
                    className="icon restock-icon"
                    onClick={() => handleRestock(product.id)}
                    src={RestockIcon}
                    alt="restock icon"
                  />
                  <img
                    className="icon delete-icon"
                    onClick={() => handleDelete(product.id)}
                    src={DeleteIcon}
                    alt="delete icon"
                  />
                  <img
                    className="icon edit-icon"
                    onClick={() => handleEdit(product.id)}
                    src={EditIcon}
                    alt="Edit Product Details"
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