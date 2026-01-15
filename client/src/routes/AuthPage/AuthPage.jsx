import { Image } from "@imagekit/react";
import "./AuthPage.css";
import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router";
import useAuthStore from "../../utils/authStore";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setCurrentUser } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await api.post(
        `/users/${isRegister ? "register" : "login"}`,
        data
      );
      setCurrentUser(res.data);
      navigate("/");
    } catch (e) {
      setError(e.response.data.message);
    }
  };
  return (
    <div className="authPage">
      <div className="authContainer">
        <Image src="/general/logo.png" width={36} />
        <h1>{isRegister ? "Create an Account" : "Login to your account"}</h1>
        {isRegister ? (
          <form key={"register"} onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                required
                name="userName"
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
            {error && <h4 className="error">{error}</h4>}
          </form>
        ) : (
          <form key={"login"} onSubmit={handleSubmit}>
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
            {error && <h4 className="error">{error}</h4>}
          </form>
        )}
      </div>
    </div>
  );
};
export default AuthPage;
