import type { ReviewType } from "@/types";

export const mockReviews: ReviewType[] = [
  {
    id: "1",
    productId: "1",
    user: {
      id: "1",
      name: "Nhựt Huy",
      avatar:
        "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg",
    },
    rating: 5,
    comment: "Khóa học rất hữu ích ạ!",
    createdAt: "2023-10-01T12:00:00Z",
    updatedAt: "2023-10-01T12:00:00Z",
  },
  {
    id: "2",
    productId: "2",
    user: {
      id: "2",
      name: "Minh Tuấn",
      avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
    },
    rating: 4,
    comment: "Rất tốt, nhưng có một số phần cần cải thiện.",
    createdAt: "2023-10-02T14:30:00Z",
    updatedAt: "2023-10-02T14:30:00Z",
  },
  {
    id: "3",
    productId: "3",
    user: {
      id: "3",
      name: "Văn Toàn",
      avatar:
        "https://e7.pngegg.com/pngimages/340/946/png-clipart-avatar-user-computer-icons-software-developer-avatar-child-face-thumbnail.png",
    },
    rating: 3,
    comment: "Khóa học ổn, nhưng không như mong đợi.",
    createdAt: "2023-10-03T09:15:00Z",
    updatedAt: "2023-10-03T09:15:00Z",
  },
];
