import { useState, useEffect, useCallback, useContext } from "react";
import { BiSearch } from "react-icons/bi";
import useMemeStore from "../store/formStore";
import { Meme } from "../components/Memes/index";
import { useNavigate } from "react-router-dom";
import SortDropdown from "../components/Memes/SortDropDown";
import Filter from "../components/Memes/Filter";
import { debounce } from "lodash";
import { motion } from "framer-motion";
import { Loader } from "../components/Loader";
import "../styles/meme.css";
import { ThemeContext } from "../context/ThemeContext";
const PAGE_SIZE = 10;

const MyMemePageComponent = () => {
  const { mergedMemes } = useMemeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("Trending");
  const [sortBy, setSortBy] = useState("date");
  const [processedMemes, setProcessedMemes] = useState([]);
  const [displayedMemes, setDisplayedMemes] = useState([]);
  const [loading, setLoading] = useState(false);

  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;
  const navigate = useNavigate();
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchValue);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchValue, debouncedSearch]);

  const editHandler = (id) => navigate(`/add-meme/${id}`);
  const viewDetailsHandler = (id) => navigate(`/meme/${id}`);

  const applySearchFilterSort = useCallback(() => {
    let updatedMemes = [...mergedMemes];

    console.log("called", searchQuery);
    if (searchQuery) {
      updatedMemes = updatedMemes.filter(
        (meme) =>
          meme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          searchQuery === ""
      );
    }

    if (category === "Trending") {
      updatedMemes.sort((a, b) => b.likes - a.likes);
    } else if (category === "New") {
      updatedMemes = updatedMemes.filter((meme) => meme.category === "New");
    } else if (category === "Classic") {
      updatedMemes = updatedMemes.filter((meme) => meme.category === "Classic");
    } else if (category === "Random") {
      updatedMemes =
        updatedMemes.length > 0
          ? [updatedMemes[Math.floor(Math.random() * updatedMemes.length)]]
          : [];
    }

    if (sortBy === "likes") {
      updatedMemes.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "comments") {
      updatedMemes.sort((a, b) => b.comments.length - a.comments.length);
    } else {
      updatedMemes.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    }

    setProcessedMemes(updatedMemes);
    setDisplayedMemes(updatedMemes.slice(0, PAGE_SIZE));
  }, [searchQuery, category, sortBy, mergedMemes]);

  useEffect(() => {
    applySearchFilterSort();
  }, [searchQuery, category, sortBy, mergedMemes, applySearchFilterSort]);

  const loadMore = useCallback(() => {
    if (loading || displayedMemes.length >= processedMemes.length) return;
    setLoading(true);

    setTimeout(() => {
      setDisplayedMemes((prev) => [
        ...prev,
        ...processedMemes.slice(prev.length, prev.length + PAGE_SIZE),
      ]);
      setLoading(false);
    }, 1000);
  }, [displayedMemes, loading, processedMemes]);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedMemes, processedMemes, loadMore]);

  return (
    <div>
      <div
        className="radial-backg"
        style={{ background: theme === "dark" ? "#2a6c74" : "" }}
      >
        <motion.div
          className="min-h-[25vw] py-16 flex flex-col justify-between gap-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 className="px-24 text-white font-garamond text-[8rem] leading-none font-black max-md:px-8 max-md:text-[6rem]">
            Follow Your Heart
          </motion.h1>

          <motion.div
            className="px-24 flex gap-4 items-center max-md:px-8 max-md:flex-col max-md:items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="flex items-center gap-2 bg-white rounded-2xl px-4 flex-grow max-md:w-full"
              whileHover={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <BiSearch size={30} />
              <input
                type="text"
                className="h-14 rounded-2xl w-full border-none outline-none text-xl"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </motion.div>

            <Filter setCategory={setCategory} />

            <SortDropdown setSortBy={setSortBy} />
          </motion.div>
        </motion.div>
      </div>

      <Meme
        data={displayedMemes}
        isEditOrDeleteAllowed={true}
        editHandler={editHandler}
        viewDetailsHandler={viewDetailsHandler}
      />

      {loading && (
        <div className="flex justify-center">
          <p className="text-center text-white">
            <Loader />
          </p>
        </div>
      )}
    </div>
  );
};

export default MyMemePageComponent;
