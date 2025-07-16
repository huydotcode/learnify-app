const SkeletonProductCard = () => {
  return (
    <div className="bg-white shadow rounded-lg animate-pulse">
      <div className="h-[250px] bg-gray-200 rounded mb-4"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductCard;
