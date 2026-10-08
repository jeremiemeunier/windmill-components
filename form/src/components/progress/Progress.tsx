import { ProgressProps } from "./Progress.types";

const Progress: React.FC<ProgressProps> = ({ value, max }) => {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div className="windmillui-progress-root">
      <div className="windmillui-value" style={{ width: `${percent}%` }}></div>
    </div>
  );
};

export default Progress;
