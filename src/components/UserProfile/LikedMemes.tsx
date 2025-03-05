import { Meme } from "../../store/formStore";
import RecipeListComponent from "../Memes/MemeList";

type LikedMemesProps = {
  memes: Meme[];
};

const LikedMemes: React.FC<LikedMemesProps> = ({ memes }) => {
  if (memes.length === 0)
    return (
      <div className="text-center text-xl text-gray-500">
        No liked memes yet.
      </div>
    );
  return <RecipeListComponent foods={memes} />;
};

export default LikedMemes;
