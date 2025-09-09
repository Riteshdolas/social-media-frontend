export default function CommentLoader() {
  return (
    <div className="w-full m-1 p-2 flex items-center animate-pulse">
      {/* Profile image skeleton */}
      <div className="w-10 h-10 rounded-full bg-gray-700"></div>

      {/* Username and comment skeleton */}
      <div className="flex flex-col ml-2 gap-2">
        <div className="h-3 w-24 bg-gray-700 rounded"></div>
        <div className="h-3 w-40 bg-gray-600 rounded"></div>
      </div>
    </div>
  );
}
