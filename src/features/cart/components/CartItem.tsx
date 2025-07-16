import Icons from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
import type { CartItemType } from "@/types";
import { formatMoney } from "@/utils/formatMoney";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/cartSlice";

interface CartItemProps {
  data: CartItemType;
}

const CartItem = ({ data }: CartItemProps) => {
  const dispatch = useDispatch();
  const totalPrice = data.price * data.quantity;

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(data.productId));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(data.productId));
  };

  const handleDecreaseQuantity = () => {
    if (data.quantity > 1) {
      dispatch(decreaseQuantity(data.productId));
    } else {
      dispatch(removeFromCart(data.productId));
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 max-md:flex-col max-md:gap-4">
      <div className="flex items-center gap-4 mr-4">
        <img
          src={data.imageUrl}
          alt={data.name}
          className="w-16 h-16 object-cover rounded"
        />

        <div>
          <h3 className="text-sm font-semibold">{data.name}</h3>
          <p className="text-xs text-gray-500">{data.description}</p>

          <p className="text-sm font-bold mt-1">{formatMoney(totalPrice)}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={handleIncreaseQuantity}
          >
            <Icons.Plus className="h-2 w-2" />
          </Button>
          <span className="text-sm text-gray-500">SL: {data.quantity}</span>
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={handleDecreaseQuantity}
          >
            <Icons.Minus className="h-2 w-2" />
          </Button>
        </div>

        <Button
          variant="outline"
          className="text-xs"
          onClick={handleRemoveFromCart}
        >
          <Icons.Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
