import React, { useState, useEffect } from 'react';
import SmartPagination from '@/component/SmartPagination';
import Table from '@/component/Table';
import { attendanceHistory } from '../data/data';
import SearchInput from '@/component/SearchInput';

const AllHistoryDetails = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const filtered = attendanceHistory.filter(emp =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = itemsPerPage === -1 ? filtered.length : startIndex + itemsPerPage;

    setFilteredData(filtered.slice(startIndex, endIndex));
  }, [currentPage, itemsPerPage, searchQuery]);

  const totalFiltered = attendanceHistory.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = itemsPerPage === -1 ? 1 : Math.ceil(totalFiltered.length / itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const columns = [
    { label: 'Date', key: 'date', sortable: true },
    { label: 'Employee Name', key: 'name', sortable: true },
    { label: 'Type', key: 'type', sortable: true },
  ];

  return (
    <div>
      <div className="mb-4 flex justify-end items-start">
        <SearchInput
          value={searchQuery}
          onChange={handleSearchChange}
          onClear={() => setSearchQuery('')}
          placeholder="Search by employee name..."
        />
      </div>

      <Table
        title="Attendance History"
        columns={columns}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
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
    </div>
  );
};

export default AllHistoryDetails;
