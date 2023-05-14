import { useState } from "react";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className="mx-auto w-1/2 flex items-center">
      <input
        type="text"
        className="rounded-l-lg w-full py-2 px-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search product..."
      />

      <button
        type="submit"
        className="px-4 py-2 rounded-r-lg bg-green-500 text-white font-bold"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
