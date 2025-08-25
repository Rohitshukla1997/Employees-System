import SearchInput from '@/component/SearchInput'
import SmartPagination from '@/component/SmartPagination'
import Table from '@/component/Table'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getData } from '@/fetchers'

const LeaveEmployees = () => {
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const totalPages = itemsPerPage === -1 ? 1 : Math.ceil(filteredData.length / itemsPerPage)

  // fetch leave data
  const { data, isLoading } = useQuery({
    queryKey: ['leave/get'],
    queryFn: getData,
    onError: (error) => {
      console.error('Error fetching data:', error)
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  })

  // transform API response
  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      const formatted = data.data.map((item) => ({
        ...item,
        fromDate: new Date(item.fromDate).toLocaleDateString('en-GB'), // dd/mm/yyyy
        toDate: new Date(item.toDate).toLocaleDateString('en-GB'),
        name: item.employeeId ? item.employeeId.name : 'N/A', // fallback if null
      }))
      setFilteredData(formatted)
    }
  }, [data])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleAddUser = () => {
    console.log('Add User clicked')
  }

  const handleViewButton = (id) => console.log('View ID:', id)
  const handleEditButton = (id) => console.log('Edit ID:', id)
  const handleDeleteButton = (id) => console.log('Delete ID:', id)

  const columns = [
    { label: 'Employee Name', key: 'name', sortable: true },
    { label: 'From Date', key: 'fromDate', sortable: true },
    { label: 'To Date', key: 'toDate', sortable: true },
    { label: 'Description', key: 'description', sortable: true },
    { label: 'Status', key: 'status', sortable: true },
  ]

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <div></div>
        <div className="flex gap-2">
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={() => setSearchQuery('')}
            placeholder="Search by username..."
          />
          <button
            onClick={handleAddUser}
            className="bg-gray-600 hover:bg-brown-700 text-white px-4 py-2 rounded-md shadow-sm"
          >
            Add User
          </button>
        </div>
      </div>

      <Table
        title="Leave Application"
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
        isFetching={isLoading}
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

export default LeaveEmployees
