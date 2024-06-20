
import { Link, useLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Context/ContextComponent";
import axios from "axios";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from 'sweetalert2';
import { motion } from "framer-motion"
 
const ManageMyPost = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [requests, setRequests] = useState([])

    // const url = `https://volunteer-hub-beryl.vercel.app/myProducts?user_email=${user?.email}`
    const url = `/myPosts?email=${user?.email}`
    const reqUrl = `/myRequests?volunteerEmail=${user?.email}`
    useEffect(() => {

        // axios.get(url, {withCredentials: true})
        axiosSecure.get(url)
        .then(res => {
            // console.log("my posts" ,res.data)
            setPosts(res.data)
        })
        axiosSecure.get(reqUrl)
        .then(res => {
            // console.log("my requests" ,res.data)
            setRequests(res.data)
        })


    }, [axiosSecure,url,reqUrl]); 



    const handleDelete = (id) =>{
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
  
            fetch(`https://volunteer-hub-beryl.vercel.app/posts/${id}`,{
              method:'DELETE'
          })
          .then(res=> res.json())
          .then(data=> {
              // console.log("deleting ",data)
              if(data.deletedCount>0){
                  const remaining = posts.filter(post=> post._id!== id)
                   setPosts(remaining)
                  Swal.fire({
                    title: "Deleted!",
                    text: "The post has been deleted.",
                    icon: "success"
                  });
              }
          })
  
          }
  
  
        });
  
  
      }




      const handleCancel = (_id,id) =>{
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
          if (result.isConfirmed) {
            



            fetch(`https://volunteer-hub-beryl.vercel.app/cancelRequest/${_id}`,{
              method:'DELETE'
          })
          .then(res=> res.json())
          .then(data=> {
              // console.log("Cancelling ",data)
              if(data.deletedCount>0){
                  const remaining = requests.filter(request=> request._id!== _id)
                   setRequests(remaining)
                    
                   
                   // request.id
                    fetch(`https://volunteer-hub-beryl.vercel.app/increase/${id}`,{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify()
                    })
                    .then((res) => res.json())
                        // .then((data) => console.log(data))
          }

                  Swal.fire({
                    title: "Cancelled!",
                    text: "The request has been cancelled.",
                    icon: "success"
                  });
              }
          )
  
          
        }
  
  
        });
  
  
      }

      const gridContainerVariants = {
        hidden: {opacity:0}, 
        show: {
            opacity:1,
            transition: {staggerChildren: .2}
            }
    }
    const gridSquareVariants = {
      hidden: {opacity: 0},
      show: {opacity: 1}
    }

    return (
        <div className=" pt-[100px]">
    <Helmet>
        <title>Manage My Post | Volunteer Hub</title>
    </Helmet>
<div className="text-black">


    <div >
    {/* My Need Volunteer Post */}
    {posts.length>0 ? 
    (    <div className="container m-1 p-1 mx-auto sm:p-4 sm:pt-0 bg-[#F4F3F0]">
	<h2 className="mb-4 text-2xl font-semibold leading-tight">My Need Volunteer Posts</h2>
	<div className="overflow-x-auto">
		<table className="min-w-full text-xs">
			<colgroup>
				<col />
				<col />
				<col />
				<col />
				<col className="w-24" />
			</colgroup>
			<thead className="dark:bg-gray-300">
				<tr className="text-left">
					<th className="p-3">Title</th>
					<th className="p-3">Category</th>
					<th className="p-3">Number of Volunteers</th>
					<th className="p-3"></th>
					<th className="p-3"></th>
				</tr>
			</thead>
<motion.tbody variants={gridContainerVariants} initial="hidden" animate="show">
        {
        posts.map(post=> <motion.tr variants={gridSquareVariants} key={post._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
        <td className="p-3">
            <p>{post.Title}</p>
        </td>
        <td className="p-3">
            <p>{post.Category}</p>
        </td>
        <td className="p-3">
            <p>{post.NumberOfVolunteers}</p>
        </td>
        <td className="p-3 text-right">
        <Link to={`/update/${post._id}`}><button   className='text-[2.5vw] md:text-[1.3vw]  bg-[#3C5B6F] text-slate-200 hover:text-white py-[.5vw] px-[1.5vw] rounded'>Update</button></Link>
        </td>
        <td className="p-3 text-right">
        <button onClick={()=> handleDelete(post._id)} className='text-[2.5vw] md:text-[1.3vw] bg-[#3C5B6F] text-slate-200 hover:text-white py-[.5vw] px-[1.5vw] rounded'>Delete</button>
        </td>
    </motion.tr> )
        }
</motion.tbody>
		</table>
	</div>
</div>
):
    (
<div className="container p-1 m-1 mx-auto sm:p-4 sm:pt-0 mt-8 bg-[#F4F3F0]">
<h2 className="mb-4 text-2xl font-semibold leading-tight bg-[#F4F3F0]">My Need Volunteer Posts</h2>
<div>No data found</div>
</div>
    )
}
            
    </div>









    <div>
    {/* My Volunteer Request Post */}
    {requests.length>0 ? (

<div className="container p-1 m-1 mx-auto sm:p-4 sm:pt-0 my-8 bg-[#F4F3F0]">
<h2 className="mb-4 text-2xl font-semibold leading-tight">My Volunteer Request Posts</h2>
<div className="overflow-x-auto">
    <table className="min-w-full text-xs">
        <colgroup>
            <col />
            <col />
            <col />
            <col className="w-24" />
        </colgroup>
        <thead className="dark:bg-gray-300">
            <tr className="text-left">
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Organizer</th>
                <th className="p-3"></th>
            </tr>
        </thead>
        <motion.tbody variants={gridContainerVariants} initial="hidden" animate="show">
            {
            requests.filter(request => request.volunteerEmail === user.email).map(request=> <motion.tr variants={gridSquareVariants} key={request._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                <td className="p-3">
                    <p>{request.Title}</p>
                </td>
                <td className="p-3">
                    <p>{request.Category}</p>
                </td>
                <td className="p-3">
                    <p>{request.name}</p>
                </td>
                <td className="p-3 text-right">
                    <motion.button whileTap={{scale:0.9}} whileHover={{scale: 1.1}} transition={{bounceDamping:10, bounceStiffness:600}} onClick={() => handleCancel(request._id,request.id)} className="text-[2.5vw] md:text-[1.3vw]  bg-[#3C5B6F] text-slate-200 hover:text-white py-[.5vw] px-[1.5vw] rounded">Cancel</motion.button>
                </td>
            </motion.tr>
            )
            }
            
        </motion.tbody>
    </table>
</div>
</div>


    ): (
<div className="container p-1 m-1 mx-auto sm:p-4 sm:pt-0 my-8 bg-[#F4F3F0]">
<h2 className="mb-4 text-2xl font-semibold leading-tight bg-[#F4F3F0]">My Volunteer Request Posts</h2>
<div>No data found</div>
</div>
    )}






    </div>






</div>


        </div>
    );
};

export default ManageMyPost;