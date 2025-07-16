import React, { useRef } from "react";

interface DropdownProps {
  children?: React.ReactNode;
  className?: string;
  isOpen: boolean;
}

const Dropdown = ({ children, className, isOpen }: DropdownProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-[40px] right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
      ref={containerRef}
    >
      <div className={`flex flex-col ${className}`}>{children}</div>
    </div>
  );
};

export default Dropdown;
