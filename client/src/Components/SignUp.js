import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SignUp = () => {
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
    cpassword: "",
  });

  const handleGenderChange = (event) => {
    setData({
      ...data,
      gender: event.target.value, // Update gender value in state
    });
  };

  const handelsubmit = async (e) => {
    const { fullName, email, mobile, gender, password, cpassword } = data;
    if (fullName && mobile && email && gender) {
      if (password === cpassword) {
        e.preventDefault();
        setLoading(true);
        try {
          const { data } = await axios.post(
            "http://localhost:5000/api/activity/register",
            {
              fullName,
              email,
              mobile,
              gender,
              password,
            }
          );
          if (data.error) {
            toast.error(data.error);
          } else {
            // setData({});
            toast.success("Registered Successfully!");
          }
          setLoading(false);
          setData({
            name: "",
            email: "",
            mobile: "",
            gender: "",
            password: "",
            cpassword: "",
          });
          window.location.reload();
        } catch (error) {
          toast.error(error.response.data.msg);
          console.log(error);
          setLoading(false);
        }
      } else {
        toast.error("Both password should be same!");
      }
    } else {
      toast.error("Please fill the data correctly!");
    }
  };

  return (
    <div>

      <div className="container register">
        <div className="row">
          <div className="col-md-3 register-left">
            <img
              src="https://datascientest.com/en/wp-content/uploads/sites/9/2023/11/peinture-MySQL-sur-mur-scaled-1-2048x1536.jpg"
              alt="SQL_img"
            />
            <h3>Welcome</h3>
            <p>You are 30 seconds away from earning your own money!</p>
            <Link to="/login" style={{ color: "white" }}>
              {" "}
              Already user ?
            </Link>
            <br />
          </div>
          <div className="col-md-9 register-right">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <h3 className="register-heading">Apply as a Manager</h3>
                <form>
                  <div className="row register-form">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name *"
                          required
                          value={data.name}
                          onChange={(e) =>
                            setData({ ...data, fullName: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password *"
                          required
                          value={data.name}
                          onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password *"
                          required
                          value={data.name}
                          onChange={(e) =>
                            setData({ ...data, cpassword: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <div className="maxl">
                          <label className="radio inline mx-3">
                            <input
                              type="radio"
                              name="gender"
                              value="male"
                              checked={data.gender === "male"} // Check if gender is 'male'
                              onChange={handleGenderChange} // Handle gender change
                            />
                            <span> Male </span>
                          </label>
                          <label className="radio inline">
                            <input
                              type="radio"
                              name="gender"
                              value="female"
                              checked={data.gender === "female"} // Check if gender is 'female'
                              onChange={handleGenderChange} // Handle gender change
                            />
                            <span>Female </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Your Email *"
                          required
                          value={data.name}
                          onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="tel"
                          minLength="10"
                          maxLength="10"
                          name="txtEmpPhone"
                          className="form-control"
                          placeholder="Your Mobile *"
                          required
                          value={data.name}
                          onChange={(e) =>
                            setData({ ...data, mobile: e.target.value })
                          }
                        />
                      </div>

                      {Loading ? (
                        <button
                        className="btn btn-primary"
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
                          type="button"
                          className="btnRegister"
                          onClick={handelsubmit}
                        >
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
