import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

interface PhoneVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PhoneVerificationModal: React.FC<PhoneVerificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      setCountdown(60);
      setCanResend(false);
    }

    if (isOpen && !canResend) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
        <div 
          className="flex items-center mb-6 cursor-pointer" 
          onClick={onClose}
        >
          <FiArrowLeft className="text-[#25BA88] mr-2" size={20} />
          <p className="font-normal text-[#25BA88]">Go back</p>
        </div>
        <h2 className="text-lg font-semibold mb-4 text-[#25BA88] text-center">Verification code has been sent</h2>
        <p className="text-sm text-gray-700 mb-4">
          We have sent a verification code to +256 712 345678. <br />
          Please check your SMS and enter the code below to continue.
        </p>

        <div className="mb-4 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Enter verification code"
            className="w-full px-3 py-3 bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BA88] text-black"
          />
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`${
              canResend
                ? "bg-[#25BA88] hover:bg-[#0B9567] text-white cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            } text-sm font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-150`}
          >
            {canResend ? "Resend Code" : `Resend in ${countdown}s`}
          </button>
        </div>

        <div className="flex justify-center">
          <button
            className="w-full bg-[#25BA88] hover:bg-[#0B9567] cursor-pointer text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerificationModal;