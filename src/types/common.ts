// import { MultiStepFormProps } from "../components/MultiStepForm";
// import { PreviewProps } from "../components/Preview";
import { Meme } from "../store/formStore";

export enum DynamicFieldContext {
  Ingredient = "ingredient",
  Instruction = "instruction",
  Text = "text",
}
// export type TabComponent = {
//   title: string;
//   component: React.FC<MultiStepFormProps> | React.FC<PreviewProps>;
//   props: {
//     id: string;
//     ariaLabelledBy: string;
//     handleMemeData?: (meme: Partial<Meme>) => void;
//     memeData?: Meme;
//   };
// };
// // | {
// //     title: string;
// //     component: React.LazyExoticComponent<React.FC<MultiStepFormProps>>;
// //     props: MultiStepFormProps;
// //   }
// // | {
// //     title: string;
// //     component: React.LazyExoticComponent<React.FC<PreviewProps>>;
// //     props: PreviewProps;
// //   };
export type TabComponent<T> = {
  title: string;
  component: React.FC<T>;
  props: {
    id: string;
    ariaLabelledBy: string;
    handleMemeData?: (meme: Partial<Meme>) => void;
    memeData?: Meme;
  };
};

export enum ToggleType {
  Checkbox = "checkbox",
  Switch = "switch",
}
export interface fileValidationError {
  invalidFormat: string;
  fileSize: string;
  fileCount: string;
}
