import React,{useState} from "react";
const FilterInput = ({ label, data, keyName, inputRef, onSelect ,onSearch }) => {
    const [filteredData, setFilteredData] = useState([]);
  
    const handleInputChange = (event) => {
      const userInput = event.target.value.toLowerCase();
      if (userInput.length > 0) {
        const filtered = data.filter((item) =>
          item[keyName]?.toLowerCase().startsWith(userInput)
        );
        setFilteredData(filtered);
      } else {
        setFilteredData([]);
      }
    };
  
    return (
      <div className="w-full max-w-sm min-w-[200px] relative mt-4">
        <label className="filter-label">{label}</label>
        <div className="relative">
          <input
            type="text"
            className="filter-input"
            placeholder={`Search ${label}`}
            onChange={handleInputChange}
            ref={inputRef}
          />
           <button
          className="absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => {
            const value = inputRef.current?.value || "";
            if (onSearch) onSearch(value); // Trigger the parent function with the input value
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
          {filteredData.length > 0 && (
            <ul className="absolute top-full left-0 bg-white shadow-md w-full text-left rounded-md z-10 max-h-40 overflow-auto">
              {filteredData.map((item) => (
                <li
                  key={item.id || item[keyName]} // Adjust key as needed
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    inputRef.current.value = item[keyName];
                    setFilteredData([]); // Clear filtered data
                    if (onSelect) onSelect(item); // Callback on selection
                  }}
                >
                  {item[keyName]}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };


  
  export default FilterInput