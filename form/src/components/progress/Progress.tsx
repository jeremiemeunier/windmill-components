import { ProgressProps } from "./Progress.types";

const Progress: React.FC<ProgressProps> = ({ value, max }) => {
  return (
    <div className="infusedui-progress-root">
      <div
        className="infusedui-value"
        style={{ width: `calc(${value && max && (value / max) * 100}%` }}
      ></div>
    </div>
  );
};

export default Progress;
