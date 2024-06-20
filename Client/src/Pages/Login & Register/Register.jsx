import { useContext, useState } from "react";

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Context/ContextComponent";

const Register = () => {

    
  const navigate = useNavigate();
  //auth context
  const authInfo = useContext(AuthContext);
  const {setUser} = useContext(AuthContext);
  const { createUser, updateUserProfile, setLoading } = authInfo;
  //show pass
  const [showPass, setShowPass] = useState(false);
  const handleShowPass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //on submit
  const onSubmit = (data) => {
    const { email, password, photoURL, displayName } = data;
    // console.log(data)
    //create user

  // Password validation
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;

  if (
    !uppercaseRegex.test(password) ||
    !lowercaseRegex.test(password) ||
    password.length < 6
  ) {
    // Show error toast
    toast.error("Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long");
    return;
  }

  // If password is valid, proceed with registration
  createUser(email, password)
    .then((result) => {
      updateUserProfile(displayName, photoURL);
        //updating manually
        setUser({...result, displayName, photoURL})

        
        navigate("/");
      setTimeout(()=>{
        toast.success("Registered Successfully", {
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
      console.log(error.message)
      toast(error.message)
      setLoading(false)
    });
    
};



  return (
    <div className="flex justify-center items-center py-8 md:py-12 lg:pt-[110px]">
        <Helmet>
            <title>Register | Volunteer Hub</title>
        </Helmet>
        <ToastContainer />
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full md:w-[80%] lg:w-[70%] max-w-md">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="form-control">
                    <label className="label text-gray-800">Name</label>
                    <input
                        type="text"
                        placeholder="Name"
                        className="input input-bordered w-full bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        {...register("displayName", { required: true })}
                    />
                    {errors.displayName && (
                        <span className="text-red-500 text-sm">This field is required</span>
                    )}
                </div>

                <div className="form-control">
                    <label className="label text-gray-800">Photo URL</label>
                    <input
                        type="text"
                        placeholder="Photo URL"
                        className="input input-bordered w-full bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        {...register("photoURL", { required: true })}
                    />
                    {errors.photoURL && (
                        <span className="text-red-500 text-sm">This field is required</span>
                    )}
                </div>

                <div className="form-control">
                    <label className="label text-gray-800">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="input input-bordered w-full bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        {...register("email", { required: true })}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm">This field is required</span>
                    )}
                </div>

                <div className="form-control">
                    <label className="label text-gray-800">Password</label>
                    <div className="relative">
                        <input
                            type={showPass ? "text" : "password"}
                            placeholder="Password"
                            className="input input-bordered w-full bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-800"
                            {...register("password", { required: true })}
                        />
                        <button
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 font-extrabold"
                            onClick={handleShowPass}
                        >
                            {showPass ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
                        </button>
                    </div>
                    {errors.password && (
                        <span className="text-red-500 text-sm">This field is required</span>
                    )}
                    <label className="label text-sm text-right">
                        <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
                    </label>
                </div>

                <div className="form-control mt-4">
                    <button className="w-full h-11 rounded-lg hover:bg-gray-600 text-white bg-black transition duration-300">
                        Register
                    </button>
                </div>
            </form>
            <p className="text-center mt-4 text-sm text-gray-800">
                Already have an account?{" "}
                <Link className="text-blue-500 hover:underline" to="/login">
                    Log In
                </Link>
            </p>
        </div>
    </div>
);




};

export default Register;


