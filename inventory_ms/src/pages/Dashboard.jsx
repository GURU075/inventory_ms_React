import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { httpClient } from '../config';
// import `../styles/Dashboard.css`;

const Dashboard = () => {
    const [assets, setAssets] = useState([]);
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    useEffect(() => {
        const fetchassets = async () => {
            try {
                const response = await httpClient.get(`/Asset/getAllAssets`)

                setAssets(response.data);
            } catch (error) {
                console.error("Error fetching assets:", error);
                alert("Failed to fetch assets. Please try again later.");
            }
        };
        fetchassets();
    }, []);
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
                    setLocations(locationsRes.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
    
            fetchData();
        }, []);
    return (
        <div className='width=device-width '>
            <div className='p-3 bg-cyan-800 '>
                <header className='text-xl inline-flex '>
                    <Typography variant="h4" className='text-gray-200' gutterBottom>
                        Asset Dashboard
                    </Typography>
                </header>
            </div>
            <hr className='border-cyan-400 ' />
            <div className='flex p-2 gap-3  bg-gray-200'>
                <Button variant="outlined" className="flex items-center gap-3">
                    Refresh
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                    </svg>
                </Button >
                <Button variant='outlined' >
                    Back
                </Button>
            </div>
            <hr className='border-cyan-400 p-1' />

            <div className='filter-grid'>
                <div className="filter-item">
                    <label className="filter-label">
                        Location
                    </label>

                    <div className="relative">
                        <input type="text" className="filter-input" placeholder="Enter your text" />
                        <button className="absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="w-full max-w-sm min-w-[200px] relative mt-4">
                    <label className="filter-label">
                       Barcode
                    </label>

                    <div className="relative">
                        <input type="text" className="filter-input" placeholder="Enter your text" />
                        <button className="absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="w-full max-w-sm min-w-[200px] relative mt-4">
                    <label className="filter-label">
                        Category
                    </label>

                    <div className="relative">
                        <input type="text" className="filter-input" placeholder="Enter your text" />
                        <button className="absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
               
                <div className="w-full max-w-sm min-w-[200px] relative mt-4">
                    <label className="filter-label">
                        Department
                    </label>

                    <div className="relative">
                        <input type="text" className="filter-input" placeholder="Enter your text" />
                        <button className="absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="w-full max-w-sm min-w-[200px] relative mt-4">
                    <label className="filter-label">
                        Allocation Type
                    </label>

                    <div className="relative">
                        <input type="text" className="filter-input" placeholder="Enter your text" />
                        <button className="absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="w-full max-w-sm min-w-[200px] relative mt-4">
                    <label className="filter-label">
                        Asset Status
                    </label>

                    <div className="relative">
                        <input type="text" className="filter-input" placeholder="Enter your text" />
                        <button className="absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="w-full max-w-sm min-w-[200px] relative mt-4">
                    <label className="flex mb-2   text-sm text-slate-600">
                        Search
                    </label>

                    <div className="relative">
                        <input type="text" className="filter-input" placeholder="Enter your text" />
                        <button className="absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <hr className='border-cyan-400 p-1 pt-4' />

            <div>
                <table>
                    <thead>
                        <tr>
                            <th className="bg-cyan-700 text-white">
                                No
                            </th>
                            <th className="bg-cyan-700 text-white">
                                Asset ID
                            </th >
                            <th className="bg-cyan-700 text-white">
                                Barcode
                            </th>
                            <th className="bg-cyan-700 text-white">
                                Serial No
                            </th>
                            <th className="bg-cyan-700 text-white">
                                Location
                            </th>
                            <th className="bg-cyan-700 text-white">
                                Category Name
                            </th>
                            <th className="bg-cyan-700 text-white">
                                Sub Category
                            </th>
                            <th className="bg-cyan-700 text-white">
                                Allocation Type
                            </th>
                            <th className="bg-cyan-700 text-white">
                                Allocated To
                            </th>
                            <th className="bg-cyan-700 text-white">
                                Warrenty Status
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {assets.map((asset, index) => (
                            <tr key={asset.assetId}
                            className='odd:bg-gray-300 even:bg-white'
                            >
                                <td>{index + 1}</td>
                                <td>{asset.assetId}</td>
                                <td>{asset.barcode}</td>
                                <td>A1224</td>
                                <td>{asset.location?.locationName}</td>
                                <td>{asset.caregory?.categoryName}</td>
                                <td>{asset.subCategory?.subCategoryName}</td>
                                <td>{asset?.allocationType}</td>
                                <td>{asset?.allocatedTo}</td>
                                <td>{asset?.warrantyStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Dashboard