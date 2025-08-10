// src/components/Notification.jsx
import React from 'react'
import { Menu, MenuHandler, MenuList, MenuItem, Avatar, Typography } from '@material-tailwind/react'
import { ClockIcon, BellIcon } from '@heroicons/react/24/solid'

const Notification = ({ notifications }) => {
  return (
    <Menu>
      <MenuHandler>
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <BellIcon className="h-6 w-6 text-blue-gray-500" />
          {notifications?.length > 0 && (
            <span className="absolute top-1 right-1 inline-flex h-3 w-3 rounded-full bg-red-500"></span>
          )}
        </button>
      </MenuHandler>

      <MenuList className="w-80 max-h-96 overflow-y-auto border-0 shadow-lg">
        {notifications?.length > 0 ? (
          notifications.map((item, index) => (
            <MenuItem key={index} className="flex items-center gap-3">
              {item.avatar ? (
                <Avatar src={item.avatar} alt={item.title} size="sm" variant="circular" />
              ) : (
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900 text-white">
                  {item.icon}
                </div>
              )}
              <div>
                <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
                  <strong>{item.title}</strong> {item.message}
                </Typography>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="flex items-center gap-1 text-xs font-normal opacity-60"
                >
                  <ClockIcon className="h-3.5 w-3.5" /> {item.time}
                </Typography>
              </div>
            </MenuItem>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">No new notifications</div>
        )}
      </MenuList>
    </Menu>
  )
}

export default Notification
