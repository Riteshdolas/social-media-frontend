import Input from "../components/Input";

function Post() {
    const handler = (e) =>{
        e.preventDefault()
    }
  return (
    <div className="relative flex justify-self-center justify-center items-center h-screen z-0 w-full">
      <form onSubmit={handler}
        className="flex flex-col bg-gray-950 h-[65%] p-5 rounded-md w-[90%]
      md:h-[54%] md:w-[70%] lg:h-[60%] lg:w-[35%] items-center justify-center"
      >
        <Input type="file" name="post_url" />
        <Input type="text" name="caption" placeholder="caption" />
        <button
          type="submit"
          className="font-bold bg-red-600 text-white p-2 m-1 rounded-md w-fit"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
