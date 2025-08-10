import React, { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const ReusableModal = ({
  show,
  initialData,
  onClose,
  onSubmit,
  title = 'Form',
  fields = [],
  size = 'lg',
}) => {
  const modalRef = useRef(null) // 🔹 ref for detecting outside clicks

  const initialFormState = fields.reduce((acc, field) => {
    if (field.type === 'multiselect') acc[field.name] = []
    else if (field.type === 'select') acc[field.name] = null
    else acc[field.name] = ''
    return acc
  }, {})

  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [showPasswords, setShowPasswords] = useState({})

  useEffect(() => {
    if (show) {
      if (initialData) {
        const prefilledData = fields.reduce((acc, field) => {
          acc[field.name] = initialData[field.name] || (field.type === 'multiselect' ? [] : '')
          return acc
        }, {})
        setFormData(prefilledData)
      } else {
        setFormData(initialFormState)
      }

      const initialVisibility = {}
      fields.forEach((field) => {
        if (field.type === 'password') {
          initialVisibility[field.name] = false
        }
      })
      setShowPasswords(initialVisibility)
    }
  }, [show, initialData])

  // 🔹 Close on outside click
  useEffect(() => {
    if (!show) return

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [show, onClose])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (selectedOption, fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: selectedOption }))
  }

  const togglePasswordVisibility = (fieldName) => {
    setShowPasswords((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    fields.forEach((field) => {
      const value = formData[field.name]
      const isEmpty =
        (['text', 'number', 'date', 'password'].includes(field.type) && !value) ||
        (field.type === 'select' && !value) ||
        (field.type === 'multiselect' && (!value || value.length === 0))

      if (field.required && isEmpty) {
        newErrors[field.name] = `${field.label} is required`
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    const cleanedData = { ...formData }
    fields.forEach((field) => {
      if (field.type === 'select') {
        cleanedData[field.name] = formData[field.name]?.value || ''
      } else if (field.type === 'multiselect') {
        cleanedData[field.name] = formData[field.name]?.map((item) => item.value) || []
      }
    })

    onSubmit(cleanedData)
    onClose()
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div
        ref={modalRef} // 🔹 attach ref here
        className={`bg-white rounded-lg shadow-lg w-full max-h-[90vh] overflow-y-auto ${
          size === 'sm' ? 'max-w-md' : size === 'xl' ? 'max-w-5xl' : 'max-w-2xl'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        <div className="px-6 py-4">
          {fields.map((field) => (
            <div className="mb-4" key={field.name}>
              <label className="block mb-1 font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>

              {field.type === 'multiselect' ? (
                <>
                  <Select
                    isMulti
                    options={field.options || []}
                    value={formData[field.name]}
                    onChange={(selected) => handleSelectChange(selected, field.name)}
                    placeholder="select option"
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                  )}
                </>
              ) : field.type === 'select' ? (
                <>
                  <Select
                    options={field.options || []}
                    value={formData[field.name]}
                    onChange={(selected) => handleSelectChange(selected, field.name)}
                    placeholder="select option"
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                  )}
                </>
              ) : field.type === 'password' ? (
                <div className="relative">
                  <input
                    type={showPasswords[field.name] ? 'text' : 'password'}
                    name={field.name}
                    value={formData[field.name]}
                    placeholder={field.placeholder}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility(field.name)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-900"
                    tabIndex={-1}
                  >
                    {showPasswords[field.name] ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                  )}
                </div>
              ) : (
                <>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    placeholder={field.placeholder}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReusableModal
