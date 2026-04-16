const Input = ({ name, placeholder, type = "text", value, onChange }) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default Input;