import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaGlobe } from "react-icons/fa"; 
import { FaMobileScreen } from "react-icons/fa6";

export function Profile() {
  return (
    <>
      {/* Background Image Section */}
      <div className="relative mt-8 h-32 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>

      {/* Profile Card */}
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-6">
          {/* Profile Header */}
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt="bruce-mars"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  Richard Davis
                </Typography>
                <Typography variant="small" className="font-normal text-blue-gray-600">
                  CEO / Co-Founder
                </Typography>
              </div>
            </div>
            <Link to="/edit-profile">
              <Button color="blue" variant="outlined" size="sm">
                Edit Profile
              </Button>
            </Link>
          </div>

          {/* Company Information Section */}
          <div className="mt-8 px-4">
            <Typography variant="h6" color="blue-gray" className="mb-4 font-semibold text-xl">
              Company Information
            </Typography>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-6 flex items-center gap-4">
                <FaMapMarkerAlt className="w-6 h-6 text-black-500" />
                <div>
                  <Typography variant="h6" color="blue-gray" className="text-lg font-semibold">
                    Address
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="text-sm font-normal text-blue-gray-600">
                    123 Business Park, Tech Street, Bangalore 560001
                  </Typography>
                </div>
              </div>

              <div className="mb-6 flex items-center gap-4">
                <FaPhoneAlt className="w-6 h-6 text-black-500" />
                <div>
                  <Typography variant="h6" color="blue-gray" className="text-lg font-semibold">
                    Office Number
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="text-sm font-normal text-blue-gray-600">
                    080-12345678
                  </Typography>
                </div>
              </div>

              <div className="mb-6 flex items-center gap-4">
                <FaMobileScreen className="w-6 h-6 text-black-500" />
                <div>
                  <Typography variant="h6" color="blue-gray" className="text-lg font-semibold">
                    Mobile Number
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="text-sm font-normal text-blue-gray-600">
                    +91 98765 43210
                  </Typography>
                </div>
              </div>

              <div className="mb-6 flex items-center gap-4">
                <FaGlobe className="w-6 h-6 text-black-500" />
                <div>
                  <Typography variant="h6" color="blue-gray" className="text-lg font-semibold">
                    Website
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="text-sm font-normal text-blue-gray-600">
                    <a href="https://www.techcorp.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      www.techcorp.com
                    </a>
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
