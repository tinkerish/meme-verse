import { FC } from "react";
import RecipeList from "./MemeList";
import { Meme as MemeProp } from "../../store/formStore";
import { Loader } from "../Loader";

// import { ListCardProps } from "../";
interface GeneralListProps {
  data: MemeProp[];
  isEditOrDeleteAllowed: boolean;
  editHandler?: (id: string) => void;
  deleteHandler?: (id: string) => void;
  viewDetailsHandler: (id: string) => void;
}
const MemeComponent: FC<GeneralListProps> = ({ data }) => {
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
