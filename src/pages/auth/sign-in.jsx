import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SignIn() {
  return (
    <section className="h-screen w-screen overflow-hidden flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/5 flex items-center justify-center">
        <div className="text-center w-full px-4 sm:px-8 lg:px-16">
          <Typography variant="h2" className="font-bold mb-4">Welcome To Protech</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your email and password to Sign In.
          </Typography>

          <form className="mt-8 mb-2 mx-auto w-full max-w-md">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Your email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Link to="/home" className="block mt-6">
              <Button fullWidth>Log In</Button>
            </Link>
          </form>
        </div>
      </div>

      <div className="p-4 ml-14 w-2/6 h-full rounded-3xl ">
        <img
          src="/img/pattern.png"
          alt="Pattern"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default SignIn;
