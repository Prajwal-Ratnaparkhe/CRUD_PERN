import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = ({ show, handleClose, emp, fetchData }) => {
  const [editedEmp, setEditedEmp] = useState(emp);
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    const idFromStorage = localStorage.getItem("id");

    if (tokenFromStorage && idFromStorage) {
      setToken(tokenFromStorage);
      setId(idFromStorage);
    }

    setEditedEmp(emp);
  }, [emp]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmp((prevEmp) => ({
      ...prevEmp,
      [name]: value,
    }));
  };

  const handleUpdateEmployee = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/crud/update/${editedEmp.emp_id}`,

        editedEmp,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Employee updated successfully:", response.data);
      toast.success(response.data.msg);
      fetchData();
      handleClose();
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error(error.data.msg);
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
     
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
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
                value={editedEmp.fullname || ""}
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
                value={editedEmp.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile:</label>
              <input
                type="text"
                className="form-control"
                id="mobile"
                name="mobile"
                value={editedEmp.mobile || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select
                className="form-control"
                id="gender"
                name="gender"
                value={editedEmp.gender || ""}
                onChange={handleChange}
              >
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
                value={editedEmp.department || ""}
                onChange={handleChange}
              >
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
                value={editedEmp.salary || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Joining Date:</label>
              <input
                className="mx-3"
                type="date"
                id="date"
                name="date"
                value={formatDate(editedEmp.joining_date) || ""}
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
                value={editedEmp.location || ""}
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateEmployee}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Edit;
