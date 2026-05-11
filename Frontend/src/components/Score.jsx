const Score = ({ score }) => {
  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (score / 100) * circumference;

  let color = "stroke-red-500";
  if (score > 70) color = "stroke-green-500";
  else if (score > 40) color = "stroke-yellow-400";

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2}>
        {/* background */}
        <circle
          stroke="gray"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="opacity-20"
        />

        {/* progress */}
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className={`${color} transition-all duration-700`}
        />
      </svg>

      {/* 🔥 PERFECT CENTER TEXT */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-white">
          {score}%
        </span>
      </div>
    </div>
  );
};
export default Score