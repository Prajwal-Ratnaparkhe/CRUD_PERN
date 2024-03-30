import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [Loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handelsubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = data;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/activity/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data._id);
      setToken(response.data.token);
      setLoading(false);
      toast.success("Login Successfully!");
      navigate("/crud");
    } catch (error) {
      toast.error(error.response.data.msg);
      console.error("Login failed:", error);
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ToastContainer />
      <div id="main-wrapper" className="container py-3">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card border-0">
              <div className="card-body p-0">
                <div className="row no-gutters">
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="mb-5">
                        <h3 className="h4 font-weight-bold text-theme">
                          Login
                        </h3>
                      </div>

                      <h6 className="h5 mb-0">Welcome back!</h6>
                      <p className="text-muted mt-2 mb-5">
                        Enter your email address and password to access admin
                        panel.
                      </p>

                      <form>
                        <div className="form-group py-2">
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <input
                            type="email"
                            id="inputEmail"
                            className="form-control my-2"
                            placeholder="Email address"
                            required
                            autoFocus
                            value={data.email}
                            onChange={(e) =>
                              setData({ ...data, email: e.target.value })
                            }
                          />
                        </div>
                        <div className="form-group mb-5">
                          <label htmlFor="exampleInputPassword1">
                            Password
                          </label>
                          <div className="password-input-container">
                            <input
                              id="inputPassword"
                              className="form-control my-2"
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              required
                              value={data.password}
                              onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                              }
                            />
                            <FontAwesomeIcon
                              icon={showPassword ? faEye : faEyeSlash}
                              className="password-toggle-icon"
                              onClick={togglePasswordVisibility}
                            />
                          </div>
                        </div>

                        {Loading ? (
                          <button
                            className="btn btn-primary mx-3"
                            type="button"
                            disabled
                          >
                            <span
                              className="spinner-border spinner-border-sm"
                              aria-hidden="true"
                            ></span>
                            <span role="status">Loading...</span>
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary mx-3"
                            type="button"
                            onClick={handelsubmit}
                          >
                            Login
                          </button>
                        )}

                        <a
                          href="#l"
                          className="forgot-link float-right text-primary"
                        >
                          Forgot password?
                        </a>
                      </form>
                    </div>
                  </div>

                  <div className="col-lg-6 d-none d-lg-inline-block">
                    <div className="account-block rounded-right">
                      <div className="overlay rounded-right"></div>
                      <div className="account-testimonial">
                        <h4 className="text-white mb-4">
                          This beautiful theme yours!
                        </h4>
                        <p className="lead text-white">
                          "Best investment i made for a long time. Can only
                          recommend it for other users."
                        </p>
                        <p>- Admin User</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted text-center mt-3 mb-0">
              Don't have an account? <Link to="/register">register</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
