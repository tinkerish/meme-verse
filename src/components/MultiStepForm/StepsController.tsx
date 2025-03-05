import { FC } from "react";
import { Meme } from "../../store/formStore";
import Step1 from "./Step1";
interface StepsControllerProps {
  handleMemeData: (meme: Meme) => void;
}
const StepsController: FC<StepsControllerProps> = ({ handleMemeData }) => {
  return <Step1 handleMemeData={handleMemeData} />;
};

export default StepsController;
