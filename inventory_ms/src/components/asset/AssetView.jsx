import React, { useState, useEffect } from "react";
import { httpClient } from "../../config";

const AssetView = ({ viewPopup, setviewPopup }) => {
    const asset = viewPopup?.asset || {};


    console.log(asset);
   
    const [CategoryProperties, setCategoryProperties] = useState([]);
    const [categoryPropertyValues, setCategoryPropertyValues] = useState({});
    const [user, setUser] = useState(null);
    const [department, setDepartment] = useState(null);

    useEffect(() => {
        const fetchDep_user = async () => {
             
            if (!asset?.assetAllocationTo) return;
            try {
                if (asset?.category?.categoryName  === "User") {
                    const response = await httpClient.get(`/User/getUser/${asset.assetAllocationTo}`);
                    setUser(response.data);
                    console.log("Users:", user);
                } else if (asset?.category?.categoryName  === "Group") {
                    const response = await httpClient.get(`/Department/getDepartment/${asset.assetAllocationTo}`);
                    setDepartment(response.data);
                }
            } catch (error) {
                console.error(`Error fetching data for ${asset.assetAllocationTo}:`, error);
                alert(`Failed to fetch ${asset.assetAllocationTo === "User" ? "users" : "departments"}. Please try again.`);
            }
        };

        fetchDep_user();
    }, [asset]);



    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center ">
            <div className="pl-10 pt-1 pb-1 pr-0.5  bg-white rounded-lg shadow-md  w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-5xl xl:max-w-7xl mx-auto">
                <div className="pr-5 w-full max-h-[80vh] overflow-y-auto  mx-auto">
                    <h2 className="text-xl font-bold mb-4 pt-6 pb-2">Add New Asset</h2>
                    <form>
                        <div className="grid gap-6 mb-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 ">
                        <div>
                                <label className="label-asset">Asset Id</label>
                                <input
                                    type="text"
                                    
                                    className="input-field"
                                    value={
                                        asset.assetId
                                    }
                                    readOnly
                                />
                            </div>
                            <div>
                                <label for="category" className="label-asset">Category</label>
                                <input
                                    type="text"
                                    
                                    className="input-field"
                                    value={asset?.category?.categoryName} 
                                    readOnly
                                />
                                
                            </div>
                            <div>
                                <label className="label-asset">SubCategory</label>
                                <input
                                    type="text"
                                    
                                    className="input-field"
                                    value={asset?.subCategory?.subCategoryName} 
                                    readOnly
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="allocationType" className="label-asset">
                                    Allocation Type
                                </label>
                                <input
                                    type="text"
                                    
                                    className="input-field"
                                    value={asset?.allocationType} 
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="label-asset">
                                    {asset.allocationType === "User" ? "User Name" : "Department Name"}
                                </label>
                                <input
                                    type="text"
                                    
                                    className="input-field"
                                    value={asset?.category?.categoryName} 
                                    readOnly
                                />
                            </div>






                            <div>
                                <label className="label-asset">Allocated To</label>
                                <input
                                    type="text"
                                    id="Allocated_To"
                                    className="input-field"
                                    value={
                                        department?.deptName
                                    }
                                    readOnly 
                                />
                            </div>


                            <div>
                                <label className="label-asset">Asset Description</label>
                                <input type="text"
                                    id="website" className="input-field" 
                                    value={asset.assetDesc}
                                    readOnly
                                    />
                            </div>

                        </div>
                        <div className="grid gap-6 mb-6 md:grid-cols-3">
                            {asset.allocationType === "Group" && department && (
                                <>

                                    <div className="mb-6">
                                        <label className="label-asset">
                                            Department Contact Person Name
                                        </label>
                                        <input
                                            type="text"
                                            id="deptContactPersonName"
                                            className="input-field"
                                            value={department.deptContactPersonName}
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="label-asset">
                                            Department Contact Number
                                        </label>
                                        <input
                                            type="number"
                                            id="deptContactPersonMobile"
                                            className="input-field"
                                            value={department.deptContactPersonMobile}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="label-asset">
                                            Department Contact Email
                                        </label>
                                        <input
                                            type="email"
                                            id="deptContactPersonEmail"
                                            className="input-field"
                                            value={department.deptContactPersonEmail
                                            }
                                            readOnly
                                        />
                                    </div>

                                    <div className="mb-6">
                                        <label className="label-asset">
                                            Department Location
                                        </label>
                                        <input
                                            type="text"
                                            id="Department_Location"
                                            className="input-field"
                                            value={department.location.locationName}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="label-asset">
                                            Department Floor
                                        </label>
                                        <input
                                            type="text"
                                            id="Department_Location"
                                            className="input-field"
                                            value={department.floor.floorName}
                                            readOnly
                                        />
                                    </div>
                                </>
                            )}
                            {asset.allocationType === "User" && user && (
                                <>
                                    <div className="mb-6">
                                        <label className="label-asset">
                                            User Department
                                        </label>
                                        <input
                                            type="text"
                                            id="Department_Name"
                                            className="input-field"
                                            value={user.department.deptName}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="label-asset">
                                            User Location
                                        </label>
                                        <input
                                            type="text"
                                            id="Department_Location"
                                            className="input-field"
                                            value={user.userCity + " " + user.userState + " " + "" + user.userZipCode}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="label-asset">
                                            User Email
                                        </label>
                                        <input
                                            type="text"
                                            id="Department_Location"
                                            className="input-field"
                                            value={user.userEmail}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="label-asset">
                                            User mobile No
                                        </label>
                                        <input
                                            type="text"
                                            id="Department_Location"
                                            className="input-field"
                                            value={user.userMobile}
                                            readOnly
                                        />
                                    </div>

                                </>
                            )}
                            <div>
                                <label className="label-asset">amcStartDate</label>
                                <input type="text"
                                    id="visitors" className="input-field" 
                                    value={asset.amcStartDate
                                         ? new Date(asset.amcStartDate).toLocaleDateString() 
                                        : '-'
                                    } 
                                    readOnly />
                            </div>
                            <div>
                                <label className="label-asset">amcEndDate</label>
                                <input type="text"
                                    id="visitors" className="input-field" 
                                    value={asset.amcEndDate
                                         ? new Date(asset.amcEndDate).toLocaleDateString() 
                                        : '-'
                                    } 
                                    readOnly />
                            </div>

                            <div>
                                <label className="label-asset">Location</label>
                                <input type="text"
                                className="input-field" 
                                value={asset?.location?.locationName}
                                readOnly />
                            </div>

                            {[...new Map(CategoryProperties.map((item) => [item.categoryPropertyName, item])).values()]
                                .map((obj, i) => (
                                    <div key={i} className="mb-6">
                                        <label
                                            htmlFor={obj.categoryPropertyName}
                                            className="label-asset"
                                        >
                                            {obj.categoryPropertyName}
                                        </label>
                                        <input
                                            type="text"
                                            name={obj.categoryPropertyName}
                                            id={obj.categoryPropertyName}
                                            className="input-field"
                                            placeholder={`Enter ${obj.categoryPropertyName}`}
                                            value={categoryPropertyValues[obj.categoryPropertyName] || ""}
                                            required={categoryPropertyValues.categoryPropertyMandatory}
                                            
                                        />
                                    </div>
                                ))}

                        </div>
                        <div className="flex justify-end space-x-4 mb-4">
                            <button
                                type="submit"
                                onClick={() =>setviewPopup(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2  rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                          
                        </div>

                    </form>
                </div>

            </div >
        </div >
    );
};

export default AssetView;
