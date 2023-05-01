import '../styles/shippingAddress.css'

const ShippingAddress = ({setCurrentPart}) => {
    return (
        <div className="shipping">
            <h3>Shipping Address</h3>
            <div className="sa-ip-name"> 
                <input
                   type="text"
                   placeholder="First Name *"

                ></input>
                <input
                   type="text"
                   placeholder="Last Name *"

                ></input>
            </div>
            <input className='full-width'
                   type="text"
                   placeholder="Address line 1 *"

                ></input>
             <input className='full-width'
                   type="text"
                   placeholder="Address line 2 *"

            ></input>
            <div className="sa-ip-city">
                <input
                   type="text"
                   placeholder="City *"

                ></input>
                <input
                   type="text"
                   placeholder="State/Province/Region"

                ></input>
            </div>
            <div className="sa-ip-state">
                <input
                   type="text"
                   placeholder="Zip /Postal code *"

                ></input>
                <input
                   type="text"
                   placeholder="Country *"

                ></input>
            </div>
            <div className='checkbox-style'>
            <input type="checkbox"></input><p>Use this address for payment details</p> </div>

            <div className="sa-btns">
                <button className="next-btn" onClick={()=>setCurrentPart((prevState) => prevState+1)}>Next</button>
            </div>


        </div>
    )
}


export default ShippingAddress;