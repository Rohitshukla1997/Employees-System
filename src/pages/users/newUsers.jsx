import React, { useEffect, useState } from 'react';
import Table from '@/component/Table';
import SmartPagination from '@/component/SmartPagination';
import SearchInput from '@/component/SearchInput';
import { users } from './data/data';
import AddButton from '@/component/AddButton';
import { IoIosAddCircle } from 'react-icons/io'
import ReusableModal from '@/component/ReusableModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteData, getData, patchData, postData } from '@/fetchers';
import Swal from 'sweetalert2';


export const NewUsers = () => {
   const queryClient = useQueryClient()
    const [filteredData, setFilteredData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [showModal, setShowModal] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const [submitEdit, setSubmitEdit] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [originalData, setOriginalData] = useState([])
    const totalPages = itemsPerPage === -1 ? 1 : Math.ceil(filteredData.length / itemsPerPage)
    const columns = [
      { label: 'Admin Name', key: 'adminName', sortable: true },
      { label: 'Email', key: 'email', sortable: true },
      { label: 'Phone', key: 'phone', sortable: true },
      { label: 'Username', key: 'username', sortable: true },
      { label: 'Password', key: 'password', sortable: false, hidable: true },
      { label: 'Role', key: 'role', sortable: true },
    ]

    const fields = [
      {
        name: 'adminName',
        label: 'Admin Name',
        type: 'text',
        placeholder: 'Enter Admin name',
      },
      {
        name: 'username',
        label: 'User Name',
        type: 'text',
        placeholder: 'Enter username name',
        required: true,
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter password',
        required: true,
      },
      { name: 'phone', label: 'Phone', type: 'tel', placeholder: 'Enter phone number' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email' },
    ]

 const mapUserToForm = (user) => ({
    adminName: user?.adminName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    Address: user?.Address || '',
    username: user?.username || '',
    password: user?.password || '',
  })

  const { data, isLoading } = useQuery({
    queryKey: ['admin/get'],
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
        const adaptedData = data.map((item) => ({
          ...item,
          id: item._id,
        }))
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
  
    const createAdmin = useMutation({
      mutationFn: (newUser) =>
        postData({
          endpoint: '/admin/create',
          payload: newUser,
        }),
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(['admin/get']);
        Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Your admin has been created.',
          customClass: {
            popup: 'rounded-xl shadow-lg',
            confirmButton: 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700',
          },
          buttonsStyling: false,
        });
        setShowModal(false);
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
        });
      },
    });
    
    const deleteAdmin = useMutation({
      mutationFn: (adminId) => deleteData({ endpoint: `/admin/delete/${adminId}` }),
      onSuccess: () => {
        queryClient.invalidateQueries(['admin/get']);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your admin has been deleted.',
          customClass: {
            popup: 'rounded-xl shadow-lg',
            confirmButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700',
          },
          buttonsStyling: false,
        });
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
        });
      },
    });
    
    const editAdmin = useMutation({
      mutationFn: ({ adminId, data }) =>
        patchData({
          endpoint: `/admin/update/${adminId}`,
          payload: data,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries(['admin/get']);
        Swal.fire({
          icon: 'success',
          title: 'Edited!',
          text: 'Your admin has been edited.',
          customClass: {
            popup: 'rounded-xl shadow-lg',
            confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
          },
          buttonsStyling: false,
        });
        setSubmitEdit(false);
        setShowModal(false);
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
        });
      },
    });
    
  
    const handleFormSubmit = async (formData) => {
      const adminId = editingUser?.id;
    
      const result = await Swal.fire({
        title: submitEdit
          ? 'Are you sure you want to edit this admin?'
          : 'Please confirm the information',
        text: submitEdit
          ? "You are about to edit this admin's account."
          : 'Are you sure you want to create this admin?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: submitEdit ? 'Yes, edit it!' : 'Yes, create it!',
        customClass: {
          popup: 'rounded-xl shadow-lg',
          confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
          cancelButton: 'bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 ml-2',
        },
        buttonsStyling: false, // must be false to apply custom classes
      });
    
      if (result.isConfirmed) {
        if (submitEdit) {
          editAdmin.mutate({ adminId, data: formData });
        } else {
          createAdmin.mutate(formData);
        }
      }
    };
    
    const handleDeleteButton = async (id) => {
      const result = await Swal.fire({
        title: 'Are you sure you want to delete this admin?',
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
      });
    
      if (result.isConfirmed) {
        deleteAdmin.mutate(id);
      }
    };
    
  
    const handleEditButton = (adminId) => {
      const user = filteredData.find((u) => u.id === adminId)
      setEditingUser({ ...mapUserToForm(user), id: adminId })
      setEditMode(true)
      setShowModal(true)
      setSubmitEdit(true)
    }
  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };



  return (
<>
<div className="mb-4 flex justify-between items-center">
    <div></div> {/* Empty div to push content to the right */}

    <div className="flex gap-2">      <SearchInput
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
    title="Admin"
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
      setItemsPerPage(value);
      setCurrentPage(1);
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


  );
};
