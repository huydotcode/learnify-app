import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/Modal";
import { toast } from "sonner";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  setShowModalLogin: (show: boolean) => void;
  setShowModalRegister: (show: boolean) => void;
}

const SignupModal = ({
  isOpen,
  onClose,
  setShowModalLogin,
  setShowModalRegister,
}: SignupModalProps) => {
  const handleRegister = () => {
    // Handle register logic here
    setShowModalRegister(false);

    toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Đăng ký">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <Input type="email" id="email" required />
          </div>

          <div className="flex flex-col">
            <label htmlFor="name">Họ và tên</label>
            <Input type="text" id="name" required />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Mật khẩu</label>
            <Input type="password" id="password" required />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirm-password">Xác nhận mật khẩu</label>
            <Input type="password" id="confirm-password" required />
          </div>

          <Button size={"lg"} type="submit">
            Đăng ký
          </Button>
        </div>
      </form>

      <div className="flex flex-col mt-4">
        <div className="flex items-center justify-center">
          <p className="text-sm text-center">Đã có tài khoản? </p>
          <Button
            size={"sm"}
            variant={"text"}
            onClick={() => {
              setShowModalRegister(false);
              setShowModalLogin(true);
            }}
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SignupModal;
