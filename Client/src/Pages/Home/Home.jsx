
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion"
import { AuthContext } from "../../Context/ContextComponent";

import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import useAxiosSecure from "../../Hook/useAxiosSecure";
import VolunteerNeeds from "../Volunteer Needs Now/VolunteerNeeds";
import BannerSlider from './../../Components/BannerSlider';
import { Link } from "react-router-dom";
import footerBg from "../../assets/footerImg.png" 



// ..
AOS.init();




const Home = () => {
  const axiosSecure = useAxiosSecure()





  const {user} = useContext(AuthContext)
  const [myPosts, setMyPosts] = useState([])
  // console.log(myPosts)
  const url = `/myPostsTwo?email=${user?.email}`


useEffect(()=>{

   axiosSecure.get(url)
   .then(res => {
       // console.log("my posts" ,res.data)
       setMyPosts(res.data)
   })
},[axiosSecure,url])
  



    return (
        <>
    <Helmet>
        <title>Home | Volunteer Hub</title>
    </Helmet>
                <ToastContainer/>    

{/* ________________________Banner Slider_________________________________________ */}
<div className="relative">
<BannerSlider></BannerSlider>

</div>


{/* __________________________Volunteer Needs Now Section__________________________________ */}
<div className="mt-10 mb-6 mx-[5%]">
<hr />
<h2 className="text-[4.3vw] lg:text-[3vw] text-center rounded-sm  text-black font-bold">Volunteer Needs Now</h2>
<hr />
</div>
{/* <h2 className="text-[4.3vw] lg:text-[3vw] text-center text-black font-bold mt-10 mb-2"></h2> */}
        <VolunteerNeeds></VolunteerNeeds>

{/* See all request in my posts */}
<div className="mt-10 mb-6 mx-[5%]">
<hr />
<h2 className="text-[4.3vw] lg:text-[3vw]  rounded-sm text-center text-black font-bold">See Requests To Your Post</h2>
<hr />
</div>
{myPosts.length>0? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {myPosts.map(post=> <div key={post._id} className="flex flex-col items-center justify-center mb-7 mx-auto">
  <img className="w-[280px] h-64 bg-gray-300 rounded-lg shadow-md" src={post.Thumbnail}/>

    <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
        <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">{post.Title}</h3>

        <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
            <span className="font-bold text-gray-800 dark:text-gray-200">Volunteers Needed:{post.NumberOfVolunteers}</span>
            {/* <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">Add to cart</button> */}
            <Link to={`/seeRequestsToThisPost/${post._id}`}>
              <motion.button whileTap={{scale:0.9}} whileHover={{scale: 1.1}} className="
              px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none
              ">View Requests</motion.button>
            </Link>
        </div>
    </div>
</div>)}



</div>): (user? <div className="text-center text-2xl font-bold mb-20 bg-[#cbc8c8] py-28">Sorry! You Do Not Have Any Post</div> : <div className="text-center text-2xl font-bold mb-20 bg-[#cbc8c8] py-28">Please Login to see requests to your posts</div>)

}


        {/* about us */}



        <section  style={{ backgroundImage: `url(${footerBg})`,backgroundAttachment: 'fixed' }} className="bg-cover py-[4vw] mb-16 px-[3.3vw] lg:px-[14vw] text-[3.5vw] lg:text-[2vw] text-[#000000]">
  <div className="text-center p-2 bg-[#ffffff8a]">
    <h2 className="text-[4.3vw] lg:text-[3vw] text-[hsl(0,0%,0%)] font-bold mb-4">About Us</h2>
    <p className="mb-8">Join Hands, Make a Difference</p>
    <div className="flex justify-center mb-8">
      <div className="w-16 h-1 bg-[#000000] rounded-full"></div>
    </div>

    <p className="leading-relaxed mt-4">
Welcome to Volunteer Hub, where we connect organizations with passionate individuals eager to make a difference.  
    </p>
    <p className="leading-relaxed mt-4">
    
    At Volunteer Hub, organizations showcase causes and initiatives while individuals find diverse volunteer opportunities. Whether you're looking to support a cause, gain experience, or connect with like-minded individuals, Volunteer Hub is your gateway to making a difference.  
     </p>
    <p className=" leading-relaxed mt-4">
    Our ethos is simple: Join Hands, Make a Difference. Together, let's harness the power of unity and generosity to create a better tomorrow for all.
</p>
    <div className="flex justify-center mt-12">
     
    </div>
  </div>
</section>

        {/* about us ends */}
            </>
    );
};

export default Home;