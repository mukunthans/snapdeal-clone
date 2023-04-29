import React,{useContext,useState} from 'react'
import DataContext from '../context/DataContext'
import '../styles/product.css';
import { useNavigate } from 'react-router-dom';
import { addItemToCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const Products = () => {
  const {sortedData ,isLoading ,setSortOptions,sortOptions} = useContext(DataContext);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectHandler = (pageSelected) => {
    if (
      pageSelected > 0 &&
      pageSelected <= Math.ceil(sortedData.length / 9) &&
      pageSelected != page
    )
      setPage(pageSelected);
  };

  const handleSelectChange = (event) => {
    
    setSortOptions(event.target.value);
  };

  const handleProductClick = (id) => {
     navigate(`/${id}`);
  }


  const addItem = (e,product) => {
    e.stopPropagation();
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

  return ( !isLoading ? 
      
    <div className='products' >
      <div className='sort-options'>
      <select onChange={handleSelectChange} name="sort-opt" className="sort-opt" value={sortOptions} >
      <option value=""> --Sort By Price--  </option>
      <option value="low">Low - High</option>
      <option value="high">High - Low</option>

       </select>
      </div>
      
      <div className='products-container'>
        {sortedData.length > 0 && (
          sortedData.slice(page * 9 - 9, page * 9).map((product) => {
            return (
              <div key={product.id}  onClick={()=> handleProductClick(product.id)}  className='product'>
                 <div className='product-img'>
                    <img src={product.thumbnail} alt='product-img'></img>
                 </div>
                 <div className='product-des'>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <h4>Price : ${product.price}</h4>
                </div>
                <div className='product-options'>
                  <button onClick={(e) => addItem(e,product)} className='add-to-cart-btn'>Add to cart</button>
                </div>
              </div>
            )
          }))
        }
        

      </div>
      {sortedData.length > 0 && (
        <div className="pagination">
          <span
            className={page != 1 ? "" : "pagination__disable"}
            onClick={() => {
              selectHandler(page - 1);
            }}
          >
          {'Previous'}
          </span>
          {[...Array(Math.ceil(sortedData.length / 9))].map((_, i) => {
            return (
              <span key={i+1}
                className={page == i + 1 ? "selectedPage" : ""}
                onClick={() => {
                  selectHandler(i + 1);
                }}
              >
                {i + 1}
              </span>
            );
          })}
                    <span
            className={page < Math.ceil(sortedData.length / 9) ? "" : "pagination__disable"}
            onClick={() => {
              selectHandler(page + 1);
            }}
          >
            {"Next"}
          </span>
        </div>
      )}
    </div>
          
   : <div style={{display:"grid",placeContent:"center",width:"100%",fontSize:"30px"}}> Loading... </div> )
          
}

export default Products