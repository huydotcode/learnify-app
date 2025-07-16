import type { ProductType } from "@/types";

export const mockProducts: ProductType[] = [
  {
    productId: "1",
    title: "Khóa học React cơ bản",
    price: 199000,
    description: "Khóa học này giúp bạn nắm vững kiến thức cơ bản về React.",
    imageUrl:
      "https://letdiv.com/wp-content/uploads/2024/04/khoa-hoc-react.png",
    categorySlug: "web-development",
    rating: 4.5,
    reviews: 120,
    discount: 10,
    keywords: ["React", "JavaScript", "Frontend"],
    stock: 50,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  },
  {
    productId: "2",
    title: "Khóa học Node.js nâng cao",
    price: 299000,
    description:
      "Khóa học nâng cao về Node.js, giúp bạn phát triển ứng dụng backend mạnh mẽ.",
    imageUrl: "https://i.ytimg.com/vi/5SJwmIOk5NE/maxresdefault.jpg",
    categorySlug: "backend-development",
    keywords: ["Node.js", "Backend", "JavaScript"],
    rating: 4.8,
    reviews: 85,
    discount: 15,
    stock: 30,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  },
  {
    productId: "3",
    title: "Khóa học Python cho người mới bắt đầu",
    price: 149000,
    description:
      "Khóa học Python cơ bản dành cho người mới bắt đầu, giúp bạn làm quen với lập trình.",
    imageUrl:
      "https://hourofcode.vn/wp-content/uploads/2022/09/khoa-hoc-lap-trinh-python-hour-of-code-viet-nam.png",
    categorySlug: "programming",
    keywords: ["Python", "Programming", "Beginner"],
    rating: 4.2,
    reviews: 200,
    discount: 5,
    stock: 100,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  },
  {
    productId: "4",
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
    productId: "5",
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
