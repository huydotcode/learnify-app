import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/Modal";
import useAuth from "@/hooks/useAuth";
import React from "react";
import { toast } from "sonner";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  setShowModalLogin: (show: boolean) => void;
  setShowModalRegister: (show: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  setShowModalLogin,
  setShowModalRegister,
}) => {
  const { login } = useAuth();

  const handleLogin = () => {
    // Handle login logic here
    setShowModalLogin(false);
    login(); // Call the login function from useAuth

    toast.success("Đăng nhập thành công!");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Đăng nhập">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <Input type="email" id="email" required />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Mật khẩu</label>
            <Input type="password" id="password" required />
          </div>
          <Button size={"lg"} type="submit">
            Đăng nhập
          </Button>
        </div>
      </form>

      <div className="flex flex-col mt-4">
        <div className="flex items-center justify-center">
          <p className="text-sm text-center">Chưa có tài khoản? </p>
          <Button
            size={"sm"}
            variant={"text"}
            onClick={() => {
              setShowModalLogin(false);
              setShowModalRegister(true);
            }}
          >
            Đăng ký
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
