import React, { useState } from 'react';
import SmartPagination from '@/component/SmartPagination';
import Table from '@/component/Table';
import { attendanceHistory } from '../data/data';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const HistoryAttendance = ({ id }) => {
  const navigate = useNavigate()

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { data: attendanceData = [], isFetching } = useQuery({
    queryKey: ['attendanceHistory', id],
    queryFn: () => Promise.resolve(
      attendanceHistory.filter(item => item.id === id)
    ),
    staleTime: 1000 * 60 * 30,
  });
  

  const totalPages = Math.ceil(attendanceData.length / itemsPerPage);
  const paginatedData = attendanceData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const columns = [
    { label: 'Date', key: 'date', sortable: true },
    { label: 'Employee Name', key: 'name', sortable: true },
    { label: 'Type', key: 'type', sortable: true },
  ];

    // handle navigate
    const handleViewDetailedReport = (id) => {
        navigate(`/dashboard/allHistoryDeatils/${id}`)
        console.log("idxss:", id);
    }

  return (
    <div>
    <Table
     title="Attendance History"
     columns={columns}
     filteredData={attendanceData} // or paginatedData if pagination
     setFilteredData={setFilteredData} 
     currentPage={currentPage}
     itemsPerPage={itemsPerPage}
     isFetching={isFetching}
    />


<div style={{ marginTop: '1rem', textAlign: 'right' }}>
  <button
    onClick={() => handleViewDetailedReport(id)}
    style={{
      borderRadius: '8px',
      padding: '0.5rem 1.5rem',
      border: '1.5px solid #0d6efd', // Bootstrap primary blue
      backgroundColor: 'transparent',
      color: '#0d6efd',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }}
    className="custom-hover"
  >
    View Detailed Report
  </button>
</div>


    </div>
  );
};

export default HistoryAttendance;
