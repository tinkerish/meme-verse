import RecipeList from "./MemeList";
import { Loader } from "../Loader";
const MemeComponent = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="min-h-[30vh] w-full flex justify-center">
        <div className="">
          <Loader />
        </div>
      </div>
    );
  }
  return (
    <div className="p-4 pt-16">
      <RecipeList foods={data} />
    </div>
  );
};

// export const GeneralList =         (GeneralListComponent);
export const Meme = MemeComponent;
