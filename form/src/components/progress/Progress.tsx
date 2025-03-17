import { ProgressProps } from "./Progress.types";

const Progress: React.FC<ProgressProps> = ({ value, max, min }) => {
  return (
    <div className="jeremiemeunier-progress">
      <div
        className="jeremiemeunier-value"
        style={{ width: `calc(${value && max && (value / max) * 100}%` }}
      ></div>
    </div>
  );
};

export default Progress;
