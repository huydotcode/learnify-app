import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div>
      {/* Banner Section */}
      <div className="h-[500px]">
        <div className="flex max-lg:flex-col h-full">
          <div className="flex flex-col justify-center items-start p-8">
            <h1 className="text-5xl font-bold mb-4 text-primary">
              Chào mừng đến với Learnify
            </h1>
            <p className="mb-4 text-3xl font-bold">Khám phá tri thức cùng AI</p>
            <p className="mb-3 text-lg text-secondary">
              Learnify giúp bạn chọn lựa khóa học, tài liệu phù hợp với nhu cầu
              bằng công nghệ trí tuệ nhân tạo.
            </p>

            <Button className="px-10 font-bold text-lg">Bắt đầu</Button>
          </div>

          <div className="w-full h-full max-lg:w-full max-lg:h-[300px]">
            <img
              src="https://www.21kschool.com/vn/wp-content/uploads/sites/5/2024/09/Learning-Methods.png"
              alt="Banner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
