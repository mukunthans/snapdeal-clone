import '../styles/cartItem.css'
import { useDispatch } from 'react-redux';
import { addItemToCart,removeItemFromCart } from '../features/cart/cartSlice';
import formatAmount from '../util/currencey';

const CartItem = ({item} ) => {
    const dispatch = useDispatch();
    const {
        id,
        price,
        totalPrice,
        quantity,
        title,
        thumbnail,
      } = item;

      const addItem = () => {
        dispatch(addItemToCart(item));
          
      }
      const removeItem = () => {
    dispatch(removeItemFromCart(id));
      }


    return (
        <div className="cartItem">
            <div className="cartItem-img">
                <img src={thumbnail} alt="cart-item-image"></img>
            </div>
            <div className="cartItem-title">
                {title}
            </div>
            <div className="cartItem-price">
                <p> Price/Item :  {formatAmount(price)}
                <h4>x {quantity}</h4></p>
                <div className='cartItem-total-btns'>
                    <button onClick={addItem}>+</button>
                    <button onClick={removeItem}>-</button>
                </div>
            </div>
            <div className="cartItem-total">
                <div>Total : {formatAmount(totalPrice)}</div>

            </div>

           
        </div>
    )
}

export default CartItem;