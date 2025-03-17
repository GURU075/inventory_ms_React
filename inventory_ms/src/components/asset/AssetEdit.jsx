import React, { useState, useEffect } from "react";
import { httpClient } from "../../config";

const AssetEdit = ({ editCategoryPopup, seteditCategoryPopup }) => {
    const asset = editCategoryPopup?.asset || {};
    const [formData, setFormData] = useState({
        assetId: "",
        assetDesc: "",
        amcStartDate: "",
        amcEndDate: "",
        assetAllocationTo: "",
        categoryId: "",
        locationId: "",
        subCategoryId: "",
        allocationType: "",
    });
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [Category, setCategory] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [location, setLocation] = useState([]);
    const [CategoryProperties, setCategoryProperties] = useState([]);
    const [categoryPropertyValues, setCategoryPropertyValues] = useState({});
    const [allocationType, setAllocationType] = useState("");
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [department, setDepartment] = useState(null);


   useEffect(()=>{
    const updateAllocationType = async() =>{
        try {
            if (asset?.allocationType === "User") {
                const response = await httpClient.get("/User/getAllUsers");
                setUsers(response.data);
                setAllocationType("User");
                // console.log("Users:", users);
            } else if (asset?.allocationType === "Group") {
                const response = await httpClient.get("/Department/getAllDepartments");
                setDepartments(response.data);
                setAllocationType("Group");
                // console.log("Departments--",departments)
            }

        } catch (error) {
            console.error(`Error fetching data for ${asset?.allocationType}:`, error);
            alert(`Failed to fetch ${asset?.allocationType === "User" ? "users" : "departments"}. Please try again.`);
        }
    }
    updateAllocationType();
   },[editCategoryPopup]);

   useEffect(() => {
    if (asset?.allocationType === "Group") {
        const dep = departments.find(dept => dept?.deptId.toString() === asset?.assetAllocationTo); 
        setDepartment(dep || null);
    } else if (asset?.allocationType === "User") {
        const user1 = users.find(us => us?.userId.toString() === asset?.assetAllocationTo);
        setUser(user1 || null); 
    }
}, [asset?.allocationType, asset?.assetAllocationTo, users, departments]); 

    const handleAllocationTypeChange = async (e) => {
        const selectedType = e.target.value;
        setAllocationType(selectedType);

        try {
            if (selectedType === "User") {
                const response = await httpClient.get("/User/getAllUsers");
                setUsers(response.data);
                console.log("Users:", users);
            } else if (selectedType === "Group") {
                const response = await httpClient.get("/Department/getAllDepartments");
                setDepartments(response.data);
            }
        } catch (error) {
            console.error(`Error fetching data for ${selectedType}:`, error);
            alert(`Failed to fetch ${selectedType === "User" ? "users" : "departments"}. Please try again.`);
        }
    };


    const handleAddAsset = async (e) => {

        try {
            const requestPayload = {
                assetDesc: formData.assetDesc.trim(),
                amcStartDate: formData.amcStartDate,
                amcEndDate: formData.amcEndDate,
                assetAllocationTo: formData.assetAllocationTo,
                assetAllocationDate: new Date().toISOString().split('T')[0],
                allocationType: allocationType.trim(),
                location: {
                    locationId: formData.locationId,
                },
                category: {
                    categoryId: selectedCategory,
                },
                subCategory: {
                    subCategoryId: formData.subCategoryId,
                }
            };

            const response = await httpClient.post(`/Asset/addAsset`, requestPayload);
            const asset = response.data;

            console.log('asset', asset);

            if (response.data) {
                setFormData((prevFormData) => ({
                    ...prevFormData,

                    ...response.data,
                    assetId: response.data?.assetId || "",
                }));
                console.log(formData);
                const propertyDetails = Object.entries(categoryPropertyValues).map(([key, value]) => ({
                    assetPropertyName: key,
                    assetPropertyValue: value,
                    asset: {
                        assetId: asset.assetId + "",
                    },
                }));

                console.log('propertyDetails', propertyDetails);

                try {
                    // Send data to the API one by one
                    const requests = propertyDetails.map((detail) =>
                        // httpClient.post("/AssetPropertyDetail/addAssetPropertyDetail", detail)
                        httpClient.post("/AssetDetails/addAssetDetails", detail)
                    );

                    // Wait for all requests to complete
                    await Promise.all(requests);

                    alert("All asset properties added successfully!");
                } catch (error) {
                    console.error("Error submitting properties:", error);
                    alert("Failed to add some properties. Please try again.");
                }
                seteditCategoryPopup(false);
            } else {
                throw new Error("Unexpected API response structure");
            }
        } catch (error) {
            console.error("Error adding asset", error);
            alert("Failed to add asset. Please try again.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, subCategoriesRes, locationsRes] = await Promise.all([
                    httpClient.get("/Category/getAllCategories"),
                    httpClient.get("/SubCategory/getAllSubCategories"),
                    httpClient.get("/Location/getAllLocations"),
                ]);
                setCategories(categoriesRes.data);
                setSubCategories(subCategoriesRes.data);
                setLocation(locationsRes.data);


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryPropertyValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSelectionChange = (selectedId) => {
        if (allocationType === "User" && users.length) {
            const selectedUser = users.find((u) => u.userId.toString() === selectedId);
            setUser(selectedUser);
            setFormData({ ...formData, assetAllocationTo: selectedUser?.userId || "" });
        } else if (allocationType === "Group" && departments.length) {
            const selectedDepartment = departments.find((d) => d.deptId.toString() === selectedId);
            setDepartment(selectedDepartment);
            setFormData({ ...formData, assetAllocationTo: selectedDepartment?.deptId || "" });
        }
    };


    useEffect(() => {

        console.log('CategoryProperties', CategoryProperties);

    }, [CategoryProperties]);

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
                                <select
                                    id="category"
                                    className="input-field"
                                    value={selectedCategory} // Bind to state
                                    onChange={async (e) => {
                                        const selectedValue = e.target.value;
                                        setSelectedCategory(selectedValue); // Update state
                                        if (selectedValue) {
                                            // Call the API when a category is selected
                                            await httpClient
                                                .get(`/CategoryProperties/getCategoryPropertiesByCategoryId/${selectedValue}`)
                                                .then((response) => {
                                                    setCategoryProperties(response.data)
                                                    console.log("API Response:", response.data);
                                                })
                                                .catch((error) => {
                                                    console.error("Error fetching data:", error);
                                                });
                                        }
                                    }}

                                    required
                                >
                                    <option value="">{asset?.category?.categoryName}</option> {/* Default empty option */}
                                    {categories.map((category) => (
                                        <option key={category.categoryId} value={category.categoryId}>
                                            {category.categoryName}
                                        </option>
                                    ))}

                                </select>
                            </div>
                            <div>
                                <label className="label-asset">SubCategory</label>
                                <select
                                    id="category"
                                    className="input-field"
                                    onChange={(e) => setFormData({ ...formData, subCategoryId: e.target.value })}
                                    required
                                >
                                    <option value="">{asset?.subCategory?.subCategoryName}</option> {/* Default empty option */}
                                    {subCategories.map((subcategory) => (
                                        <option key={subcategory.subCategoryId} value={subcategory.subCategoryId}>{subcategory.subCategoryName}</option>
                                    ))}



                                </select>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="allocationType" className="label-asset">
                                    Allocation Type
                                </label>
                                <select
                                    id="allocationType"
                                    value={allocationType}
                                    onChange={handleAllocationTypeChange}
                                    className="input-field"
                                    required
                                >
                                    <option value="">{asset?.allocationType}</option>
                                    <option value="Group">Group</option>
                                    <option value="User">User</option>
                                </select>
                            </div>
                            <div>
                                <label className="label-asset">
                                    {allocationType === "User" ? "User Name" : "Department Name"}
                                </label>
                                <select
                                    id={allocationType === "User" ? "user" : "department"}
                                    className="input-field"
                                    onChange={(e) => handleSelectionChange(e.target.value)} // Custom handler for extended functionality
                                    required
                                >
                                    <option value="">
                                    {/* {allocationType==="User"?(user?.userFirstName):(department?.deptName)||allocationType === "User" ? "-- Select User --" : "-- Select Department --"} */}
                                    {allocationType === "User"
                ? user?.userFirstName
                    ? `${user.userFirstName} ${user.userLastName}`
                    : "-- Select User --"
                : department?.deptName
                    ? department.deptName
                    : "-- Select Department --"}
                                  
                                    </option>
                                    {allocationType === "User"
                                        ? users.map((user) => (
                                            <option key={user.userId} value={user.userId}>
                                                {user.userFirstName + " " + user.userLastName || ""}
                                            </option>
                                        ))
                                        : departments.map((department) => (
                                            <option key={department.deptId} value={department.deptId}>
                                                {department.deptName}
                                            </option>
                                        ))}

                                </select>
                            </div>

                            <div>
                                <label className="label-asset">Allocated To</label>
                                <input
                                    type="text"
                                    id="Allocated_To"
                                    className="input-field"
                                    value={
                                        allocationType === "User"
                                            ? user?.userFirstName + " " + user?.userLastName
                                            : allocationType === "Group"
                                                ? department?.deptName || ""
                                                : "" // Default empty value
                                    }
                                    readOnly // Make the field read-only to prevent manual edits
                                />
                            </div>


                            <div>
                                <label className="label-asset">Asset Description</label>
                                <input type="text"
                                    onChange={(e) => setFormData({ ...formData, assetDesc: e.target.value })}
                                    id="website" className="input-field" placeholder="Enter Designation"
                                    value={asset.assetDesc}
                                    required />
                            </div>

                        </div>
                        <div className="grid gap-6 mb-6 md:grid-cols-3">
                            {allocationType === "Group" && department && (
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
                                            value={department?.location?.locationName}
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
                                            value={department?.floor?.floorName}
                                            readOnly
                                        />
                                    </div>
                                </>
                            )}
                            {allocationType === "User" && user && (
                                <>
                                    <div className="mb-6">
                                        <label className="label-asset">
                                            User Department
                                        </label>
                                        <input
                                            type="text"
                                            id="Department_Name"
                                            className="input-field"
                                            value={user?.department?.deptName}
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
                                            value={user?.userCity + " " + user?.userState + " " + "" + user?.userZipCode}
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
                                <label className="label-asset">AMC Start Date</label>
                                <input
                                    type="date"
                                    onChange={(e) => setFormData({ ...formData, amcStartDate: e.target.value })}
                                    id="amcStartDate"
                                    className="input-field"
                                    value={
                                        formData.amcStartDate ||
                                        (asset.amcStartDate ? new Date(asset.amcStartDate).toISOString().split('T')[0] : '')
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label className="label-asset">AMC End Date</label>
                                <input type="date"
                                    onChange={(e) => setFormData({ ...formData, amcEndDate: e.target.value })}
                                    id="visitors" className="input-field" placeholder="Enter emp name"
                                    value={
                                        formData.amcEndDate ||
                                        (asset.amcEndDate ? new Date(asset.amcEndDate).toISOString().split('T')[0] : '')
                                    }
                                    required />
                            </div>

                            <div>
                                <label className="label-asset">Location</label>
                                <select
                                    id="location"
                                    className="input-field"
                                    value={formData.locationId || asset?.location?.locationId || ""} // Show current location or edited value
                                    onChange={(e) => setFormData({ ...formData, locationId: e.target.value })} // Update state on change
                                    required
                                >
                                    <option value="">-- Select Location --</option>
                                    {location.map((loc) => (
                                        <option key={loc?.locationId} value={loc?.locationId}>
                                            {loc?.locationName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* <div class="mb-6">
                            <label className="label-asset">Floor</label>
                            <input type="text" id="confirm_password" className="input-field" placeholder="Enter Floor" required />
                        </div> */}



                            {/* {[...new Map(CategoryProperties.map((item) => [item.categoryPropertyName, item])).values()]
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
                                            placeholder={obj.categoryPropertyName}
                                            required
                                            value={obj.categoryPropertyName || ""}
                                            onChange={handleChange}
                                        />
                                    </div>
                                ))} */}
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
                                            onChange={handleChange}
                                        />
                                    </div>
                                ))}

                        </div>
                        <div className="flex justify-end space-x-4 mb-4">
                            <button
                                type="button"
                                onClick={() => seteditCategoryPopup(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2  rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={handleAddAsset}
                            >
                                Submit
                            </button>
                        </div>

                    </form>
                </div>

            </div >
        </div >
    );
};

export default AssetEdit;
