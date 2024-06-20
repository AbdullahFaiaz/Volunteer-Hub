import { Link, useLoaderData, useParams } from "react-router-dom";
import VolunteerNeedsCard from "./VolunteerNeedsCard";
// import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { motion } from "framer-motion"

const VolunteerNeeds = () => {
    const [posts, setPosts] = useState([])
    const axiosSecure = useAxiosSecure()
    const name = useParams()
    // const posts = useLoaderData()

    useEffect(()=>{
        axiosSecure.get("posts")
        .then(res => {
            setPosts(res.data)
            // console.log(res.data)
          })
    },[axiosSecure])

const gridContainerVariants = {
    hidden: {opacity:0}, 
    show: {
        opacity:1,
        transition: {staggerChildren: .5}
        }
}

    // console.log("country name:",name)
    return (
        <>
            {/* <Helmet>
        <title></title>
    </Helmet> */}
    {posts.length>0 ? (<div className="w-[95%] mx-auto">
    <div className="flex flex-col items-center justify-center text-[4vw] lg:text-[2vw]">
        {name.country_name}
    </div>
    
<div className="flex flex-col overflow-x-hidden">
        <motion.div variants={gridContainerVariants} initial="hidden" animate="show" className="grid grid-cols-1 my-[2vw] lg:my-[3vw] md:grid-cols-2 lg:grid-cols-3">
            {
                posts.map(post=> <VolunteerNeedsCard key={post._id} post={post}></VolunteerNeedsCard>)
            }
        </motion.div>
</div>
        <div className="flex flex-col justify-center items-center">
        <Link to={"/needVolunteer"}>
            {/* btn btn-info */}
        <motion.button whileTap={{scale:0.9}} whileHover={{scale: 1.1}} transition={{bounceDamping:10, bounceStiffness:600}} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#3C5B6F] rounded-lg hover:bg-[#3a7196] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80
        ">See All</motion.button>
        </Link>

        </div>
            </div>) : (
<div className="w-[95%] mx-auto text-3xl" >No Data Found</div>
            )
        }
        </>
    );
};

export default VolunteerNeeds;