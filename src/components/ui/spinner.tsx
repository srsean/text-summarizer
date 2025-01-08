import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="relative w-8 h-8">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className={`absolute w-2 h-2 bg-gray-800 rounded-full`}
            style={{
              transform: `rotate(${index * 45}deg) translate(0, -1rem)`,
              animation: `spinner 1.5s infinite ease-in-out`,
              animationDelay: `${index * 0.15}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Spinner;
