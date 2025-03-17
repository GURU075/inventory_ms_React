import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
// import "./index.css";
import axios from "axios";
import config from "../config";
import styled from "styled-components";
import UserRegistrationForm from "../components/UserRegistrationForm";
import UserView from "../components/UserView";
import UserEditForm from "../components/UserEditForm";


const User = () => {
    const [users, setUsers] = useState([]);
   

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/User/getAllUsers`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users. Please try again later.");
      }
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);

    const [formData, setFormData] = useState({
      userFirstName: "",
      userMiddleName: "",
      userLastName: "",
      userLoginName: "",
      userLoginPassword: "",
      userEmail: "",
      userAddress: "",
      userMobile: "",
      userGender: "",
      userStatus: "",
      role: { roleId: '', roleName: '' },
      department: { deptId: '', deptName: '' },
      userCity: "",
      userState: "",
      userZipCode: "",
      userCountry: "",
      userDateOfBirth: "",
    });
  
    
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [isEditUserPopup, setEditUserPopup] = useState({ isOpen: false, user: null });
    const [isViewUserPopup, setViewUserPopup] = useState({ isOpen: false, user: null });
    const [showAlert, setShowAlert] = useState(false);

     const [roles, setRoles] = useState([]);
      const [departments, setDepartments] = useState([]);
      
    
      const fetchRoles= async () => {
        try {
          const response = await axios.get(`${config.backendUrl}/role/getAllRoles`);
          setRoles(response.data);
        } catch (error) {
          console.error("Error fetching roles:", error);
          alert("Failed to fetch roles. Please try again later.");
        }
      };
    
      const fetchDepartments= async () => {
        try {
          const response = await axios.get(`${config.backendUrl}/Department/getAllDepartments`);
          setDepartments(response.data);
          console.log(departments);
        } catch (error) {
          console.error("Error fetching Department:", error);
          alert("Failed to fetch Department. Please try again later.");
        }
      };
  
    const deleteUser = async (userId) => {
      try {
        await axios.delete(`${config.backendUrl}/User/deleteUser/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
    };
  const handleAddUser = async () => {
      try {
        const response = await axios.post(`${config.backendUrl}/User/addUser`, {
          userFirstName: formData.userFirstName,
          userMiddleName: formData.userMiddleName,
          userLastName: formData.userLastName,
          userLoginName: formData.userLoginName,
          userLoginPassword: formData.userLoginPassword,
          userEmail: formData.userEmail,
          userAddress: formData.userAddress,
          userMobile: formData.userMobile,
          userGender: formData.userGender,
          userStatus: formData.userStatus,
          role: { roleId: formData.role.roleId, roleName: formData.role.roleName },
          department: { deptId: formData.department.deptId , deptName: formData.department.deptName },
          userCity: formData.userCity,
          userState: formData.userState,
          userZipCode: formData.userZipCode,
          userCountry: formData.userCountry,
          userDateOfBirth: formData.userDateOfBirth,
  
        });
        const addedUser = response.data;
        // console.log(formData);
  
        // Update the designations state with the newly added role
        setFormData([...users, addedUser]);
  
        // Reset the form and close the popup
        setFormData({
          userFirstName: "",
          userMiddleName: "",
          userLastName: "",
          userLoginName: "",
          userLoginPassword: "",
          userEmail: "",
          userAddress: "",
          userMobile: "",
          userGender: "",
          userStatus: "",
          role: { roleId: '', roleName: '' },
          department: { deptId: '', deptName: '' },
          userCity: "",
          userState: "",
          userZipCode: "",
          userCountry: "",
          userDateOfBirth: "",
        });
        setIsAddPopupOpen(false);
        // fetchdesignations();
  
        // Show success alert
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
      } catch (error) {
        console.error("Error adding Designation:", error);
        alert("Failed to add Designation. Please try again.");
      }
    };
  
    const handleEditUser = async () => {
      try {
        await axios.put(`${config.backendUrl}/User/updateUser/${isEditUserPopup.user.userId}`, isEditUserPopup.user);
        setEditUserPopup({ isOpen: false, user: null });
        fetchUsers();
      } catch (error) {
        console.error("Error editing user:", error);
        alert("Failed to edit user. Please try again.");
      }
    };
  
    return (
      <>
        <div className="relative mt-10 ">
          {showAlert && (
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1/3 z-50">
              <div
                className="alert flex items-center p-4 mb-4 text-sm text-green-500 border border-green-300 rounded-lg bg-green-50"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 mr-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 1 1 1 1v4h1a1 1 0 1 1 0 2Z" />
                </svg>
                <div>
                  <span className="font-medium">User added successfully!</span>
                </div>
              </div>
            </div>
          )}
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 ">
            <h1 className="text-xl font-bold mb-6">User Management</h1>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">User ID</th>
                  <th className="border px-4 py-2">First Name</th>
                  <th className="border px-4 py-2">Mobile</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.userId}>
                    <td className="border px-4 py-2">{user.userId}</td>
                    <td className="border px-4 py-2">{user.userFirstName}</td>
                    <td className="border px-4 py-2">{user.userMobile}</td>
                    <td className="border px-4 py-2">{user.userEmail}</td>
                    <td className="border px-4 py-2 space-x-2">
                    <button
                        className="view"
                        onClick={() => setViewUserPopup({ isOpen: true, user })}
                      >
                        View
                      </button>
                      <button
                        className="edit"
                        onClick={() => setEditUserPopup({ isOpen: true, user })}
                      >
                        Edit
                      </button>
                      <button
                       className="delete"
                        onClick={() => deleteUser(user.userId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="bg-green-500 text-white px-4 py-2 mt-5 rounded-md hover:bg-green-600"
              onClick={() => setIsAddPopupOpen(true)}
            >
              Add User
            </button>
          </div>
        </div>
  
        {/* Add User Popup */}
        <Popup
  open={isAddPopupOpen}
  onClose={() => setIsAddPopupOpen(false)}
  modal
  nested
  className="my-popup-content"
  overlayClassName="my-popup-overlay"
  arrowClassName="my-popup-arrow"
>
  <div className="p-6 rounded-lg shadow-md w-[40rem] max-h-[80vh] overflow-y-auto bg-white">
   

    {/* Render UserRegistration Component */}
    <UserRegistrationForm 
      // newUser={newUser} 
      setFormData={setFormData} 
      formData={formData}
      handleAddUser={handleAddUser} 
      setIsAddPopupOpen={setIsAddPopupOpen}
      fetchRoles={fetchRoles}
      fetchDepartments={fetchDepartments}
      roles={roles}
      departments={departments}
    />

   
  </div>
</Popup>
<Popup
   open={isViewUserPopup.isOpen}
   onClose={()=>setViewUserPopup.isOpen(false)}
   modal
   nested

>
  <div className="p-6 rounded-lg shadow-md w-[40rem] max-h-[80vh] overflow-y-auto bg-white">

    <UserView
      isViewUserPopup={isViewUserPopup}
      setViewUserPopup={setViewUserPopup}

    />

  </div>
  
</Popup>
          <Popup
          open={isEditUserPopup.isOpen}
          onClose={()=>setEditUserPopup.isOpen(false)}
          modal
          nested
          >
            <div className="p-6 rounded-lg shadow-md w-[40rem] max-h-[80vh] overflow-y-auto bg-white">
                 <UserEditForm
                  isEditUserPopup ={isEditUserPopup}
                  setEditUserPopup={setEditUserPopup}
                  fetchRoles={fetchRoles}
                 fetchDepartments={fetchDepartments}
                  roles={roles}
                  departments={departments}
                  handleEditUser={handleEditUser}
                 />

              

            </div>
          </Popup>
        {/* Edit User Popup}
      <Popup open={editUserPopup.isOpen} onClose={() => setEditUserPopup({ isOpen: false, user: null })} modal nested>
        {editUserPopup.user && (
          <div className="p-6 rounded-lg shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">First Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editUserPopup.user.userFirstName}
                onChange={(e) =>
                  setEditUserPopup({
                    ...editUserPopup,
                    user: { ...editUserPopup.user, userFirstName: e.target.value },
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Mobile</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editUserPopup.user.userMobile}
                onChange={(e) =>
                  setEditUserPopup({
                    ...editUserPopup,
                    user: { ...editUserPopup.user, userMobile: e.target.value },
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editUserPopup.user.userEmail}
                onChange={(e) =>
                  setEditUserPopup({
                    ...editUserPopup,
                    user: { ...editUserPopup.user, userEmail: e.target.value },
                  })
                }
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => setEditUserPopup({ isOpen: false, user: null })}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleEditUser}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Popup> */}
    </>
  );
};

export default User;
