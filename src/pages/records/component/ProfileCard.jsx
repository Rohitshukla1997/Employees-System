import { Mail, Briefcase, Phone, CalendarDays } from 'lucide-react';

const ProfileCard = ({
  profileImage,
  name,
  role,
  email,
  type, // 'Permanent' or 'Internship'
  contact,
  joined,
}) => {

  const backgroundUrl = `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(name)}`;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl mx-auto">
      {/* Top Banner */}
      <div
        className="rounded-t-xl h-32 w-full flex items-center justify-center relative"
        style={{
          backgroundImage: `url("${backgroundUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img
          src={profileImage}
          alt="Profile"
          className="absolute left-6 -bottom-10 w-24 h-24 rounded-full object-cover border-4 border-white"
        />
      </div>

      {/* Profile Details */}
      <div className="pt-2 pl-32 pr-4">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="mt-1 text-sm text-gray-700">{role}</p>

        <div className="mt-3 flex flex-wrap items-center gap-6 text-sm text-gray-800">
  <div className="flex items-center gap-2">
    <Mail className="w-4 h-4 text-gray-500" />
    <span>{email}</span>
  </div>
  <div className="flex items-center gap-2">
    <Briefcase className="w-4 h-4 text-gray-500" />
    <span>{type}</span>
  </div>
  <div className="flex items-center gap-2">
    <Phone className="w-4 h-4 text-gray-500" />
    <span>{contact}</span>
  </div>
  <div className="flex items-center gap-2">
    <CalendarDays className="w-4 h-4 text-gray-500" />
    <span>Joined: {joined}</span>
  </div>
</div>

      </div>
    </div>
  );
};

export default ProfileCard;
