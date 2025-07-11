import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="w-full flex justify-center items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="sw-search w-full max-w-xl px-5 py-3 text-lg focus:outline-none transition-all duration-300"
      />
    </div>
  );
};

export default SearchBar;
