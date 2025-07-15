import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Icons from "../shared/Icons";
import { useClickOutside } from "@/hooks/useClickOutside";

const Searchbar = () => {
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = () => {
    setShow(false);
  };

  useClickOutside({
    handler: handleClickOutside,
    ref: containerRef as React.RefObject<HTMLElement>,
  });

  // Focus the input when it is shown
  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show, inputRef]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex items-center justify-end transition-colors duration-300 overflow-hidden rounded-xl",
        {
          "bg-primary px-2 max-md:fixed max-md:top-4 max-md:right-4 max-md:shadow-lg max-md:w-full max-md:max-w-[calc(100vw-4rem)]":
            show,
        }
      )}
    >
      <AnimatePresence mode="wait">
        {show && (
          <motion.input
            key="search-input"
            ref={inputRef}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            type="text"
            placeholder="Tìm kiếm..."
            className="bg-primary text-white outline-none border-none placeholder:text-white focus:outline-none py-2 px-4"
          />
        )}

        <motion.button
          onClick={() => setShow((prev) => !prev)}
          key="search-button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white hover:bg-primary-hover transition-colors duration-300",
            {
              "bg-transparent": show,
            }
          )}
        >
          <Icons.Search className={cn("h-6 w-6", {})} />
        </motion.button>
      </AnimatePresence>
    </div>
  );
};

export default Searchbar;
