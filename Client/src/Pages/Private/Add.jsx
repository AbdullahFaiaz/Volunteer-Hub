import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/ContextComponent";
import coolbg from "../../assets/cool-3.png";
import { Helmet } from "react-helmet-async";
import { format } from 'date-fns';



const Add = () => {
  const { user } = useContext(AuthContext);

  //date:
  const [Deadlines, setDeadline] = useState(format(new Date(), 'yyyy-MM-dd'));

  const handleAddTouristsSpot = (event) => {
    event.preventDefault();

    const form = event.target;
    const Thumbnail = form.Thumbnail.value;
    const Title = form.Title.value;
    const Description = form.Description.value;
    const Category = form.Category.value;
    const Location = form.Location.value;
    const NumberOfVolunteers = parseInt(form.NumberOfVolunteers.value);
    // const Deadline = Deadlines;
    const email = form.email.value;
    const name = form.name.value;

    const newProduct = {
      Thumbnail,
      Title,
      Description,
      Category,
      Location,
      NumberOfVolunteers,
      Deadline: Deadlines,
      email,
      name,
    };

    // console.log(newProduct);

    fetch("https://volunteer-hub-beryl.vercel.app/addPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("from client", data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Volunteer Post Added Successfully",
            icon: "success",
            confirmButtonText: "Okey",
          });
        }
      });
  };

  return (
    <div
      style={{ backgroundThumbnail: `url(${coolbg})` }}
      className="bg-[#F4F3F0] p-10 sm:p-24"
    >
      <Helmet>
        <title>Add Volunteer Post | Volunteer Hub</title>
      </Helmet>
      <h2 className="text-3xl text-gray-700 font-extrabold mt-10">
      Add Volunteer Post
      </h2>
      <form onSubmit={handleAddTouristsSpot}>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full">




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
                    type="text"
                    name="Location"
                    placeholder="Location"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>





          </div>

          <div className="w-full">



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
              {/* <DatePicker
                className='border p-2 rounded-md'
                showIcon
                selected={Deadlines}
                onChange={(date) => setDeadline(date)}
              /> */}

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

        {/* Add Button */}
        <input
          type="submit"
          value="Add Post"
          className="btn text-white btn-block bg-[#883d21]"
        />
      </form>
    </div>
  );
};

export default Add;
