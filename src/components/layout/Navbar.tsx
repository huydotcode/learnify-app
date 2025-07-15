import { useState } from "react";

import Icons from "../shared/Icons";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const [showNavbarMobile, setShowNavbarMobile] = useState<boolean>(false);

  return (
    <div className="bg-white border-b border-gray-200 h-[61px] w-screen fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center p-4 h-[60px]">
        <div className="relative w-full flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="min-w-[120px] h-12 flex items-center">
              <img
                className="w-full h-full object-contain"
                src="images/logo.png"
                alt="Learnify Logo"
              />
            </span>
          </div>

          {/* Searchbar and Icons */}
          <div className="flex-1 flex items-center justify-end gap-4">
            <Searchbar />

            <Button
              className="h-full w-10 flex items-center justify-center rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors duration-300 md:hidden"
              onClick={() => setShowNavbarMobile((prev) => !prev)}
            >
              <Icons.Menu className="h-6 w-6" />
            </Button>

            <div className="hidden md:flex items-center justify-end gap-4">
              <Button variant={"text"}>Đăng nhập</Button>
              <Button variant={"text"}>Đăng ký</Button>
            </div>
          </div>

          {/* Navbar Mobile */}
          <AnimatePresence>
            {showNavbarMobile && (
              <motion.div
                className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col p-4"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
              >
                <div className="relative flex flex-col space-y-4">
                  <motion.button
                    className="absolute top-0 -left-14 rounded-r-none bg-secondary text-secondary-foreground p-2 rounded-xl hover:bg-secondary/80 transition-colors duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    type="button"
                    onClick={() => setShowNavbarMobile(false)}
                  >
                    <Icons.Close className="h-6 w-6" />
                  </motion.button>

                  <Button
                    variant="text"
                    onClick={() => setShowNavbarMobile(false)}
                  >
                    Trang chủ
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
