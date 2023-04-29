import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Main from "./components/Main";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/user/userSlice";
import { auth } from "./firebase";
import { DataProvider } from "./context/DataContext";
import Products from "./components/Products";
import ProductPage from "./components/ProductPage";
import Modal from "./components/Modal";
import { RequireAuth } from './components/RequireAuth'
import Cart from "./components/Cart";

function App() {
  
    const dispatch = useDispatch();
    useEffect(() => {
      console.log("hey");
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

  


  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <DataProvider>
          <NavBar />
          <SearchBar />
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Products />} />
              <Route path="login" element={<Modal />} />
              <Route path=":id" element={<ProductPage />} />
              <Route
          path='cart'
          element={
            <RequireAuth>
             
              <Cart />
              
            </RequireAuth>
          }
        />
            </Route>
          </Routes>
        </DataProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
