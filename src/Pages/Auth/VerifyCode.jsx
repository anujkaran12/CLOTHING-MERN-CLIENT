import React, { useEffect, useState } from "react";

const VerifyCode = ({ onVerify, setIsCodeSend ,sendMail,loading}) => {
  const [inputCode, setInputCode] = useState();
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);
  return (
    <>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onVerify(inputCode);
      }}
    >
      <h2>Verify code</h2>
      <p className="subtitle">Verification code has been sent to your email address</p>
      <div className="form-group">
        <input
          type="number"
          required
          name="verifyCode"
          placeholder=""
          minLength="6"
          onChange={(e) => setInputCode(e.target.value)}
          disabled={loading}
        />
        <label>Enter 6 digit code</label>
      </div>
      <button type="submit" className="auth-btn" disabled={loading}>
        Verify
      </button>
     
    </form>
     <div className="verify-footer">
        <p className="verify-text">
          Didn’t get the code?
          <button className="verify-link" onClick={async()=>await sendMail()} disabled={timer} >Resend  {timer!==0 && `in ${timer}s`}</button>
        </p>
        <p className="verify-text">
          Wrong email?
          <button className="verify-link" onClick={()=>setIsCodeSend(false)}>Change</button>
        </p>
      </div></>
  );
};

export default VerifyCode;
