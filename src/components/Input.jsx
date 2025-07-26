function Input({type, name, placeholder, className="", ...props}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`bg-[#2a2a2c] text-[#f5f5f5] border-solid border-1 border-[#2a2a2c] w-full p-2 rounded-md m-1 ${className}`}
      {...props}
    />
  );
}

export default Input