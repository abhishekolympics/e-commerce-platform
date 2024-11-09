import React from "react";
import { useNavigate } from "react-router-dom";

function CartButton({itemCount}) {

  // const [itemCounter, setItemCounter] = useState(itemCount);
  const navigate = useNavigate();
  // const userId = localStorage.getItem('userId');
  
  // useEffect(() => {

  //   const getData = async () => {
  //     await axios
  //       .get(`http://localhost:5000/api/cart/${userId}`)
  //       .then((response) => {
  //         const items = response.data || [];
  //         const totalItemCount = items.reduce((count, item) => count + item.quantity, 0);
  //         setItemCounter(totalItemCount);  // Set item count based on cart data
  //       })
  //       .catch((error) => {
  //         console.log("Error fetching cart items:", error);
  //         setItemCounter(0);  // Set item count to 0 if there's an error or no items
  //       });
  //   }
  //   getData();

  // }, [userId,itemCount]);

  // console.log('itemcount in cartButton=',itemCount);
  

  return (
    <button 
      onClick={() => navigate("/cart")}
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer"
      }}
    >
      🛒 Cart 
      ({itemCount})
    </button>
  );
}

export default CartButton;
