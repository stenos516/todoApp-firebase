import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import gb from './components/assets/gb.png';
function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isRegister) {
        // Modalità registrazione
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Modalità login
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError(null); // Resetta eventuali errori
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider ();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>{isRegister ? "Registration" : "Login for access"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">{isRegister ? "Registration" : "Login"}</button>
      </form>
      <p>
        {isRegister ? "Do you have account? " : "Don't have account? "}
        <button className="reg-btn" onClick={toggleMode}>
          {isRegister ? "Login for access" : "Registration"}
        </button>
        <button className="Google-btn" onClick={handleGoogleLogin} style={{display: 'flex',  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 12px',
  border: '1px solid #ddd',
  backgroundColor: '#fff',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  color: '#555',
  boxShadow: '0px 1px 2px rgba(0,0,0,0.1)',
  marginTop: '10px', }}>
          <img src={gb} alt="google-logo" style={{width: '18px',
  height: '18px',
  marginRight: '8px'}} />
        Access with Google
      </button>
      </p>
    </div>
   
  );
}

export default AuthForm;
