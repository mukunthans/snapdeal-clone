import React,{useState} from "react";
import ReactDom from "react-dom";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
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
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
      const signIn = async () => {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          setEmail("");
          setPassword("");
          onClose();
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

       if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="signUp-modal">
          <form className="signUp-form" onSubmit={(e) => e.preventDefault()}>
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
          <div className="login__authOption">
            <img
              className="login__googleAuth"
              src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
              alt=""
            />
            <p onClick={signInWithGoogle}>Continue With Google</p>
          </div>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </>,
    document.getElementById("portal")
  );
}
