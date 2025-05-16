import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { CiBookmarkCheck } from "react-icons/ci";
import { BsClipboard2Data } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import Attendancemark from "./pages/attendance/attendancemark";
import { SignIn, SignUp } from "@/pages/auth";
import { NewUsers } from "./pages/users/NewUsers";
import AttendanceRecords from "./pages/records/attendanceRecords";
import NewEmployees from "./pages/employees/newEmployees";
import LeaveEmployees from "./pages/leaves/leaveEmployees";
import React from "react";


const icon = {
  className: "w-5 h-5 text-inherit",
};

const ProfileRecord = React.lazy(()=> import('./pages/records/profileRecord.jsx'))


export const routes = [
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
        hidden: true, //hide from sidebar
      },
      {
        icon: <FaUserPlus {...icon} />,
        name: "Users",
        path: "/newUsers",
        element: <NewUsers />,
      },
      {
        icon: <FaUsers {...icon} />,
        name: "Employees",
        path: "/newEmployees",
        element: <NewEmployees />,
      },
      {
        icon: <CiBookmarkCheck {...icon} />,
        name: "Mark Attendence",
        path: "/attendancemark",
        element: <Attendancemark />,
      },
      {
        icon: <BsClipboard2Data {...icon} />,
        name: "Attendence Records",
        path: "/attendanceRecords",
        element: <AttendanceRecords />
      },
      {
        icon: <SlCalender {...icon} />,
        name: "Employee Leave",
        path: "/leaveEmployees",
        element: <LeaveEmployees />
      },
      {
        name: "Profile Record",
        path: "profileRecord/:id", 
        element: <ProfileRecord />,
        hidden: true,

      }
    ],
  },
  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <RectangleStackIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
];

export default routes;
