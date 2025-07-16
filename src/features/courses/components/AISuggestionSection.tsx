import ProductCard from "@/components/ProductCard";
import SkeletonProductCard from "@/components/SkeletonProductCard";
import { mockProducts } from "@/data/mockProducts";
import { mockSuggestions } from "@/data/mockSuggestion";
import useAuth from "@/hooks/useAuth";
import type { RootState } from "@/store";
import type { ProductType } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const AISuggestionSection = () => {
  const { isAuthenticated } = useAuth();
  const { items: favorites } = useSelector(
    (state: RootState) => state.favorite
  );

  const [suggestions, setSuggestions] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggest = async () => {
    if (!isAuthenticated) {
      toast.error(
        "Vui lòng đăng nhập để sử dụng tính năng gợi ý khóa học từ AI."
      );
      setSuggestions([]);
      setVisible(false);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setVisible(false);

      const suggestions = await new Promise((r) =>
        setTimeout(() => {
          // Giả lập API call để lấy gợi ý khóa học dùng favorites và mockProducts để tạo gợi ý
          const recommended = mockProducts.filter(
            (product) =>
              !favorites.some((fav) => fav.productId === product.productId) &&
              product?.keywords &&
              product?.keywords.some((keyword) =>
                favorites.some((fav) => {
                  const keywords = mockProducts.find(
                    (p) => p.productId === fav.productId
                  )?.keywords;
                  return keywords?.includes(keyword);
                })
              )
          );
          r(recommended.length > 0 ? recommended : mockSuggestions);
        }, 1000)
      );

      setSuggestions(suggestions as ProductType[]);
      setVisible(true);
    } catch (err) {
      setLoading(false);
      setError("Đã xảy ra lỗi khi lấy gợi ý. Vui lòng thử lại sau." + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-muted py-20 min-h-[500px]">
      <div className="container mx-auto">
        <div>
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-2">Gợi ý thông minh từ AI</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Learnify sẽ gợi ý các khóa học phù hợp với bạn dựa trên sở thích
              và nhu cầu của bạn.
            </p>

            <div className="flex justify-center">
              <motion.button
                onClick={handleSuggest}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
              >
                <img
                  className="w-6 h-6"
                  src="https://cdn-icons-png.flaticon.com/512/6985/6985703.png"
                  alt="AI Icon"
                />
                Gợi ý từ AI
              </motion.button>
            </div>

            {/* Loading */}
            {loading && (
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonProductCard key={index} />
                ))}
              </div>
            )}

            {/* Error */}
            {error && <div className="mt-6 text-warning text-lg">{error}</div>}

            {/* Gợi ý xuất hiện */}
            {visible && (
              <motion.div
                className="mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.15 },
                  },
                }}
              >
                {suggestions.map((product) => (
                  <motion.div
                    key={product.title}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <ProductCard data={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISuggestionSection;
