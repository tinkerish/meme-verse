import { FC } from "react";
import { BiSolidError } from "react-icons/bi";
interface ErrorProps {
  errorMessage: string;
}
const Error: FC<ErrorProps> = ({ errorMessage }) => {
  return (
    <div>
      <p className="flex text-red-700">
        <BiSolidError size={20} />
        {errorMessage}
      </p>
    </div>
  );
};

export default Error;
