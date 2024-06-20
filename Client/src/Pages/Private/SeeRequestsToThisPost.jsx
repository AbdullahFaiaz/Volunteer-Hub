import { useLoaderData } from "react-router-dom";
import { motion } from 'framer-motion';

const SeeRequestsToThisPost = () => {
    const requests = useLoaderData()
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

    let postInfo = [];
    if(requests && requests.length > 0) {
        let lastElement = requests[requests.length - 1];
        postInfo.push(lastElement);
    }
    


    return (
        <div className="pt-[100px]">


            {requests?.length>0? (        <div>
            
                {
                    postInfo?.map(info =>             <div key={info._id} className="flex flex-col gap-4 items-center justify-center">
                   
    
                    <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            {/* <img className="object-cover w-full h-64" src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="Article"/> */}
        
            <div className="p-6">
                <div>
                    <span className="text-lg text-blue-600 uppercase dark:text-blue-400mt-2 text-md font-bold">Total Volunteer Requests: <span className="font-extrabold">{requests.length}</span></span>
                    <a href="#" className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" tabIndex="0" role="link">Post Details</a>
                    <a href="#" className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline" tabIndex="0" role="link">{info.Title}</a>
                    <h2 className="text-lg font-semibold">Details</h2>
                            <ul className="list-disc pl-6">
                                <li><strong>Category:</strong> {info.Category}</li>
                                <li><strong>Location:</strong> {info.Location}</li>
                                {/* <li><strong>Number of Volunteers Needed:</strong> {info.NumberOfVolunteers}</li> */}
                                <li><strong>Deadline:</strong> {info.Deadline}</li>
                                <li><strong>Organization Name:</strong> {info.name}</li>
                                <li><strong>Organization Email:</strong> {info.email}</li>
                            </ul>
                </div>
        
            </div>
        </div>
        
        
                    </div>)
                }
                <div className="text-xl flex items-center justify-center my-4">All Requests to This Post</div>
                <hr />
                <motion.div variants={gridContainerVariants} initial="hidden" animate="show">
                    {requests.map(request=> <div key={request._id}>
                                            
                        <motion.div variants={gridSquareVariants} className="text-gray-800 transition-colors duration-300 transform dark:text-white mx-auto mb-8 w-[70%] rounded-md shadow-md bg-white  dark:bg-gray-800">
                            <div className="flex flex-col justify-between p-6 space-y-8">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-semibold tracking-wide">{request.volunteerName}</h2>
                                    <p className=""><span className="font-bold">Volunteer Email: </span>{request.volunteerEmail}</p>
                                    <p className=""><span className="font-bold">Suggestion: </span>{request.Suggestion}</p>
                                </div>
                            </div>
                        </motion.div>
    
    
                    </div>)}
                </motion.div>
            </div>):(<div className="text-xl flex items-center justify-center my-4">No Request Yet</div>)}
            </div>
    );
};

export default SeeRequestsToThisPost;