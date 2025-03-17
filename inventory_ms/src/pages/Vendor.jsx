// import React, { useEffect, useState } from "react";
// import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
// import { httpClient } from "../config";

// const Vendor = () => {
//   const [vendors, setVendors] = useState([
    
//   ]);


//   const fetchVendors = async () => {
//     try {
//       const response = await httpClient.get(`/Vendor/getAllVendors`)
//       setVendors(response.data);
//     } catch (error) {
//       console.error("Error fetching Vendors:", error);
//       alert("Failed to fetch Vendors. Please try again later.");
//     }
//   };

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   const [newVendor, setNewVendor] = useState({ categoryName: "", categoryDesc: "" });
//   const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
//   const [viewPopup, setviewPopup] = useState({ isOpen: false, cat: null });
//   const [editCategoryPopup, seteditCategoryPopup] = useState({ isOpen: false, cat: null });
//   const [showAlert, setShowAlert] = useState(false);

//   const deleteDesignation = async (catId) => {
//     try {
//       await httpClient.delete(`/Category/deleteCategory/${catId}`)
//       fetchvendors();
//     } catch (error) {
//       console.log("error deleting vendors", error);
//       alert("Failed to delete vendors. Please try again.");
//     }

//   };

//   const handleAddVendor = async () => {
//     try {
//       const response = await httpClient.post(`/Category/addCategory`, {
//         categoryName: newVendor.categoryName,
//         categoryDesc: newVendor.categoryDesc,

//       });
//       const addedCat = response.data;

//       // Update the vendors state with the newly added role
//       setVendors([...vendors, addedCat]);

//       // Reset the form and close the popup
//       setNewVendor({
//         categoryName: "",
//         categoryDesc: "",

//       });
//       setIsAddPopupOpen(false);
//       fetchvendors();

//       // Show success alert
//       setShowAlert(true);
//       setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
//     } catch (error) {
//       console.error("Error adding vendors:", error);
//       alert("Failed to add vendors. Please try again.");
//     }
//   };


//   const handleEditCat = async () => {
//     try {
//       await httpClient.put(`/Category/updateCategory/${editCategoryPopup.cat.categoryId}`, {
//         categoryName: editCategoryPopup.cat.categoryName,
//         categoryDesc: editCategoryPopup.cat.categoryDesc
      
//       })
//       seteditCategoryPopup({ isOpen: false, des: null });
//       fetchvendors();
//     } catch (error) {
//       console.log("error editing vendors", error);
//       alert("Failed to edit vendors. Please try again.");
//     }
//   }

//   return (
//     <>

//       <div className="relative mt-8">
//         {showAlert &&
//           <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/5 z-50">
//             <div className="alert flex items-center p-4 mb-4 text-sm text-green-500 border border-green-300 rounded-lg bg-green-50 dark:bg-green-100 dark:text-green-400 dark:border-green-800" role="alert">
//               <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 1 1 1 1v4h1a1 1 0 1 1 0 2Z" />
//               </svg>
//               <span className="sr-only">Info</span>
//               <div>
//                 <span className="font-medium">Vendor added!</span>
//               </div>
//             </div>
//           </div>
//         }
//         <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
//           <h1 className="text-xl font-bold mb-4">Vendor Management</h1>
//           <table className="w-full">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2">Vendor ID</th>
//                 <th className="border px-4 py-2">Category Name</th>
//                 <th className="border px-4 py-2">VendorContactPersonNmber</th>
//                 <th className="border px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {vendors.map((vendor) => (
//                 <tr key={vendor.categoryId}>
//                   <td className="border px-4 py-2">{vendor.categoryId}</td>
//                   <td className="border px-4 py-2">{vendor.categoryName}</td>
//                   <td className="border px-4 py-2">{vendor.categoryDesc}</td>
//                   <td className="border px-4 py-2 space-x-2">
//                     <button
//                       className="view"
//                       onClick={() => setviewPopup({ isOpen: true, vendor })}
//                     >
//                       View
//                     </button>
//                     <button className="edit"
//                       onClick={() => seteditCategoryPopup({ isOpen: true, vendor })}>Edit</button>
//                     <button className="delete" onClick={() => deleteDesignation(vendor.categoryId)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div>
//             <button
//               className="bg-green-500 text-white px-4 py-2 mr-3 mt-5 rounded-md hover:bg-green-600"

