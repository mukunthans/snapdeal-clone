import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import DataContext from '../context/DataContext';
import '../styles/productPage.css'
import { useSelector,useDispatch } from 'react-redux';
import { addItemToCart,removeItemFromCart } from '../features/cart/cartSlice';

const ProductPage = () => {

  const {data} = useContext(DataContext);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const {id} = useParams();
  const cartItemData = cart.items.filter((item) => item.id===parseInt(id))[0];

  const product = data.filter((product) => product.id===parseInt(id))[0];
  console.log('product');

  console.log(cartItemData);
  const handleImgClick = (img) => {

    const container = document.getElementById("imgDisplayBox");
    const imgElement = document.createElement("img");
    imgElement.setAttribute("src",img);
    container.innerHTML = "";
    container.appendChild(imgElement);
      
  }
  
  const addItem = (product) => {

    const { id, title, price, thumbnail, discountPercentage } = product;
    dispatch(
      addItemToCart({
        id,
        title,
        price,
        thumbnail,
        discountPercentage,
      })
    );

  }



  return  (
     product && (
      <div className="prod">
    <h1 className='prod-h1'>{product.title}</h1>
    <div className='product-page'>
      
      <div className='product-pics'>
      
        <div id='imgDisplayBox' className='product-pic-display'>
        <img src={ product.images[0] } alt='product pic'/>
                  
        </div>
        <div className='product-pic-selection'>
           {
            product.images.map((img) => {
              return (
                <div onClick={() => handleImgClick(img)} className='pic-selection'>
                  <img  src={img} alt='product pic'/>
                  </div>
              )
            })
           }
        </div>

      </div>
      <div className='product-details'>
        <div className='product-brand'>Brand : {product.brand}</div>
        <div className='product-description'>{product.description}</div>
        <div className='product-stock'>Only : {product.stock} left</div>
        <div className='product-org-price'>Original Price : <span className='org-price'>${parseInt(product.price+product.price*(product.discountPercentage/100))} </span>
          
        </div>
        <div className='product-dis-price'>Offer Price : <span className='dis-price'>${product.price} </span>
          
          </div>
          <div className='product-rating'> Rating : {product.rating
          +" "}
            {
                [...Array(parseInt(product.rating))].map((_,i) => {
                 return  <span>⭐</span>
                })
            } 
          </div>
          <div className='cart-details'>
          <button onClick={() => dispatch(removeItemFromCart(product.id)) }  className='remove-to-cart-btn'>-</button>
            <div className='cart-details-text'>{cartItemData?  cartItemData.quantity : '0'}</div>
            <button onClick={() => addItem(product)} className='add-cart-btn'>+</button>
          </div>
        
      </div>

    </div>
    </div>
    )
  )
}

export default ProductPage