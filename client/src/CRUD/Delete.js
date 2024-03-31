import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Delete = ({ show, handleClose, emp }) => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    var tokenFromStorage = localStorage.getItem("token");
    var idFromStorage = localStorage.getItem("id");

    if (tokenFromStorage && idFromStorage) {
      setToken(tokenFromStorage);
      setId(idFromStorage);
    }
  }, [emp]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/crud/delete/${emp.emp_id}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Employee upddata delete successfully:", response.data);
      toast.success(response.data.msg);
      window.location.reload();
      handleClose();
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error(error.data.msg);
    }
    console.log("Deleting student:", emp);
    handleClose();
  };

  return (
    <div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Delete;
