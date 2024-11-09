import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProductDetails from "./pages/ProductDetails";
import CartButton from './pages/CartButton';
import Cart from './pages/Cart';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

function App() {
  const location = useLocation();
  const hideCartButtonPaths = ["/login", "/register", "/cart"];
  const showCartButton = !hideCartButtonPaths.includes(location.pathname);
  const [itemCount, setItemCount] = useState(0);
  // const [actualQuantity, setActualQuantity] = useState(0);

  const incrementItemCount = () => {
    setItemCount(prevCount => prevCount + 1);
  };

  const newQuantitySetter =() => {
    // setActualQuantity(prevActu)
    setItemCount(prevCount => prevCount + 1);
  }

  const isAuthenticated = localStorage.getItem("token") !== null;

  return (
    <div className="App">
        {showCartButton && <CartButton itemCount={itemCount}/>}
        {/* <Router> */}
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to={"/dashboard"} />
                ) : (
                  <Navigate to={"/login"} />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard setActualQuantity={newQuantitySetter} actualValue={0}/> : <Navigate to={"/login"} />
              }
            />
            <Route path="/product/:id" element={<ProductDetails incrementItemCount={incrementItemCount}/>} />
            <Route path="/cart" element={<Cart />}/>
          </Routes>
        {/* </Router> */}
    </div>
  );
}

export default App;
