import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetails({ incrementItemCount }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const addToCart = () => {
    const userId = localStorage.getItem('userId');
    console.log("user id inside cart=",userId);
    axios
      .post("http://localhost:5000/api/cart/add", {
        userId,
        productId: id,
        quantity: 1,
      })
      .then((response) => {
        alert("Product added to cart");
        incrementItemCount();
      })
      .catch((error) => {
        console.log("Error adding product to cart", error);
      });
  };

  useEffect(() => {
    const fetchDetails = async () => {
      axios
        .get(`http://localhost:5000/api/products/${id}`, {
          authorization: "Bearer" + localStorage.getItem("token"),
        })
        .then((res) => {
          setProduct(res.data);
        });
    };
    fetchDetails();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name}></img>
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong>${product.price}
      </p>
      <p>
        {" "}
        <strong>In Stock:</strong> {product.countInStock}{" "}
      </p>
      <button onClick={addToCart}>Add to Cart</button>
      <button onClick={() => navigate("/dashboard")}>Back</button>
    </div>
  );
}

export default ProductDetails;
