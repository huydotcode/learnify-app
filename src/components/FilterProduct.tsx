import React, { useState } from "react";
import { cn } from "@/lib/utils"; // hàm tiện để gộp class (nếu có)
import type { ProductType } from "@/types";

interface FilterProductProps {
  initProducts: ProductType[];
  onFilterChange: (filteredProducts: ProductType[]) => void;
}

const filters = [
  { label: "Tất cả", value: "all" },
  { label: "< 500K", value: "lt500" },
  { label: "500K – 1 triệu", value: "500to1000" },
  { label: "> 1 triệu", value: "gt1000" },
];

const FilterProduct = ({
  initProducts,
  onFilterChange,
}: FilterProductProps) => {
  const [selected, setSelected] = useState("all");

  const handleFilter = (value: string) => {
    setSelected(value);
    let filteredProducts: ProductType[] = [];
    if (value === "all") {
      filteredProducts = initProducts;
    } else if (value === "lt500") {
      filteredProducts = initProducts.filter(
        (product) => product.price < 500000
      );
    } else if (value === "500to1000") {
      filteredProducts = initProducts.filter(
        (product) => product.price >= 500000 && product.price <= 1000000
      );
    } else if (value === "gt1000") {
      filteredProducts = initProducts.filter(
        (product) => product.price > 1000000
      );
    }
    onFilterChange(filteredProducts);
  };

  return (
    <div className="overflow-x-auto w-full">
      <div className="flex gap-3 px-4 py-2 w-fit">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => handleFilter(filter.value)}
            className={cn(
              "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-all",
              selected === filter.value
                ? "bg-primary text-white border-primary"
                : "bg-muted text-gray-700 hover:bg-gray-100"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterProduct;
