import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/ContextComponent";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const Feedback = () => {
    const axiosSecure = useAxiosSecure()
    const [feedbacks, setFeedbacks] = useState()
    const param = useParams()
    const {user} = useContext(AuthContext)
    const formRef = useRef(null);


useEffect(()=> {
    axios.get(`http://localhost:5000/feedback?id=${param.id}`)
    .then(res => {
        setFeedbacks(res.data)
        console.log(feedbacks)
    })
},[])







    const handleFeedback = (e) => {
        e.preventDefault()
        const message = e.target.feedback.value
        const feedback = {
            message: message,
            postId: param.id,
            email: user.email
        }
        axios.post(`http://localhost:5000/feedback`,feedback)
        .then(res => {
            if(res.data.insertedId) {
                formRef.current.reset()
                Swal.fire({
                  title: "Success!",
                  text: "Feedback Submitted",
                  icon: "success",
                  confirmButtonText: "Okey",
                });

                    axios.get(`http://localhost:5000/feedback?id=${param.id}`)
                    .then(res => {
                        setFeedbacks(res.data)
                        console.log(feedbacks)
                    })
        
            }})
        .catch(error=> console.log(error.message))


    }

    return (
        <div className="pt-[100px]">
        <div className="flex flex-col items-center my-20">
        <form ref={formRef} onSubmit={handleFeedback} className="w-full max-w-4xl">
            <textarea name="feedback" placeholder="Write Your Feedback Here" className="textarea textarea-bordered textarea-lg w-full" ></textarea>
            <button type="submit" className="btn btn-md mt-2 bg-[#374151] text-white">Submit Feedback</button>
        </form>
    </div>


        <div className="flex flex-col items-center">
    <div className="text-3xl mt-6">All Feedbacks to This Post</div>
    
        {feedbacks?.length>0? 
        
        <div className="w-full flex flex-col items-center">{
            feedbacks.map(feed => <div className="bg-white shadow-2xl rounded-lg w-full max-w-4xl p-6 m-2" key={feed._id}>
                <div className="">
                <p className="text-gray-800">{feed.message}</p>
                <br />
                <p className="text-gray-500 text-right">{feed.email}</p>
                
                </div>
            </div>)
        }
        </div>
        :
        <div>No feedback</div>
        }
        </div>

        </div>
    );
};

export default Feedback;