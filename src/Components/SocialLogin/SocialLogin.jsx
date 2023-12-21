import { Button } from "@material-tailwind/react";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { FaGithub } from "react-icons/fa";


const SocialLogin = () => {
    const {googleSignIn, githubSignIn} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(res =>{
          toast.success("Login Successfully!");
          navigate(from, { replace: true });
            const userInfo ={
                email: res.user?.email,
                name: res.user?.displayName,
                image: res.user?.photoURL,
                role: 'user'
            }

            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data)
                navigate(from, { replace: true });
            })
        })
    };

    const handleGithubSignIn = () =>{
      githubSignIn()
      .then(res =>{
        toast.success("Login Successfully!");
        navigate(from, { replace: true });
        const userInfo ={
            email: res.user?.email,
            name: res.user?.displayName,
            image: res.user?.photoURL,
            role: 'user'
        }

        axiosPublic.post('/users', userInfo)
        .then(res =>{
            console.log(res.data)
            navigate(from, { replace: true });
        })
    })
    }
    return (
        <div>
        <div className="flex flex-col justify-center">
          <Button
            size="lg"
            variant="outlined"
            className="flex justify-center items-center gap-3 p-2 rounded-lg capitalize text-blue-400"
            onClick={handleGoogleSignIn}
          >
            <img
              src="https://docs.material-tailwind.com/icons/google.svg"
              alt="metamask"
              className="h-6 w-6"
            />
            Continue with Google
          </Button>
        </div>
        <div className="flex flex-col justify-center mt-2">
          <Button
            size="lg"
            variant="outlined"
            className="flex justify-center items-center gap-3 p-2 rounded-lg capitalize text-blue-400"
            onClick={handleGithubSignIn}
          >
            <FaGithub
              className="h-6 w-6"
            />
            Continue with GitHub
          </Button>
        </div>
        <div className="divider"></div>
      </div>
    );
};

export default SocialLogin;