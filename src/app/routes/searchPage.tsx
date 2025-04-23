
import NavBar from "@/components/navBar";
//import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchPage = () => {

  const [searchQuery, setSearchQuery] = useState<string | null>("");
  useEffect(() => {
    const updateSearchQuery = () => {
      const query = localStorage.getItem("searchQuery");
      setSearchQuery(query);
    };

    updateSearchQuery();

    window.addEventListener("storage", updateSearchQuery);

    return () => {
      window.removeEventListener("storage", updateSearchQuery);
    };
  }, []);
 
  console.log("Search query:", searchQuery);

  return (
    <div>
      <NavBar />
      <h1 className="text-4xl text-center mt-8">Search Page</h1>
      <h1 className="text-4xl text-center mt-8">
        {searchQuery ? `Search Results for: ${searchQuery}` : "No search query"}


        
      </h1>
      
    </div>
  );
};



export default SearchPage;