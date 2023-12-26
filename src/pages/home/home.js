import React, { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import {
  FaAngleRight,
  FaAngleLeft,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import "../../App.css";
import axios from "axios";

const Home = () => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("published_at");
  const [allPosts, setAllPosts] = useState([]);
  const [totalData, setTotalData] = useState(100);
  const [totalPages, setTotalPages] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isStartPage, setIsStartPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://suitmedia-backend.suitdev.com/api/ideas?append[]=small_image&append[]=medium_image&sort=${sortBy}`
        );
        setAllPosts(response.data.data);
        const calculatedTotalPages = Math.ceil(
          response.data.data.length / postsPerPage
        );
        setTotalPages(calculatedTotalPages);
        setIsStartPage(currentPage === 1);
        setIsLastPage(currentPage === calculatedTotalPages);
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // If status is 429, delay the request and try againA
          setTimeout(() => fetchData(), 1000); // Wait for 1 second
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };
    setIsLastPage(currentPage === totalPages);
    fetchData();
  }, [sortBy, totalData, currentPage, postsPerPage]);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, allPosts.length);
  const formattedPosts = allPosts.map((post) => ({
    ...post,
    medium_image_url: post.medium_image?.[0]?.url || null,
    published_at: post.published_at,
  }));

  const displayedPosts = formattedPosts.slice(startIndex, endIndex);
  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const handleFirstPageClick = () => {
    setCurrentPage(1);
  };

  const handleLastPageClick = () => {
    setCurrentPage(totalPages);
  };

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => setCurrentPage(index + 1)}
        className={`px-3 py-2 rounded-xl ${
          currentPage === index + 1 && "bg-[#FF6600] text-white"
        }`}
      >
        {index + 1}
      </button>
    ));
  };

  const sortPosts = (a, b) => {
    if (sortBy === "latest") {
      return new Date(b.published_at) - new Date(a.published_at);
    } else if (sortBy === "oldest") {
      return new Date(a.published_at) - new Date(b.published_at);
    }
    // Default to sorting by the latest if no valid option is selected
    return new Date(b.published_at) - new Date(a.published_at);
  };
  return (
    <>
      <section id="home">
        <div className="w-full h-screen relative overflow-hidden z-0 flex justify-center items-center flex-col text-center text-white">
          <div className="absolute object-none w-full h-screen top-0 bg-fixed cursor-default -z-10">
            <img src="./banner.png" alt="banner" className="h-screen w-full" />
          </div>
          <div className="absolute w-full bottom-0 -z-10 cursor-default">
            <img
              src="./bgwhite.png"
              alt="bg-white"
              className="max-sm:scale-150 w-full"
            />
          </div>
          <p className="text-7xl">Ideas</p>
          <p className="text-xl">Where all our great things begin</p>
        </div>
      </section>

      <section id="post">
        <div className="w-full h-auto flex flex-col md:px-16 px-6 pt-24">
          <div className="flex md:flex-row flex-col items-start md:items-center justify-between mt-4">
            <div>
              Showing{" "}
              {currentPage === 1 ? 1 : (currentPage - 1) * postsPerPage + 1} -{" "}
              {Math.min(currentPage * postsPerPage, allPosts.length)} of{" "}
              {allPosts.length}
            </div>
            <div className="flex md:flex-row flex-col md:items-center items-end md:gap-5 gap-3">
              <div className="relative inline-block">
                <span>Show per page :</span>
                <select
                  className="ml-4 mx-2 pl-5 pr-20 py-2 border-2 rounded-full"
                  onChange={(e) => setPostsPerPage(parseInt(e.target.value))}
                >
                  {[10, 20, 50].map((perPage) => (
                    <option key={perPage} value={perPage}>
                      {perPage}
                    </option>
                  ))}
                </select>
                <span className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <FaCaretDown size={20} />
                </span>
              </div>
              <div className="relative inline-block">
                <span>Sort by:</span>
                <select
                  className="ml-4 mx-2 pl-5 pr-20 py-2 border-2 rounded-full"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="latest">Terbaru</option>
                  <option value="oldest">Terlama</option>
                </select>
                <span className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <FaCaretDown size={20} />
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-wrap gap-8 justify-between pt-6 md:pt-10">
            {displayedPosts.sort(sortPosts).map((post) => (
              <div
                key={post.id}
                className="md:w-80 w-96 overflow-hidden rounded-lg shadow-lg"
              >
                {post.medium_image_url && (
                  <img
                    src={post.medium_image_url}
                    alt={post.title}
                    className="w-full object-cover h-60"
                  />
                )}
                <div className="p-4 mt-0 md:mt-2">
                  <p className="text-gray-500 uppercase">
                    {post.published_at ? formatDate(post.published_at) : ""}
                  </p>
                  <h2 className="text-xl uppercase font-semibold overflow-hidden text-ellipsis md:h-16 h-20">
                    {post.title || ""}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-20 pb-10 flex justify-center items-center gap-5">
          <button
            onClick={handleFirstPageClick}
            disabled={currentPage === 1}
            className={`rounded-xl ${
              isStartPage ? " text-gray-400" : "text-[#FF6600] "
            }`}
          >
            <FaAngleDoubleLeft size={20} />
          </button>
          <button
            onClick={handlePrevClick}
            disabled={currentPage === 1}
            className={`rounded-xl ${
              isStartPage ? " text-gray-400" : "text-[#FF6600] "
            }`}
          >
            <FaAngleLeft size={20} />
          </button>
          <div>{renderPageNumbers()}</div>
          <button
            onClick={handleNextClick}
            disabled={isLastPage}
            className={`rounded-xl ${
              isLastPage ? " text-gray-400" : "text-[#FF6600] "
            }`}
          >
            <FaAngleRight size={20} />
          </button>
          <button
            onClick={handleLastPageClick}
            disabled={isLastPage}
            className={`rounded-xl ${
              isLastPage ? " text-gray-400" : "text-[#FF6600] "
            }`}
          >
            <FaAngleDoubleRight size={20} />
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
