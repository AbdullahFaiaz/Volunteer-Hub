import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { Helmet } from "react-helmet-async";
import { FaGoogle,FaGithub,FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Context/ContextComponent";
import axios from "axios";



const Login = () => {
  

  const [showPass, setShowPass] = useState(false);
  const handleShowPass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };
  const navigate = useNavigate();
  const location = useLocation();
  //context
  const {
    signInUser,
    googleLogIn,
    githubLogIn,
    setLoading,
  } = useContext(AuthContext);

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //on submit
  const onSubmit = (data) => {
    const { email, password } = data;


    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state ? location.state : "/");
        setTimeout(()=>{
          toast.success("Logged In Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        },1000)
      })
      .catch((error) => {
        console.log(error.message);
        toast("Invalid Id or Password. "+error.message)
        setLoading(false);
      });
  };

  //google log in
  const handleGoogleLogIn = () => {
    googleLogIn()
    .then((result) => {
        console.log(result.user);
        navigate(location?.state ? location.state : "/");
        setTimeout(()=>{
          toast.success("Logged In Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        },1000)
      })
      .catch((error)=>{
        toast(error.message)
        setLoading(false)
      });
  };

  //github log in
  const handleGithubLogIn = () => {
    githubLogIn()
    .then((result) => {
        console.log(result.user);
        navigate(location?.state ? location.state : "/");
        setTimeout(()=>{
          toast.success("Logged In Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        },1000)
      })
      .catch((error)=>{
        toast(error.message)
        setLoading(false)
      });
  };


  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-[4vw] py-[150px]">

            <Helmet>
                <title>LogIn | Volunteer Hub</title>
            </Helmet>
            <ToastContainer/>
    <div className="shadow-2xl p-8 rounded-lg bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body p-0 mt-2"
        //lg:w-[40%] md:w-[70%] sm:w-[80%] w-[90%] mx-auto
      >
        <p className="text-center text-2xl">Please Log In</p>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            name="email"
            className="input input-bordered"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <span className="flex relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="password"
              name="password"
              className="input input-bordered w-full"
              {...register("password", { required: true })}
            />
            <button
              className="absolute h-full right-[1vw]"
              onClick={handleShowPass}
            >
              {showPass ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
            </button>
          </span>
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}

          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control">
          <button className="btn bg-black text-white">LogIn</button>
        </div>
      </form>
      <div className="mt-2"
      //lg:w-[35%] md:w-[60%] sm:w-[70%] w-[85%] mx-auto
      >
        <p>  {`Don't have an account?`} please{" "}
        <Link className="text-blue-600 font-bold" to={"/register"}>
          Register
        </Link>
        </p>
      </div>
          </div>
      <div className="flex flex-col items-center justify-center"
      
      >
        <div className="gap-[3vw] md:gap-[1vw] flex flex-col items-center justify-center"
        //lg:w-[15%] md:w-[25%] sm:w-[50%] w-[65%]
        >
            <div className="text-slate-700 my-3">____________Or Log In with___________</div>
          <div onClick={handleGoogleLogIn}>            
          <AwesomeButton type="danger">
            <p className="flex items-center gap-1"><span><FaGoogle /></span> <span>Log In with Google</span></p>
          </AwesomeButton>
          </div>
 


          <div onClick={handleGithubLogIn}>            
          <AwesomeButton type="github">
            <p className="flex items-center gap-1"><span><FaGithub /></span> <span>Log In with Github</span></p>
          </AwesomeButton>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Login;
