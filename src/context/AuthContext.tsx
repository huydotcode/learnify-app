import type { AppDispatch } from "@/features/cart/store";
import { clearCart } from "@/features/cart/store/cartSlice";
import type { UserType } from "@/types";
import { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

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
    setUser({
      id: "user-id",
      name: "Ngô Nhựt Huy",
      email: "user@example.com",
      avatar:
        "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg",
    });
  };

  const logout = () => {
    dispatch(clearCart());

    setIsAuthenticated(false);
    setToken(undefined);
    setUser(null);

    toast.success("Đăng xuất thành công!");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, token, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
