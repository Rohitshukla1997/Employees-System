import React, { useEffect, useState } from 'react'
import SmartPagination from '@/component/SmartPagination'
import Table from '@/component/Table'
import { VscBlank } from 'react-icons/vsc'
import SearchInput from '@/component/SearchInput'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import { getData, postData } from '@/fetchers'

const Attendancemark = () => {
  const queryClient = useQueryClient()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState([])

  // Fetch API - Remaining employees to mark attendance for
  const { data, isLoading } = useQuery({
    queryKey: ['attendance/remaining-today'],
    queryFn: getData,
    onError: (error) => {
      console.error('Error fetching data:', error)
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  })

  // Mutation for marking attendance
  const MarkAttendance = useMutation({
    mutationFn: ({ employeeId }) =>
      postData({
        endpoint: `/attendance/mark/${employeeId}`, // dynamically use employeeId in endpoint
        payload: {}, // adjust payload if needed; empty if not
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['attendance/remaining-today'])
      Swal.fire({
        icon: 'success',
        title: 'Marked!',
        text: 'Attendance marked successfully.',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          confirmButton: 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700',
        },
        buttonsStyling: false,
      })
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Unable to mark attendance',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          confirmButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700',
        },
        buttonsStyling: false,
      })
    },
  })

  // Filter data and map _id to id
  useEffect(() => {
    const employees = Array.isArray(data?.data) ? data.data : []

    const mappedEmployees = employees.map((emp) => ({
      ...emp,
      id: emp._id,
    }))

    const searchFiltered = mappedEmployees.filter((emp) =>
      emp.employeeName?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredData(searchFiltered)
  }, [data, searchQuery])

  const totalPages = itemsPerPage === -1 ? 1 : Math.ceil(filteredData.length / itemsPerPage)

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // Handle "Mark Present" button click
  const handleViewButton = (id) => {
    MarkAttendance.mutate({ employeeId: id })
  }

  const columns = [
    { label: 'Name', key: 'employeeName', sortable: true },
    { label: 'Email', key: 'email', sortable: true },
    { label: 'Contact', key: 'phone', sortable: true },
    { label: 'Degination', key: 'degination', sortable: true },
    { label: 'Type', key: 'type', sortable: true },
  ]

  return (
    <>
      <div className="mb-4 flex justify-end items-start">
        <SearchInput
          value={searchQuery}
          placeholder="Search employee name..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Table
        title="Mark Attendance List"
        columns={columns}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        viewButton={true}
        viewButtonLabel="Mark Present"
        viewButtonIcon={<VscBlank size={1} />}
        viewButtonColor="green"
        handleViewButton={handleViewButton}
        isFetching={isLoading || MarkAttendance.isLoading}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
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
