import React, { useState } from "react";
import { motion } from "framer-motion"; // Import framer-motion

function PostActions() {
  const [showMessage, setShowMessage] = useState(false);

  const handleAction = () => {
    // Perform post action (delete/edit/add)
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false); // Hide message after 3 seconds
    }, 3000);
  };

  return (
    <div>
      <button onClick={handleAction}>Perform Action</button>

      {showMessage && (
        <motion.div
          className="fixed bottom-10 right-10 bg-green-500 text-white p-4 rounded-lg"
          initial={{ opacity: 0, x: 100 }} // Start off-screen
          animate={{ opacity: 1, x: 0 }} // Slide in
          exit={{ opacity: 0, x: 100 }} // Slide out on exit
          transition={{ duration: 0.5 }}
        >
          Action completed successfully!
        </motion.div>
      )}
    </div>
  );
}

export default PostActions;
