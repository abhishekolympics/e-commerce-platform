import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Dashboard({ setItemCount }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  const handleMinPrice = (e) => setMinPrice(e.target.value);
  const handleMaxPrice = (e) => setMaxPrice(e.target.value);

  const handleClear = async (e) => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");

    e.preventDefault();
    await axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("error fetching products", error);
      });
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    await axios
      .get("http://localhost:5000/api/products", {
        params: {
          search,
          category,
          minPrice,
          maxPrice,
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("error fetching products", error);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("error fetching products", error);
      });

    const userId = localStorage.getItem("userId");
    axios
      .get(`http://localhost:5000/api/cart/${userId}`)
      .then((response) => {
        const items = response.data || [];
        const totalItemCount = items.reduce(
          (count, item) => count + item.quantity,
          0
        );
        setItemCount(totalItemCount); // Set item count based on cart data
        console.log('insde useeffect inside cart=',totalItemCount);
      })
      .catch((error) => {
        console.log("Error fetching cart items:", error);
        // setItemCounter(0);  // Set item count to 0 if there's an error or no items
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  const showClearButton = search || category || minPrice || maxPrice;

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      <h3>Products List</h3>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          placeholder="Search by name"
          onChange={handleSearchChange}
        />
        <select value={category} onChange={handleCategory}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
        </select>
        <input
          type="number"
          value={minPrice}
          placeholder="Min price"
          onChange={handleMinPrice}
        />
        <input
          type="number"
          value={maxPrice}
          placeholder="Max price"
          onChange={handleMaxPrice}
        />
        <button type="submit"> SEARCH </button>
        {showClearButton && <button onClick={handleClear}>CLEAR</button>}
      </form>

      {products.map((product) => (
        <div key={product._id}>
          <Link to={`/product/${product._id}`}>
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
          </Link>
          <p>{product.description}</p>
          <p>
            <strong>Price: </strong>${product.price}
          </p>
        </div>
      ))}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
