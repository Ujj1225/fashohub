import React, { useState, useEffect } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useRequestOtpMobileMutation } from "../../store/slices/userApiSlice";

import coupon from "../../images/coupon.png";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const [requestOtpMobile, { isLoading }] = useRequestOtpMobileMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      toast.error("Phone number should be 10 digits.");
    } else if (password !== confirmPassword) {
      toast.error("Passwords donot match!");
    } else {
      try {
        await requestOtpMobile({ phone }).unwrap();
        navigate("/verify", {
          state: { fromSignUp: true, name, phone, password },
        });
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-[#FCEEEA] pt-10 px-2 min-h-[91vh]">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-md mx-auto sm:px-3">
        <img
          src={coupon}
          alt="Sign Up Image"
          className="w-full mb-6"
          width={350}
          height={200}
        />
        <form className="" onSubmit={handleSubmit}>
          <h4 className="mb-4 font-semibold text-xl text-center">
            Welcome to <span className="text-[#FF3F6C]">FashoHub!</span>
          </h4>
          <input
            required
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-[#FF3F6C]"
            maxLength={"20"}
          />
          <input
            required
            type="text"
            name="phone"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-[#FF3F6C]"
            maxLength={"10"}
          />
          <div className="relative mb-4">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF3F6C] pr-10"
              maxLength={"20"}
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={handleShowPass}
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </div>
          </div>
          <input
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-[#FF3F6C]"
            maxLength={"20"}
          />
          <button
            type="submit"
            className="bg-[#FF3F6C] w-full h-8 text-white font-bold rounded-lg mb-4"
            disabled={isLoading}
          >
            SIGN UP
          </button>
          {isLoading && <p className="text-xs font-light">Loading...</p>}
          <p className="text-[#999] text-center font-semibold">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-[#FF3F6C] font-semibold cursor-pointer">
                Log in
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpScreen;
