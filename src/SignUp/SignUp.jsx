import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Typography } from "@material-tailwind/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "../Components/SocialLogin/SocialLogin";
import useAxiosPublic from "../Components/Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import useAuth from "../Components/Hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import img from "../assets/image/Sign up-amico.png";
import useImageHost from "../Components/Hooks/useImageHost";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
  const {register, handleSubmit, reset, formState: { errors },} = useForm();
  const { createUser, signUpUpdateProfile, logOut } = useAuth();
  const imageHost = useImageHost();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const imageFile = new FormData();
    imageFile.append ('image', data.image[0]) 

    const res = await axiosPublic.post(imageHost, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      createUser(data.email, data.password)
      .then((result) => {
        const logger = result.user;
        console.log(logger);
        signUpUpdateProfile(data.name, res.data.data.display_url)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              image: res.data.data.display_url,
              role: 'user'
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                reset();
                toast.success("Sign Up Successfully!");
                logOut();
                navigate("/login");
              }
            });
          })
          .catch((error) => {
            console.error(error);
            toast.error(error);
          });
      });
    }
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
          <label className="label">
                  <span className="label-text">Your Photo</span>
                </label>
                <input
                  {...register("image", { required: true })}
                  type="file"
                  className="file-input  border border-blue-400 p-2 rounded-md text-blue-400 w-full max-w-xs"
                />
                 {errors.image && (
                  <span className="text-red-500">Image is required</span>
                )}
            <Input
              label="Name"
              size="lg"
              {...register("name", { required: true })}
              name="name"
              placeholder="Your name"
              type="text"
            />
            <Input
              label="Email"
              size="lg"
              {...register("email", { required: true })}
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
              className="absolute top-[334px] right-8"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">Password must be 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-500">
                Password must be less then 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must have one upper case, one lower case, one number
                and one special characters
              </p>
            )}
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
        </form>
        <CardFooter className="pt-0">
          <Button fullWidth className="bg-blue-400">
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
      </Card>
    </div>
    );
};

export default SignUp;