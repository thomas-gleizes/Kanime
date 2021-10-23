import React from "react";

const LayoutListing: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children }) => {
  return (
    <div className="flex justify-center space-x-10">
      {children}
      <div className="relative max-h-full md:max-w-400 w-full px-2">
        <div className="sticky top-20 border-2 bg-gray-200">
          <div className="text-center max-h-600 min-h-600" />
        </div>
      </div>
    </div>
  );
};

export default LayoutListing;
