import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import Delete from "./Delete";
import View from "./View";
import Edit from "./Edit";
import Create from "./Create";

const Main = () => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [text, setText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    const idFromStorage = localStorage.getItem("id");

    if (tokenFromStorage && idFromStorage) {
      setToken(tokenFromStorage);
      setId(idFromStorage);
      fetchProfiles(idFromStorage, tokenFromStorage);
    }
  }, []);

  useEffect(() => {
    if (data) {
      const filteredData = data.filter((emp) =>
        emp?.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp?.mobile?.includes(searchQuery.toLowerCase()) ||
        emp?.department?.toLowerCase().includes(searchQuery.toLowerCase()) 
      );
      setSearchResults(filteredData);
    }
  }, [searchQuery, data]);

  const fetchProfiles = async (id, token) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/crud/view/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  const handleView = (emp) => {
    setSelectedEmp(emp);
    setShowViewModal(true);
  };

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const handleEdit = (emp) => {
    setSelectedEmp(emp);
    setShowEditModal(true);
  };

  const handleDelete = (emp) => {
    setSelectedEmp(emp);
    setShowDeleteModal(true);
  };

  return (
    <div>
      <div className="container">
        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
          <div className="row">
            <div className="col-sm-4">
              <div className="search text-gred">
                <form className="form-inline">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search Student"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
            </div>

            <div className="col-sm-4">
              <h2 className="text-center">Employee Details</h2>
            </div>

            <div className="col-sm-4 text-end">
              <Button variant="primary" onClick={handleCreate}>
                Add New Employee
              </Button>
            </div>
          </div>

          <div className="container">
            {(!Array.isArray(data) &&
              data.length === 0 &&
              searchResults.length === 0) && (
              <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                  <h1 className="display-1 fw-bold">204</h1>
                  <p className="fs-3">
                    <span className="text-danger">Oops!</span> Currently, there
                    are no items found.
                  </p>
                  <p className="lead">Please come back after sometime..</p>
                </div>
              </div>
            )}

            {searchResults.length > 0 ? (
              <div className="row my-5">
                <div className="table-responsive">
                  <table className="table table-striped table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Emp_ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Department</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((emp) => (
                        <tr key={emp.emp_id}>
                          <td>{emp.emp_id}</td>
                          <td>{emp.fullname}</td>
                          <td>{emp.email}</td>
                          <td>{emp.mobile}</td>
                          <td>{emp.department}</td>
                          <td>
                            <button
                              className="view"
                              title="View"
                              style={{ color: "#10ab80", border: "none" }}
                              onClick={() => handleView(emp)}
                            >
                              <i className="material-icons">
                                <PreviewIcon />
                              </i>{" "}
                              View
                            </button>
                            <button
                              className="edit"
                              title="Edit"
                              style={{ color: "blue", border: "none" }}
                              onClick={() => handleEdit(emp)}
                            >
                              <i className="material-icons">
                                <EditIcon />
                              </i>{" "}
                              Edit
                            </button>
                            <button
                              className="delete"
                              title="Delete"
                              style={{ color: "red", border: "none" }}
                              onClick={() => handleDelete(emp)}
                            >
                              <i className="material-icons">
                                <DeleteIcon />
                              </i>{" "}
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center my-5">
                <div className="text-center">
                  <p className="fs-3">No elements match your search.</p>
                </div>
              </div>
            )}
          </div>

          {/* View Modal */}
          {selectedEmp && (
            <View
              show={showViewModal}
              handleClose={() => setShowViewModal(false)}
              emp={selectedEmp}
            />
          )}

          {/* Create Modal */}
          <Create
            show={showCreateModal}
            handleClose={() => setShowCreateModal(false)}
            fetchData={() => fetchProfiles()}
          />

          {/* Edit Modal */}
          {selectedEmp && (
            <Edit
              show={showEditModal}
              handleClose={() => setShowEditModal(false)}
              emp={selectedEmp}
              fetchData={() => fetchProfiles(id, token)}
            />
          )}
          {/* Delete Modal */}
          <Delete
            show={showDeleteModal}
            handleClose={() => setShowDeleteModal(false)}
            emp={selectedEmp}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
