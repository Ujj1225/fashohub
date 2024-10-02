import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useLoginMutation } from "../../store/slices/userApiSlice";
import { setCredentials } from "../../store/slices/authSlice";
import coupon from "../../images/coupon.png";

const LoginScreen = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
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
    try {
      const res = await login({ phone, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="bg-[#FCEEEA] pt-10 px-2 min-h-[91vh]">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-md mx-auto sm:px-3">
        <img
          src={coupon}
          alt="coupon card"
          className="w-full mb-6"
          width={350}
          height={200}
        />
        <form className="pb-8" onSubmit={handleSubmit}>
          <h4 className="mb-4 font-semibold text-xl">
            Login <span className="text-[#999]">or</span> Sign Up
          </h4>
          <input
            required
            type="text"
            placeholder="Enter your phone numer"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-FF3F6C"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={"10"}
          />
          <input
            required
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-FF3F6C"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={"20"}
          />
          <p className="mb-4 text-999">
            By continuing, I agree to the{" "}
            <span className="text-[#FF3F6C] font-semibold">Terms of Use</span> &{" "}
            <span className="text-[#FF3F6C] font-semibold">Policy</span>
          </p>
          <button className="bg-[#FF3F6C] w-full h-8 text-white font-bold rounded-lg mb-4">
            CONTINUE
          </button>
          <p className="text-[#999] font-semibold">
            New to FashoHub?{" "}
            <Link to="/signup">
              <span className="text-[#FF3F6C] font-semibold">Sign up!</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
