import { useSelector,useDispatch } from 'react-redux'
import formatAmount from '../util/currencey';
import '../styles/reviewOrder.css'
import {deleteCart} from '../features/cart/cartSlice';

const ReviewOrder = ({setCurrentPart}) => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    return (
        <div className='ro'>
            <h3>Order Summary</h3>
            <div className='ro-items'>
                {
                    cart.items.map((item) => {
                        return (
                            <div className='ro-item'>
                              <p> {item.title}</p>
                              <p>
                              {formatAmount( item.price)}x{item.quantity}
                              </p>
                              <p>
                                {formatAmount( item.totalPrice)}
                              </p>
                            </div>
                        )
                    })
                }
                <div className='ro-item'><p>Total</p><p style={{fontWeight:"bold"}}>{formatAmount(cart.totalCartPrice)}</p></div>
            </div>
            <div className='ro-delivery-details'>
                <div className='ro-shipping-details'>
                    <h4>Shipping</h4>
                    <div className='ro-shiping-address'>
                        <p>John Smith</p>
                        <p>1 MUI Drive, Reactville,</p>
                        <p>Anytown, 99999, USA</p>
                    </div>
                </div>
                <div className='ro-payment-details'>
                    <h4>Payment details</h4>
                    <div className='ro-card-details'>
                        <p>Card type : Visa</p>
                        <p>
                        Card holder : 
Mr John Smith
                        </p>
                        <p>
                        Card number : xxxx-xxxx-xxxx-1234
                        </p>
                        <p>
                        Expiry date : 

04/2024
                        </p>
                    </div>
                </div>
            </div>
            <div className='ro-btns'>
                <button className='prev-btn' onClick={() => setCurrentPart((prevState)=>prevState-1)}>BACK</button>
                <button className='next-btn' onClick={() => {
                    dispatch(deleteCart());
                    setCurrentPart((prevState)=>prevState+1)}}>PLACE ORDER</button>
            </div>

            
        </div>
    )
}

export default ReviewOrder;