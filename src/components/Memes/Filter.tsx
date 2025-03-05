import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Filter = ({ setCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left max-md:w-full">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="border border-white border-solid px-4 py-2 rounded-xl hover:bg-[#409097] transition-transform text-white text-xl max-md:w-full flex items-center gap-2 justify-center"
      >
        Filter <FaFilter />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-40 bg-white border rounded-md shadow-lg max-md:w-full"
          >
            {["Trending", "New", "Classic", "Random"].map((category) => (
              <motion.button
                key={category}
                whileHover={{ backgroundColor: "#f0f0f0" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCategory(category);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2"
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filter;
