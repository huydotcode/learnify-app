import type { ProductType } from "@/types";

export const mockSuggestions: ProductType[] = [
  {
    title: "Khóa học Machine Learning",
    price: 399000,
    description:
      "Khóa học Machine Learning giúp bạn hiểu và áp dụng các thuật toán học máy.",
    imageUrl:
      "https://vtiacademy.edu.vn/upload/images/ai-machine-learning-34-1-.png",
    categorySlug: "data-science",
    keywords: ["Machine Learning", "AI", "Data Science"],
    rating: 4.9,
    reviews: 60,
    discount: 20,
    stock: 20,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  },
  {
    title: "Khóa học UX/UI Design",
    price: 179000,
    description:
      "Khóa học thiết kế UX/UI giúp bạn tạo ra trải nghiệm người dùng tốt hơn.",
    imageUrl:
      "https://d1j8r0kxyu9tj8.cloudfront.net/images/1514716088r7cLw4U5B6BWcWj.jpg",
    categorySlug: "design",
    keywords: ["UX/UI", "Design", "User Experience"],
    rating: 4.6,
    reviews: 75,
    discount: 10,
    stock: 40,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  },
];
