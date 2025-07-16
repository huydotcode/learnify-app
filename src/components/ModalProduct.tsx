import { mockReviews } from "@/data/mockReviews";
import type { FavoriteItemType, ProductType } from "@/types";
import { formatMoney } from "@/utils/formatMoney";
import Modal from "./ui/Modal";
import Icons from "./shared/Icons";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { toast } from "sonner";
import { addToCart } from "@/features/cart/store/cartSlice";
import useAuth from "@/hooks/useAuth";
import { toggleFavorite } from "@/features/favorites/store/favoriteSlice";

interface ModalProductProps {
  data: ProductType;
  isOpen: boolean;
  onClose: () => void;
}

const ModalProduct = ({ data, isOpen, onClose }: ModalProductProps) => {
  const { isAuthenticated, user } = useAuth();

  const { items: favorites } = useSelector(
    (state: RootState) => state.favorite
  );
  const dispatch = useDispatch<AppDispatch>();
  const reviews = mockReviews.filter(
    (review) => review.productId === data.productId
  );
  const isFavorite = favorites.some(
    (item) => item.productId === data.productId && item.userId === user?.id
  );

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
    <Modal
      className="max-w-[80vw] max-md:max-w-screen"
      isOpen={isOpen}
      onClose={onClose}
      title="Chi tiết khóa học"
    >
      <div className="flex max-xl:flex-col gap-8">
        <div className="flex flex-col gap-4">
          <img
            src={data.imageUrl}
            alt={data.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h3 className="text-2xl font-semibold">{data.title}</h3>
          <p className="text-lg text-gray-700">{data.description}</p>
          <p className="text-xl font-bold text-primary">
            {formatMoney(data.price)}
          </p>
          <div className="flex flex-wrap gap-2">
            {data?.keywords &&
              data.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
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
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              className={cn("p-2 rounded-full", {
                "text-red-500": isFavorite,
              })}
              onClick={handleAddToFavorites}
              variant={"secondary"}
            >
              <Icons.Heart className="h-8 w-8" />
            </Button>

            <Button onClick={handleAddToCart}>
              <Icons.Cart className="h-8 w-8" />
            </Button>
          </div>
        </div>

        {/* Reviews */}
        <div className="ml-8 flex-1 min-w-[300px]">
          <h4 className="text-start text-xl font-semibold mb-4">Đánh giá</h4>

          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
                >
                  <div className="flex items-center gap-4 mb-2 w-10 h-10 mr-4">
                    <img
                      src={review.user.avatar}
                      alt={review.user.name}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h5 className="font-semibold">{review.user.name}</h5>
                    <p className="text-gray-600">{review.comment}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {review.createdAt
                          ? new Date(review.createdAt).toLocaleDateString()
                          : "Ngày không xác định"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-start text-secondary">
              Chưa có đánh giá nào cho sản phẩm này.
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalProduct;
