import Icons from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/ui/Dropdown";
import { useClickOutside } from "@/hooks/useClickOutside";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import CartItem from "./CartItem";

const Cart = () => {
  const [openDropdownCart, setOpenDropdownCart] = useState<boolean>(false);
  const { items } = useSelector((state: RootState) => state.cart);

  const cartRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    handler: () => setOpenDropdownCart(false),
    ref: cartRef as React.RefObject<HTMLElement>,
  });

  return (
    <div className="relative flex items-center" ref={cartRef}>
      <Button
        className="h-full w-10"
        onClick={() => setOpenDropdownCart((prev) => !prev)}
      >
        <Icons.Cart className="h-6 w-6" />
      </Button>

      {openDropdownCart && (
        <Dropdown
          isOpen={openDropdownCart}
          className="absolute right-0 mt-2 min-w-[500px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-md:min-w-0 max-md:w-[80vw]"
        >
          <ul className="py-2">
            {items.length > 0 ? (
              items.map((item) => <CartItem key={item.productId} data={item} />)
            ) : (
              <li className="px-4 py-2 text-gray-500">Giỏ hàng trống</li>
            )}
          </ul>
        </Dropdown>
      )}
    </div>
  );
};

export default Cart;
