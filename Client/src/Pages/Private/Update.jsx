import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/ContextComponent";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

const Update = () => {

      //date:
      const product = useLoaderData()
  const [Deadlines, setDeadline] = useState(product.Deadline);

    const {user} = useContext(AuthContext)

    const handleUpdate = (event) =>{
        event.preventDefault()
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
    
        const updatedPost = {
            Thumbnail,
            Title,
            Description,
            Category,
            Location,
            NumberOfVolunteers,
            Deadline,
            email,
            name,
        };


        fetch(`https://volunteer-hub-beryl.vercel.app/update/${product._id}`,{
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(updatedPost)
        })
        .then(res=> res.json())
        .then(data =>{
            // console.log(data)
            if(data.modifiedCount> 0){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Post Updated Successfully",
                    showConfirmButton: false,
                    timer: 2000
                  });
            }
        } 
    )



    }

    return (
        <div className="bg-[#F4F3F0] p-10 sm:p-24">
    <Helmet>
        <title>Volunteer Hub | Update</title>
    </Helmet>
        <h2 className="text-3xl font-extrabold mt-10">Update The Post</h2>
        <form onSubmit={handleUpdate}>
            
            
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
                  defaultValue={product.Thumbnail}
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
                  defaultValue={product.Title}
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
                  defaultValue={product.Description}
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
                  <select
                    required
                    name="Category"
                    className="select select-bordered w-full"
                    defaultValue={product.Category}
                  >
                    <option value="">Select a category</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="social service">Social Service</option>
                    <option value="animal welfare">Animal Welfare</option>
                  </select>
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
                  defaultValue={product.Location}
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
                  defaultValue={product.NumberOfVolunteers}
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
                className='border p-2 rounded-md'
                showIcon
                selected={Deadlines}
                onChange={(date) => setDeadline(format(date, 'yyyy-MM-dd'))}
              />
            </div>
              </div>
            </div>
            
            


            {/* User Name */}
            <div className="mb-8">
              <div className="form-control w-full">
                <label className="label">
                  <span className="text-gray-700 label-text">Organizer Name</span>
                </label>
                <label className="input-group">
                  <input
                    readOnly
                    type="text"
                    defaultValue={user.displayName}
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
                  <span className="text-gray-700 label-text">Organizer Email</span>
                </label>
                <label className="input-group">
                  <input
                    readOnly
                    type="email"
                    name="email"
                    placeholder="User Email"
                    defaultValue={user.email}
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>





            </div>    
        </div>


            {/* Update Button */}
            <input type="submit" value="Update Post" className="btn btn-block text-white bg-[#883d21]" />
        </form>
    </div>
    );
};

export default Update;