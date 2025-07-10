import { useEffect, useState } from "react";
import { CircleGaugeTypes } from "./CircleGauge.types";

const CircleGauge: React.FC<CircleGaugeTypes> = ({ progress }) => {
  const [mathProgress, setMathProgress] = useState<number>(0);

  useEffect(() => {
    const circumference = 2 * Math.PI * 50; // 2πr
    const offset = circumference * (1 - progress / 100);

    setMathProgress(offset);
  }, [progress]);

  return (
    <>
      <svg className="circle-progress-root" viewBox={`0 0 120 120`}>
        <circle className="circle-progress-background" r={50} cx={60} cy={60} />
        <circle
          style={{
            strokeDashoffset: mathProgress,
          }}
          className="circle-progress-gauge"
          r={50}
          cx={60}
          cy={60}
          strokeDasharray="314"
          strokeDashoffset="94"
        />
      </svg>
    </>
  );
};

export default CircleGauge;
