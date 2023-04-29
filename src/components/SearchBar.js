import React, { useContext } from 'react'
import { BsSearch } from "react-icons/bs";
import { useSelector } from 'react-redux';
import '../styles/searchbar.css'
import DataContext from '../context/DataContext';
import Modal from './Modal';
import SignupModal from './SignupModal'
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FaShoppingCart } from "react-icons/fa";
import { deleteCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const SearchBar = () => {

  const {isOpen,setIsOpen,signUpIsOpen,setSignUpIsOpen,setSearch} = useContext(DataContext);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.cart);
      const logout = async () => {
        try {
          
          await signOut(auth);
          dispatch(deleteCart());
          navigate('/');
          setIsOpen(false);
        } catch (error) {
          console.error(error);
        }
      };


  return (
    <div className="search-bar">
      <div onClick={() => navigate('/')} className="search-bar-logo">
        <img
         // src="https://logos-download.com/wp-content/uploads/2016/10/SnapDeal_logo_logotype.png"
         src='https://logos-download.com/wp-content/uploads/2016/10/SnapDeal_logo_logotype.png'
          alt="logo"
        />
      </div>
      <div className="search-bar-input">
        <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search products and brands" />
        <div className="magnifine">
          <BsSearch />
          <span> Search </span>
        </div>
      </div>
      <div className='cart-btn'>
      <button className=" nav-btns" onClick={() => {navigate('cart')}}>
        <FaShoppingCart /> Cart : {data.totalQuantity}
      </button>
      </div>
      <div className="search-bar-login">
        {!user.user ? (
          <button
            className="nav-btns"
            onClick={() => {
              navigate('login');
              setIsOpen(true);
            }}
          >
            Login
          </button>
        ) : (
          
            <button className="nav-btns" onClick={logout}>
              Logout
            </button>
        
        )}
      </div>
      <Modal
        open={isOpen}
        onClose={() => {
          navigate('/')
          setIsOpen(false);
        }}
        openSignUp={() => {
          setSignUpIsOpen(true);
        }}
      />
      <SignupModal
        open={signUpIsOpen}
        onClose={() => {
          setSignUpIsOpen(false);
        }}
      />
    </div>
  );
}

export default SearchBar