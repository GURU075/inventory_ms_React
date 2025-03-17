import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { httpClient } from "../config";
import AssetAdd from "../components/asset/AssetAdd";
import AssetView from "../components/asset/AssetView";
import AssetEdit from "../components/asset/AssetEdit";
const Asset = () => {
  const [assets, setAssets] = useState([
    
  ]);


  const fetchassets = async () => {
    try {
      const response = await httpClient.get(`/Asset/getAllAssets`)
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
      alert("Failed to fetch assets. Please try again later.");
    }
  };

  useEffect(() => {
    fetchassets();
  }, []);

  const [newCategory, setNewCategory] = useState({ categoryName: "", categoryDesc: "" });
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [viewPopup, setviewPopup] = useState({ isOpen: false, asset: null });
  const [editCategoryPopup, seteditCategoryPopup] = useState({ isOpen: false, asset: null });
  const [showAlert, setShowAlert] = useState(false);

  const deleteDesignation = async (assetId) => {
    try {
      await httpClient.delete(`/Asset/deleteAsset/${assetId}`)
      fetchassets();
    } catch (error) {
      console.log("error deleting assets", error);
      alert("Failed to delete assets. Please try again.");
    }

  };



  return (
    <>

      <div className="relative mt-8 ">
        {showAlert &&
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/5 z-50">
            <div className="alert flex items-center p-4 mb-4 text-sm text-green-500 border border-green-300 rounded-lg bg-green-50 dark:bg-green-100 dark:text-green-400 dark:border-green-800" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 1 1 1 1v4h1a1 1 0 1 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Asset added!</span>
              </div>
            </div>
          </div>
        }
        <div className="relative max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold mb-4">Asset Management</h1>
          <table className="w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Asset ID</th>
                <th className="border px-4 py-2">Category Name</th>
                <th className="border px-4 py-2">Asset Description</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.assetId}>
                  <td className="border px-4 py-2">{asset.assetId}</td>
                  <td className="border px-4 py-2">{asset.category.categoryName}</td>
                  <td className="border px-4 py-2">{asset.assetDesc}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className="view"
                      onClick={() => setviewPopup({ isOpen: true, asset })}
                    >
                      View
                    </button>
                    <button className="edit"
                      onClick={() => seteditCategoryPopup({ isOpen: true, asset })}>Edit</button>
                    <button className="delete" onClick={() => deleteDesignation(asset.assetId)}>
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
              Add Asset
            </button>
          </div>
        </div>
      </div>

      {/* Add Category Popup */}
    <Popup
       open={isAddPopupOpen}
       onClose={()=>setIsAddPopupOpen(false)}
       modal
       nested
    >
       <div>
          <AssetAdd 
             isAddPopupOpen={isAddPopupOpen}
             setIsAddPopupOpen={setIsAddPopupOpen}
         />
      </div>

    </Popup>
    <Popup
       open={viewPopup.isOpen}
       onClose={()=>setviewPopup.isOpen(false)}
       modal
       nested
    >
       <div>
          <AssetView
             viewPopup={viewPopup}
             setviewPopup={setviewPopup}
         />
      </div>

    </Popup>
    <Popup
       open={editCategoryPopup.isOpen}
       onClose={()=>seteditCategoryPopup.isOpen(false)}
       modal
       nested
    >
       <div>
          <AssetEdit
             editCategoryPopup={editCategoryPopup}
             seteditCategoryPopup={seteditCategoryPopup}
         />
      </div>

    </Popup>

     
    </>
  );
};

export default Asset;
