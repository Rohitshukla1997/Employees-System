import React from "react";
import {
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { CiBookmarkCheck } from "react-icons/ci";
import { BsClipboard2Data } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";

import { Home, Profile } from "@/pages/dashboard";
import Attendancemark from "./pages/attendance/attendancemark";
import { SignIn, SignUp } from "@/pages/auth";
import { NewUsers } from "./pages/users/NewUsers";
import AttendanceRecords from "./pages/records/attendanceRecords";
import NewEmployees from "./pages/employees/newEmployees";
import LeaveEmployees from "./pages/leaves/leaveEmployees";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const ProfileRecord = React.lazy(() => import('./pages/records/profileRecord.jsx'));
const AllHistoryDeatils = React.lazy(() => import('./pages/records/historyattendance/allHistoryDeatils.jsx'));

const icon = {
  className: "w-5 h-5 text-inherit",
};

const getRole = () => {
  const token = Cookies.get('token');
  if (!token) {
    console.log('No token found');
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    console.log('Role from token:', role);
    return role;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const role = getRole();
console.log('Current role:', role);

let routes = [];

if (role === 'SuperAdmin') {
  routes = [
    {
      layout: "dashboard",
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: "dashboard",
          path: "/home",
          element: <Home />,
        },
        {
          icon: <UserCircleIcon {...icon} />,
          name: "profile",
          path: "/profile",
          element: <Profile />,
          hidden: true,
        },
        {
          icon: <FaUserPlus {...icon} />,
          name: "Users",
          path: "/newUsers",
          element: <NewUsers />,
        },
      ],
    },
  ];
} else if (role === 'Admin') {
  routes = [
    {
      layout: "dashboard",
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: "dashboard",
          path: "/home",
          element: <Home />,
        },
        {
          icon: <UserCircleIcon {...icon} />,
          name: "profile",
          path: "/profile",
          element: <Profile />,
          hidden: true,
        },
        {
          icon: <FaUsers {...icon} />,
          name: "Employees",
          path: "/newEmployees",
          element: <NewEmployees />,
        },
        {
          icon: <CiBookmarkCheck {...icon} />,
          name: "Mark Attendance",
          path: "/attendancemark",
          element: <Attendancemark />,
        },
        {
          icon: <BsClipboard2Data {...icon} />,
          name: "Attendance Records",
          path: "/attendanceRecords",
          element: <AttendanceRecords />,
        },
        {
          icon: <SlCalender {...icon} />,
          name: "Employee Leave",
          path: "/leaveEmployees",
          element: <LeaveEmployees />,
        },
        {
          name: "Profile Record",
          path: "profileRecord/:id",
          element: <ProfileRecord />,
          hidden: true,
        },
        {
          name: "All History Record",
          path: "allHistoryDeatils/:id",
          element: <AllHistoryDeatils />,
          hidden: true,
        },
      ],
    },
  ];
} else {
  managementItems = [
    {
      layout: "dashboard",
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: "dashboard",
          path: "/home",
          element: <Home />,
        }
      ]}
  ]
}

export default routes;
