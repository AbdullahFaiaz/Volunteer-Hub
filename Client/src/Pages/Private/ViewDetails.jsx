import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/ContextComponent";
import { Helmet } from "react-helmet-async";
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewDetails = () => {
    const {user} = useContext(AuthContext)
    const post = useLoaderData();
    const {_id, Thumbnail,Title,Description,Category,Location,NumberOfVolunteers,Deadline,email,name,} = post
const navigate = useNavigate()
// const notify = () => toast('No more volunteer needed!');
const notify = () => toast('No more volunteer needed!', {
    style: {
      borderRadius: '30px',
      background: '#333',
      color: '#fff',
    },
    className: 'flex justify-center items-center text-2xl', // Tailwind CSS classes
  });

  const notifyUser = () => toast('You can not be a volunteer of your own post', {
    style: {
      borderRadius: '30px',
      background: '#333',
      color: '#fff',
    },
    className: 'flex justify-center items-center text-2xl', // Tailwind CSS classes
  });
  
    const handleBeVol = () => {
        if(post.email !== user.email){
            if(NumberOfVolunteers>0){
                navigate(`/beVolunteer/${_id}`)
            }
            if(NumberOfVolunteers===0){
                notify()
            }
        }
        else{
            notifyUser()
        }

        
    }

    const handleFeedback = () => {
        navigate(`/feedback/${_id}`)
    }




return (
    <div className="pt-[100px]">


    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <Helmet>
        <title>View Details | Volunteer Hub</title>
    </Helmet>
    <Toaster/>
            <ToastContainer/>
            <div className="flex flex-col gap-4">
               

            <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
    <img className="object-cover w-full h-64" src={Thumbnail} alt="Thumbnail"/>

    <div className="p-6">
        <div>
            <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400"></span>
            <a href="#" className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" tabIndex="0" role="link">{Title}</a>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Description: {Description}</p>
            <h2 className="text-lg font-semibold">Details</h2>
                    <ul className="list-disc pl-6">
                        <li><strong>Category:</strong> {Category}</li>
                        <li><strong>Location:</strong> {Location}</li>
                        <li><strong>Number of Volunteers Needed:</strong> {NumberOfVolunteers}</li>
                        <li><strong>Deadline:</strong> {Deadline}</li>
                        <li><strong>Organization Name:</strong> {name}</li>
                        <li><strong>Organization Email:</strong> {email}</li>
                    </ul>
                    <motion.button whileTap={{scale:0.9}} whileHover={{scale: 1.1}} onClick={handleBeVol} className="btn btn-sm mt-2 bg-[#374151] text-white">Be A Volunteer</motion.button>
                    <motion.button whileTap={{scale:0.9}} whileHover={{scale: 1.1}} onClick={handleFeedback} className="btn btn-sm mt-2 ml-2 bg-[#374151] text-white">Feedbacks</motion.button>
                    
        </div>

    </div>
</div>


            </div>
        </div>


        </div>


    );
};

export default ViewDetails;