//             >
//               Back
//             </button>
//             <button
//               className="bg-green-500 text-white px-4 py-2 mt-5 rounded-md hover:bg-green-600"
//               onClick={() => setIsAddPopupOpen(true)}
//             >
//               Add Category
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Add Category Popup */}
//       <Popup open={isAddPopupOpen} onClose={() => setIsAddPopupOpen(false)} modal nested >
//         <div className=" p-6 rounded-lg shadow-md   w-full h-96  " >
//           <h2 className="text-lg font-bold mb-4">Add New Category</h2>
//           {/* Add Category Form */}
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">Category Name</label>
//             <input
//               type="text"
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

//               onChange={(e) => setNewVendor({ ...newVendor, categoryName: e.target.value })}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2">Category Description</label>
//             <textarea
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"

//               onChange={(e) => setNewVendor({ ...newVendor, categoryDesc: e.target.value })}
//             />
//           </div>
         
//           <div className="flex justify-end space-x-2 absolute right-4 bottom-4">
//             <button
//               className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
//               onClick={() => setIsAddPopupOpen(false)}
//             >
//               Cancel
//             </button>
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//               onClick={handleAddCat}
//             >
//               Add Designation
//             </button>
//           </div>
//         </div>
//       </Popup >

//       {/* View Designation Popup */}
//       <Popup open={viewPopup.isOpen} onClose={() => setviewPopup({ isOpen: false, vendor: null })} modal nested closeOnDocumentClick={true}>

//         {close => (
//           viewPopup.cat && (

//             <div className=" p-6 rounded-lg shadow-md w-100 width-full h-96">

//               <button className="absolute top-2 right-2 bg-slate-200 hover:bg-slate-300" onClick={close}>
//                 &times;
//               </button>
//               <h2 className="text-xl pb-4 font-bold mb-4">View Designation Details</h2>
//               <p className="pb-3">
//                 <strong className="pr-2 pl-10">vendor ID:</strong> {viewPopup.vendor.categoryId}
//               </p>
//               <p className="pb-3">
//                 <strong className="pl-10 pr-2">vendor Name:</strong> {viewPopup.vendor.categoryName}
//               </p>
//               <p className="pb-3">
//                 <strong className="pl-10 pr-2">Description:</strong> {viewPopup.vendor.categoryDesc}
//               </p>
//               <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 absolute bottom-4 right-4  "
//                   onClick={close}
//                 >
//                  Back
//                 </button>

//             </div>
//           )
//         )}
//       </Popup>
//       <Popup open={editCategoryPopup.isOpen} onClose={() => seteditCategoryPopup({ isOpen: false, vendor: null })}>
//         {close => (
//           editCategoryPopup.vendor && (
//             <div className="h-96">
//               <button className="absolute top-2 right-2 bg-slate-200 hover:bg-slate-300" onClick={close}>
//                 &times;
//               </button>
//               <div className="">
//                 <h2 className="text-xl  font-bold p-5  top-3 left-3" >Edit</h2>
//                 <p>
//                   <strong className="pr-9 pl-10 font-medium ">Category ID:</strong>
//                   <input className=" px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 field left mb-2" type="text"
//                     value={editCategoryPopup.vendor.categoryId}
//                     readOnly
//                   />

//                 </p>
//                 <p>
//                   <strong className="pr-2 pl-10  font-medium ">Category Name:</strong>
//                   <input className=" px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 field left mb-2" type="text"
//                     value={editCategoryPopup.vendor.categoryName}
//                     onChange={(e) => seteditCategoryPopup({
//                       ...editCategoryPopup,
//                       vendor: { ...editCategoryPopup.vendor, categoryName: e.target.value }
//                     })} />
//                 </p>
//                 <p>
//                   <strong className="pr-2 pl-10 font-medium">Category Description:</strong>
//                   <input
//                     className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     type="text"
//                     name="categoryDesc"
//                     value={editCategoryPopup.vendor.categoryDesc}
//                     onChange={(e) => seteditCategoryPopup({
//                       ...editCategoryPopup,
//                       vendor: { ...editCategoryPopup.vendor, categoryDesc: e.target.value }
//                     })}
//                   />
//                 </p>
//                 <div className="flex justify-end items-center gap-2 absolute bottom-2 right-2 ">
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600  "
//                  onClick={close}
//                 >
//                   Back
//                 </button>
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 "
//                   onClick={handleAddVendor}
//                 >
//                   Save
//                 </button>
//                 </div>
              
//               </div>
//             </div>
//           )
//         )

//         }

//       </Popup>
//     </>
//   );
// };

// export default Vendor;
