import formatAmount from "../util/currencey";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const BillingSection = () => {

    const navigate = useNavigate();
 
    const cart = useSelector((state) => state.cart);
    return (
        <div className="billingSection">
           <h1>Your Bill</h1>
           <h3><span>Total number of Products </span>  <span>{cart.totalQuantity}</span></h3>
           <h3><span>Original Price </span> <span>{formatAmount(cart.totalCartPrice + (cart.totalCartPrice * 0.05))}</span></h3>
           <h3 ><span>Discount </span> <span style={{color:"green"}}>-{formatAmount(cart.totalCartPrice * 0.05)}</span></h3>
           <h3><span>Delivery Charges </span> : <span style={{color:"green"}}>FREE</span></h3>
           <h2>Total Amount : {formatAmount(cart.totalCartPrice)}</h2>
           <button onClick={() => navigate('/checkout')} className="checkout-btn">Checkout</button>
        </div>

    )
}

export default BillingSection;