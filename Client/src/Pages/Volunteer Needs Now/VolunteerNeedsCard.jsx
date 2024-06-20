
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
const VolunteerNeedsCard = ({post}) => {
    const gridSquareVariants = {
        hidden: {opacity: 0},
        show: {opacity: 1}
    }
    const {_id, Thumbnail,Title,Description,Category,Location,NumberOfVolunteers,Deadline,email,name,} = post
    return (
        // <div className="p-[2vw] border rounded-md shadow-md">
        //     <img src={Thumbnail} alt={Thumbnail} />

        //     <p className="text-[#559595] text-[2.5vw] md:text-[1.3vw]">{Title}</p>
        //     <p className="text-[#559595] text-[2.5vw] md:text-[1.3vw]">{Category}</p>

        //     <div className="">
        //         {/* <p className="text-[#559595] text-[2.5vw] md:text-[1.3vw]">Number of Volunteers Needed:{NumberOfVolunteers}</p> */}
        //         <p className="text-[#559595] text-[2.5vw] md:text-[1.3vw]">Deadline: {Deadline}</p>
        //     </div>
        //     <Link to={`/postDetails/${_id}`}>
        //     <button  className="text-[2.5vw] md:text-[1.3vw] bg-[#7dc5ce74] text-[#559595] hover:text-white font-bold py-[.5vw] px-[1.5vw] rounded">View Details</button>
        //     </Link>

        // </div>
<motion.div variants={gridSquareVariants} className="mx-auto mb-8 w-[70%] rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
	<img src={Thumbnail} alt="Thumbnail" className="object-cover object-center w-full rounded-t-md h-40 dark:bg-gray-500" />
	<div className="flex flex-col justify-between p-6 space-y-8">
		<div className="space-y-2">
			<h2 className="text-3xl font-semibold tracking-wide">{Title}</h2>
			<p className="dark:text-gray-800">Category: {Category}</p>
			{/* <p className="dark:text-gray-800">Number of Volunteers Needed:{NumberOfVolunteers}</p> */}
			<p className="dark:text-gray-800">Deadline: {Deadline}</p>
		</div>
        <Link to={`/postDetails/${_id}`}>
		<motion.button whileTap={{scale:0.9}} whileHover={{scale: 1.1}} type="button" className="bg-[#374151] flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md text-gray-50">View Details</motion.button>
        </Link>
    </div>
</motion.div>

    );
};
VolunteerNeedsCard.propTypes = {
    post : PropTypes.object,
}
export default VolunteerNeedsCard;