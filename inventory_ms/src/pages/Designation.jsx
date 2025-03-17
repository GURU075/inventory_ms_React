import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import config from "../config";

const Designation = () => {
  const [designations, setdesignations] = useState([
    // { designationId: 1, designationName: "Admin", designationDesc: "admin...", canEdit: true, canDelete: true, canAdd: true, canView: true },
    // { designationId: 2, designationName: "User", designationDesc: "user.....", canEdit: true, canDelete: true, canAdd: true, canView: true },
    // { designationId: 3, designationName: "Viewer", designationDesc: "Read only", canEdit: true, canDelete: true, canAdd: true, canView: true },
  ]);


  const fetchdesignations = async () => {
    try {
      const response = await axios.get(`${config.backendUrl}/Designation/getAllDesignation`)
      setdesignations(response.data);
    } catch (error) {
      console.error("Error fetching designations:", error);
      alert("Failed to fetch designations. Please try again later.");
    }
  };

  useEffect(() => {
    fetchdesignations();
  }, []);

  const [newDesignation, setNewDesignation] = useState({ designationName: "", designationDesc: "" });
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [viewDesignationPopup, setviewDesignationPopup] = useState({ isOpen: false, des: null });
  const [editDesignationPopup, seteditDesignationPopup] = useState({ isOpen: false, des: null });
  const [showAlert, setShowAlert] = useState(false);

  const deleteDesignation = async (designationId) => {
    try {
      await axios.delete(`${config.backendUrl}/Designation/deleteDesignation/${designationId}`)
      fetchdesignations();
    } catch (error) {
      console.log("error deleting Designation", error);
      alert("Failed to delete Designation. Please try again.");
    }

  };

  const handleAddDes = async () => {
    try {
      const response = await axios.post(`${config.backendUrl}/Designation/addDesignation`, {
        designationName: newDesignation.designationName,
        designationDesc: newDesignation.designationDesc,

      });
      const addedDes = response.data;

      // Update the designations state with the newly added role
      setdesignations([...designations, addedDes]);

      // Reset the form and close the popup
      setNewDesignation({
        designationName: "",
        designationDesc: "",

      });
      setIsAddPopupOpen(false);
      fetchdesignations();

      // Show success alert
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    } catch (error) {
      console.error("Error adding Designation:", error);
      alert("Failed to add Designation. Please try again.");
    }
  };


  const handleEditDes = async () => {
    try {
      await axios.put(`${config.backendUrl}/Designation/updateDesignation/${editDesignationPopup.des.designationId}`, {
        designationName: editDesignationPopup.des.designationName,
        designationDesc: editDesignationPopup.des.designationDesc
      
      })
      seteditDesignationPopup({ isOpen: false, des: null });
      fetchdesignations();
    } catch (error) {
      console.log("error editing designation", error);
      alert("Failed to edit designation. Please try again.");
    }
  }

  return (
    <>

      <div className="relative mt-8">
        {showAlert &&
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1/3 z-50">
            <div className="alert flex items-center p-4 mb-4 text-sm text-green-500 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 1 1 1 1v4h1a1 1 0 1 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Designation added!</span>
              </div>
            </div>
          </div>
        }
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold mb-4">Designation Management</h1>
          <table className="w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Designation ID</th>
                <th className="border px-4 py-2">Designation Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {designations.map((des) => (
                <tr key={des.designationId}>
                  <td className="border px-4 py-2">{des.designationId}</td>
                  <td className="border px-4 py-2">{des.designationName}</td>
                  <td className="border px-4 py-2">{des.designationDesc}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className="view"
                      onClick={() => setviewDesignationPopup({ isOpen: true, des })}
                    >
                      View
                    </button>
                    <button className="edit"
                      onClick={() => seteditDesignationPopup({ isOpen: true, des })}>Edit</button>
                    <button className="delete" onClick={() => deleteDesignation(des.designationId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button
              className="bg-green-500 text-white px-4 py-2 mr-3 mt-5 rounded-md hover:bg-green-600"

            >
              Back
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 mt-5 rounded-md hover:bg-green-600"
              onClick={() => setIsAddPopupOpen(true)}
            >
              Add Designation
            </button>
          </div>
        </div>
      </div>

      {/* Add Designation Popup */}
      <Popup open={isAddPopupOpen} onClose={() => setIsAddPopupOpen(false)} modal nested >
        <div className=" p-6 rounded-lg shadow-md w-96  justify-self-center  " >
          <h2 className="text-lg font-bold mb-4">Add New Designation</h2>
          {/* Add Designation Form */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Designation Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

              onChange={(e) => setNewDesignation({ ...newDesignation, designationName: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Designation Description</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

              onChange={(e) => setNewDesignation({ ...newDesignation, designationDesc: e.target.value })}
            />
          </div>
         
          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              onClick={() => setIsAddPopupOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleAddDes}
            >
              Add Designation
            </button>
          </div>
        </div>
      </Popup >

      {/* View Designation Popup */}
      <Popup open={viewDesignationPopup.isOpen} onClose={() => setviewDesignationPopup({ isOpen: false, des: null })} modal nested closeOnDocumentClick={true}>

        {close => (
          viewDesignationPopup.des && (

            <div className=" p-6 rounded-lg shadow-md w-100 width-full h-96">

              <button className="absolute top-2 right-2 bg-slate-200 hover:bg-slate-300" onClick={close}>
                &times;
              </button>
              <h2 className="text-xl pb-4 font-bold mb-4">View Designation Details</h2>
              <p>
                <strong className="pr-2 pl-10">Designation ID:</strong> {viewDesignationPopup.des.designationId}
              </p>
              <p>
                <strong className="pl-10 pr-2">Designation Name:</strong> {viewDesignationPopup.des.designationName}
              </p>
              <p>
                <strong className="pl-10 pr-2">Description:</strong> {viewDesignationPopup.des.designationDesc}
              </p>
              <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 absolute bottom-4 right-4  "
                  onClick={close}
                >
                 Back
                </button>

            </div>
          )
        )}
      </Popup>
      <Popup open={editDesignationPopup.isOpen} onClose={() => seteditDesignationPopup({ isOpen: false, des: null })}>
        {close => (
          editDesignationPopup.des && (
            <div className="h-96">
              <button className="absolute top-2 right-2 bg-slate-200 hover:bg-slate-300" onClick={close}>
                &times;
              </button>
              <div className="">
                <h2 className="text-xl  font-bold p-5  top-3 left-3" >Edit</h2>
                <p>
                  <strong className="pr-9 pl-10 font-medium ">Designation ID:</strong>
                  <input className=" px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 field left mb-2" type="text"
                    value={editDesignationPopup.des.designationId}
                    readOnly
                  />

                </p>
                <p>
                  <strong className="pr-2 pl-10  font-medium ">Designation Name:</strong>
                  <input className=" px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 field left mb-2" type="text"
                    value={editDesignationPopup.des.designationName}
                    onChange={(e) => seteditDesignationPopup({
                      ...editDesignationPopup,
                      des: { ...editDesignationPopup.des, designationName: e.target.value }
                    })} />
                </p>
                <p>
                  <strong className="pr-2 pl-10 font-medium">Designation Description:</strong>
                  <input
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    name="designationDesc"
                    value={editDesignationPopup.des.designationDesc}
                    onChange={(e) => seteditDesignationPopup({
                      ...editDesignationPopup,
                      des: { ...editDesignationPopup.des, designationDesc: e.target.value }
                    })}
                  />
                </p>
                <div className="flex justify-end items-center gap-2 absolute bottom-2 right-2 ">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600  "
                 onClick={close}
                >
                  Back
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 "
                  onClick={handleEditDes}
                >
                  Save
                </button>
                </div>
              
              </div>
            </div>
          )
        )

        }

      </Popup>
    </>
  );
};

export default Designation;
