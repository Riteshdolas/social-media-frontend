function Input({type, name, placeholder, className=""}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`bg-white w-full p-2 rounded-md m-1 ${className}`}
    />
  );
}

export default Input