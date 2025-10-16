import { useEffect, useRef, useState } from "react";

// Custom Dropdown Component
export const CustomDropdown = ({
  trigger,
  children,
  align = "end",
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const alignmentClass =
    align === "end"
      ? "right-0"
      : align === "center"
      ? "left-1/2 transform -translate-x-1/2"
      : "left-0";

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={`absolute ${alignmentClass} mt-1 w-48 bg-white rounded-md shadow-lg border z-50 overflow-hidden`}
        >
          {children}
        </div>
      )}
    </div>
  );
};
