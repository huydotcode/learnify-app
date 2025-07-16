import ProductCard from "@/components/ProductCard";
import { mockCategories } from "@/data/mockCategory";
import { mockProducts } from "@/data/mockProducts";

const FeaturedCoursesSection = () => {
  return (
    <div className="bg-white py-20">
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

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.title} data={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCoursesSection;
