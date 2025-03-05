import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import useMemeStore, { Meme } from "../../store/formStore";
import { useParams } from "react-router-dom";
import { BsCalendar2DateFill, BsHeartFill, BsShareFill } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { MdOutlineDoneOutline } from "react-icons/md";
import ShareDropdown from "./ShareDropDown";

const MemeDetail = ({ newMeme }) => {
  const { id } = useParams();
  const [isOpenShareDropDown, setIsOpenShareDropDown] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { addUserMeme, addComments, addLikes, mergedMemes } = useMemeStore();
  const [isUploaded, setIsUploaded] = useState(false);

  const displayMeme = useMemo(() => {
    return mergedMemes.find((meme) => meme.id === id);
  }, [mergedMemes, id]);

  const handleAddMeme = () => {
    addUserMeme(newMeme);
    setIsUploaded(true);
  };

  const handleLike = () => {
    if (id) addLikes(id);
  };

  const handleComment = () => {
    if (id) addComments(id, newComment);
  };
  const handleSharing = async () => {
    console.log(navigator);
    if (navigator.share && displayMeme?.url) {
      try {
        await navigator
          .share({
            title: displayMeme.name,
            text: "Check out this meme!",
            url: displayMeme.url,
          })
          .then(() =>
            console.log("Hooray! Your content was shared to tha world")
          );
      } catch (error) {
        console.log(`Oops! I couldn't share to the world because: ${error}`);
      }
    } else {
      // fallback code
      console.log(
        "Web share is currently not supported on this browser. Please provide a callback"
      );
    }
  };
  return (
    <motion.div
      className="flex flex-col items-center w-[100%] max-lg:w-[95%] p-16 max-lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col justify-center w-[60%] max-lg:w-[100%] bg-white rounded-xl p-4 gap-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="w-full relative">
          <motion.img
            src={id ? displayMeme?.url : newMeme?.url}
            alt={id ? displayMeme?.name : newMeme?.name}
            className="aspect-[18/9] w-full object-contain rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="flex items-end justify-end p-4 absolute right-0 bottom-0 z-10 gap-1 text-white w-full h-full shadow-[inset_0px_0px_100px_25px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-xl">
              <BsCalendar2DateFill />
              <p>
                {id
                  ? displayMeme
                    ? new Date(displayMeme.timestamp).toLocaleDateString()
                    : ""
                  : newMeme
                  ? "Date"
                  : ""}
              </p>
            </div>
          </motion.div>
        </motion.div>

        <div>
          <h1 className="text-4xl font-bold text-left">
            {id ? displayMeme?.name : newMeme?.name}
          </h1>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={handleLike}
                className="text-red-500 text-lg font-bold flex items-center gap-1 hover:text-red-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={!id}
              >
                <BsHeartFill />
                {id ? displayMeme?.likes : newMeme?.likes}
              </motion.button>
              <div className="text-blue-600 flex items-center gap-1">
                <FaComment />
                {id ? displayMeme?.comments.length : newMeme?.comments.length}
              </div>
              <div className="relative inline-block text-left max-md:w-full">
                <motion.button
                  onClick={() => setIsOpenShareDropDown(!isOpenShareDropDown)}
                  disabled={!id}
                  className="flex items-center justify-center"
                >
                  <BsShareFill color="grey" />
                </motion.button>
                <ShareDropdown
                  handleSharing={handleSharing}
                  close={(value) => setIsOpenShareDropDown(value)}
                  isOpen={isOpenShareDropDown}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Feedback</h3>
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {(id ? displayMeme?.comments : newMeme?.comments)?.map(
              (comment, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-100 p-2 rounded-full"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {comment}
                </motion.div>
              )
            )}
          </motion.div>

          <div className="mt-4 flex">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border border-gray-300 rounded-l p-2"
              disabled={!id}
            />
            <motion.button
              onClick={handleComment}
              className={`bg-[#409097] text-white px-4 rounded-r hover:bg-[#36787e] ${
                !id || !newComment ? "pointer-events-none opacity-70" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!id || !newComment}
            >
              Post
            </motion.button>
          </div>
        </div>
        {isUploaded ? (
          <motion.div
            className="w-full flex items-center gap-1 justify-center p-4 text-3xl text-green-600"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MdOutlineDoneOutline />
            Uploaded
          </motion.div>
        ) : (
          !id && (
            <motion.button
              className="bg-blue-500 text-white p-4 rounded-r hover:bg-blue-600 w-full"
              onClick={handleAddMeme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Upload Meme
            </motion.button>
          )
        )}
      </motion.div>
    </motion.div>
  );
};

export default MemeDetail;
