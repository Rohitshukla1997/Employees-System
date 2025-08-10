import SearchInput from '@/component/SearchInput'
import SmartPagination from '@/component/SmartPagination'
import Table from '@/component/Table'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { deleteData, getData, patchData, postData } from '@/fetchers'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import AddButton from '@/component/AddButton'
import { IoIosAddCircle } from 'react-icons/io'
import ReusableModal from '@/component/ReusableModal'

const newEmployees = () => {
  const queryClient = useQueryClient()

  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const totalPages = itemsPerPage === -1 ? 1 : Math.ceil(filteredData.length / itemsPerPage)

  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [submitEdit, setSubmitEdit] = useState(false)
  const [originalData, setOriginalData] = useState([])

  const columns = [
    { label: 'Employee Name', key: 'employeeName', sortable: true },
    { label: 'Email', key: 'email', sortable: true },
    { label: 'Degination', key: 'degination', sortable: true },
    { label: 'Type', key: 'type', sortable: true },
    { label: 'Username', key: 'username', sortable: true },
    { label: 'Password', key: 'password', sortable: false },
    { label: 'Contact', key: 'phone', sortable: true },
    { label: 'Joined', key: 'joinedDate', sortable: true },
  ]

  const fields = [
    {
      name: 'joinedDate',
      label: 'Joined Date',
      type: 'date',
      required: true,
    },

    {
      name: 'employeeName',
      label: 'Employee Name',
      type: 'text',
      placeholder: 'Enter Employee Name',
      required: true,
    },
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Enter Username',
      required: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'text',
      placeholder: 'Enter Password',
      required: true,
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      options: [
        { value: 'permanent', label: 'Permanent' },
        { value: 'intern', label: 'Intern' },
      ],
      required: true,
    },
    {
      name: 'degination',
      label: 'Degination',
      type: 'text',
      placeholder: 'Enter Degination',
      required: true,
    },
    { name: 'phone', label: 'Contact', type: 'tel', placeholder: 'Enter phone number' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email' },
  ]

  // for payload
  const mapUserToForm = (user) => ({
    employeeName: user?.employeeName || '',
    email: user?.email || '',
    username: user?.username || '',
    password: user?.password || '',
    degination: user?.degination || '',
    type: user?.type?.toLowerCase() || '',
    phone: user?.phone || '',
    joinedDate: user?.joinedDate
      ? (() => {
          const [day, month, year] = user.joinedDate.split('-')
          return `${year}-${month}-${day}` // HTML date input format
        })()
      : '',
  })

  //  get api
  const { data, isLoading } = useQuery({
    queryKey: ['employee/get-all-employees'],
    queryFn: getData,
    onError: (error) => {
      console.error('Error fetching data:', error)
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: true,
    keepPreviousData: true,
  })

  useEffect(() => {
    if (data) {
      const adaptedData = data.map((item) => {
        const dateObj = new Date(item.joinedDate)
        const day = String(dateObj.getDate()).padStart(2, '0')
        const month = String(dateObj.getMonth() + 1).padStart(2, '0')
        const year = dateObj.getFullYear()

        return {
          ...item,
          id: item._id,
          joinedDate: `${day}-${month}-${year}`,
        }
      })
      setOriginalData(adaptedData)
    }
  }, [data])

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase()

    const result = originalData.filter((item) =>
      Object.values(item).some((val) => String(val).toLowerCase().includes(lowerQuery)),
    )

    setFilteredData(result)
    setCurrentPage(1) // Reset to page 1 on new search
  }, [searchQuery, originalData])

  // post api

  const createEmployee = useMutation({
    mutationFn: (newUser) =>
      postData({
        endpoint: '/employee/create',
        payload: newUser,
      }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['employee/get-all-employees'])
      Swal.fire({
        icon: 'success',
        title: 'Created!',
        text: 'Your employee has been created.',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          confirmButton: 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700',
        },
        buttonsStyling: false,
      })
      setShowModal(false)
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'User Not Created',
        text: error.message || 'Unable to create user',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          confirmButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700',
        },
        buttonsStyling: false,
      })
    },
  })

  // delete api

  const deleteEmployee = useMutation({
    mutationFn: (employeeId) => deleteData({ endpoint: `/employee/delete/${employeeId}` }),
    onSuccess: () => {
      queryClient.invalidateQueries(['employee/get'])
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Your employee has been deleted.',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          confirmButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700',
        },
        buttonsStyling: false,
      })
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message || 'Failed to delete admin',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          confirmButton: 'bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700',
        },
        buttonsStyling: false,
      })
    },
  })

  //  edit api

  const editEmployee = useMutation({
    mutationFn: ({ employeeId, data }) =>
      patchData({
        endpoint: `/employee/update/${employeeId}`,
        payload: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['employee/get-all-employees'])
      Swal.fire({
        icon: 'success',
        title: 'Edited!',
        text: 'Your employee has been edited.',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
        },
        buttonsStyling: false,
      })
      setSubmitEdit(false)
      setShowModal(false)
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message || 'Failed to edit admin',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          confirmButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700',
        },
        buttonsStyling: false,
      })
    },
  })

  // handle submit

  const handleFormSubmit = async (formData) => {
    const employeeId = editingUser?.id

    const result = await Swal.fire({
      title: submitEdit
        ? 'Are you sure you want to edit this employee?'
        : 'Please confirm the information',
      text: submitEdit
        ? "You are about to edit this employee's account."
        : 'Are you sure you want to create this employee?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: submitEdit ? 'Yes, edit it!' : 'Yes, create it!',
      customClass: {
        popup: 'rounded-xl shadow-lg',
        confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
        cancelButton: 'bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 ml-2',
      },
      buttonsStyling: false, // must be false to apply custom classes
    })

    if (result.isConfirmed) {
      if (submitEdit) {
        editEmployee.mutate({ employeeId, data: formData })
      } else {
        createEmployee.mutate(formData)
      }
    }
  }

  // Delete handler

  const handleDeleteButton = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure you want to delete this employee?',
      text: 'You will not be able to retrieve this account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: 'rounded-xl shadow-lg',
        confirmButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700',
        cancelButton: 'bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 ml-2',
      },
      buttonsStyling: false,
    })

    if (result.isConfirmed) {
      deleteEmployee.mutate(id)
    }
  }

  // handle search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page on search
  }

  // handle edit button open by id modal
  const handleEditButton = (employeeId) => {
    const user = filteredData.find((u) => u.id === employeeId)

    const formUser = {
      ...mapUserToForm(user),
      id: employeeId,
      //FIXED: map type from string to full select option object
      type: {
        value: user?.type?.toLowerCase(),
        label:
          user?.type?.toLowerCase() === 'permanent'
            ? 'Permanent'
            : user?.type?.toLowerCase() === 'intern'
            ? 'Intern'
            : '',
      },
    }

    setEditingUser(formUser)
    setEditMode(true)
    setShowModal(true)
    setSubmitEdit(true)
  }

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
          <AddButton
            onClick={() => {
              setEditMode(false)
              setSubmitEdit(false)
              setEditingUser(null)
              setShowModal(true)
            }}
            icon={<IoIosAddCircle size={20} />}
          />
        </div>
      </div>

      <Table
        title="Employees"
        columns={columns}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
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

      <ReusableModal
        show={showModal}
        initialData={editMode ? editingUser : null}
        onClose={() => {
          setShowModal(false)
          setEditMode(false)
          setEditingUser(null)
        }}
        onSubmit={handleFormSubmit}
        title={editMode ? 'Edit Admin' : 'Add New Admin'}
        fields={fields}
      />
    </>
  )
}

export default newEmployees
