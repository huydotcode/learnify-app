import FilterProduct from "@/components/FilterProduct";
import ProductCard from "@/components/ProductCard";
import { mockCategories } from "@/data/mockCategory";
import { mockProducts } from "@/data/mockProducts";
import type { ProductType } from "@/types";
import { useState } from "react";

const FeaturedCoursesSection = () => {
  const [products, setProducts] = useState<ProductType[]>(mockProducts);

  return (
    <div className="bg-white py-20 min-h-[80vh]">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center">
          Khóa học nổi bật của chúng tôi
        </h2>

        <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
          {mockCategories.map((category) => (
            <div
              key={category.id}
              className="bg-secondary hover:bg-primary rounded-lg shadow-md text-center w-fit px-4 py-1 transition-colors duration-300 cursor-pointer"
            >
              <h3 className="text-sm text-white font-semibold">
                {category.name}
              </h3>
            </div>
          ))}
        </div>

        <FilterProduct
          initProducts={mockProducts}
          onFilterChange={(filteredProducts) => setProducts(filteredProducts)}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.title} data={product} />
          ))}

          {products.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center">
              <p className="text-gray-500">Không có khóa học nào phù hợp.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCoursesSection;
