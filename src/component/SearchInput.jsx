import React from 'react';

const SearchInput = ({
  label = "Search",
  value,
  onChange,
  onClear, // Optional external clear handler
  placeholder = "Type to search...",
  className = ""
}) => {
  const handleClear = () => {
    if (onClear) {
      onClear(); // Use external clear function if provided
    } else {
      onChange({ target: { value: '' } }); // fallback
    }
  };

  return (
    <div className={`relative mr-auto md:mr-4 md:w-56 ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 text-lg focus:outline-none"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
