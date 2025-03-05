import { FC, useMemo } from "react";
import { motion } from "framer-motion";
import ListCard from "../ListCard";
import List from "../List";
import { BiSolidComment, BiSolidLike } from "react-icons/bi";
import { Meme } from "../../store/formStore";
import { Link } from "react-router-dom";

interface ListProps {
  foods: Meme[];
}

const RecipeListComponent: FC<ListProps> = ({ foods }) => {
  return (
    <List>
      {foods.map((foodItem, index) => (
        <motion.div
          key={foodItem.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.01 }}
        >
          <Recipe foodItem={foodItem} />
        </motion.div>
      ))}
    </List>
  );
};

interface MemeProp {
  foodItem: Meme;
}

const Recipe: FC<MemeProp> = ({ foodItem }) => {
  const { name, url, id, likes, timestamp, category, comments } = foodItem;
  const date = useMemo(() => new Date(timestamp), [timestamp]);

  return (
    <Link to={`/meme/${id}`}>
      <motion.div
        className="w-full max-w-[1000px] m-auto"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative">
          <div className="max-w-[300px] w-[300px] max-xxsm:w-[200px] max-[300px]:w-[100px] relative -mb-10 z-10 m-auto pt-16">
            <img
              src={url}
              alt={name}
              className="w-full aspect-square object-cover shadow-2xl rounded-2xl"
            />
          </div>
          <div className="w-full -mb-10 m-auto absolute p-4 top-0 left-0 h-[400px] max-xsm:h-[300px] max-[300px]:h-[200px] irregular-recipe-wrapper"></div>
        </div>
        <div className="relative">
          <ListCard>
            <div className="flex flex-col gap-4 pt-20 px-8 pb-4 min-h-[200px] justify-between max-[400px]:px-4">
              {/* Meme Name & Stats */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold capitalize max-[400px]:text-xl">
                  {name}
                </h2>
                <span className="bg-gray-200 px-2 py-1 rounded-md">
                  {category}
                </span>
              </div>

              <div className="text-sm text-gray-500 flex justify-between">
                <div className="flex gap-6 text-gray-600">
                  <div className="flex items-center gap-1 text-xl max-[400px]:text-lg">
                    <BiSolidLike className="text-blue-500" />
                    <span>{likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xl">
                    <BiSolidComment className="text-green-500" />
                    <span>{comments.length}</span>
                  </div>
                </div>
                <p>{new Date(date).toLocaleDateString()}</p>
              </div>
            </div>
          </ListCard>
        </div>
      </motion.div>
    </Link>
  );
};

export default RecipeListComponent;
