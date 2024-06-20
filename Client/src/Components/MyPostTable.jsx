
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';

const MyPostTable = ({post,setPosts,posts}) => {
const {Thumbnail,Category,size,fabric,color,Title,occasion,user_email,user_name,_id} = post
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
    return (
      <>
    <tbody>
      {/* row 1 */}
      <tr className="bg-base-200 flex flex-col sm:items-center sm:flex-row">
        <span className='sm:w-[40%] md:w-[35%] lg:w-[27%]'>
        <th>{Thumbnail}</th>
        <td>{Category}</td>
        <td>{Title}</td>
        </span>
        <span>
        <td><Link to={`/update/${_id}`}><button  className='btn btn-info text-white bg-[#133d3d]'>Update</button></Link></td>
        <td><button  onClick={()=> handleDelete(_id)} className='btn btn-warning text-white bg-[#d6a606]'>Delete</button></td>
        </span>
      </tr>
    </tbody>
      <br />
      </>
        
    );
};
MyPostTable.propTypes = {
    post : PropTypes.object,
    setPosts: PropTypes.func,
    posts: PropTypes.array,
}
export default MyPostTable;