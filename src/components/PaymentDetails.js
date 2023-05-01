import '../styles/paymentDetails.css'

const PaymentDetails = ({setCurrentPart}) => {
    return (
        <div className="paymentDetails">
            <h3>Payment Details</h3>
            <div className="pd-inputs">

                <div className="pd-input"><input type="text" placeholder="Name on card *"></input></div>
                <div className="pd-input"><input type="text" placeholder="Card number *"></input></div>
                <div className="pd-input"><input type="text" placeholder="Expiry date *"></input></div>
                <div className="pd-input"><input type="text" placeholder="CVV *"></input>
                <p className='small-txt'>Last three digits on signature strip</p></div>

            </div>
            <div className='checkbox-style'><input type="checkbox"></input> 
                <p>Remember credit card details for next time</p></div>
            <div className="sa-btns">
                <button className='prev-btn' onClick={() => setCurrentPart((prevState) => prevState-1)}>BACK</button>
                <button className='next-btn' onClick={() => setCurrentPart((prevState) => prevState+1)}>NEXT</button>
            </div>
        </div>
    )
}

export default PaymentDetails;