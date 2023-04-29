import CartItem from "./CartItem";


const CartItems = ({cartData}) => {


    return (
        <div className="cartItems">
            <h1>Shopping Cart</h1>
            <div>
                {
                    cartData.map((item) => {
                       console.log(item);
                       return <CartItem item={item} key={item.id}/>
                    })
                }
            </div>
        </div>

    )
}

export default CartItems;