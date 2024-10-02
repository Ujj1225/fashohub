import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date();
  return (
    <footer className="bg-gray-100 text-gray-500 py-12 mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex md:flex-col gap-8 text-center justify-around text-[18px]">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">Fashohub Pvt. Ltd.</h1>
            <div className="flex gap-4 text-3xl justify-center lg:justify-start">
              <FaFacebook className="hover:text-black transition-colors duration-300" />
              <FaInstagram className="hover:text-black transition-colors duration-300" />
              <FaTiktok className="hover:text-black transition-colors duration-300" />
              <FaTwitter className="hover:text-black transition-colors duration-300" />
              <FaLinkedin className="hover:text-black transition-colors duration-300" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <ul>
              <li>
                <Link
                  to="/about"
                  className="hover:text-black transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="hover:text-black transition-colors duration-300"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="hover:text-black transition-colors duration-300"
                >
                  News
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Account</h2>
            <ul>
              <li>
                <Link
                  to="/support"
                  className="hover:text-black transition-colors duration-300"
                >
                  Support Center
                </Link>
              </li>
              <li>
                <Link
                  to="/feedback"
                  className="hover:text-black transition-colors duration-300"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-black transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Company</h2>
            <ul>
              <li>
                <Link
                  to="/our-team"
                  className="hover:text-black transition-colors duration-300"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/partners"
                  className="hover:text-black transition-colors duration-300"
                >
                  Partner
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-black transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-lg">
            &#169; FashoHub {date.getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
