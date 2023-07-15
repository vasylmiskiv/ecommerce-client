import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    return navigateListener();
  }, [navigate]);

  const navigateListener = () => {
    return navigate((location) => {
      if (
        !location.pathname.startsWith("/search") &&
        !location.pathname.startsWith("/product")
      ) {
        setKeyword("");
      }
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className="mx-auto w-1/3 flex items-center">
      <input
        type="text"
        className="rounded-l w-full py-2 px-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-gray-200 outline-none placeholder-slate-400 hover:bg-white focus:bg-white duration-200"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search..."
      />

      <button
        type="submit"
        className="px-4 py-2 h-full rounded-r bg-green-500 text-white font-bold hover:bg-green-600"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
