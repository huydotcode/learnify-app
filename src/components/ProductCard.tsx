import { motion } from "framer-motion";
import type { FavoriteItemType, ProductType } from "@/types";
import { Button } from "@/components/ui/button";
import Icons from "./shared/Icons";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { addToCart } from "@/features/cart/store/cartSlice";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import { useState } from "react";
import ModalProduct from "./ModalProduct";
import { toggleFavorite } from "@/features/favorites/store/favoriteSlice";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  data: ProductType;
}

const ProductCard = ({ data }: ProductCardProps) => {
  const { items: favorites } = useSelector(
    (state: RootState) => state.favorite
  );
  const dispatch = useDispatch<AppDispatch>();
  const [openModalDetail, setOpenModalDetail] = useState<boolean>(false);
  const { isAuthenticated, user } = useAuth();

  const isFavorite = favorites.some(
    (item) => item.productId === data.productId && item.userId === user?.id
  );

  const formattedPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const finalPrice = data.discount
    ? data.price - (data.price * data.discount) / 100
    : data.price;

  const handleAddToCart = () => {
    if (!isAuthenticated || !user) {
      toast.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng");
      return;
    }

    dispatch(
      addToCart({
        productId: data.productId,
        title: data.title,
        imageUrl: data.imageUrl,
        price: finalPrice,
        quantity: 1,
        discount: data.discount,
        userId: user.id,
        description: data.description,
        name: data.title,
      })
    );

    toast.success("Đã thêm sản phẩm vào giỏ hàng");
  };

  const handleAddToFavorites = () => {
    if (!isAuthenticated || !user) {
      toast.error("Bạn cần đăng nhập để thêm sản phẩm vào yêu thích");
      return;
    }

    const newFavoriteItem = {
      productId: data.productId,
      userId: user.id,
    } as FavoriteItemType;

    dispatch(toggleFavorite(newFavoriteItem));
  };

  return (
    <>
      <motion.div
        className="relative group rounded-lg shadow-lg overflow-hidden cursor-pointer bg-white flex flex-col h-full"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <div className="relative">
          <motion.img
            src={data.imageUrl}
            alt={data.title}
            className="w-full h-[250px] object-cover transition-all"
            variants={{
              hover: { filter: "blur(4px) brightness(0.6) saturate(1.2)" },
              rest: { filter: "blur(0px) brightness(1)" },
            }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            variants={{
              hover: { opacity: 1, scale: 1 },
              rest: { opacity: 0, scale: 0.95 },
            }}
            transition={{ duration: 0.3 }}
          >
            <Button
              className="font-bold rounded-xl text-xl"
              size={"lg"}
              onClick={() => setOpenModalDetail((prev) => !prev)}
            >
              Xem chi tiết
            </Button>

            <div className="flex items-center justify-center gap-2 absolute top-2 right-2">
              <Button
                className={cn("p-2 rounded-full", {
                  "text-red-500": isFavorite,
                })}
                onClick={handleAddToFavorites}
                variant={"secondary"}
              >
                <Icons.Heart className="h-8 w-8" />
              </Button>

              <Button onClick={handleAddToCart} variant={"secondary"}>
                <Icons.Cart className="h-8 w-8" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Card Content */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="p-4">
            <h2 className="text-lg font-bold">{data.title}</h2>
            <p className="text-sm text-secondary line-clamp-2">
              {data.description}
            </p>
          </div>

          {data.keywords && data.keywords.length > 0 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {data.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-secondary text-white px-2 py-1 rounded-full text-xs"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="px-4 pb-4">
            <div className="flex w-full items-center">
              {/* Rating Review */}
              {data?.rating && (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center flex-wrap text-yellow-500 mr-1">
                    {Array.from({ length: 4 }, (_, index) => (
                      <Icons.Star
                        key={index}
                        className={`inline-block ${
                          index < Math.floor(data.rating || 0)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}

                    {data.rating % 1 !== 0 && (
                      <Icons.StarHalf className="inline-block text-yellow-500" />
                    )}

                    <span className="text-sm text-gray-500 ml-2">
                      {data.rating} / 5
                    </span>

                    <span className="ml-2 text-sm text-gray-500">
                      {data.reviews} đánh giá
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end">
                {data.discount ? (
                  <>
                    <span className="text-xs line-through text-secondary">
                      {formattedPrice(data.price)}
                    </span>
                    <span className="text-lg font-bold text-primary ml-2">
                      {formattedPrice(finalPrice)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-primary">
                    {formattedPrice(data.price)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {openModalDetail && (
        <ModalProduct
          data={data}
          isOpen={openModalDetail}
          onClose={() => setOpenModalDetail(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
