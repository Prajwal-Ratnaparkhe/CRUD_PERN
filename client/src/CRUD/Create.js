import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = ({ show, handleClose }) => {
  const [newEmp, setNewEmp] = useState({
    fullname: "",
    email: "",
    mobile: "",
    gender: "",
    department: "",
    salary: "",
    joining_date: "",
    location: "",
  });

  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    var tokenFromStorage = localStorage.getItem("token");
    var idFromStorage = localStorage.getItem("id");

    if (tokenFromStorage && idFromStorage) {
      setToken(tokenFromStorage);
      setId(idFromStorage);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmp((prevEmp) => ({
      ...prevEmp,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const formattedEmp = {
        ...newEmp,
        joining_date: formatDate(newEmp.joining_date),
      };

      const response = await axios.post(
        `http://localhost:5000/api/crud/create/emp/${id}`,

        formattedEmp,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Employee create successfully:", response.data);
      toast.success(response.data.msg);
      setNewEmp({
        fullname: "",
        email: "",
        mobile: "",
        gender: "",
        department: "",
        salary: "",
        joining_date: "",
        location: "",
      });
      window.location.reload();
      handleClose();
    } catch (error) {
      console.error("Error creating employee:", error);
      toast.error(error.response.data.msg);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle cases where the date is not provided

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="fullname">Full Name:</label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                name="fullname"
                value={newEmp.fullname}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={newEmp.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile:</label>
              <input
                type="Number"
                className="form-control"
                id="mobile"
                name="mobile"
                value={newEmp.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select
                className="form-control"
                id="gender"
                name="gender"
                value={newEmp.gender}
                onChange={handleChange}
              >
                <option value="select" selected>
                  Select
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="department">Department:</label>
              <select
                className="form-control"
                id="department"
                name="department"
                value={newEmp.department}
                onChange={handleChange}
              >
                <option value="select" selected>
                  Select
                </option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Developer">Developer</option>
                <option value="Tester">Tester</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="salary">Salary:</label>
              <input
                type="Number"
                className="form-control"
                id="salary"
                name="salary"
                value={newEmp.salary}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Joining Date:</label>
              <input
                className="mx-3"
                type="date"
                id="date"
                name="joining_date"
                value={formatDate(newEmp.joining_date)}
                onChange={handleChange}
                max="9999-12-31"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={newEmp.location}
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Create;
