import React from "react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-[#25BA88]">Terms and Conditions</h2>
        <p className="text-sm text-gray-700 mb-4">
        Welcome to our platform! By using our services, you agree to comply with the following terms and conditions. Please read them carefully before proceeding.
        By using this service, you agree to abide by all platform rules, including but not limited to...
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#25BA88] text-white cursor-pointer px-4 py-2 rounded hover:bg-[#0B9567] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;