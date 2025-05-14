import SearchInput from '@/component/SearchInput';
import SmartPagination from '@/component/SmartPagination';
import Table from '@/component/Table';
import React, { useEffect, useState } from 'react'
import { records } from './data/data';
import { useNavigate } from 'react-router-dom';

const AttendanceRecords = () => {
  const navigate = useNavigate()

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter + paginate data
    useEffect(() => {
      const filtered = records.filter(emp =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = itemsPerPage === -1 ? filtered.length : startIndex + itemsPerPage;
  
      setFilteredData(filtered.slice(startIndex, endIndex));
    }, [currentPage, itemsPerPage, searchQuery]);
  
    const totalFiltered = records.filter(emp =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPages = Math.ceil(totalFiltered.length / itemsPerPage);
  


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  
  const handleViewButton = (id) => {
    navigate(`/dashboard/profileRecord/${id}`);
    console.log("View ID:", id);

  };

  const handleEditButton = (id) => {
    console.log("Edit ID:", id);
  };

  const handleDeleteButton = (id) => {
    console.log("Delete ID:", id);
  };

  const columns = [
    { label: 'Employee Name', key: 'name', sortable: true },
    { label: 'Designation', key: 'designation', sortable: true },
    { label: 'Contact', key: 'contact', sortable: true },

  ];






  return (
    <>
   <div className="mb-4 flex justify-end items-start">
     <SearchInput
      value={searchQuery}
      onChange={handleSearchChange}
      onClear={() => setSearchQuery('')}
      placeholder="Search by username..."
      />
    </div>


  <Table
    title="Attendance Records"
    columns={columns}
    filteredData={filteredData}
    setFilteredData={setFilteredData}
    currentPage={currentPage}
    itemsPerPage={itemsPerPage}
    viewButton={true}
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

export default AttendanceRecords;
