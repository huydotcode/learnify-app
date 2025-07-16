import type { AppDispatch } from "@/store";
import { clearCart } from "@/features/cart/store/cartSlice";
import type { UserType } from "@/types";
import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { clearFavorites } from "@/features/favorites/store/favoriteSlice";

const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  token?: string;
  user: UserType | null;
}>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  token: undefined,
  user: null,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserType | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const login = () => {
    setIsAuthenticated(true);

    // Call API get Token

    setToken("TOKEN");

    const user = {
      id: "user-id",
      name: "Ngô Nhựt Huy",
      email: "user@example.com",
      avatar:
        "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg",
    };

    setUser(user);

    localStorage.setItem("token", "TOKEN");
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    dispatch(clearCart());
    dispatch(clearFavorites());

    setIsAuthenticated(false);
    setToken(undefined);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Đăng xuất thành công!");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, token, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
