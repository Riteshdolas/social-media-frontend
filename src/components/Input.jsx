function Input({type, name, placeholder, className=""}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`bg-black text-white border-solid border-1 border-gray-500 w-full p-2 rounded-md m-1 ${className}`}
    />
  );
}

export default Input