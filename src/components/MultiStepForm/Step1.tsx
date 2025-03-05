import React, { FC, useState } from "react";
import Select from "../Select";
import Error from "../Error";
import FileUploader from "../FileUploader";
import CustomToggle from "../CustomToggle";
import { ToggleType } from "../../types/common";
import useMemeStore, { Meme } from "../../store/formStore";
import { v4 as uuid } from "uuid";
import { generateAiMeme, generateMeme } from "../../utils/memeUploader";
import { Loader } from "../Loader";
import { MdOutlineDoneOutline } from "react-icons/md";
import { motion } from "framer-motion";
import { RiImageAiFill } from "react-icons/ri";
const CATEGORY_OPTIONS = [
  {
    value: "New",
    name: "New",
  },
  {
    value: "Classic",
    name: "Classic",
  },
];
const MAX_SIZE = "5 MB";
const FILE_TYPE = ["image/jpeg", "image/jpg", "image/png"];
interface MemeUploaderProps {
  handleMemeData: (meme: Partial<Meme>) => void;
}
const Step1: FC<MemeUploaderProps> = ({ handleMemeData }) => {
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState<undefined | string>();
  const [topTextError, setTopTextError] = useState<undefined | string>();
  const [bottomTextError, setBottomTextError] = useState<undefined | string>();
  const [imageError, setImageError] = useState<undefined | string>();
  const [templateIdError, setTemplateIdError] = useState<undefined | string>();
  const [urlError, setUrlError] = useState<undefined | string>();
  const { memes } = useMemeStore();
  const [aiBased, setAIBased] = useState(false);
  const [name, setName] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [image, setImage] = useState<File>();
  const [templateId, setTemplateId] = useState("");
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0].value);
  const [endLoadingState, setEndLoadingState] = useState(false);
  const handleFileChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let isValid = true;
    setUrlError(undefined);
    setNameError(undefined);
    setTopTextError(undefined);
    setBottomTextError(undefined);
    setImageError(undefined);
    setTemplateIdError(undefined);

    if (!name.trim()) {
      setNameError("Caption is required.");
      isValid = false;
    }

    if (aiBased && !topText.trim()) {
      setTopTextError("Top text is required when AI-based is enabled.");
      isValid = false;
    }

    if (aiBased && !bottomText.trim()) {
      setBottomTextError("Bottom text is required when AI-based is enabled.");
      isValid = false;
    }

    if (!image && !aiBased) {
      setImageError("Image is required.");
      isValid = false;
    }
    if (!aiBased && image && !FILE_TYPE.includes(image!.type)) {
      setImageError(
        "Invalid file type. Only JPG, JPEG,GIF, and PNG are allowed."
      );
      isValid = false;
    }

    if (aiBased && !templateId) {
      setTemplateIdError("Please select a meme template.");
      isValid = false;
    }

    if (!isValid) return;
    const id = uuid();
    const meme = {
      id: id,
      name,
      likes: 0,
      comments: [],
      category: category as "New" | "Classic",
      url: "",
    };
    try {
      setLoading(true);
      if (aiBased) {
        meme.url = await generateAiMeme(templateId, topText, bottomText);
      } else {
        meme.url = await generateMeme(image);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEndLoadingState(true);

      setTimeout(() => {
        setEndLoadingState(false);
        setLoading(false);
      }, 1000);
    }
    if (!meme.url) {
      setUrlError(
        "Something went wrong while uploading image file. Please try again"
      );
      return;
    }

    handleMemeData(meme);
  };
  return (
    <div className="flex justify-around w-full max-sm:flex-col-reverse max-sm:gap-8">
      <div className="w-[47%] flex flex-col justify-between max-sm:w-full">
        <div className="flex flex-col justify-evenly w-full gap-4">
          <div className="flex items-center gap-4">
            <label className="text-xl">Let AI generate you meme?</label>
            <CustomToggle
              value={aiBased}
              onChange={(value) => setAIBased(value)}
              type={ToggleType.Switch}
              size={1.5}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="coverImage" className="md:text-lg">
              Cover Image
            </label>
            <FileUploader
              value={image}
              allowedFileSize={MAX_SIZE}
              allowedFileTypes={FILE_TYPE}
              maxFiles={1}
              isDisabled={aiBased}
              onChange={(file) => {
                setImageError(undefined);
                setImage(file);
              }}
            />
            {image && <RiImageAiFill size={30} />}
            {imageError && <Error errorMessage={imageError} />}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="">
              Caption
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => {
                setNameError(undefined);
                setName(e.target.value);
              }}
              className="w-full border border-gray-300 p-1 rounded-lg"
            />
            {nameError && <Error errorMessage={nameError} />}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="text0" className="">
              Top text
            </label>
            <input
              id="text0"
              name="text0"
              value={topText}
              onChange={(e) => {
                setTopTextError(undefined);
                setTopText(e.target.value);
              }}
              className={` w-full border border-gray-300 p-1 rounded-lg ${
                !aiBased ? "cursor-not-allowed" : ""
              }`}
              disabled={!aiBased}
            />
            {topTextError && <Error errorMessage={topTextError} />}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="text1" className="">
              Bottom text
            </label>
            <input
              id="text1"
              name="text1"
              value={bottomText}
              disabled={!aiBased}
              onChange={(e) => {
                setBottomTextError(undefined);
                setBottomText(e.target.value);
              }}
              className={` w-full border border-gray-300 p-1 rounded-lg ${
                !aiBased ? "cursor-not-allowed" : ""
              }`}
            />
            {bottomTextError && <Error errorMessage={bottomTextError} />}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="text1" className="">
              Template Id
            </label>
            <input
              id="text1"
              name="text1"
              value={templateId}
              disabled={true}
              onChange={(e) => {
                setBottomTextError(undefined);
                setBottomText(e.target.value);
              }}
              className={` w-full border border-gray-300 p-1 rounded-lg cursor-not-allowed`}
            />
            {templateIdError && <Error errorMessage={templateIdError} />}
          </div>
          <div className="flex flex-col gap-1">
            <Select
              label="Difficulty"
              name="difficulty"
              onChange={(e) => setCategory(e.target.value)}
              options={CATEGORY_OPTIONS}
              value={category}
              className="flex flex-col gap-1"
              inputClassName="focus:outline-gray-500 md:p-[0.4rem] rounded-lg border border-solid border-gray-400 rounded-lg"
              labelClassName="md:text-lg"
            />
          </div>
          <motion.button
            className={`flex items-center justify-center mt-8 w-full bg-[#409097] rounded-md py-2 text-white text-xl ${
              loading ? "cursor-not-allowed bg-[#4aa7af]" : ""
            }`}
            disabled={loading}
            onClick={(e) => handleFileChange(e)}
            transition={{ duration: 0.1 }}
          >
            {endLoadingState ? (
              <MdOutlineDoneOutline />
            ) : loading ? (
              <div>
                <Loader />
              </div>
            ) : aiBased ? (
              "Generate AI Meme  Image"
            ) : (
              "Generate Meme  Image"
            )}
          </motion.button>
          {urlError && <Error errorMessage={urlError} />}
        </div>
      </div>
      <motion.div
        className="p-4 border rounded border-black w-[50%] max-sm:w-full"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.div
          className={`max-h-[100vh] w-full grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] overflow-y-scroll gap-8 ${
            !aiBased ? "cursor-not-allowed" : ""
          }`}
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          {memes.map((meme) => (
            <motion.button
              key={meme.id}
              onClick={(e) => {
                e.preventDefault();
                setTemplateId(meme.id);
              }}
              disabled={!aiBased}
              className={aiBased ? "cursor-pointer" : "cursor-not-allowed"}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 10 }}
            >
              <motion.img
                src={meme.url}
                alt={meme.name}
                className={`w-full object-cover aspect-square rounded-md border border-solid border-black`}
                role="presentation"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Step1;
