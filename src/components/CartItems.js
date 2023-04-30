import CartItem from "./CartItem";


const CartItems = ({cartData}) => {


    return (
        <div className="cartItems">
            <h1>Shopping Cart</h1>
           { cartData.length ? <div>
                {
                    cartData.map((item) => {
                       console.log(item);
                       return <CartItem item={item} key={item.id}/>
                    })
                }
            </div> :<div style={{display:"grid",placeItems:"center",height:"80%"}}> <h3 >Your Cart Is Empty</h3>  </div>
}
        </div>

    )
}

export default CartItems;