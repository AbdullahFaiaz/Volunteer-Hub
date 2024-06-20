import { useEffect, useState } from "react";
import { RiLayoutGrid2Fill } from "react-icons/ri";
import { RxRows } from "react-icons/rx";
import { Helmet } from "react-helmet-async";
import { Link, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion"
import useAxiosSecure from "../../Hook/useAxiosSecure";
// import ProductCard from '../../Components/ProductCard';

const NeedVolunteer = () => {
  const axiosSecure = useAxiosSecure()
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(0)  
  const {count} = useLoaderData()
  // console.log("Total Count",count)
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()]

  // useEffect(()=> {
  //   fetch("https://volunteer-hub-beryl.vercel.app/postCounts")
  //   .then(res=> res.json())
  //   .then(data => console.log("counts ",data.counts))
  // },[])

  const handleItemsChange= e => {
    const val = parseInt(e.target.value) 
    // console.log("val", val)
    
    setItemsPerPage(val)
    setCurrentPage(0)
  }
  const handlePrevPage = () =>{
    if(currentPage>0){
      setCurrentPage(currentPage-1)
    }
  }
  const handleNextPage = () =>{
    if(currentPage < pages.length-1){
      setCurrentPage(currentPage+1)
    }
  }






  const [layout, setLayout] = useState('grid');

  const handleLayoutToggle = (selectedLayout) => {
    setLayout(selectedLayout);
  };


  const [searchTerm, setSearchTerm] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {


    axiosSecure.get(`/allPosts?page=${currentPage}&size=${itemsPerPage}`)
    .then(res => {
      setAllPosts(res.data)
      // console.log(res.data)
      
    })
  }, [axiosSecure,currentPage,itemsPerPage,count]); 
  
  const gridContainerVariants = {
    hidden: {opacity:0}, 
    show: {
        opacity:1,
        transition: {staggerChildren: .20}
        }
}
const gridSquareVariants = {
  hidden: {opacity: 0},
  show: {opacity: 1}
}




  return (
    <div className="text-black pb-[5vw] bg-[#ffffffc5] pt-[110px]">
      <Helmet>
        <title>Need Volunteer | Volunteer Hub</title>
      </Helmet>

      <div className="w-[90%] mx-auto">
{/* search */}
    <p className="text-[#0b5d94a6] font-bold">Search By Post Title</p>
    <input className="text-black bg-white rounded-md border-[#3c5b6fa6] border-2"
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />

  {/* buttons grid or table */}
      <div className="layout-toggle flex justify-end gap-10 mb-2">
        <motion.button whileTap={{scale:0.9}} whileHover={{scale: 1.1}} onClick={() => handleLayoutToggle('grid')}>
        <span className={`${layout === 'grid'? 'border-4 border-[#0b5d94a6] flex items-center' : 'flex items-center'}`}><RiLayoutGrid2Fill className="size-[6vw] lg:size-[3vw]" /> <></></span>
        </motion.button>
        <motion.button whileTap={{scale:0.9}} whileHover={{scale: 1.1}} onClick={() => handleLayoutToggle('table')}>
        <span className={`${layout === 'table'? 'border-4 border-[#0b5d94a6] flex items-center' : 'flex items-center'}`}><RxRows className="size-[6vw] lg:size-[3vw]"/> <></></span>
        </motion.button>
      </div>
      </div>


<div>

{allPosts.length>0 ? (
  <div className="layout-content">
        {layout === 'grid' && <div className="grid-layout"> 
        {/* grid layout */}
        <h2 className="mb-4 ml-[3vw] text-2xl font-semibold leading-tight">Need Volunteer Posts</h2>
        <motion.div variants={gridContainerVariants} initial="hidden" animate="show" className="grid grid-cols-1 my-[2vw] lg:my-[3vw] md:grid-cols-3 lg:grid-cols-3 gap-4">
    {allPosts
        .filter((post) => {
        if (searchTerm === "") {
            return post;
        } else if (post.Title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return post;
        }
        })
        .map((post) => (
          
        <motion.div className="cursor-grab" drag dragConstraints={{top:-200, bottom:200,left:-100,right:100}} variants={gridSquareVariants} key={post._id}>
            <div>
            <div className="hover:scale-105 hover:border-yellow-600 hover:border-2 transition-all duration-500 bg-[#ffffffc5] w-[86%] md:w-[80%] mx-auto text-black shadow-2xl">

                <div className="p-[1vw]">
                    <h1 className="text-[3.8vw] md:text-[1.8vw]">
                    {post.Title}
                    </h1>
                    <p className="text-[2.7vw] md:text-[1.2vw]">
                    Category: {post.Category}
                    </p>
                    <p className="text-[2.7vw] md:text-[1.2vw]">
                    Number of Volunteers Needed: <span className="text-[#ff9900] font-bold">{post.NumberOfVolunteers === 0 ? "No need" : post.NumberOfVolunteers}</span> 
                    </p>
                    <p className="text-[2.7vw] md:text-[1.2vw]">
                    Deadline: {post.Deadline}
                    </p>
                <Link to={`/postDetails/${post._id}`}>
                    <motion.button whileTap={{scale:0.9}} whileHover={{scale: 1.1}} className="text-[2.5vw] md:text-[1.3vw]  bg-[#3C5B6F] text-slate-200 hover:text-white py-[.5vw] px-[1.5vw] rounded">View Details</motion.button>
                </Link>
                </div>
            </div>
            </div>
        </motion.div>
        ))}

      </motion.div>
          
          </div>}
        {layout === 'table' && <div className="table-layout">
        {/* Table Layout */}
        
        
    <div className="container p-2 mx-auto sm:p-4 text-black bg-[#ffffffc5]">
	<h2 className="mb-4 text-2xl font-semibold leading-tight">Need Volunteer Posts</h2>
	<div className="overflow-x-auto">
		<motion.table variants={gridContainerVariants} initial="hidden" animate="show" className="min-w-full text-xs">
			<colgroup>
				<col />
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
					<th className="p-3">Number</th>
					<th className="p-3">Deadline</th>
					<th className="p-3"></th>
				</tr>
			</thead>
    {allPosts
        .filter((post) => {
        if (searchTerm === "") {
            return post;
        } else if (post.Title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return post;
        }
        })
        .map((post) => (
          <motion.tbody variants={gridSquareVariants} key={post._id}>
				<tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
					<td className="p-3">
          {post.Title}
					</td>
					<td className="p-3">
          {post.Category}
					</td>
					<td className="p-3">
          <span className="text-[#ff9900] font-bold">{post.NumberOfVolunteers === 0 ? "No need" : post.NumberOfVolunteers}</span>
					</td>
					<td className="p-3">
          {post.Deadline}
					</td>
					<td className="p-3 text-right">
            <Link to={`/postDetails/${post._id}`}>
                      <motion.button whileTap={{scale:0.9}} whileHover={{scale: 1.1}}  className="text-[2.5vw] md:text-[1.3vw]  bg-[#3C5B6F] text-slate-200 hover:text-white py-[.5vw] px-[1.5vw] rounded">View Details</motion.button>
            </Link>
					</td>
				</tr>
			</motion.tbody>
       
        ))}

		</motion.table>
	</div>
</div>
   
        
        
        </div>}
      </div>
) : (

  <div>No Data Found</div>
)

}
      













    </div>


    <div className="text-center">
            <button  onClick={handlePrevPage} className="m-1 bg-[#3c5b6fa6] px-2 rounded-sm">Prev</button>
            {
              pages.map(page => <button  className={`${currentPage === page? 'm-1 bg-[#3C5B6F] px-2 rounded-sm' : 'm-1 bg-[#3c5b6fa6] px-2 rounded-sm'}`} 
              onClick={()=> setCurrentPage(page)}
              key={page}>{page+1}</button>)
            }
            <button  onClick={handleNextPage} className="m-1 bg-[#3c5b6fa6] px-2 rounded-sm">Next</button>
            <select value={itemsPerPage} onChange={handleItemsChange} name="" id="" className="bg-[#3C5B6F]">
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            </div>

			



    </div>
  );
};

export default NeedVolunteer;
