import React from "react";

interface SecondsProps {
  seconds: number;
}

const Seconds: React.FC<SecondsProps> = ({ seconds }) => {
  // Calculate the percentage of time remaining
  const progressPercentage = ((60 - seconds) / 60) * 100;

  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * 14; // Assuming a radius of 14

  // Calculate the dash offset to represent the progress
  const dashOffset = ((100 - progressPercentage) / 100) * circumference;

  return (
    <div>
      <div className="relative h-32 w-32 bg-black rounded-full overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-white text-6xl font-extrabold mb-1">
            {seconds}
          </div>
          <div className="text-slate-300">seconds</div>
        </div>
        <svg
          className="absolute"
          width="100%"
          height="100%"
          viewBox="0 0 28 28"
        >
          <circle
            cx="50%"
            cy="50%"
            r="14"
            fill="transparent"
            stroke="yellow"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
      </div>
    </div>
  );
};

export default Seconds;
