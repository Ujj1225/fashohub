import React, { useState, useEffect } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../../store/slices/authSlice.js";

import {
  useRegisterMutation,
  useRequestOtpMobileMutation,
} from "../../store/slices/userApiSlice.js";

const VerifyScreen = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [isCodeSent, setIsCodeSent] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const [requestOtpMobile] = useRequestOtpMobileMutation();

  const location = useLocation();
  if (!location.state || !location.state.fromSignUp) {
    return <Navigate to="/signup" />;
  }

  const { name, password, phone } = location.state;

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, phone, password, otp }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("User registered successfully.");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const handleResendCode = async () => {
    try {
      await requestOtpMobile({ phone }).unwrap();
      setIsCodeSent(true);
      setTimer(60);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <div className="hero bg-[#FCEEEA] flex justify-center items-center p-5 min-h-[91vh]">
      <div className="form-page bg-white rounded-lg shadow-lg p-8 max-w-md w-full mt-[-10rem]">
        <div className="ml-4">
          <h4 className="mb-4 font-semibold text-xl text-center">
            Verify Your Phone Number
          </h4>
          <form onSubmit={handleVerify}>
            <input
              type="text"
              name="otp"
              placeholder="Verification Code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-[#FF3F6C]"
              maxLength={"6"}
            />
            <button
              type="submit"
              className="bg-[#FF3F6C] w-full h-8 text-white font-bold rounded-lg mb-4"
              disabled={isLoading}
            >
              VERIFY
            </button>
          </form>
          {timer > 0 ? (
            <p className="text-center text-[#FF3F6C] font-semibold">
              Resend code in {timer} seconds
            </p>
          ) : (
            <button
              onClick={handleResendCode}
              className="text-[#FF3F6C] font-semibold cursor-pointer w-full"
            >
              Resend Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyScreen;
