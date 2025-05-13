import React, { useEffect, useState } from 'react'
import { employees } from './data/data'
import Table from '@/component/Table'
import SmartPagination from '@/component/SmartPagination'

export const NewUsers = () => {
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  
   const totalPages = Math.ceil(employees.length / itemsPerPage)

   // Slice the data based on currentPage & itemsPerPage
     useEffect(() => {
       const startIndex = (currentPage - 1) * itemsPerPage
       const endIndex = itemsPerPage === -1 ? employees.length : startIndex + itemsPerPage
       setFilteredData(employees.slice(startIndex, endIndex))
     }, [currentPage, itemsPerPage])
   

   // Dummy handlers (you can replace them)
   const handleViewButton = (id) => {
    console.log("idzzz",id)
  }

  // Table columns
  const columns = [
    { label: 'Username', key: 'username', sortable: true },
    { label: 'Contact', key: 'contact', sortable: true },
    { label: 'Password', key: 'password', sortable: true },
  ]

  return (
    <>
    
          <Table
            title="Users"
            columns={columns}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            viewButton={true}
            handleViewButton={handleViewButton}
            isFetching={false} 
          />
    
          <SmartPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(value) => {
              setItemsPerPage(value)
              setCurrentPage(1)
            }}
          />
    
    </>
  )
}
