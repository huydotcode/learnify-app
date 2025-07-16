import { mockProducts } from "@/data/mockProducts";
import { useClickOutside } from "@/hooks/useClickOutside";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import type { ProductType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Icons from "../shared/Icons";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductType[]>([]);

  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

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

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setSearchResults([]);
    setIsSearching(true);

    const timeoutId = setTimeout(() => {
      const results = mockProducts.filter((product) =>
        product.title.toLowerCase().includes(debouncedQuery.toLowerCase())
      );

      setSearchResults(results);
      setIsSearching(false);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [debouncedQuery]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex items-center justify-end transition-colors duration-300 rounded-xl",
        {
          "bg-primary px-2 max-md:fixed max-md:top-4 max-md:right-4 max-md:shadow-lg max-md:w-full max-md:max-w-[calc(100vw-4rem)]":
            show,
        }
      )}
    >
      <div className="relative flex w-full">
        <AnimatePresence mode="wait">
          {show && (
            <motion.input
              key="search-input"
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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

        {/* Search Result */}
        {show && (
          <AnimatePresence>
            <motion.div
              key="search-results"
              className="absolute p-2 top-full left-0 w-full bg-white shadow-lg rounded-lg mt
            -2 z-10 overflow-hidden min-h-[100px] max-h-[300px] border border-gray-200"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {show && searchResults.length > 0 && (
                <ul className="max-h-60 overflow-y-auto">
                  {searchResults.map((result) => (
                    <li
                      key={result.title}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setQuery("");
                        setSearchResults([]);
                        setShow(false);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={result.imageUrl}
                          alt={result.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span className="text-sm font-medium text-gray-800">
                          {result.title}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {show && isSearching && (
                <div className="flex items-center justify-center h-16">
                  <span className="text-gray-500">Đang tìm kiếm...</span>
                </div>
              )}

              {show &&
                query.trim() != "" &&
                searchResults.length === 0 &&
                !isSearching && (
                  <div className="flex items-center justify-center h-16">
                    <span className="text-gray-500">
                      Không tìm thấy kết quả
                    </span>
                  </div>
                )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
