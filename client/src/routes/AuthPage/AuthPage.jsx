import { Image } from "@imagekit/react";
import "./AuthPage.css";
import { useState } from "react";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className="authPage">
      <div className="authContainer">
        <Image src="/general/logo.png" width={36} />
        <h1>{isRegister ? "Create an Account" : "Login to your account"}</h1>
        {isRegister ? (
          <form key={"register"}>
            <div className="formGroup">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                required
                name="username"
                id="username"
                placeholder="Username"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="displayName">Name</label>
              <input
                type="displayName"
                required
                name="displayName"
                id="displayName"
                placeholder="Display Name"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                required
                name="email"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                required
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <button type="submit">Register</button>
            <p onClick={() => setIsRegister(false)}>
              {" "}
              Already have an account? <b>Login</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          <form key={"login"}>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                required
                name="email"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                required
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <button type="submit">Login</button>
            <p onClick={() => setIsRegister(true)}>
              {" "}
              Don&apos;t have an account? <b>Register</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};
export default AuthPage;
