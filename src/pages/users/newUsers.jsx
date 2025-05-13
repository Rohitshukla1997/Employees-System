import React, { useEffect, useState } from 'react';
import { employees } from './data/data';
import Table from '@/component/Table';
import SmartPagination from '@/component/SmartPagination';
import SearchInput from '@/component/SearchInput';

export const NewUsers = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter + paginate data
  useEffect(() => {
    const filtered = employees.filter(emp =>
      emp.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = itemsPerPage === -1 ? filtered.length : startIndex + itemsPerPage;

    setFilteredData(filtered.slice(startIndex, endIndex));
  }, [currentPage, itemsPerPage, searchQuery]);

  const totalFiltered = employees.filter(emp =>
    emp.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(totalFiltered.length / itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleAddUser = () => {
    console.log('Add User clicked');
    // Open modal or redirect to add form
  };

  
  const handleViewButton = (id) => {
    console.log("View ID:", id);
  };

  const handleEditButton = (id) => {
    console.log("Edit ID:", id);
  };

  const handleDeleteButton = (id) => {
    console.log("Delete ID:", id);
  };

  const columns = [
    { label: 'Username', key: 'username', sortable: true },
    { label: 'Contact', key: 'contact', sortable: true },
    { label: 'Password', key: 'password', sortable: true },
  ];

  return (
<>
  <div className="mb-4 flex justify-between items-center">
    <div></div> {/* Empty div to push content to the right */}

    <div className="flex gap-2">
      <SearchInput
        value={searchQuery}
        onChange={handleSearchChange}
        onClear={() => setSearchQuery('')}
        placeholder="Search by username..."
      />
      <button
        onClick={handleAddUser} // define this function to open modal or perform action
        className="bg-gray-600 hover:bg-brown-700 text-white px-4 py-2 rounded-md shadow-sm"
      >
        Add User
      </button>
    </div>
  </div>

  <Table
    title="Users"
    columns={columns}
    filteredData={filteredData}
    setFilteredData={setFilteredData}
    currentPage={currentPage}
    itemsPerPage={itemsPerPage}
    viewButton={false}
    handleViewButton={handleViewButton}
    editButton={true}
    handleEditButton={handleEditButton}
    deleteButton={true}
    handleDeleteButton={handleDeleteButton}
    isFetching={false}
  />

  <SmartPagination
    totalPages={totalPages}
    currentPage={currentPage}
    onPageChange={setCurrentPage}
    itemsPerPage={itemsPerPage}
    onItemsPerPageChange={(value) => {
      setItemsPerPage(value);
      setCurrentPage(1);
    }}
  />
</>


  );
};
