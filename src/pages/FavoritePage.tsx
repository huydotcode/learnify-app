import Icons from "@/components/shared/Icons";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/data/mockProducts";
import { removeFromFavorites } from "@/features/favorites/store/favoriteSlice";
import type { RootState } from "@/store";
import type { ProductType } from "@/types";
import { formatMoney } from "@/utils/formatMoney";
import { useDispatch, useSelector } from "react-redux";

const FavoritePage = () => {
  const products = mockProducts;
  const dispath = useDispatch();
  const { items: favorites } = useSelector(
    (state: RootState) => state.favorite
  );

  const handleRemoveFromFavorites = (productId: string) => {
    dispath(
      removeFromFavorites({
        productId,
        userId: "user-id", // Replace with actual user ID if available
      })
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Các khóa học yêu thích</h1>
      <ul>
        {favorites.map((fav) => {
          const product = products.find(
            (p) => p.productId === fav.productId
          ) as ProductType;
          return product ? (
            <div
              key={fav.productId}
              className="relative p-4 border-b border-gray-200 flex items-center justify-between gap-4"
            >
              <Button
                className="absolute top-4 right-4"
                onClick={() => handleRemoveFromFavorites(product.productId)}
              >
                <Icons.HeartDislike className="h-4 w-4" />
              </Button>

              <div className="flex flex-col items-start justify-center w-1/4">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover mt-2 rounded"
                />
              </div>

              <div className="flex flex-col items-start justify-center w-3/4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>

                <p className="text-lg font-bold mt-2">
                  {formatMoney(product.price)}
                </p>
              </div>
            </div>
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default FavoritePage;
