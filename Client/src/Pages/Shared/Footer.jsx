import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

import footerBg from "../../assets/Bg2.jpg" 


  const Footer = () => {
    return (
        // style={{ backgroundImage: `url(${footerBg})`,backgroundAttachment: 'fixed' }}
              <footer className="bg-cover text-[2vw] lg:text-[1vw] bg-bottom relative py-12 md:py-16 lg:py-20 text-black bg-[#f3f4f6]">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="mx-auto px-[3vw] lg:px-[6vw] relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[6vw]">
                            {/* Website Name */}
                            <div className="flex flex-col items-center lg:items-start justify-center">
                                <h3 className=" text-[4.8vw] lg:text-[2.5vw] font-bold mb-4">Volunteer Hub</h3>
                                <p className=" text-[3.8vw] lg:text-[1.5vw]">Join Hands, Make a Difference</p>
                            </div>
                            {/* Contact Information */}
                            <div className="flex flex-col items-center justify-center">
                                <h4 className=" text-[4.2vw] lg:text-[1.5vw] font-semibold mb-4">Contact Us</h4>
                                <p className=" text-[3.8vw] lg:text-[1.2vw]">Email:talha0184999@gamil.com</p>
                                <p className=" text-[3.8vw] lg:text-[1.2vw]">Phone: 01784411785</p>
                            </div>
                            {/* Social Media Links */}
                            <div className="flex justify-center items-center gap-4 md:gap-6">
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-[5vw] md:text-[3.5vw] lg:text-[2.2vw] p-3 rounded-full text-blue-500 hover:bg-gray-700 hover:text-white transition-transform transform hover:scale-110">
                                    <FaFacebookF />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[5vw] md:text-[3.5vw] lg:text-[2.2vw] p-3 rounded-full text-blue-400 hover:bg-gray-700 hover:text-white transition-transform transform hover:scale-110">
                                    <FaTwitter />
                                </a>
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-[5vw] md:text-[3.5vw] lg:text-[2.2vw] p-3 rounded-full text-pink-500 hover:bg-gray-700 hover:text-white transition-transform transform hover:scale-110">
                                    <FaInstagram />
                                </a>
                                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[5vw] md:text-[3.5vw] lg:text-[2.2vw] p-3 rounded-full text-blue-700 hover:bg-gray-700 hover:text-white transition-transform transform hover:scale-110">
                                    <FaLinkedinIn />
                                </a>
                            </div>
                        </div>
                        {/* Copyright */}
                        <div className="mt-8 text-center">
                            <p className=" text-[3.8vw] lg:text-[1.2vw]">© 2024 Adventure Avenue. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
    )
  }
  
  export default Footer