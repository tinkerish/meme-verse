// import { Link } from "react-router-dom";
// import food from "../../assets/coffee.png";
// import { IoIosArrowForward } from "react-icons/io";
// import "../../styles/hero.css";
// import { useContext } from "react";
// import { ThemeContext } from "../../context/ThemeContext";

// const HeroIntro = () => {
//   const themeContext = useContext(ThemeContext);
//   const { theme } = themeContext;
//   return (
//     <div
//       className="polygon-shape text-[#efead5] pb-0 max-xlg:py-20 max-2xl:pb-10"
//       style={{ background: theme === "dark" ? "#2a6c74" : "" }}
//     >
//       <div className="w-full flex px-24 max-md:flex-col-reverse items-center max-md:gap-4 max-md:px-14">
//         <div className="w-[50%] flex flex-col gap-14 max-md:w-full max-md:text-center">
//           <div>
//             <h1 className="font-garamond text-[10rem] leading-none font-black max-[1815px]:text-[8rem] max-2xl:text-[6rem]  max-lg:text-[5rem] max-xlg:text-[4rem] max-sm:text-[3rem]">
//               Follow Your Heart
//             </h1>
//             <p className="text-4xl font-extrabold font-itim max-xxl:text-3xl max-lg:text-2xl max-xxsm:text-xl">
//               Activate your afternoon with something fun
//             </p>
//           </div>
//           <div className="flex gap-8 items-center text-4xl font-itim max-xxl:text-3xl max-lg:text-2xl max-xlg:text-xl max-md:justify-center ">
//             <Link to="/my-meme">
//               <button
//                 className="rounded-full bg-[#ffcb31] p-5 text-black max-xxsm:p-3 max-xxxsm:text-xs"
//                 style={{
//                   background: theme === "dark" ? "#897934" : "",
//                   color: theme === "dark" ? "#fff" : "",
//                 }}
//               >
//                 Enter Heaven?
//               </button>
//             </Link>
//             <Link to="/add-meme" className="flex items-center gap-2 font-bold">
//               <span className="">Add Your Own Heaven</span>
//               <IoIosArrowForward />
//             </Link>
//           </div>
//         </div>
//         <div className="w-[50%] flex justify-end py-8 max-md:w-full max-md:justify-center max-md:py-0">
//           <img src={food} alt="" className="floating-image w-[80%]" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroIntro;
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import food from "../../assets/heroMeme.jpg";
import { IoIosArrowForward } from "react-icons/io";
import "../../styles/hero.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const HeroIntro = () => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  return (
    <motion.div
      className="polygon-shape text-[#efead5] pb-0 max-xlg:py-20 max-2xl:pb-10"
      style={{ background: theme === "dark" ? "#2a6c74" : "" }}
    >
      <div className="w-full flex px-24 max-md:flex-col-reverse items-center max-md:gap-4 max-md:px-14">
        {/* Left Section */}
        <motion.div
          className="w-[50%] flex flex-col gap-14 max-md:w-full max-md:text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div>
            <motion.h1
              className="font-garamond text-[10rem] leading-none font-black max-[1815px]:text-[8rem] max-2xl:text-[6rem] max-lg:text-[5rem] max-xlg:text-[4rem] max-sm:text-[3rem]"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Follow Your Heart
            </motion.h1>
            <motion.p
              className="text-4xl font-extrabold font-itim max-xxl:text-3xl max-lg:text-2xl max-xxsm:text-xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Activate your afternoon with something fun
            </motion.p>
          </div>

          <motion.div
            className="flex gap-8 items-center text-4xl font-itim max-xxl:text-3xl max-lg:text-2xl max-xlg:text-xl max-md:justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Link to="/my-meme">
              <motion.button
                className="rounded-full bg-[#ffcb31] p-5 text-black max-xxsm:p-3 max-xxxsm:text-xs"
                style={{
                  background: theme === "dark" ? "#897934" : "",
                  color: theme === "dark" ? "#fff" : "",
                }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                Enter Heaven?
              </motion.button>
            </Link>
            <Link to="/add-meme" className="flex items-center gap-2 font-bold">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Add Your Own Heaven
              </motion.span>
              <IoIosArrowForward />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Section - Floating Image */}
        <motion.div
          className="w-[50%] flex justify-end py-8 max-md:w-full max-md:justify-center max-md:py-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.img
            src={food}
            alt=""
            className="w-[80%] rounded-s-[17%] rounded-e-[17%]"
            animate={{
              y: [0, -10, 0], // Floating effect
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroIntro;
