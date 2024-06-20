


import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/ContextComponent";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from "react-tooltip";
import logo from "../../assets/logo.png"
import bg from "../../assets/blackbg.jpeg"

const Navbar = () => {
// night mode starts
const [theme,setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light")
useEffect(()=>{
    localStorage.setItem("theme", theme)
    const localTheme = localStorage.getItem("theme");
    document.querySelector('html').setAttribute("data-theme", localTheme)
},[theme])
const handleTheme = (e) => {
    if(e.target.checked){
        setTheme("dark")
    } else{
        setTheme("light")
    }
}
//night mode ends


    const navigate = useNavigate()
    const {logOut,user} = useContext(AuthContext)


    const handleLogOut=() =>{
        logOut()
        navigate("/login")
    }




    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleHamburgerClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDropdownClick = () => {
        setIsDropdownOpen(false);
    };






        const [isOpen, setIsOpen] = useState(false);
      
        const handleLinkClick = () => {
          setIsOpen(!isOpen);
        };
        const handleNavLinkClick = () => {
          setIsOpen(false);
        };






    
return (
  //  #883d21 883d21 bc3908
<div className={`navbar text-white bg-[#00000051] font-semibold absolute z-50`}>
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} onClick={handleHamburgerClick} role="button" className="flex flex-col justify-center items-center bg-slate-900 p-[1vw] pr-[1vw] mr-[1vw] lg:hidden" >
      <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-9 w-9"
                                fill="none"
                                viewBox="0 0 21 21"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>      </div>
    {
      isDropdownOpen && (<ul tabIndex={0} onClick={handleDropdownClick} className="bg-[#435063] menu menu-sm dropdown-content mt-3 z-50 p-2 shadow rounded-box w-52">
      <li><NavLink to="/"> <div>Home</div> </NavLink></li>

      {user && <li>
        <a>My Profile</a>
        <ul className="p-2 z-50">
        <li><NavLink to="/add"><div>Add Volunteer Post</div></NavLink></li>
        <li><NavLink to={`/myPosts/${user.email}`}><div>Manage My Post</div></NavLink></li>
        </ul>
      </li>}

      <li><NavLink to="/needVolunteer"><div>Need Volunteer</div></NavLink></li>
      {!user && (
           <>
              <li><NavLink to="/login"><div>Log In</div></NavLink></li>
              <li><NavLink to="/register"><div>Register</div></NavLink></li>
          </>
        )}
    </ul>)
    }
      
    </div>
    <a className="text-[5.5vw] sm:text-[5vw] md:pl-[2vw] md:text-[4vw]  lg:text-[2.5vw] w-full">Volunteer Hub</a>
    {/* <img src={logo} alt="logo" className="w-40 h-16 rounded-md" /> */}
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <NavLink onClick={handleNavLinkClick} className={"mx-3 text-lg"} to="/"><span>Home</span></NavLink>
     {user && <span>

        <span onClick={handleLinkClick} className="relative mx-3 text-lg">My Profile</span>
    {isOpen && <span className="absolute top-14 rounded-md p-2 z-50 bg-[#050504ae] flex flex-col">
        <NavLink className={"mx-3 text-lg"} to="/add" onClick={handleLinkClick}><span>Add Volunteer Post</span></NavLink>
        <NavLink className={"mx-3 text-lg"} to={`/myPosts/${user.email}`} onClick={handleLinkClick}><span>Manage My Post</span></NavLink>
      </span>}



      </span>}
      <NavLink onClick={handleNavLinkClick} className={"mx-3 text-lg"} to="/needVolunteer"><span>Need Volunteer</span></NavLink>
      {!user && (
           <>
              <NavLink className={"mx-3 text-lg"} to="/login"><span>Log In</span></NavLink>
              <NavLink className={"mx-3 text-lg"} to="/register"><span>Register </span></NavLink>
          </>
        )}
    </ul>
  </div>
  
  <div className="navbar-end">
  <label className="swap swap-rotate mr-2">
                    
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" checked={theme === "light"? false : true} onChange={handleTheme} className="theme-controller" value="synthwave" />
                    
                    {/* sun icon */}
                    <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                    
                    {/* moon icon */}
                    <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                    
                    </label>
    {/* after night mode */}
    <Tooltip id="my-tooltip" />

    {user ? (
                        <>
                            <button  className="mr-[2vw] text-[4.2vw] font-light sm:font-normal sm:text-[2.5] md:text-[2.2vw] lg:text-[1.3vw]" onClick={handleLogOut}>
                                Log Out
                            </button>

                            <span
                              //  title={user?.displayName || "User name not found"}
                                className="rounded-full sm:mr-[2vw] h-[10vw] w-[10vw] sm:h-[6vw] sm:w-[6vw] md:h-[3vw] md:w-[3vw] overflow-hidden border-2 border-[#552c19] shadow-lg"
                            >
                                <Link to={"/userProfile"}>
                                <a className="" data-tooltip-id="my-tooltip"
                                data-tooltip-content={user?.displayName || "User name not found"}
                                data-tooltip-place="left">
                                <img
                                    className="rounded-full h-full w-full object-cover"
                                    src={user?.photoURL || "https://i.ibb.co/sV6w5ct/Vecteezy-illustration-of-human-icon-vector-user-symbol-icon-modern-8442086.jpg"}
                                    alt="Profile Picture"
                                />
                            </a>
                            </Link>
                            </span>
                           
                        </>
                    ) : (
                        <Link className="mr-[2vw] text-[4.2vw] font-light sm:font-normal sm:text-[2.5] md:text-[2.2vw] lg:text-[1.3vw]" to={"/login"}>
                            Log In
                        </Link>
                    )}


  </div>
</div>
)


};

export default Navbar;
