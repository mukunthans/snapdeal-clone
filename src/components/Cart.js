import { useSelector } from "react-redux";
import CartItems from "./CartItems";
import BillingSection from "./BillingSection";
import '../styles/cart.css'


const Cart = () => {
    const cartData = useSelector((state) => state.cart);
    console.log("cartData"); 
    console.log(cartData);
    const user = useSelector((state) => state.user.user);

    
    return (
      <div className="cart">
        <div className="user-info">
          <div className="user-pic">
            <img src={user.photo || "https://icon-library.com/images/no-profile-picture-icon-female/no-profile-picture-icon-female-24.jpg"}></img>
          </div>
          <div className="user-details">
           {user.displayName && <h3>Name : {user.displayName}</h3>}
            <h3>Email: {user.email}</h3>
          </div>
        </div>
        <div className='checkout_page'>
          
        <CartItems cartData={cartData.items} />
        <BillingSection />
      </div>
      </div>
    )
}


export default Cart;