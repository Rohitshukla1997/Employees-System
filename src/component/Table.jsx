import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash, FaEdit, FaTrash } from 'react-icons/fa';
import { Avatar, Chip, Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';

const skeletonStyles = `
  @keyframes pulse {
    0% { opacity: 1 }
    50% { opacity: 0.4 }
    100% { opacity: 1 }
  }

  .skeleton-loader {
    background: #e0e0e0;
    border-radius: 4px;
    animation: pulse 1.5s infinite;
  }
`;

function Table({
  title,
  filteredData,
  setFilteredData,
  columns,
  viewButton,
  viewButtonLabel = 'View',
  viewButtonIcon = <FaEye size={16} />,
  viewButtonColor = 'gray',
  handleViewButton,
  editButton,
  handleEditButton,
  deleteButton,
  handleDeleteButton,
  currentPage,
  itemsPerPage,
  isFetching,
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [viewLoadingId, setViewLoadingId] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState({});

  const togglePasswordVisibility = (rowId) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key) => {
    if (!columns.find((column) => column.key === key && column.sortable)) return;
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      if (aStr < bStr) return direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredData(sorted);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return '↕';
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="w-full px-4">
        <style>{skeletonStyles}</style>
        <Card className="mb-4 bg-white shadow-lg rounded-lg">
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              {title}
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-center">
                    <Typography className="font-bold">SN</Typography>
                  </th>
                  {columns
                    .filter((col) => !col.hidden)
                    .map((column, index) => (
                      <th
                        key={index}
                        className="border-b border-blue-gray-50 py-3 px-5 text-center cursor-pointer"
                        onClick={() => column.sortable && handleSort(column.key)}
                      >
                        {column.label} {column.sortable && getSortIcon(column.key)}
                      </th>
                    ))}
                  {(editButton || deleteButton || viewButton) && (
                    <th className="border-b border-blue-gray-50 py-3 px-5 text-center">
                      <Typography className="font-bold">Actions</Typography>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {isFetching ? (
                  Array.from({ length: itemsPerPage }).map((_, index) => (
                    <tr key={`skeleton-${index}`}>
                      <td className="px-3 py-2 border text-center">
                        <div className="skeleton-loader h-5" />
                      </td>
                      {columns.map((_, colIndex) => (
                        <td key={colIndex} className="px-3 py-2 border text-center">
                          <div className="skeleton-loader h-5" />
                        </td>
                      ))}
                      {(editButton || deleteButton || viewButton) && (
                        <td className="px-3 py-2 border text-center flex justify-center gap-2">
                          {editButton && <div className="skeleton-loader w-5 h-5" />}
                          {deleteButton && <div className="skeleton-loader w-5 h-5" />}
                          {viewButton && <div className="skeleton-loader w-16 h-8" />}
                        </td>
                      )}
                    </tr>
                  ))
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 2} className="text-center px-3 py-2 border">
                      No {title} found.
                    </td>
                  </tr>
                ) : (
                  currentData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="px-3 py-2 border text-center">
                        {(currentPage - 1) * itemsPerPage + rowIndex + 1}
                      </td>
                      {columns
                        .filter((col) => !col.hidden)
                        .map((column) => {
                          const isPassword = column.key.toLowerCase().includes('password');
                          return (
                            <td key={column.key} className="px-3 py-2 border text-center">
                              {isPassword ? (
                                <div className="flex items-center justify-center gap-2">
                                  <span>
                                    {passwordVisibility[row.id]
                                      ? row[column.key]
                                      : '••••••'}
                                  </span>
                                  <button
                                    onClick={() => togglePasswordVisibility(row.id)}
                                    className="text-gray-600 hover:text-gray-800"
                                  >
                                    {passwordVisibility[row.id] ? (
                                      <FaEyeSlash />
                                    ) : (
                                      <FaEye />
                                    )}
                                  </button>
                                </div>
                              ) : (
                                row[column.key]
                              )}
                            </td>
                          );
                        })}
                      {(editButton || deleteButton || viewButton) && (
                        <td className="px-3 py-2 border text-center">
                          <div className="flex justify-center items-center gap-4">
                            {editButton && (
                              <button
                                onClick={() => handleEditButton(row.id)}
                                className="text-blue-600 hover:text-blue-800"
                                aria-label="Edit"
                              >
                                <FaEdit size={20} />
                              </button>
                            )}
                            {deleteButton && (
                              <button
                                onClick={() => handleDeleteButton(row.id)}
                                className="text-red-600 hover:text-red-800"
                                aria-label="Delete"
                              >
                                <FaTrash size={20} />
                              </button>
                            )}
                            {viewButton && (
                              <button
                                className="flex items-center gap-1 text-white text-sm px-2 py-1 rounded hover:opacity-90"
                                onClick={async () => {
                                  setViewLoadingId(row.id);
                                  await handleViewButton(row.id);
                                  setViewLoadingId(null);
                                }}
                                disabled={viewLoadingId === row.id}
                                style={{
                                  backgroundColor: viewButtonColor,
                                  opacity: viewLoadingId === row.id ? 0.6 : 1,
                                }}
                              >
                                {viewButtonIcon}
                                <span>
                                  {viewLoadingId === row.id ? 'Loading...' : viewButtonLabel}
                                </span>
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

Table.propTypes = {
  title: PropTypes.string,
  filteredData: PropTypes.array,
  columns: PropTypes.array,
  setFilteredData: PropTypes.func,
  viewButton: PropTypes.bool,
  viewButtonLabel: PropTypes.string,
  viewButtonIcon: PropTypes.node,
  viewButtonColor: PropTypes.string,
  handleViewButton: PropTypes.func,
  editButton: PropTypes.bool,
  handleEditButton: PropTypes.func,
  deleteButton: PropTypes.bool,
  handleDeleteButton: PropTypes.func,
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  isFetching: PropTypes.bool,
};

Table.defaultProps = {
  isFetching: false,
};

export default Table;
