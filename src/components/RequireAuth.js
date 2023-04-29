import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useContext } from 'react';
import DataContext from '../context/DataContext';


export const RequireAuth = ({ children }) => {
    const {isOpen,setIsOpen,signUpIsOpen,setSignUpIsOpen} = useContext(DataContext);
    const {user} = useSelector((state) => state.user);
    console.log("user");
    console.log(user);
    const login =  () => {
      setIsOpen(true);
    }

  const location = useLocation()
  if (!user) {
    login();
    return <Navigate to='/login'  state={{ path: location.pathname }} />
  }
  return children;
}
