import { Typography } from "@material-tailwind/react";
import { IoLogoFacebook, IoLogoLinkedin} from "react-icons/io5";
const Footers = () => {
  return (
    <div className="bg-black border-t border-blue-gray-50 px-10 py-10">
      <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between ">
        <Typography className="text-xl text-blue-400 font-semibold ">
            Task Management
        </Typography>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <Typography
            as="a"
            href="https://www.linkedin.com/in/sabbirhossain1"
            target="_blank"
            className="text-2xl text-white focus:text-blue-500"
          >
            <IoLogoLinkedin/>
          </Typography>
          <Typography
            as="a"
            href="https://www.facebook.com/sabbirh.cse"
            target="_blank"
            className="text-2xl text-white focus:text-blue-500"
          >
            <IoLogoFacebook/>
          </Typography>
        </ul>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <Typography
            as="a"
            href="/blog"
            className="font-normal text-white hover:text-blue-500 focus:text-blue-500"
          >
            Blog
          </Typography>
          <Typography
            as="a"
            href="/about"
            className="font-normal text-white hover:text-blue-500 focus:text-blue-500"
          >
            About
          </Typography>
          <Typography
            as="a"
            href="/contact"
            className="font-normal text-white hover:text-blue-500 focus:text-blue-500"
          >
            Contact
          </Typography>
        </ul>
      </footer>
      
      <div className="text-center mt-4">
      <hr />
        <Typography
            variant="small"
            className="mb-4 text-center font-normal text-white mt-2 md:mb-0"
          >
            &copy; 2023 Task Management
          </Typography>
        </div>
    </div>
  );
};

export default Footers;
