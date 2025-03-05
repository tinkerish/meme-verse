import { FC } from "react";
import { Meme } from "../../store/formStore";
import MemeDetail from "../Memes/MemeDetails.tsx";
export interface PreviewProps {
  id: string;
  ariaLabelledBy: string;
  memeData?: Meme;
}
const Preview: FC<PreviewProps> = ({ memeData }) => {
  if (memeData) {
    return <MemeDetail newMeme={memeData} />;
  }
  return (
    <div className="text-center text-xl text-gray-500">No preview to show</div>
  );
};

export default Preview;
