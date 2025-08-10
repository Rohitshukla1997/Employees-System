import React, { useEffect, useState, useMemo } from 'react'
import SmartPagination from '@/component/SmartPagination'
import Table from '@/component/Table'
import { VscBlank } from 'react-icons/vsc'
import { attendance } from './data/data'
import SearchInput from '@/component/SearchInput'

const Attendancemark = () => {
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')

  // Apply search filter
  const searchedData = useMemo(() => {
    if (!searchQuery.trim()) return attendance
    return attendance.filter((item) =>
      item.EmployeeName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  // Apply pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = itemsPerPage === -1 ? searchedData.length : startIndex + itemsPerPage
    setFilteredData(searchedData.slice(startIndex, endIndex))
  }, [searchedData, currentPage, itemsPerPage])

  // Recalculate total pages based on search
  const totalPages = useMemo(() => {
    return itemsPerPage === -1 ? 1 : Math.ceil(searchedData.length / itemsPerPage)
  }, [searchedData, itemsPerPage])

  const handleViewButton = (id) => {
    console.log('Mark Present clicked for ID:', id)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page on search
  }

  const columns = [
    { label: 'Name', key: 'EmployeeName', sortable: true },
    { label: 'Date', key: 'contact', sortable: true },
  ]

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

export default Attendancemark
