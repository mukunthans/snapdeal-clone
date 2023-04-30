import React,{useRef} from "react";
import ReactDom from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import '../styles/modal.css'
import { useLocation } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import {
  signInWithPopup,
} from "firebase/auth";


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

export default function Modal({ open, onClose, openSignUp }) {

    const emailRef = useRef();
    const passRef = useRef();
    const location = useLocation();
    const navigate = useNavigate()
    const redirectPath = location.state?.path || '/'

      const login = async (e) => {
        e.preventDefault();
        try {

            const email = emailRef.current.value;
            const password = passRef.current.value;
          await signInWithEmailAndPassword(auth, email, password);
          onClose();
          navigate(redirectPath, { replace: true })
        } catch (error) {
          alert(error.message);
        }
      };
      const signInWithGoogle = async () => {
        try {
          await signInWithPopup(auth, googleProvider);
          onClose();
        } catch (error) {
          alert(error.message);
        }
      };
     console.log("modal");
      console.log(auth.currentUser);

  if (!open || auth.currentUser) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="login-modal">

          <h3 className="login-heading">Login</h3>
          <form className="login-form">
            <input type="email" placeholder="Email" ref={emailRef} required />
            <input
              type="password"
              placeholder="password"
              ref={passRef}
              required
            />
            <div className="login__authOption">
            <img
              className="login__googleAuth"
              src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
              alt=""
            />
            <p onClick={signInWithGoogle}>Continue With Google</p>
          </div>

        
            <div className="modal-btns">
            <div className="form-btn">
              <button onClick={(e) => login(e)}>Submit</button>

            </div>
            <div>
            <button className="close-btn" onClick={onClose}>
            Close
          </button>
          </div>
          </div>
          </form>

          <p
            className="click-sigIn"
            onClick={() => {
              onClose();
              openSignUp();
            }}
          >
            New here click to SignIn
          </p>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
