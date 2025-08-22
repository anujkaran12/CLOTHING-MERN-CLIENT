import { useState } from "react";
import "./Auth.css";

import Register from "./Register";
import Login from "./Login";
import GoogleSignup from "../../utility/GoogleSignup";

const Auth = () => {
  const [loginForm, setLoginForm] = useState(true);
  const [showGoogleBtn,setShowGoogleBtn] = useState(true)
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>WEAR LOOM</h1>
        <div className="auth-form">
          {loginForm ? <Login /> : <Register setLoginForm={setLoginForm} setShowGoogleBtn={setShowGoogleBtn}/>}

          <>
           { showGoogleBtn && <GoogleSignup />}
            <div className="toggle-form">
              <p onClick={() => setLoginForm(!loginForm)}>
                {loginForm
                  ? <p>Create an account | Register!</p>
                  : <p onClick={()=>setShowGoogleBtn(true)}>Already have an account? Sign in</p>}
              </p>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default Auth;
