import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Cart() {
  const userId = localStorage.getItem('userId'); // Replace with the logged-in user's ID
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch cart items from the API when the component mounts or userId changes
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/cart/${userId}`)
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.log("Error fetching cart items", error);
      });
  }, [userId]);

  // Function to remove an item from the cart
  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove`, {
        data: { userId, productId },
      });
      setCartItems((prevItems) => prevItems.filter(item => item.productId._id !== productId));
      alert("Item removed from cart.");
    } catch (error) {
      console.error("Error removing item from cart", error);
    }
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      alert("Quantity must be at least 1.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/cart/update`, {
        userId,
        productId,
        quantity: newQuantity,
      });
      // Update cartItems in state
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      alert("Quantity updated.");
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  // Function to increment quantity
  const incrementQuantity = (productId, currentQuantity, stock) => {
    if (currentQuantity < stock) {
      const newQuantity = currentQuantity + 1;
      updateQuantity(productId, newQuantity);
    } else {
      alert("Cannot increase quantity beyond stock availability.");
    }
  };

  // Function to decrement quantity
  const decrementQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      updateQuantity(productId, newQuantity);
    } else {
      alert("Quantity cannot be less than 1.");
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.productId._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
            <img src={item.productId.imageUrl} alt={item.productId.name} style={{ width: "100px" }} />
            <h4>{item.productId.name}</h4>
            <p>Price: ${item.productId.price}</p>
            <div>
              <button onClick={() => decrementQuantity(item.productId._id, item.quantity)}>−</button>
              <input 
                type="number" 
                value={item.quantity} 
                readOnly 
                style={{ width: "50px", textAlign: "center", margin: "0 5px" }} 
              />
              <button onClick={() => incrementQuantity(item.productId._id, item.quantity, item.productId.countInStock)}>+</button>
            </div>
            <button onClick={() => removeItem(item.productId._id)}>Remove</button>
          </div>
        ))
      )}
      <button onClick={() => navigate('/dashboard')}>Back</button>
    </div>
  );
}

export default Cart;
