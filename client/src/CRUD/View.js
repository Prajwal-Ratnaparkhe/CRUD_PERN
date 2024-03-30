import React from "react";
import { Button, Modal } from "react-bootstrap";

const View = ({ show, handleClose, emp }) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Name:</strong> {emp.fullname}
          </p>
          <p>
            <strong>Email:</strong> {emp.email}
          </p>
          <p>
            <strong>Mobile:</strong> {emp.mobile}
          </p>
          <p>
            <strong>Gender:</strong> {emp.gender}
          </p>
          <p>
            <strong>Demartment:</strong> {emp.department}
          </p>
          <p>
            <strong>Salary:</strong> {emp.salary}
          </p>
          <p>
            <strong>Joining Date:</strong> {emp.joining_date}
          </p>
          <p>
            <strong>Location:</strong> {emp.location}
          </p>
          <p>
            <strong>Manager ID:</strong> {emp.manager_id}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default View;
