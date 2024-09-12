import React from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion"; // Import framer-motion

function Modal({ title, children, onClose, onConfirm }) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Apply motion.div to animate modal */}
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 w-1/3"
        initial={{ opacity: 0, scale: 0.8 }} // Start small and transparent
        animate={{ opacity: 1, scale: 1 }} // Animate to full size and opacity
        transition={{ duration: 0.3 }} // Duration of the animation
      >
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 px-4 py-2 rounded mr-4"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

export default Modal;
