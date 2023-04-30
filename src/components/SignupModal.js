import React,{useState} from "react";
import ReactDom from "react-dom";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,updateProfile
  
} from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/user/userSlice";
import '../styles/signup.css'

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};




export default function SignupModal({ open, onClose }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [name,setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || '/'
      const signIn = async () => {
        try {
        const userDetails = await createUserWithEmailAndPassword(auth, email, password);
        const user = userDetails.user;
        await updateProfile(user, { displayName:name });
        const authUser = auth.currentUser;
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            photo: authUser.photoURL ,
          })
        );
          setEmail("");
          setPassword("");
          setName("");
          
          onClose();
          navigate(redirectPath, { replace: true })
        } catch (error) {
          alert(error.message);
        }
      };


       if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="signUp-modal">
          <h1>Welcome To Snapdeal</h1>
          <form className="signUp-form" onSubmit={(e) => e.preventDefault()}>
            <div className="signIn__inputField">
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Username"
              />
              </div>
              <div className="signIn__inputField">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="signIn__inputField">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>
            <button onClick={signIn}>Register</button>
          </form>
          <button className="sign-close-btn" onClick={onClose}>Close</button>
        </div>
        
      </div>
    </>,
    document.getElementById("portal")
  );
}
