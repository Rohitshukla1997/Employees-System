import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from './component/ProfileCard';
import { profileView } from './data/data';
import Tabs from './component/Tabs';
import AttendanceCard from './attendance/attendanceCard';
import HistoryAttendance from './historyattendance/historyAttendance';

const ProfileRecord = () => {
  const { id } = useParams();

  // Find the profile matching the ID
  const profile = profileView.find((item) => item.id === id);

  // Fallback if no profile is found
  if (!profile) {
    return (
      <div className="text-center text-red-500 mt-10">
        Profile not found
      </div>
    );
  }

  const profileImage = `https://api.dicebear.com/9.x/thumbs/svg?seed=${profile.name}`;

  const tabData =[
    { label: 'Attendance', content: <AttendanceCard id={id} /> },
    { label: 'Attendance History', content: <HistoryAttendance id={id} /> },
    { label: 'Document locker', content: 'Document locker section' }
  ]

  return (
    <>
    <ProfileCard
      profileImage={profileImage}
      name={profile.name}
      role={profile.designation}
      email={profile.email}
      type={profile.type}
      contact={profile.contact}
      joined={profile.joined}
    />

      <div className="max-w-4xl mx-auto mt-5">
        <Tabs tabs={tabData}  />
      </div>

    </>
  );
};

export default ProfileRecord;
