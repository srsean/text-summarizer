import React from "react";

interface AvatarProps {
  name: string;
}

const Avatar: React.FC<AvatarProps> = ({ name }) => {
  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return initials.toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <div className="bg-violet-900 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
      {initials}
    </div>
  );
};

export default Avatar;
