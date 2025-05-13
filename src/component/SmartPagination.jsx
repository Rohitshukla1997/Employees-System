/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'

function SmartPagination({
  totalPages,
  currentPage,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) {
  const handlePageChange = (page) => {
    if (page === '...' || page < 1 || page > totalPages || page === currentPage) {
      return
    }
    onPageChange(page)
  }

  const getPaginationItems = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 3) {
        start = 2
        end = 4
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3
        end = totalPages - 1
      }

      if (start > 2) pages.push('...')
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      if (end < totalPages - 1) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className="flex flex-col items-center my-4 space-y-4">
      {/* Pagination controls */}
      {itemsPerPage !== -1 && (
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${
              currentPage === 1 ? 'cursor-not-allowed bg-gray-200 text-gray-500' : 'hover:bg-gray-100'
            }`}
          >
            Previous
          </button>

          {getPaginationItems().map((item, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(item)}
              disabled={item === '...'}
              className={`px-3 py-1 border rounded ${
                item === currentPage
                  ? 'bg-blue-600 text-white'
                  : item === '...'
                  ? 'cursor-default text-gray-400'
                  : 'hover:bg-blue-100'
              }`}
            >
              {item}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages ? 'cursor-not-allowed bg-gray-200 text-gray-500' : 'hover:bg-gray-100'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Items per page selector */}
      <div className="flex items-center gap-2">
        <label className="text-sm">Show</label>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={-1}>All</option>
        </select>
        <label className="text-sm">entries per page</label>
      </div>
    </div>
  )
}

SmartPagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onItemsPerPageChange: PropTypes.func.isRequired,
}

export default SmartPagination
