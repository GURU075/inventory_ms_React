import React from "react";




const UserView = ({isViewUserPopup, setViewUserPopup }) => {
    const user = isViewUserPopup?.user || {};

  return (

    //  <div className="fixed inset-0  bg-gray-900 bg-opauserCity-70 z-5 ">
    <div className={`fixed inset-0 bg-gray-900 bg-opacity-70 z-50 `}>
      
    <div className=" p-20 pt-10  bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">User Registration Form</h1>
      <form>
        <div className="grid grid-cols-3 gap-2 m-10">
          {/* Row 1 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">First Name</label>
            <input
              type="text"
              name="userFirstName"
              value={user.userFirstName}
              className="w-full px-1 py-1 border rounded-md  border-gray-800  "
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Middle Name</label>
            <input
              type="text"
              name="userMiddleName"
              value={user.userMiddleName}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
              readOnly
            />
          </div>

          {/* Row 2 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="userLastName"
              value={user.userLastName}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Login Name</label>
            <input
              type="text"
              name="userLoginName"
              value={user.userLoginName}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
              readOnly
            />
          </div>

          {/* Row 3 */}
         
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="userEmail"
              value={user.userEmail}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
              readOnly
            />
          </div>

          {/* Row 4 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <input
              type="text"
              name="userAddress"
              value={user.userAddress}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Mobile</label>
            <input
              type="text"
              name="userMobile"
              value={user.userMobile}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
              readOnly
            />
          </div>

          {/* Row 5 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Gender</label>
            
            <input
              type="text"
              name="userGender"
              value={user.userGender}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Status</label>
            <input
              type="text"
              name="userStatus"
              value={user.userStatus}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
              readOnly
            />
          </div>

          {/* Row 6 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <input
              type="text"
              name="roleName"
              value={user.role?.roleName || "-"}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Department</label>
            <input
              type="text"
              name="deptName"
              value={user.department?.deptName || "-"}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
              readOnly
            />
          </div>

          {/* Row 7 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">userCity</label>
            <input
              type="text"
              name="userCity"
              value={user.userCity}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">State</label>
            <input
              type="text"
              name="userState"
              value={user.userState}
              className="w-full px-1 py-1 border rounded-md  border-gray-800  "
              readOnly
            />
          </div>

          {/* Row 8 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Zip Code</label>
            <input
              type="text"
              name="userZipCode"
              value={user.userZipCode}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Country</label>
            <input
              type="text"
              name="userCountry"
              value={user.userCountry}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
              readOnly
            />
          </div>

          {/* Row 9 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
            <input
              type="text"
              name="userDateOfBirth"
              value={user.userDateOfBirth 
                ? new Date(user.userDateOfBirth).toLocaleDateString() 
                : '-' }
              className="w-full px-1 py-1 border-solid border rounded-md  border-gray-800 "
              readOnly
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-right">
        <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 mr-4"
            onClick={() => setViewUserPopup(false)}
          >
            Back
          </button>
         
        </div>
      </form>
    </div>
    
    </div>
  );
};
  

export default UserView;
