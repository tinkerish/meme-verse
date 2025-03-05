import { FC } from "react";
import StepsController from "./StepsController";
import { Meme } from "../../store/formStore";
export interface MultiStepFormProps {
  id: string;
  ariaLabelledBy: string;
  handleMemeData: (meme: Partial<Meme>) => void;
  memeData?: Meme;
}
const MultiStepForm: FC<MultiStepFormProps> = ({
  id,
  ariaLabelledBy,
  handleMemeData,
}) => {
  return (
    <form id={id} aria-labelledby={ariaLabelledBy} className="flex">
      <StepsController handleMemeData={handleMemeData!} />
    </form>
  );
};
export default MultiStepForm;
