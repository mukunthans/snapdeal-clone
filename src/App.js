import { useEffect } from "react";
import DataContext from './context/DataContext';
import { useContext } from 'react';

import {  Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Main from "./components/Main";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/user/userSlice";
import { auth } from "./firebase";

import Products from "./components/Products";
import ProductPage from "./components/ProductPage";
import Modal from "./components/Modal";
import { RequireAuth } from './components/RequireAuth'
import Cart from "./components/Cart";
import { useNavigate } from 'react-router-dom';
import Checkout from "./components/Checkout";

function App() {
  
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const {setIsOpen , setSignUpIsOpen } = useContext(DataContext);

    useEffect(() => {

      auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          dispatch(
            login({
              uid: authUser.uid,
              email: authUser.email,
              displayName: authUser.displayName,
              photo: authUser.photoURL ,
            })
          );
        } else {
          dispatch(logout());
        }
        console.log(authUser);
      });
    }, [dispatch]);

  const closeLogin = () => {
    navigate('/');
    setIsOpen(false);
}


  return (
    <div className="App">
        
          <NavBar />
          <SearchBar />
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Products />} />

              <Route path=":id" element={<ProductPage />} />
              <Route
          path='cart'
          element={
            <RequireAuth>
             
              <Cart />
              </RequireAuth>
              
            
          }
        />
                    <Route path="checkout" element={
              <RequireAuth>
            <Checkout/>
            </RequireAuth>
            }/>
         <Route path="login" element={<Modal open={true}
             onClose={closeLogin}
             openSignUp={() => {
             setSignUpIsOpen(true);
        }}/>} />
            </Route>

            </Routes>
        

    </div>
  );
}

export default App;
