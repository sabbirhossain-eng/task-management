import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import img from "../../assets/image/Login-amico.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import useAuth from "../../Components/Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Login Successfully!");
        reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="pt-10 flex flex-col md:flex-row gap-10 items-center">
      <div className="w-auto md:w-[50%] mx-auto">
        <img src={img} alt="Login" className="md:w-[80%]" />
      </div>
      <Card className="w-auto md:w-[50%] lg:w-96 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <CardHeader
            variant="gradient"
            className="mb-4 grid h-20 place-items-center bg-blue-400"
          >
            <Typography variant="h3" color="white">
              Login
            </Typography>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Email"
              size="lg"
              name="email"
              placeholder="email"
              type="email"
            />
            <Input
              label="Password"
              size="lg"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
              name="password"
              placeholder="password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[172px] right-8"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>

          <CardFooter className="pt-0">
            <Button fullWidth type="submit" className="bg-blue-400">
              Sign In
            </Button>
            <div className="mt-4">
              <SocialLogin />
              <Typography variant="small" className="mt-6 flex justify-center">
                Don&apos;t have an account?
                <Typography
                  as="a"
                  href="/signUp"
                  variant="small"
                  className="ml-1 font-bold text-blue-400"
                >
                  Sign up
                </Typography>
              </Typography>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
