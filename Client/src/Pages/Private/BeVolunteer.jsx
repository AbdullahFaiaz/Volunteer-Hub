import { useLoaderData } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/ContextComponent";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";



const BeVolunteer = () => {
    const { user } = useContext(AuthContext);
    const post = useLoaderData()
    const [Deadlines, setDeadline] = useState(post.Deadline);
    // console.log("Post Details",post)

const handleBeVolunteer = (event)=>{
        event.preventDefault()
        const id = post._id
        const form = event.target;
        const Thumbnail = form.Thumbnail.value;
        const Title = form.Title.value;
        const Description = form.Description.value;
        const Category = form.Category.value;
        const Location = form.Location.value;
        const NumberOfVolunteers = parseInt(form.NumberOfVolunteers.value);
        const Deadline = Deadlines;
        const email = form.email.value;
        const name = form.name.value;
        const volunteerName = form.volunteerName.value
        const volunteerEmail = form.volunteerEmail.value
        const Suggestion = form.Suggestion.value
        const Status = form.Status.value
    
        const volunteerRequest = {
            id,
            Thumbnail,
            Title,
            Description,
            Category,
            Location,
            NumberOfVolunteers,
            Deadline,
            email,
            name,
            volunteerEmail,
            volunteerName,
            Suggestion,
            Status
        };

        fetch(`https://volunteer-hub-beryl.vercel.app/request/${post._id}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify()
        })
        .then((res) => res.json())
            // .then((data) => console.log(data))

        fetch("https://volunteer-hub-beryl.vercel.app/request",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(volunteerRequest),
          })
            .then((res) => res.json())
            .then((data) => {
              // console.log("from client", data);
              if (data.insertedId) {
                Swal.fire({
                  title: "Success!",
                  text: "Request Successful",
                  icon: "success",
                  confirmButtonText: "Okey",
                });
              }
            });


}

    return (
        <div className="bg-[#F4F3F0] p-10 sm:p-24">
    <Helmet>
        <title>Be A Volunteer | Volunteer Hub</title>
    </Helmet>
        <h2 className="text-3xl font-extrabold pt-[50px]">Request to Be a Volunteer</h2>
        <form onSubmit={handleBeVolunteer}>
            
            
        <div className='flex flex-col md:flex-row gap-8'>
            <div className='w-full'>
            {/* Thumbnail URL */}
            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="text-gray-700 label-text">
                    Thumbnail URL
                  </span>
                </label>
                <label className="input-group">
                  <input
                  readOnly
                  defaultValue={post.Thumbnail}
                    type="text"
                    name="Thumbnail"
                    placeholder="Thumbnail URL"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>

            {/* Post Title */}
            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="text-gray-700 label-text">Post Title</span>
                </label>
                <label className="input-group">
                  <input
                  readOnly
                  defaultValue={post.Title}
                    required
                    type="text"
                    name="Title"
                    placeholder="Post Title"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>


 {/* Description */}
 <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="text-gray-700 label-text">Description</span>
                </label>
                <label className="input-group">
                  <input
                  readOnly
                  defaultValue={post.Description}
                    type="text"
                    name="Description"
                    placeholder="Description"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>


                     {/* Category */}
                     <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="text-gray-700 label-text">Category</span>
                </label>
                <label className="input-group">
                <input
                  readOnly
                  defaultValue={post.Category}
                    type="text"
                    name="Category"
                    placeholder="Category"
                    className="input input-bordered w-full"
                  />
                  {/* <select
                    readOnly
                    name="Category"
                    className="select select-bordered w-full"
                    defaultValue={post.Category}
                  >
                    <option  value="">Select a category</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="social service">Social Service</option>
                    <option value="animal welfare">Animal Welfare</option>
                  </select> */}
                </label>
              </div>
            </div>

           

            {/* Location */}
            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="text-gray-700 label-text">Location</span>
                </label>
                <label className="input-group">
                  <input
                  readOnly
                  defaultValue={post.Location}
                    type="text"
                    name="Location"
                    placeholder="Location"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>


            </div>



            <div className='w-full'>




             {/* NumberOfVolunteers */}
             <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="text-gray-700 label-text">
                    Number of Volunteers Needed
                  </span>
                </label>
                <label className="input-group">
                  <input
                  readOnly
                  defaultValue={post.NumberOfVolunteers}
                    type="number"
                    name="NumberOfVolunteers"
                    placeholder="Number of Volunteers"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>
            

              {/* deadline */}
              <div className="mb-8">
              <div className="form-control w-full">
              <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
              readOnly
                className='border p-2 rounded-md'
                showIcon
                selected={Deadlines}
                onChange={(date) => setDeadline(date)}
              />
            </div>
              </div>
            </div>
            

            {/* User Name */}
            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="text-gray-700 label-text">Organization Name</span>
                </label>
                <label className="input-group">
                  <input
                    readOnly
                    type="text"
                    defaultValue={post.name}
                    name="name"
                    placeholder="User Name"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>

            
            {/* User Email */}
            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="text-gray-700 label-text">Organization Email</span>
                </label>
                <label className="input-group">
                  <input
                    readOnly
                    type="email"
                    name="email"
                    placeholder="User Email"
                    defaultValue={post.email}
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>



            </div>    
        </div>


        {/*________________________  */}
<hr/>

<div className="flex gap-8">
    {/* User Name */}
    <div className="mb-8 w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="text-gray-700 label-text">Volunteer Name</span>
                </label>
                <label className="input-group">
                  <input
                    readOnly
                    type="text"
                    defaultValue={user.displayName}
                    name="volunteerName"
                    placeholder="User Name"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>

            
            {/* User Email */}
            <div className="mb-8  w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="text-gray-700 label-text">Volunteer Email</span>
                </label>
                <label className="input-group">
                  <input
                    readOnly
                    type="email"
                    name="volunteerEmail"
                    placeholder="User Email"
                    defaultValue={user.email}
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>
</div>



            {/* Suggestion */}
            <div className="mb-8  w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="text-gray-700 label-text">Suggestion</span>
                </label>
                <label className="input-group">
                  <input
                    required
                    type="text"
                    name="Suggestion"
                    placeholder="Suggestion"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>


                 {/* Status */}
                 <div className="mb-8  w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="text-gray-700 label-text">Status</span>
                </label>
                <label className="input-group">
                  <input
                    readOnly
                    type="text"
                    name="Status"
                    placeholder="Status"
                    defaultValue={"Requested"}
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>


        

            {/* Update Button */}
            <input type="submit" value="Request" className="btn btn-block text-white bg-[#883d21]" />
        </form>
    </div>
    );
};

export default BeVolunteer;