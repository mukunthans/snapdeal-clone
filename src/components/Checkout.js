import { useSelector } from "react-redux";
import { useState } from "react";
import ShippingAddress from "./ShippingAddress";
import PaymentDetails from "./PaymentDetails";
import ReviewOrder from "./ReviewOrder";
import {useNavigate} from 'react-router-dom';
import '../styles/checkout.css'

const Checkout = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const [currentPart, setCurrentPart] = useState(1);
    console.log(currentPart);
    
    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <div className="co-levels"><span className={currentPart===1 || currentPart===4 ? "current currPart1 stage" : "currPart1 stage"}> 1 </span>Shipping Address-<span className={currentPart===2 || currentPart===4 ? "current currPart2 stage" : "currPart2 stage"}> 2 </span>Payment Details-<span className={currentPart===3 || currentPart===4  ? "current currPart3 stage" : "currPart3 stage"}> 3 </span>Review your order</div>
            {currentPart ===1 && <ShippingAddress setCurrentPart={setCurrentPart} />}
            {currentPart ===2 && <PaymentDetails setCurrentPart={setCurrentPart} />}
            {currentPart ===3 && <ReviewOrder setCurrentPart={setCurrentPart} />}
            {currentPart ===4 && <div className="finalCheckout">
                 <h3>Thank you for your order.</h3>
                 <p>Your order number is #2001539. We have emailed your order confirmation, and will send you an update when your order has shipped.</p>
                 <button onClick={() => navigate('/')} className="next-btn" > Home </button>
                 </div>}

        </div>
    )
}


export default Checkout;