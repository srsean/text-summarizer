import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="h-full w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-lg font-semibold border-b border-gray-700">Sidebar</div>
      <ul className="flex-1 p-4 space-y-2">
        <li className="hover:bg-gray-700 p-2 rounded">Item 1</li>
        <li className="hover:bg-gray-700 p-2 rounded">Item 2</li>
        <li className="hover:bg-gray-700 p-2 rounded">Item 3</li>
        <li className="hover:bg-gray-700 p-2 rounded">Item 4</li>
      </ul>
    </div>
  );
};

export default Sidebar;
