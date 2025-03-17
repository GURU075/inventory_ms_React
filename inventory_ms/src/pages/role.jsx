import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import config from "../config";

const RolePage = () => {
  const [roles, setRoles] = useState([
    // { roleId: 1, roleName: "Admin", roleDesc: "admin...", canEdit: true, canDelete: true, canAdd: true, canView: true },
    // { roleId: 2, roleName: "User", roleDesc: "user.....", canEdit: true, canDelete: true, canAdd: true, canView: true },
    // { roleId: 3, roleName: "Viewer", roleDesc: "Read only", canEdit: true, canDelete: true, canAdd: true, canView: true },
  ]);

 
    const fetchRoles = async () =>{
        try {
            const response = await axios.get(`${config.backendUrl}/role/getAllRoles`)
            setRoles(response.data);
        } catch (error) {
            console.error("Error fetching roles:", error);
        alert("Failed to fetch roles. Please try again later.");
        }
    };

    useEffect(() => {
        fetchRoles();
      }, []);

  const [newRole, setNewRole] = useState({ roleName: "", roleDesc: "", canEdit: false, canDelete: false, canAdd: false, canView: false });
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [viewRolePopup, setViewRolePopup] = useState({ isOpen: false, role: null });
  const [editRolePopup , setEditRolePopup] = useState({isOpen:false , role:null});
  const [showAlert, setShowAlert] = useState(false);

  const deleteRole = async (roleId) => {
    try {
        // setRoles(roles.filter((role) => role.roleId !== roleId));
        await axios.delete(`${config.backendUrl}/role/deleteRole/${roleId}`)
        fetchRoles();
    } catch (error) {
        console.log("error deleting role",error);
        alert("Failed to delete role. Please try again.");
    }
    
  };

//   const handleAddRole = async () => {
   
//     const newroleId = roles.length ? roles[roles.length - 1].roleId + 1 : 1;
//     setRoles([...roles, { roleId: newroleId, ...newRole }]);
//     setNewRole({ roleName: "", roleDesc: "", canEdit: false, canDelete: false, canAdd: false, canView: false });
//     setIsAddPopupOpen(false); // Close the popup
//     setShowAlert(true);
//     setTimeout(() => {
//       setShowAlert(false);
//     }, 2000);
//   };

const handleAddRole = async () => {
    try {
      const response = await axios.post(`${config.backendUrl}/role/addRole`, {
        roleName: newRole.roleName,
        roleDesc: newRole.roleDesc,
        canEdit: newRole.canEdit,
        canDelete: newRole.canDelete,
        canAdd: newRole.canAdd,
        canView: newRole.canView,
      });
      const addedRole = response.data;

      // Update the roles state with the newly added role
      setRoles([...roles, addedRole]);

      // Reset the form and close the popup
      setNewRole({
        roleName: "",
        roleDesc: "",
        canEdit: false,
        canDelete: false,
        canAdd: false,
        canView: false,
      });
      setIsAddPopupOpen(false);
      fetchRoles();

      // Show success alert
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    } catch (error) {
      console.error("Error adding role:", error);
      alert("Failed to add role. Please try again.");
    }
  };


  const handleEditRole =async () =>{
    try {
        await axios.put(`${config.backendUrl}/role/updateRole/${editRolePopup.role.roleId}`,{
            roleName: editRolePopup.role.roleName,
            roleDesc: editRolePopup.role.roleDesc,
            canEdit: editRolePopup.role.canEdit,
            canDelete: editRolePopup.role.canDelete,
            canAdd: editRolePopup.role.canAdd,
            canView: editRolePopup.role.canView,
        })
        setEditRolePopup({ isOpen: false, role: null });
        fetchRoles();
    } catch (error) {
        console.log("error editing role",error);
        alert("Failed to edit role. Please try again.");
    }
    // setRoles(
    //     roles.map((role) =>
    //       role.roleId === editRolePopup.role.roleId ? editRolePopup.role : role
    //     )
    //   );
    
    //   setEditRolePopup({ isOpen: false, role: null });
     
  }
  
  return (
    <>
       
      <div className="relative mt-8">
      {showAlert && 
    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1/3 z-50">
      <div className="alert flex items-center p-4 mb-4 text-sm text-green-500 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 1 1 1 1v4h1a1 1 0 1 1 0 2Z"/>
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Role added!</span> 
        </div>
      </div>
    </div>
  }
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold mb-4">Role Management</h1>
          <table className="w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Role ID</th>
                <th className="border px-4 py-2">Role Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.roleId}>
                  <td className="border px-4 py-2">{role.roleId}</td>
                  <td className="border px-4 py-2">{role.roleName}</td>
                  <td className="border px-4 py-2">{role.roleDesc}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className="view"
                      onClick={() => setViewRolePopup({ isOpen: true, role })}
                    >
                      View
                    </button>
                    <button className="edit"
                    onClick={()=>setEditRolePopup({ isOpen: true, role })}>Edit</button>
                    <button className="delete" onClick={() => deleteRole(role.roleId)}>
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
            Add Role
          </button>
         </div>
        </div>
      </div>

      {/* Add Role Popup */}
      <Popup open={isAddPopupOpen} onClose={() => setIsAddPopupOpen(false)} modal nested >
        <div className=" p-6 rounded-lg shadow-md w-96  justify-self-center  " >
          <h2 className="text-lg font-bold mb-4">Add New Role</h2>
          {/* Add Role Form */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Role Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              
              onChange={(e) => setNewRole({ ...newRole, roleName: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Role Description</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
             
              onChange={(e) => setNewRole({ ...newRole, roleDesc: e.target.value })}
            />
          </div>
          {/* Permissions */}
          <div className="mb-4">
            <h3 className="text-gray-700 font-medium mb-2">Permissions</h3>
            {["canEdit", "canDelete", "canAdd", "canView"].map((perm) => (
              <div className="flex items-center mb-2" key={perm}>
                <input
                  type="checkbox"
                 
                  onChange={(e) => setNewRole({ ...newRole, [perm]: e.target.checked })}
                />
                <label className="ml-2 capitalize">{perm.replace("can", "Can ")}</label>
              </div>
            ))}
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
              onClick={handleAddRole}
            >
              Add Role
            </button>
          </div>
        </div>
      </Popup >

      {/* View Role Popup */}
      <Popup open={viewRolePopup.isOpen} onClose={() => setViewRolePopup({ isOpen: false, role: null })} modal nested  closeOnDocumentClick={true}>
      
     { close => (
        viewRolePopup.role && (
            
          <div className=" p-6 rounded-lg shadow-md w-100 width-full ">
            
          <button className="absolute top-2 right-2 bg-slate-200 hover:bg-slate-300" onClick={close}>
          &times;
        </button>
            <h2 className="text-xl pb-4 font-bold mb-4">View Role Details</h2>
            <p>
              <strong className="pr-2 pl-10">Role ID:</strong> {viewRolePopup.role.roleId}
            </p>
            <p>
              <strong className="pl-10 pr-2">Role Name:</strong> {viewRolePopup.role.roleName}
            </p>
            <p>
              <strong className="pl-10 pr-2">Description:</strong> {viewRolePopup.role.roleDesc}
            </p>
            <h3 className="mt-4 font-medium pl-5" >Permissions</h3>
            <ul className="list-disc list-inside pl-10">
              {["canEdit", "canDelete", "canAdd", "canView"].map((perm) => (
                <li key={perm}>
                  {perm.replace("can", "Can ")}: {viewRolePopup.role[perm] ? "Yes" : "No"}
                </li>
              ))}
            </ul>
          </div>
        )
    )}
      </Popup>
      <Popup open={editRolePopup.isOpen} onClose={() => setEditRolePopup({ isOpen: false, role: null })}>
            {close =>(
                editRolePopup.role&&(
                   <div>
                         <button className="absolute top-2 right-2 bg-slate-200 hover:bg-slate-300" onClick={close}>
          &times;
        </button>
        <div className="">
           <h2 className="text-xl  font-bold p-5  top-3 left-3" >Edit</h2>
           <p>
            <strong className="pr-9 pl-10 font-medium ">Role ID:</strong>
            <input className=" px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 field left mb-2" type="text"
             value={editRolePopup.role.roleId} 
             readOnly
             />
             
           </p>
           <p>
            <strong className="pr-2 pl-10  font-medium ">Role Name:</strong>
            <input  className=" px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 field left mb-2" type="text"
             value={editRolePopup.role.roleName} 
             onChange={(e) => setEditRolePopup({ ...editRolePopup,
               role:{...editRolePopup.role ,roleName: e.target.value} })}   />
           </p>
           <p>
        <strong className="pr-2 pl-10 font-medium">Role Description:</strong>
        <input
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          name="roleDesc"
          value={editRolePopup.role.roleDesc}
          onChange={(e) => setEditRolePopup({ ...editRolePopup,
            role:{...editRolePopup.role ,roleDesc: e.target.value}
           })}
        />
      </p>
         <div>
           <h3 className="mt-4 font-medium pl-6 mb-2">Permissions</h3>
      <div className="pl-10 mb-10">
      {["canEdit", "canDelete", "canAdd", "canView"].map((perm) => (
                <div className="flex items-center mb-2" key={perm}>
                  <input
                    type="checkbox"
                    checked={editRolePopup.role[perm]}
                    onChange={(e) =>
                      setEditRolePopup({
                        ...editRolePopup,
                        role: { ...editRolePopup.role, [perm]: e.target.checked },
                      })
                    }
                  />
                  <label className="ml-2 capitalize">{perm.replace("can", "Can ")}</label>
                </div>
              ))}
        </div>
        </div>
           <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 absolute bottom-2 right-2 "
              onClick={handleEditRole}
            >
              Save
            </button>
                   </div>
                   </div>      
                )
            )
            
            }
            
      </Popup>
    </>
  );
};

export default RolePage;
