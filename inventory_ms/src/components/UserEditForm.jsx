import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import config from "../config";

const UserEditForm = ({ isEditUserPopup, setEditUserPopup,fetchRoles,fetchDepartments,roles,departments,handleEditUser }) => {

    const user = isEditUserPopup?.user || {};
    
  useEffect(() => {
         fetchRoles();
         fetchDepartments();
       }, []);

       const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Update nested `user` object in the state
        setEditUserPopup({
          ...isEditUserPopup,
          user: {
            ...isEditUserPopup.user,
            [name]: value,
          },
        });
      };


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // if (name === "userLoginPassword" || name === "confirmPassword") {
  //   if (user.userLoginPassword !== user.confirmPassword) {
  //     setErrorMessage("Passwords do not match");
  //   } else {
  //     setErrorMessage("");
  //   }
  // }

   
 
  return (

    //  <div className="fixed inset-0  bg-gray-900 bg-opauserCity-70 z-5 ">
    <div className={`fixed inset-0 bg-gray-900 bg-opacity-70 z-50 `}>
      
    <div className=" p-20 pt-10  bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">User Registration Form</h1>
      <form >
        <div className="grid grid-cols-3 gap-2 m-10">
          {/* Row 1 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">First Name</label>
            <input
              type="text"
              name="userFirstName"
              value={user.userFirstName}
              onChange={handleChange}
              className="w-full px-1 py-1 border rounded-md  border-gray-800  "
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Middle Name</label>
            <input
              type="text"
              name="userMiddleName"
              value={user.userMiddleName}
              onChange={handleChange}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
            />
          </div>

          {/* Row 2 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="userLastName"
              value={user.userLastName}
              onChange={handleChange}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Login Name</label>
            <input
              type="text"
              name="userLoginName"
              value={user.userLoginName}
              onChange={handleChange}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
            />
          </div>

          {/* Row 3 */}
          <div>
          <label className="block text-gray-700 font-medium mb-1">Password</label>
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                name="userLoginPassword"
                value={user.userLoginPassword}
                onChange={handleChange}
                fullWidth
                
                variant="outlined"
                sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#1F2937", // Default border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#1F2937", // Hover border color
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1F2937", // Focused border color
                      },
                    },
                    "& .MuiInputBase-root": {
                      height: "33.65px",
                      bordercolor: "#1F2937",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      padding: "6px",
                    },
                    "& .MuiFormLabel-root": {
                        
                        top: "-9px", // Move the label upwards
                        transition: "transform 0.2s ease-in-out, top 0.2s ease-in-out",
                      },
                      "& .MuiFormLabel-root.Mui-focused": {
                        top: "-11px", // Adjust this value for focused state
                        left: "10px",
                      transform: "scale(0.75)", // Shrink the label when focused
                     },
                   
                    }
                  }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            {/* Confirm Password Field */}
            <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                error={!!errorMessage}
                helperText={errorMessage}
                sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#1F2937", // Default border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#1F2937", // Hover border color
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1F2937", // Focused border color
                      },
                    },
                    "& .MuiInputBase-root": {
                      height: "33.65px",
                      bordercolor: "#1F2937",
                    },
                   "& .MuiOutlinedInput-notchedOutline": {
                      padding: "6px",
                    },
                    "& .MuiFormLabel-root": {
                        
                        top: "-9px", // Move the label upwards
                        transition: "transform 0.2s ease-in-out, top 0.2s ease-in-out",
                      },
                      "& .MuiFormLabel-root.Mui-focused": {
                        top: "-11px", // Adjust this value for focused state
                        left: "10px",
                      transform: "scale(0.75)", // Shrink the label when focused
                     },
                   
                   
                    
                    }
                  }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="userEmail"
              value={user.userEmail}
              onChange={handleChange}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
            />
          </div>

          {/* Row 4 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <input
              type="text"
              name="userAddress"
              value={user.userAddress}
              onChange={handleChange}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Mobile</label>
            <input
              type="text"
              name="userMobile"
              value={user.userMobile}
              onChange={handleChange}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
            />
          </div>

          {/* Row 5 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Gender</label>
            <select
              name="userGender"
              value={user.userGender}
              onChange={handleChange}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
            >
              <option value="">{user.userGender}</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Status</label>
            <input
              type="text"
              name="userStatus"
              value={user.userStatus}
              onChange={handleChange}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
            />
          </div>

          {/* Row 6 */}
          <div>
  <label className="block text-gray-700 font-medium mb-1">Role</label>
  <select
    name="role"
    value={user.role?.roleId || ""}
    onChange={(e) => {
      const selectedRole = roles.find((role) => role.roleId === parseInt(e.target.value));
      setEditUserPopup({
        ...isEditUserPopup,
        user: {
          ...isEditUserPopup.user,
          role: selectedRole, // Update the role object with the selected role
        },
      });
    }}
    className="w-full px-1 py-1 border rounded-md border-gray-800"
  >
    <option value="" disabled>
      {user.role?.roleName || "Select Role"}
    </option>
    {roles.map((role) => (
      <option key={role.roleId} value={role.roleId}>
        {role.roleName}
      </option>
    ))}
  </select>
</div>


{
    ///department
}

<div>
  <label className="block text-gray-700 font-medium mb-1">Department</label>
  <select
    name="department"
    value={user.department?.deptId || ""}
    onChange={(e) => {
      const selectedDept = roles.find((dept) => dept.deptId === parseInt(e.target.value));
      setEditUserPopup({
        ...isEditUserPopup,
        user: {
          ...isEditUserPopup.user,
          department: selectedDept, // Update the role object with the selected role
        },
      });
    }}
    className="w-full px-1 py-1 border rounded-md border-gray-800"
  >
    <option value="" disabled>
      {user.department?.deptName || "Select Department"}
    </option>
    {departments.map((dept) => (
      <option key={dept.deptId} value={dept.deptId}>
        {dept.deptName}
      </option>
    ))}
  </select>
</div>
          

          {/* Row 7 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">userCity</label>
            <input
              type="text"
              name="userCity"
              value={user.userCity}
              onChange={handleChange}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">State</label>
            <input
              type="text"
              name="userState"
              value={user.userState}
              onChange={handleChange}
              className="w-full px-1 py-1 border rounded-md  border-gray-800  "
            />
          </div>

          {/* Row 8 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Zip Code</label>
            <input
              type="text"
              name="userZipCode"
              value={user.userZipCode}
              onChange={handleChange}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Country</label>
            <input
              type="text"
              name="userCountry"
              value={user.userCountry}
              onChange={handleChange}
              className="w-full px-1 py-1 border rounded-md  border-gray-800 "
            />
          </div>

          {/* Row 9 */}
         
          <div>
  <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
  <input
    type="date"
    name="userDateOfBirth"
    value={
      user.userDateOfBirth
        ? new Date(user.userDateOfBirth).toISOString().split("T")[0]
        : ""
    }
    onChange={handleChange}
    className="w-full px-1 py-1 border-solid border rounded-md border-gray-800"
  />
</div>

        </div>

        {/* Submit Button */}
        <div className="mt-6 text-right">
        <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 mr-4"
             onClick={() => setEditUserPopup(false)}
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            onClick={handleEditUser}
          >
            Register
          </button>
        </div>
      </form>
    </div>
    
    </div>
  );
};
  

export default UserEditForm;
