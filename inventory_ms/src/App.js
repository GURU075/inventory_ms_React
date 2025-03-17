import { element } from 'prop-types';
import './App.css';

import Asset from './pages/Asset';
import Category from './pages/Category';
import Designation from './pages/Designation';
import RolePage from './pages/role';
import User from './pages/User';
import Login from './components/Login';
import SignUp from './components/SignUp';
// +import { Routes } from "react-router"
import { createBrowserRouter, RouterProvider } from 'react-router';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
// import Vendor from './pages/Vendor';

const router = createBrowserRouter(
  [
    {
      path:"/",
      element: <Sidebar/>,
     },
     {
      path:"/Dashboard",
      element: 
      <Dashboard />,
     },
   {
    path:"/Asset",
    element: 
    <div>
    <Sidebar/>
    <Asset/>
      </div>,
   },
   {
    path:"/Category",
    element: 
    <div>
       <Sidebar/>
      <Category />
    </div>,
   },
   {
    path:"/Designation",
    element: 
    <div>
    <Sidebar/>
    <Designation/>,
      </div>,
   },
   {
    path:"/User",
    element: 
    <div>
    <Sidebar/>
    <User/>,
      </div>,
   },
   {
    path:"/RolePage",
    element: 
    <div>
    <Sidebar/>
    <RolePage/>,
      </div>,
   },
   {
    path:"/Login",
    element: 
    <Login />,
   },
   {
    path:"/SignUp",
    element: 
    <SignUp />,
   }

  ]

);

function App() {
  return (
    <div className="App">
      {/* <RolePage /> */}
      {/* <Designation /> */}
      {/* <User /> */}
      {/* <Category /> */}
      {/* <Asset /> */}
      {/* <Vendor /> */}
      <RouterProvider router = {router} />
    </div>
  );
}

export default App;
