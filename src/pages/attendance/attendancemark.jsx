import React, { useEffect, useState } from 'react'
import SmartPagination from '@/component/SmartPagination'
import Table from '@/component/Table'
import { VscBlank } from 'react-icons/vsc'
import { attendance } from './data/data'

const Attendancemark = () => {
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const totalPages = Math.ceil(attendance.length / itemsPerPage)

  // Slice the data based on currentPage & itemsPerPage
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = itemsPerPage === -1 ? attendance.length : startIndex + itemsPerPage
    setFilteredData(attendance.slice(startIndex, endIndex))
  }, [currentPage, itemsPerPage])

  // Dummy handlers (you can replace them)
  const handleViewButton = (id) => {
    console.log("idzzz",id)
  }

  // Table columns
  const columns = [
    { label: 'Name', key: 'EmployeeName', sortable: true },
    { label: 'Date', key: 'contact', sortable: true },
  ]

  return (
    <>

      <Table
        title="Marks Attendance List"
        columns={columns}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        viewButton={true}
        viewButtonLabel="Mark Present"
        viewButtonIcon={<VscBlank size={1} />}
        viewButtonColor={'green'}
        handleViewButton={handleViewButton}
        isFetching={false} // Set to false as we're using static data
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

export default Attendancemark
