import { useRef, useState } from "react";

import LoginModal from "@/features/auth/components/LoginModal";
import SignupModal from "@/features/auth/components/SignupModal";
import useAuth from "@/hooks/useAuth";
import { useClickOutside } from "@/hooks/useClickOutside";
import { AnimatePresence, motion } from "framer-motion";
import Icons from "../shared/Icons";
import Dropdown from "../ui/Dropdown";
import { Button } from "../ui/button";
import Searchbar from "./Searchbar";
import Cart from "@/features/cart/components/Cart";
import { Link } from "react-router";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  const [showNavbarMobile, setShowNavbarMobile] = useState<boolean>(false);
  const [showModalLogin, setShowModalLogin] = useState<boolean>(false);
  const [showModalRegister, setShowModalRegister] = useState<boolean>(false);
  const [openDropdownUser, setOpenDropdownUser] = useState<boolean>(false);

  const userRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    handler: () => setOpenDropdownUser(false),
    ref: userRef as React.RefObject<HTMLElement>,
  });

  return (
    <div className="bg-white border-b border-gray-200 h-[61px] w-screen fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center p-4 h-[60px]">
        <div className="relative w-full flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={"/"} className="min-w-[120px] h-12 flex items-center">
              <img
                className="w-full h-full object-contain"
                src="images/logo.png"
                alt="Learnify Logo"
              />
            </Link>
          </div>

          {/* Searchbar and Icons */}
          <div className="flex-1 flex items-center justify-end gap-4">
            <Searchbar />

            {isAuthenticated && <Cart />}

            <Button
              className="h-full w-10 flex items-center justify-center rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors duration-300 md:hidden"
              onClick={() => setShowNavbarMobile((prev) => !prev)}
            >
              <Icons.Menu className="h-6 w-6" />
            </Button>

            {isAuthenticated && (
              <>
                <div
                  className="relative flex items-center gap-4 cursor-pointer"
                  onClick={() => setOpenDropdownUser((prev) => !prev)}
                  ref={userRef}
                >
                  <span className="flex items-center gap-2">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full"
                    />

                    <span className="text-sm text-gray-700 max-md:hidden'">
                      {user?.name}
                    </span>
                  </span>
                  {openDropdownUser && (
                    <Dropdown
                      isOpen={openDropdownUser}
                      className="absolute right-0 mt-2 w-46 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    >
                      <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          <span className="text-sm text-gray-700 flex items-center gap-2">
                            <Icons.Heart className="h-4 w-4" />
                            <Link to="/favorites">Yêu thích</Link>
                          </span>
                        </li>

                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={logout}
                        >
                          <span className="text-sm text-gray-700 flex items-center gap-2">
                            <Icons.Logout className="h-4 w-4" />
                            Đăng xuất
                          </span>
                        </li>
                      </ul>
                    </Dropdown>
                  )}
                </div>
              </>
            )}

            <div className="flex items-center justify-end gap-4">
              {!isAuthenticated && (
                <>
                  <Button
                    className="max-lg:flex hidden"
                    onClick={() => setShowModalLogin(true)}
                    variant={"text"}
                  >
                    <Icons.Login className="h-8 w-8" />
                  </Button>

                  <Button
                    className="max-lg:hidden"
                    onClick={() => setShowModalLogin(true)}
                    variant={"text"}
                  >
                    Đăng nhập
                  </Button>

                  <Button
                    className="max-lg:hidden"
                    onClick={() => setShowModalRegister(true)}
                    variant={"text"}
                  >
                    Đăng ký
                  </Button>
                </>
              )}
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

          {showModalLogin && (
            <LoginModal
              isOpen={showModalLogin}
              onClose={() => setShowModalLogin(false)}
              setShowModalLogin={setShowModalLogin}
              setShowModalRegister={setShowModalRegister}
            />
          )}

          {showModalRegister && (
            <SignupModal
              isOpen={showModalRegister}
              onClose={() => setShowModalRegister(false)}
              setShowModalLogin={setShowModalLogin}
              setShowModalRegister={setShowModalRegister}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
